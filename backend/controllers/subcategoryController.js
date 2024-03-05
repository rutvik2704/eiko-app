const subCategory = require('../models/subcategory');
const Category = require('../models/category');

// Get all categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const Subcategories = await subCategory.find();
    console.log(Subcategories)
    res.render("Subcategories",{catdata:categories});
    res.json(Subcategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Add a new category
exports.addSubCategories = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'SubCategory name is required.' });
    }

    const newSubCategory = new subCategory({ name });
    const savedSubCategory = await newSubCategory.save();
    console.log(savedSubCategory);
    res.json(savedSubCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a category
exports.updateSubCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedSubCategory = await subCategory.findByIdAndUpdate(
      id,
      { name },
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

// Delete a category
exports.deleteSubategories = async (req, res) => {
  try {
    await subCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};