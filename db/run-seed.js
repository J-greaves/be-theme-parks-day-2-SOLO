const seed = require("./seed");
const db = require("./connection");
const data = require("./data/index.js");

seed(data).then(() => {
  //console.log(data, "<--- run seed data");
  return db.end();
});
