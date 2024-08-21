const express = require("express");
const app = express();
const { getParkData } = require("./controllers/parks.controller");
const { getRideById } = require("./controllers/rides.controller");

app.get("/api/healthcheck", (request, response) => {
  response.status(200).send("OK");
});

app.get("/api/parks", getParkData);

app.get("/api/ride/:ride_id", getRideById);

module.exports = app;
