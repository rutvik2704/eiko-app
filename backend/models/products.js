const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  rating: Number,
  price: Number,
  offPrice: Number,
  image: String,
  published: Boolean,
  category: {
    type : mongoose.Schema.Types.ObjectId,
    ref:"category",
    required: true
  },
  subcategory: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
