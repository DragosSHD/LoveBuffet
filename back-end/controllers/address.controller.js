const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

// Create new address
exports.create = async(req,res)=>{

    const data = req.body;

    if(!data.country)
        return res.status(400).send({ message: "Country is required!" })

    if(!data.city)
        return res.status(400).send({ message: "City is required!" })

    if(!data.street)
        return res.status(400).send({ message: "Street is required!" })

    if(!data.number)
        return res.status(400).send({ message: "Number is required!" })

    if(!data.user)
        return res.status(400).send({ message: "User is required!" })
    
    const address = await prisma.address.create({
        data: {
            country: data.country,
            city: data.city,
            street: data.street,
            number: data.number,
            user: data.user
        }
    }).catch(err => {
        console.log("ERROR: " + err.meta);
        res.status(500).send({ message: "Could not add address!" })
    });
    if(address)
        res.json(address.user);
}

// Get all addresses
exports.getAll = async (req,res) => {
    const data = await prisma.address.findMany().catch(err =>{
        res.status(500).send({ message: "Some error occurred while retrieving Addresses." })
    });

    const addresses = data.map(obj=>({
        id: data.id,
        country: data.country,
        city: data.city,
        street: data.street,
        number: data.number
    }));
    res.json(addresses);
}

//Get address based on id
exports.getOne = async(req,res) => {
    const id = req.params.id;

    if(!id) 
        res.status(400).send({ message: "Id is required" });
    const data = await prisma.address.findUnique({
        where: {
            id: parseInt(id),
        },
    }).catch((err) => {
        res.status(500).send({ message: err });
    });
    if(!data)
        res.status(404).send({ message: "Address with id: " + id + "not found." });
    if(data) {
        const address = {
            id: data.id,
            country: data.country,
            city: data.city,
            street: data.street,
            number: data.number
        }
        res.json(address);
    }
}

//Update Address
exports.update = async(res,req) => {
    const id =req.params.id;
    const data = data;
    if(!id)
        res.status(400).send({ message: "Id is required!" });
    const updateAddress = await prisma.address.update({ 
        where: {
            id: parseInt(id),
        },
        data: data
    }).catch( err => {
        res.status(500).send({ message: err });
    })
    if(updateAddress)
    res.json({
        id: updateAddress.id,
        country: updateAddress.country,
        city: updateAddress.city,
        street: updateAddress.street,
        number: updateAddress.number
    });
}

//Delete Address
exports.delete = async(req,res) => {
    const id = req.params.id;
    if(!id)
        res.status(400).send({ message: "Address is required!" });
    const deleteAddress = await prisma.address.delete({
        where: { id: parseInt(id), },
    }).catch(err => res.status(500).send({ message: err}));
    if(deleteAddress) {
        res.json({
            id: deleteAddress.id,
            country: deleteAddress.country,
            city: deleteAddress.city,
            street: deleteAddress.street,
            number: deleteAddress.number
        });
    }
}



