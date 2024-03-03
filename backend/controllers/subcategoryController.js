const subCategory = require('../models/subcategory');

// Get all categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const Subcategories = await subCategory.find();
    res.render("Subcategories",{catdata:categories});
    res.json(Subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new category
exports.addSubCategories = async (req, res) => {
  try {
    const { name,catname} = req.body;
    if (!name) {
      return res.status(400).json({ message: 'SubCategory name is required.' });
    }

    const newSubCategory = new SubCategory({ name,catname});
    const savedSubCategory = await newSubCategory.save();
    res.json(savedSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
exports.updateSubCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
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
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};