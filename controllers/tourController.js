const Tour = require('./../Models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};
exports.getTour = (req, res) => {
  console.log(req.requestTime);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // // if (id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

  res.status(200).json({
    stataus: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // // data: {
    // //   tour,
    // // },
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tours: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
