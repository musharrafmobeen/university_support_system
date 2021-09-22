const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    path:{type:String, required:true},
    student: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Students'}
});

module.exports = mongoose.model('documents',documentSchema);