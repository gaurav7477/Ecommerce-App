import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } from '../controllers/productController.js';
import { isAuthenicatedUser } from '../middlewares/auth.js';


const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenicatedUser, createProduct);

router.route("/product/:id").put(isAuthenicatedUser, updateProduct).delete(isAuthenicatedUser, deleteProduct).get(getSingleProduct);

export default router;