const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

function hashPassword(password) {
    const SALT_WORK_FACTOR = 10;
    const bcrypt = require("bcrypt");
    return bcrypt.hashSync(password, 8);
}

// Create new user
exports.create = async (req, res) => {

    const data = req.body;
    console.log(data);

    if(!req.body.username)
        return res.status(400).send({ message: "Username is required!" });
    if(!req.body.email)
        return res.status(400).send({ message: "Email is required!" });
    if(!req.body.password)
        return res.status(400).send({ message: "Password is required!" });
    if(!req.body.phone)
        return res.status(400).send({ message: "Phone is required!" });
    if(!req.body.address)
        return res.status(400).send({ message: "Address is required!" });
    if(!req.body.preferences)
        return res.status(400).send({ message: "Preferences are required!" });
    if(!req.body.card)
        return res.status(400).send({ message: "Card is required!" });

    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: hashPassword(req.body.password),
            phone: req.body.phone,
            address: req.body.address,
            preferences: req.body.preferences,
            card: req.body.card
        }
    });

    res.json(user.username);
}

// Get all users
exports.getAll = async (req, res) => {
    const data = await prisma.user.findMany().catch(err => {
        res.status(500).send({ message: "Some error occurred while retrieving Users." })
    });
    const users = data.map(obj => ({
        id: obj.id,
        username: obj.username,
        email: obj.email,
        phone: obj.phone
    }));
    res.json(users);
}

exports.getOne = async (req, res) => {
    if(!req.params.id)
        res.status(400).send({ message: "Id is required!" });
    const data = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        phone: data.phone
    }
    console.log("here");
    res.json(user);
}






