const mongoose = require('mongoose');

const documentRequestSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    staff:{type:String},
    student:{},
    isGranted:{type:Boolean},
    documentType:{type:String},
    documentUrl:{type:String},
    dateGranted:{type:String}
});

module.exports = mongoose.model('documentrequests',documentRequestSchema);