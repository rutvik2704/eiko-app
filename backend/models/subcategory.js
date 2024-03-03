const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    catname : {
        type : mongoose.Schema.Types.ObjectId
    },
    name : {
        type : String
    }
})

module.exports=new mongoose.model("Subcategory",subcategorySchema)