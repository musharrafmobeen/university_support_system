const mongoose = require('mongoose');

const grievanceSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    lodgedBy:{type: mongoose.Schema.Types.ObjectId},
    title:{type:String, required:true},
    description:{type:String},
    category:{type: mongoose.Schema.Types.ObjectId,ref:'category'},
    lodgingDate:{type:String, required:true},
    lastUpdated:{type:String, required:true},
    closingDate:{type:String, required:true},
    status:{type:String, required:true},
    history:[{}],
    ticket:{type:Number},
    inCharge:{type: mongoose.Schema.Types.ObjectId,ref:'Staff'},
    isClosed:{type:Boolean,required:true},
    isSpam:{type:Boolean,required:true},
    isDelayed:{type:Boolean,required:true},
    isPaused:{type:Boolean,required:true},
});

module.exports = mongoose.model('Grievance',grievanceSchema);