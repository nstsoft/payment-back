import express from 'express';
import payoutRouter from './payout';

const router = express.Router();
router.use('/payment', payoutRouter);

export default router;
