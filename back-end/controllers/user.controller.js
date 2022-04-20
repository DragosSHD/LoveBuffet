const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

exports.create = async (req, res) => {

    const user = await prisma.user.create({
        data: {
            username: "johnDoe",
            email: "john@doe.com",
            password: "strongPass",
            phone: "0761146456",
            address: 1,
            preferences: 1,
            card: 1
        }
    });

    res.json(user);
}








