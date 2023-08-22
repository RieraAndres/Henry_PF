const getAllDonations = require('../controllers/donations/getAllDonations.js');

const handleGetAllDonations = async (req, res) => {
  try {
    const donations = await getAllDonations();
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetAllDonations;