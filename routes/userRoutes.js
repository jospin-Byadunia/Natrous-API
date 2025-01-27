const express = require('express');

const userControllers = require('./../controllers/userController');
const authController = require('./../controllers/authenticationController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
