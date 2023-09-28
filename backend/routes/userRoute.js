import express from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } from '../controllers/userController.js';
const router = express.Router();
import { authorizeRoles, isAuthenicatedUser } from '../middlewares/auth.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenicatedUser, getUserProfile);
router.route("/password/update").put(isAuthenicatedUser, updatePassword);
router.route("/me/update").put(isAuthenicatedUser, updateProfile);
router.route("/admin/users").get(isAuthenicatedUser, authorizeRoles("admin"), getAllUsers);

router
    .route("/admin/user/:id")
    .get(isAuthenicatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenicatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenicatedUser, authorizeRoles("admin"), deleteUser);



export default router;