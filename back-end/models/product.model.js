module.exports = mongoose => { 
    const Product = mongoose.model(
    "productdb",
    mongoose.Schema(
    {
    id: String,
    description: String,
    value: Number    
    },
    { value:  2 }
    )
    );
    return Product;
};