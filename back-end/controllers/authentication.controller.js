const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//For the JWT creation
const dotenv = require('dotenv');
dotenv.config();
const tokenSecret=process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign(username, tokenSecret, { expiresIn: '1800s' });
}

const prisma = new PrismaClient;

// Create new user
exports.authenticate = async (req, res) => {

    console.log(require('crypto').randomBytes(64).toString('hex'))
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
    }).catch((err) => {
        res.status(500).send({ message: err});
    });


    if(!user){
        console.log("Not found");
        res.status(404).send({message:"User not registered!"})
    }else
        bcrypt.compare(req.body.password, user.password, function(err, res) {
            if (err){
                res.status(500).send({ message: err});
            }
            if (res){
                //send JWT
                const token = generateAccessToken({ username: req.body.username });
                res.json(token);
            } else {
                // response is OutgoingMessage object that server response http request
                res.json({success: false, message: 'passwords do not match'});
            }
        });
}

//Verify if the JWT is still valid
exports.validJWT = async (req, res) => {

}




















