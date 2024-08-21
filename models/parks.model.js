const db = require("../db/connection");

const fetchParks = () => {
  return db.query(`SELECT * FROM parks`).then((parkData) => {
    return parkData.rows;
  });
};

module.exports = {
  fetchParks,
};
