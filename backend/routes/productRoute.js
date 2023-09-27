import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } from '../controllers/productController.js';
import { isAuthenicatedUser, authorizeRoles } from '../middlewares/auth.js';


const router = express.Router();

router.route("/products").get(isAuthenicatedUser, getAllProducts);
router.route("/product/new").post(isAuthenicatedUser, authorizeRoles("admin"), createProduct);

router.route("/product/:id").put(isAuthenicatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenicatedUser, authorizeRoles("admin"), deleteProduct).get(getSingleProduct);

export default router;