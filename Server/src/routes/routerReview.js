const { Router } = require('express');
const routerReview = Router();
const { handlerPostReview, handlerGetReviews, handlerIdReview, handlerDeleteReview } = require('../handlers/handlerReview');

routerReview.post('/', handlerPostReview)
routerReview.get('/', handlerGetReviews)
routerReview.get('/:id', handlerIdReview)
routerReview.delete('/:id', handlerDeleteReview)

module.exports = routerReview;