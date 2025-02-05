const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//set security HTTP headers
app.use(helmet());

//development loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests form this IP, Plase try again in an hour',
});

app.use('/api', limiter);

//Body parser, readin data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NOSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingQuantity',
      'ratingAverage',
      'maxGroupSize',
      'price',
      'difficulty',
    ],
  })
);
//serving statit file
app.use(express.static(`${__dirname}/public`));
//test middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

//4. sTART SERVICE

module.exports = app;
