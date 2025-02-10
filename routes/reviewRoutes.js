const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authenticationController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllreviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
router.route('/:id').delete(reviewController.deleteReview);
module.exports = router;
