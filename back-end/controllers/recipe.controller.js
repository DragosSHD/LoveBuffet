const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;


exports.create = async (req, res) => {
    const data = req.body;

    if(!data.api_id) {
        res.status(400).send({ message: "Product id is required!" });
    }
    if(!data.title) {
        res.status(400).send({ message: "Product title is required!" });
    }
    if(!data.image) {
        res.status(400).send({ message: "Product image url is required!" });
    }
    if(data.api_id && data.title && data.image) {
        const recipe = await prisma.recipe.create({
            data: data
        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).send({ message: "Could not create recipe!" })
        });
        if(recipe) {
            res.status(201).json(recipe);
        }
    }

    if(!res.headersSent) {
        res.status(500).send({ message: "An error occurred!"});
    }
}

exports.getAll = async (req, res) => {
    const recipes = await prisma.recipe.findMany().catch(() => {
        res.status(500).send({message: "Some error occurred while retrieving Users."})
    });
    res.json(recipes);
}

exports.getOne = async (req, res) => {
    if(!req.params.id) {
        res.status(400).send({ message: "Product id is required!"});
    }
    if(req.params.id) {
        const recipe = await prisma.recipe.findUnique({
            where: {
                api_id: req.params.id,
            },
        }).catch((err) => {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving Users."})
        });
        if(recipe)
            res.json(recipe);
        if(!recipe)
            res.status(404).send({ message: "Not found!"});
    }
}





