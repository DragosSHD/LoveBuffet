const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//For the JWT creation
const dotenv = require('dotenv');
dotenv.config();
const tokenSecret=process.env.TOKEN_SECRET;


const prisma = new PrismaClient;

function hashPassword(password) {
    const SALT_WORK_FACTOR = 10;
    return bcrypt.hashSync(password, SALT_WORK_FACTOR);
}
  
// Create new user
exports.create = async (req, res) => {

    const data = req.body;

    if(!data.username)
        return res.status(400).send({ message: "Username is required!" });
    if(!data.email)
        return res.status(400).send({ message: "Email is required!" });
    if(!data.password)
        return res.status(400).send({ message: "Password is required!" });

    const user = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashPassword(data.password),
            phone: data.phone,
            address: data.address,
            preferenceId: data.preferenceId,
            card: data.card
        }
    }).catch(err => {
        console.log("ERROR: " + err);
        res.status(500).send({ message: "Could not create account!" })
    });
    if(user) {
        const history = await prisma.history.create({
            data: {
                userId: user.id
            }
        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).send({ message: "Could not create account!" })
        });
        const favourites = await prisma.favourites.create({
            data: {
                userId: user.id
            }
        }).catch(err => {
            console.log("ERROR: " + err);
            res.status(500).send({ message: "Could not create account!" })
        });
        if(history) {
            res.status(201).json(user.username);
        }
    }
}

// Get users
exports.getUsers = async (req, res) => {

    if(req.query.email) {
        const data = await prisma.user.findUnique({
            where: {
                email: req.query.email,
            },
        }).catch((err) => {
            res.status(500).send({ message: err});
        });
        if(data) {
           res.status(200).json(data.id);
        }
        if(!data) {
            res.status(200).json(null);
        }
    }
    if(req.query.username) {
        const data = await prisma.user.findUnique({
            where: {
                username: req.query.username,
            },
        }).catch((err) => {
            res.status(500).send({ message: err});
        });
        if(data) {
            res.status(200).json(data.id);
        }
        if(!data) {
            res.status(200).json(null);
        }
    }
    if(!req.query.username && !req.query.email) {
        const data = await prisma.user.findMany().catch(() => {
            res.status(500).send({message: "Some error occurred while retrieving Users."})
        });
        const users = data.map(obj => ({
            id: obj.id,
            username: obj.username,
            email: obj.email,
            phone: obj.phone
        }));
        res.json(users);
    }
}

// Get user based on id
exports.getOne = async (req, res) => {
    const id = req.params.id;
    if(!id)
        res.status(400).send({ message: "Id is required!" });
    const data = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    }).catch((err) => {
        res.status(500).send({ message: err});
    });
    if(!data)
        res.status(404).send({ message: "User with id:" + id + " not found."});
    if(data) {
        const user = {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone
        }
        res.json(user);
    }
}


// Update user
exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if(data.password) {
        data.password = hashPassword(data.password);
    }
    if(!id)
        res.status(400).send({ message: "Id is required!" });
    const updateUser = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: data
    }).catch( err => {
        res.status(500).send({ message: err });
    })
    if(updateUser)
        res.json({
            id: updateUser.id,
            username: updateUser.username
        });
}

// Delete user
exports.delete = async (req, res) => {
    const id = req.params.id;
    if(!id)
        res.status(400).send({ message: "Id is required!" });
    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id),
        },
    }).catch(err => res.status(500).send({ message: err}));
    if(deleteUser && !res.headersSent) {
        res.json({
            id: deleteUser.id,
            username: deleteUser.username
        });
    }
}
