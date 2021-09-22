const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    admin_ID:{type: Number, required:true},
    name:{type:String, required:true},
    email: {type:String, 
            required:true , 
            unique: true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    password: {type:String, required:true},
    adminImage: {type:String},
    creationTime:{type:String, required:true},
    lastUpdated:{type:String, required:true}
});

module.exports = mongoose.model('Admin',adminSchema);