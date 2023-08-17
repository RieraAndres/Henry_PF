const getReviews = require('./getReviews')

const getByUsername = async(userName) => {
    try {
        const allReviews = await getReviews();
        const reviewByUser = allReviews.filter((review) =>
            review.reviewer.userName.toLowerCase().includes(userName.toLowerCase())
        );

        if (reviewByUser.length === 0) {
            throw new Error('No hay reseñas relacionadas a ese nombre de usuario');
        }

        return reviewByUser;
    } catch (error) {
        error.message = 'No se pudo encontrar la reseña';
        throw error;
    }
}

module.exports = getByUsername