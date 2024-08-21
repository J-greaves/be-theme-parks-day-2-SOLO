const { fetchParks } = require("../models/parks.model");

const getParkData = (request, response) => {
  fetchParks().then((parkData) => {
    response.status(200).send({ parkData });
  });
};
module.exports = { getParkData };
