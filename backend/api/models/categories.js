const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    incharge: {type:mongoose.Schema.Types.ObjectId, ref:'Staff'}
});

module.exports = mongoose.model('category',categorySchema);