const mongoose = require('mongoose');
const db = require('./index.js');

let schema = db.mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const TransactionModel = db.mongoose.model('transaction', schema);

module.exports = TransactionModel;
