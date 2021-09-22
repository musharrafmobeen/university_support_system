const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employee:{type:mongoose.Schema.Types.ObjectId, ref:'Employee'},
    timetable: [{}]
});

module.exports = mongoose.model('timetable',timetableSchema);