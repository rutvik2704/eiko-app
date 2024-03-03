const router = require('express').Router();
const multer = require('multer');
const regc = require('../controllers/regController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const subcategoryController = require('../controllers/subcategoryController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 5 MB limit per file
  },
});

router.post('/reg', regc.register);
router.post('/logincheck', regc.logincheck);
router.get('/products', productController.getAllProducts);
router.post('/products', upload.single('image'), productController.addProduct);
router.put('/products/:id',upload.single('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.addCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/subcategories',subcategoryController.getAllSubCategories);
router.post('/subcategories',subcategoryController.addSubCategories);
router.put('/subcategories/:id',subcategoryController.updateSubCategories);
router.delete('/subcategories/:id',subcategoryController.deleteSubategories);

module.exports = router;