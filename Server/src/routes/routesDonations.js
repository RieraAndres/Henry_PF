const donationsPays = require('../controllers/mercadoPago/donationsPays.js');
const webhookPayment = require('../controllers/mercadoPago/webHookPayment.js');
const successPayment = require('../controllers/mercadoPago/successPayment.js');
const failurePayment = require('../controllers/mercadoPago/failurePayment.js');
const handleGetAllDonations = require('../handlers/handlerDonations.js');

const express = require('express');

const router = express.Router();
//Routes MERCADO PAGO(y POST donaciones)
router.post('/payment', donationsPays);
router.post('/success', successPayment);
router.get('/failure', failurePayment);
router.post('/webhook', webhookPayment);
router.post('/saveDonation')

//DONACIONES 
router.get('/all', handleGetAllDonations);

module.exports = router;