const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();
const prisma = new PrismaClient;

exports.toggleFavourites = async (req,res) => {
    const userToken = req.body.userToken;
    const recipeId = parseInt(req.body.recipeId);

    let decoded = "";
    try {
        decoded = jwt.verify(userToken, process.env.TOKEN_SECRET);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "Invalid token!" });
    }

    const userId = decoded.id;

    if(!res.headersSent) {
        if (!recipeId) {
            res.status(400).send({message: "Recipe ID is required!"});
        }
        if (!userId) {
            res.status(400).send({message: "User ID is required!"});
        }
        if (userId && recipeId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    favourites: true
                }
            }).catch(err => {
                console.log(err);
            });
            if (!user) {
                res.status(404).send({message: "User not found!"});
            }
            const recipe = await prisma.recipe.findUnique({
                where: {
                    id: recipeId
                }
            }).catch(err => {
                console.log(err);
            });
            if (!recipe && !res.headersSent) {
                res.status(404).send({message: "Recipe not found!"});
            }
            if (user && recipe) {
                const foundHistory = await prisma.recipesOnFavourites.findMany({
                    where: {
                        recipeId: recipe.id,
                        favouritesId: user.favourites.id
                    }
                });
                if (!foundHistory.length) {
                    const recipeFavourites = await prisma.recipesOnFavourites.create({
                        data: {
                            recipeId: recipe.id,
                            favouritesId: user.favourites.id
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                    if (!recipeFavourites) {
                        res.status(500).send({message: "Error while adding to favourites!"});
                    }
                    if (recipeFavourites) {
                        res.status(201).json(recipeFavourites);
                    }
                }
                if (foundHistory.length) {
                    const deletedFavourites = await prisma.recipesOnFavourites.delete({
                        where: {
                            recipeId_favouritesId: {
                                recipeId: recipe.id,
                                favouritesId: user.favourites.id
                            },
                        }
                    }).catch(err => {
                       console.log(err);
                        res.status(500).send({ message: "Error removing from favourites!"});
                    });
                    if(!res.headersSent)
                        res.status(204).send();
                }
            }
        }


    }
    }


exports.getForUser = async (req,res) => {
    const userId = parseInt(req.params.id);
    if(!userId) {
        res.status(400).send({ message: "User ID is required!"});
    }
    if(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                favourites: true
            }
        }).catch(err => {
            console.log(err);
        });
        if(!user) {
            res.status(404).send({ message: "User not found!"});
        }
        if(user) {
            const recipeFavourites = await prisma.recipesOnFavourites.findMany({
                where: {
                    favouritesId: user.favourites.id
                },
                include: {
                    recipe: true
                },
                orderBy: {
                    assignedAt: 'desc'
                }
            }).catch(err => {
                console.log(err);
            });
            if(!recipeFavourites.length) {
                res.status(404).send({ message: "Favourites is empty!"});
            }
            if(recipeFavourites.length) {
                res.status(200).json(recipeFavourites.map(obj => {
                    const recipe = obj.recipe;
                    recipe.date = obj.assignedAt;
                    return recipe
                }));
            }
        }
    }


    if(!res.headersSent) {
        res.status(500).send({ message: "Error occurred!"});
    }
}