import express from 'express';
import payoutRouter from './payout';
import webHooksRouter from './webhooks';

const router = express.Router();
router.use('/payment', payoutRouter);
router.use('/webhooks', webHooksRouter);

export default router;
