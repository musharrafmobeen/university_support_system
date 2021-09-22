const mongoose = require('mongoose');

const staffRatingSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    rating:[{type:Number, required:true}],
    averageRating:{type:Number, required:true},
    ratingCount:{type:Number, required:true},
    staff: {type:mongoose.Schema.Types.ObjectId, ref:'Staff'},
    student: [{type:mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('staffRating',staffRatingSchema);