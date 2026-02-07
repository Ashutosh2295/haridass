const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand'],
        default: 'Radhe Radhe'
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    countInStock: {
        type: Number,
        required: [true, 'Please add count in stock'],
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
