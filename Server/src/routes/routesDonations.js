const donationsPays = require('../controllers/mercadoPago/donationsPays.js');
const webhookPayment = require('../controllers/mercadoPago/webHookPayment.js');
const successPayment = require('../controllers/mercadoPago/successPayment.js');
const failurePayment = require('../controllers/mercadoPago/failurePayment.js');
const express = require('express');

const router = express.Router();

router.post('/payment', donationsPays);
router.post('/success', successPayment);
router.get('/failure', failurePayment);
router.post('/webhook', webhookPayment);

router.post('/saveDonation')  

module.exports = router;