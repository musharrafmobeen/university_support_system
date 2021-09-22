const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    sender:{type:String},
    reciever:{type:String},
    message:[{}],
});

module.exports = mongoose.model('messages',messageSchema);