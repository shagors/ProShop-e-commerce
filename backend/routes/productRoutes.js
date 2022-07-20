import express from "express";
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';

// @desc 

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

export default router;