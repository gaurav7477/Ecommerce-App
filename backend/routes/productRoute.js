import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview } from '../controllers/productController.js';
import { isAuthenicatedUser, authorizeRoles } from '../middlewares/auth.js';


const router = express.Router();

router.route("/products").get(isAuthenicatedUser, getAllProducts);
router.route("/admin/product/new").post(isAuthenicatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id").put(isAuthenicatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenicatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isAuthenicatedUser, createProductReview);

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenicatedUser, deleteReview);
export default router;