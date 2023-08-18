const mercadopago = require('mercadopago');

const webHookPayment = async (req, res) => {
const payment = req.query;
	try{
		if(payment.type === 'payment'){
			const data = await mercadopago.payment.findById(payment['data.id']);
			console.log(data);
		}
		res.status(204).send();
	} catch(error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}

	res.send('webHook')
}

module.exports = webHookPayment;