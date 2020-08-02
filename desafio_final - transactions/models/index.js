const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;

module.exports = db