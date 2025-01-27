const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldDB = (err) => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const value = err.keyValue.name;
  const message = `Duplicate field name value: ${value} please use another value!`;
  return new AppError(message, 400);
};

const handleValidationerroDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `invalid input Data. ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid Token, Please log in again!', 401);
};

const handleJWTExpired = () =>
  new AppError('Your token has expired! please log in again!', 401);
const senErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const senErrorProd = (err, res) => {
  console.log(err.isOperational);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    senErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldDB(error);
    }
    if (err.name === 'ValidationError') {
      error = handleValidationerroDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      error = handleJWTExpired();
    }

    senErrorProd(error, res);
  }
};
