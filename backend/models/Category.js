const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    catName: String
})
module.exports = mongoose.model('Category',categorySchema );