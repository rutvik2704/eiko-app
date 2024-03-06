const subCategory = require('../models/subcategory');
const Category = require('../models/category');

// Get all subcategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const Subcategories = await subCategory.aggregate([{ $lookup: { from: "categories", localField: "catid", foreignField: "_id", as: "Category" } }]);
    console.log(Subcategories)
    res.render("Subcategories", { catdata: categories, subdata: Subcategories });
    res.json(Subcategories,{catdata:categories});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Add a new subcategory
exports.addSubCategories = async (req, res) => {
  try {
    const { sname } = req.body;
    if (!sname) {
      return res.status(400).json({ message: 'SubCategory name is required.' });
    }
    const newSubCategory = new subCategory({ sname });
    const savedSubCategory = await newSubCategory.save();
    console.log(savedSubCategory);
    res.json(savedSubCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a subcategory
exports.updateSubCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { sname } = req.body;

    const updatedSubCategory = await subCategory.findByIdAndUpdate(
      id,
      { sname },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subcategory
exports.deleteSubCategories = async (req, res) => {
  try {
    await subCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};