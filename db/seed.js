const { Connection } = require("pg");
const db = require("./connection");
const parkData = require("./data/parks");
const format = require("pg-format");
const rideData = require("./data/rides");

function seed({ parks, rides, stalls }) {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      const formattedQuery = format(
        `INSERT INTO parks(
        park_name, year_opened, annual_attendance
        ) values %L RETURNING *`,
        parkData.map((park) => {
          return [park.park_name, park.year_opened, park.annual_attendance];
        })
      );
      return db.query(formattedQuery);
    })
    .then((data) => {
      const parks = data.rows;
      //console.log(parks, "<-- parks");
      const ridesToBeInserted = rideData.map((ride) => {
        const parkToFind = ride.park_name;
        //console.log(parkToFind, "<--parkToFind");
        const correctPark = parks.find((park) => {
          //console.log(park, "<--park in find");
          return park.park_name === parkToFind;
        });
        return [
          ride.ride_name,
          ride.year_opened,
          correctPark.park_id,
          ride.votes,
        ];
      });
      const formattedQuery = format(
        `
        INSERT INTO rides 
        (ride_name, year_opened, park_id, votes) 
        VALUES %L`,
        ridesToBeInserted
      );
      return db.query(formattedQuery);
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(`CREATE TABLE IF NOT EXISTS parks (
    park_id SERIAL PRIMARY KEY,
    park_name VARCHAR(50) NOT NULL,
    year_opened INT NOT NULL,
    annual_attendance INT NOT NULL)`);
}

function createRides() {
  /* Create your rides table in the query below */
  return db.query(`CREATE TABLE IF NOT EXISTS rides (
    ride_id SERIAL PRIMARY KEY,
    park_id INT REFERENCES parks(park_id),
    ride_name VARCHAR(50) NOT NULL,
    year_opened INT NOT NULL,
    votes INT NOT NULL)`);
}

module.exports = seed;
