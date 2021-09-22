const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    reg: {type:String, required:true},
    name:{type:String, required:true},
    department:{type:String, required:true},
    course:{type:String, required:true},
    email: {type:String, 
            required:true , 
            unique: true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    password: {type:String, required:true},
    studentImage:{type:String},
    isApproved:{type:Boolean,required:true},
    isRejected:{type:Boolean,required:true},
    creationTime:{type:String, required:true},
    lastUpdated:{type:String, required:true}
});

module.exports = mongoose.model('Students',studentSchema);