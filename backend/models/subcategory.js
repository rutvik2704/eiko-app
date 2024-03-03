const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    catname : {
        type : mongoose.ObjectId,
        ref:"category",
        required:true
    },
    name : {
        type : String
    }
},{timestamps:true})

module.exports=new mongoose.model("Subcategory",subcategorySchema)