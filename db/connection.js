/**
 * Create your connection to the DB in this file
 * and remember to export it
 */
const pg = require("pg");

const { Pool } = pg;

const pool = new Pool();

module.exports = pool;
