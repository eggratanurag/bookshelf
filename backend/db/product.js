const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    category: {type: String, required: true},
    userId: {type: String, required: true},
    brand: {type: String, required: true},
    src: {type: String, required: true},
    gobar: String

},
{timestamps: true}
)
const Product = mongoose.model('Products' , productSchema);
module.exports = Product;