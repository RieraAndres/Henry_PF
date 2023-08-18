const { Donacion } = require('../../db.js');

const successPayment = async (req, res) => {
  try{
    const { donacionId, mp_preference_id, mp_payment_id, mp_status } = req.body;

    const donacion = await Donacion.findByPk(donacionId);

    if(donacion){
      donacion.mp_payment_id = mp_payment_id;
      donacion.mp_status = mp_status;
      await donacion.save();
    }

    res.status(200).json({ message: 'Datos de pago actualizados con éxito'});
    /*res.send('Pago Exitoso')*/
  } catch(error){
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar datos de pago' })
  }  
};

module.exports = successPayment;
