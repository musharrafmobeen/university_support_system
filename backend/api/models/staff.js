const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employee: {type: mongoose.Schema.Types.ObjectId,ref:'Employee'},
    inChargeOf: {type:String},
    isAvailable:{type:Boolean,required:true}
});

module.exports = mongoose.model('Staff',staffSchema);