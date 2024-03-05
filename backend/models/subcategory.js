const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    catname : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    name : {
        type : String,
        required:true,
        unique:true
    }
    
});

module.exports=new mongoose.model("Subcategory",subcategorySchema)