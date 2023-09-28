import express from 'express';
import { isAuthenicatedUser, authorizeRoles } from '../middlewares/auth.js';

import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.route('/order/new').post(isAuthenicatedUser, newOrder);
router.route('/order/:id').get(isAuthenicatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenicatedUser, myOrders);

router.route('/admin/orders').get(isAuthenicatedUser, authorizeRoles('admin'), getAllOrders);

router.route('/admin/order/:id').put(isAuthenicatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenicatedUser, authorizeRoles('admin'), deleteOrder);

export default router;

