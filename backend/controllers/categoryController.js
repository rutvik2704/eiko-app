const Category = require("../models/Category");

exports.getAllCategory = async (req, res) => {
    try {
        const Category = await Category.find();
        res.json(Category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addCategory = async(req,res)=>{
    try {
        const cat = new Category(req.body)
       const savedCategory = await cat.save();
        res.json(savedCategory);

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // Destructure subcategory from request body

        const updatedCatrgory = await Product.findByIdAndUpdate(
            id,
            { name }, // Add subcategory to the update object
            { new: true }
        );

        if (!updatedCatrgory) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedCatrgory);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
