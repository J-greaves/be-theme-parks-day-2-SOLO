const format = require("pg-format");
const db = require("../db/connection");

const fetchRideById = (ride_id) => {
  console.log("in model func");
  console.log(ride_id, "<-- ride_id");
  return db
    .query(
      `
    SELECT rides.ride_id, 
    rides.ride_name, 
    rides.year_opened, 
    parks.park_name, 
    rides.votes 
    FROM rides
    JOIN parks ON rides.park_id = parks.park_id
    WHERE rides.ride_id = $1
    `,
      [ride_id]
    )
    .then((rideData) => {
      console.log(rideData.rows);
      return rideData.rows[0];
    });
};

module.exports = {
  fetchRideById,
  addRide,
};
