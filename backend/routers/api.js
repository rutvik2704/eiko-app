const router = require('express').Router();
const multer = require('multer');
const regc = require('../controllers/regController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');



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
router.post('/category', categoryController.getAllCategory);
router.post('/category', categoryController.addCategory);
router.put('/category/:id', categoryController.updateCategory);
router.post('/category/:id', categoryController.deleteProduct);




module.exports = router;
