const { fetchRideById } = require("../models/rides.model");

const getRideById = (request, response) => {
  console.log("in controller");
  const { ride_id } = request.params;
  fetchRideById(ride_id).then((rideData) => {
    response.status(200).send({ rideData });
  });
};
module.exports = { getRideById };
