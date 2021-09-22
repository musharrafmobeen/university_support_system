const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    staff:{type:mongoose.Schema.Types.ObjectId, ref:'Staff'},
    student:{type:mongoose.Schema.Types.ObjectId, ref:'Students'},
    isGranted:{type:Boolean},
    appointmentDescription:{type:String},
    appointment_ID:{type:Number}

});

module.exports = mongoose.model('appointments',appointmentSchema);