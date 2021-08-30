import { Router } from 'express';

import {
  getStripe,
  postStripe,
} from "../controllers/stripeController.js"

const router = Router();

router.get('/', getStripe)
router.post('/create-checkout-session/:id/:qty', postStripe)

export default router;