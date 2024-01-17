const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(`${process.env.MONGO_URI}/online_library`);

module.exports = connection