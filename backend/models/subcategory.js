const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    catid : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    sname : {
        type : String,
        required:true,
        unique:true
    }
});

module.exports=new mongoose.model("Subcategory",subcategorySchema)