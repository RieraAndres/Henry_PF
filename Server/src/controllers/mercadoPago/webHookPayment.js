const mercadopago = require('mercadopago');
const { Donacion } = require('../../db.js');

const webHookPayment = async (req, res) => {
const { payment, donacionId } = req.query;
	try{
		if(payment.type === 'payment'){
			const data = await mercadopago.payment.findById(payment['data.id']);
			console.log(data);
			const donacion = await Donacion.findByPk(donacionId);

    		if(donacion){
      		donacion.mp_payment_id = mp_payment_id;
      		donacion.mp_status = mp_status;
      		await donacion.save();
    		}

		}
		res.status(204).send();
	} catch(error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}

	res.send('webHook')
}

module.exports = webHookPayment;