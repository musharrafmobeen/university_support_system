const mongoose = require('mongoose');

const announcementVisibleTo = ['S','A'];
const announcementSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    announcement:{type:String},
    announcerType:{type:String},
    visibleTo:{type:String,enum:announcementVisibleTo},
    dateCreated:{type:String}

});

module.exports = mongoose.model('announcements',announcementSchema);