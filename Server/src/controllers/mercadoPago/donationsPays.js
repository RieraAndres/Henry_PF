const mercadopago = require('mercadopago')
const { Donacion, User } = require('../../db.js');
const { MERCADOPAGO_API_KEY } = process.env

mercadopago.configure({
	access_token: MERCADOPAGO_API_KEY
});

const donationsPays = async (req, res) => {
	try{
		const { nameDonante, numberPhone, amount, receiver, description, mp_preference_id, mp_payment_id, mp_status  } = req.body;
		
		const preference = await mercadopago.preferences.create({
			items: [
				{
					title: "Donación",
					unit_price: parseFloat(amount),
					currency_id: "ARS",
					quantity: 1,
				},
			],
			back_urls: {
				success: "https://henry-pf-git-main-rieraandres.vercel.app/donations",
				failure: "https://henry-pf-git-main-rieraandres.vercel.app/failure",
				webhook: "https://henry-pf-git-main-rieraandres.vercel.app/webhook",
			},
			auto_return: "approved",
		});

		const preferenceId = preference.body.id;

		let userDonante = await User.findOne({
      where: {
        numberPhone,
      },
    });

		const donate = await Donacion.create({
			nameDonante,
			numberPhone,
			amount: parseFloat(amount),
			receiver,
			description,
			mp_preference_id: preferenceId,
			mp_payment_id,
			mp_status,
			donante_id: userDonante.id,
		})

		res.status(201).json({ 
			preferenceId,	
			donate,
			message: 'Donación realizada con éxito'
		});
	} catch(error) {
		console.error(error);
		res.status(500).json({ error: 'Error al crear la preferencia de pago' });
	}
}

module.exports = donationsPays;