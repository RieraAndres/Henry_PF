const {Review, User} = require('./../../db')
const { Op } = require('sequelize');

const getReviews = async() => {
    try {
        const allReviews = await Review.findAll({
            include: {
                model: User,
                as: 'reviewer',
                attributes: ['userName'],
                required: false
            },
            where: {
                user_id: {
                    [Op.not]: null
                }
            } 
        })
        return allReviews
    } catch (error) {
        error.message = ('Error al acceder a todas las reseñas')
    }
}

module.exports = getReviews