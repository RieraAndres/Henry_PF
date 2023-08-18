const getReviews = require("./getReviews");

const getById = async (id) => {
  const dataReview = await getReviews();
  const reviewId = dataReview.filter((review) => review.dataValues.user_id === id);
  return reviewId;
};

module.exports = getById;
