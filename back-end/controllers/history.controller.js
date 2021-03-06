const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();
const prisma = new PrismaClient;

exports.addOne = async (req, res) => {
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
        if(!recipeId) {
            res.status(400).send({ message: "Recipe ID is required!"});
        }
        if(!userId) {
            res.status(400).send({ message: "User ID is required!"});
        }
        if(userId && recipeId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    history: true
                }
            }).catch(err => {
                console.log(err);
            });
            if(!user) {
                res.status(404).send({ message: "User not found!"});
            }
            const recipe = await prisma.recipe.findUnique({
                where: {
                    id: recipeId
                }
            }).catch(err => {
                console.log(err);
            });
            if(!recipe) {
                res.status(404).send({ message: "Recipe not found!"});
            }
            if(user && recipe) {
                const foundHistory = await prisma.recipesOnHistory.findMany({
                    where: {
                        recipeId: recipe.id,
                        historyId: user.history.id
                    }
                });
                if(!foundHistory.length) {
                    const recipeHistory = await prisma.recipesOnHistory.create({
                        data: {
                            recipeId: recipe.id,
                            historyId: user.history.id
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                    if(!recipeHistory) {
                        res.status(500).send({ message: "Error while adding to history!"});
                    }
                    if(recipeHistory) {
                        res.status(201).json(recipeHistory);
                    }
                }
                if(foundHistory.length) {
                    const updatedHistory = await prisma.recipesOnHistory.updateMany({
                        where: {
                            recipeId: recipe.id,
                            historyId: user.history.id
                        },
                        data: {
                            assignedAt: new Date()
                        }
                    })
                    res.status(200).json(foundHistory);
                }
            }
        }
    }


    if(!res.headersSent) {
        res.status(500).send({ message: "Error occurred!"});
    }
}

exports.getForUser = async (req, res) => {
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
                history: true
            }
        }).catch(err => {
            console.log(err);
        });
        if(!user) {
            res.status(404).send({ message: "User not found!"});
        }
        if(user) {
            const recipeHistory = await prisma.recipesOnHistory.findMany({
                where: {
                    historyId: user.history.id
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
            if(!recipeHistory) {
                res.status(404).send({ message: "History is empty!"});
            }
            if(recipeHistory) {
                res.status(200).json(recipeHistory.map(obj => {
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