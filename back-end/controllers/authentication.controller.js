const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//For the JWT creation
const dotenv = require('dotenv');
dotenv.config();
const tokenSecret=process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign(username, tokenSecret);
}

const prisma = new PrismaClient;

// Create new user
exports.authenticate = async (req, res) => {
    // console.log(require('crypto').randomBytes(64).toString('hex'));
    const email = req.body.email;
    const password = req.body.password;
    if(!email) {
        res.status(400).send({ message: "Email is required!"});
    }
    if(!password) {
        res.status(400).send({ message: "Password is required!"});
    }
    if(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
        }).catch((err) => {
            res.status(500).send({ message: err});
        });
        if(!user) {
            console.log("Not found");
            res.status(404).send({message: "User not registered!"})
        }
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err){
                    res.status(500).send({ message: err});
                }
                if (response){
                    //send JWT
                    const token = generateAccessToken({ username: req.body.username });
                    res.json(token);
                } else {
                    // response is OutgoingMessage object that server response http request
                    res.status(401).json({success: false, message: 'passwords do not match'});
                }
            });
        }
    }
}

//Verify if the JWT is still valid
exports.validJWT = async (req, res) => {
    const token = req.body.token;
    if(!token) {
        res.status(400).send({ message: "Token not provided!"});
    }
    if(token) {
        let decoded = "";
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            res.status(401).send({ message: "Invalid token!" });
        }
        if(decoded) {
            res.status(200).send({ message: "Valid token" });
        }
    }
}




















