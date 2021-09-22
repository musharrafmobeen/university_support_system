const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employee_ID:{type:Number,required:true},
    name:{type:String, required:true},
    department:{type:String, required:true},
    designation:{type:String, required:true},
    email: {type:String, 
            required:true , 
            unique: true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    password: {type:String, required:true},
    employeeImage:{type:String},
    isApproved:{type:Boolean,required:true},
    isRejected:{type:Boolean,required:true},
    creationTime:{type:String, required:true},
    lastUpdated:{type:String, required:true}
});

module.exports = mongoose.model('Employee',employeeSchema);