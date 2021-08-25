import { Router } from 'express';

import {
  getStripe,
  postStripe,
} from "../controllers/stripeController.js"

const router = Router();

router.get('/', getStripe)
router.post('/create-checkout-session/:id', postStripe)
// router.post('/create-checkout-session/', postStripe)

export default router;