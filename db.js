const mongoose = require('mongoose');
const uri = 'mongodb://mohamed:moha990990990@localhost/innova';
module.exports.initDb =function()  {
    return mongoose.createConnection(uri);
}
