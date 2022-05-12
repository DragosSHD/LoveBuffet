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
    return bcrypt.hashSync(password, 8);
}

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
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
    if(user)
        res.json(user.username);
}

// Get all users
exports.getAll = async (req, res) => {
    const data = await prisma.user.findMany().catch(err => {
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

//TODO:Check if user with Username or Email exists

// Get user based on username
exports.getByQuery = async (req, res) => {
    const email = req.query.email;
    if(!email)
        res.status(400).send({ message: "Email is required!" });
    const data = await prisma.user.findUnique({
        where: {
            email: parseInt(email),
        },
    }).catch((err) => {
        res.status(500).send({ message: err});
    });
    if(!data)
        res.status(404).send({ message: "User with email:" + email + " not found."});
    if(data) {
        const user = {
            id: data.id
        }
        res.json(user);
    }
}


// Update user
exports.update = async (req, res) => {
    const id = req.params.id;
    const data = data;
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
    if(deleteUser) {
        res.json({
            id: deleteUser.id,
            username: deleteUser.username
        });
    }
}


// Create new user
exports.authenticate = async (req, res) => {

    console.log(require('crypto').randomBytes(64).toString('hex'))
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
    }).catch((err) => {
        response.status(500).send({ message: err});
    });

    
    if(!user){
        console.log("Not found");
        response.status(404).send({message:"User not registered!"})
    }else
       bcrypt.compare(req.body.password, user.password, function(err, res) {
        if (err){
            response.status(500).send({ message: err});
        }
        if (res){
            //send JWT
            const token = generateAccessToken({ username: req.body.username });
            response.json(token);
        } else {
          // response is OutgoingMessage object that server response http request
        response.json({success: false, message: 'passwords do not match'});
        }
    });
}

//Verify if the JWT is still valid

exports.validJWT = async (req, response) => {

}