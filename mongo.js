const mongooes =  require("mongoose");
require('dotenv').config();

mongooes.Promise = global.Promise;


mongooes.connect(process.env.MONGOURI)

