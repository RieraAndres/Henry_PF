const { Router } = require('express');
const routerReview = Router();
const { handlerPostReview, handlerGetReviews, handlerDeleteReview } = require('../handlers/handlerReview');

routerReview.post('/', handlerPostReview)
routerReview.get('/', handlerGetReviews)
routerReview.delete('/:id', handlerDeleteReview)

module.exports = routerReview;