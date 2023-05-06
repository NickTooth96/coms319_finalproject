const mongoose = require('mongoose')
const ReactFormDataSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    age: { type: Number },
    description: { type: String },
    breed: { type: String },
    image: { type: String },
},
    { collection: "doggos" }
)
const Product = mongoose.model('Product', ReactFormDataSchema)
module.exports = Product
