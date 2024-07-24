const express = require('express');
const payoutRouter = require('./payout');
const webHooksRouter = require('./webhooks');

const router = express.Router();
router.use('/payment', payoutRouter);
router.use('/webhooks', webHooksRouter);

module.exports = router;
