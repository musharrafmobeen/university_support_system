const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const adminModel = require("../models/admin");
const studentsModel = require("../models/students");
const staffModel = require("../models/staff");
const employeeModel = require("../models/employees");
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check_auth');
const getUserWithToken = require('../middleware/getUserWithToken');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
  Users.find({ email: req.body.email })
  .exec()
  .then(user=>{
      if(user.length >= 1){
        return res.status(409).json({
            message:"Email Already Exists"
        });
      }else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new Users({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
        
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "User Created",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ error: err });
                });
      }
  })
 
    }
  });
});

const employeeLogin = async (req,res,next)=>{
  const user = await employeeModel.find({email:req.body.email}).exec();
  try{
    if(user.length < 1){
      return res.status(401).json({
        error:{
          status:"Auth Failed",
          statusCode:401,
        }, 
        message:"Wrong email or password."
      });
    }
    else{
    const employeeData = {_id:user[0]._id, name:user[0].name,email:user[0].email,isRejected:user[0].isRejected,isApproved:user[0].isApproved,employeeImage:user[0].employeeImage,designation:user[0].designation,department:user[0].department,__v:user[0].__v};
    bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
      if(err){
        return res.status(401).json({
          error:{
            status:"Auth Failed",
            statusCode:401,
            errorMessage:err
          }, 
          message:"Wrong email or password."
        });
      }
      if(result){
        const token = jwt.sign({
          email : user[0].email,
          _id : user[0]._id
        },
        process.env.JWT_EMPLOYEE_KEY,
        {
          expiresIn:"1h"
        })
        return res.status(200).json({
          message:'Auth Successful',
          token:token,
          userType:"employee",
          employee: employeeData
        });
      }
      res.status(401).json({
        error:{
          status:"Auth Failed",
          statusCode:401,
        }, 
        message:"No User Found with given Email and Password."
      });
    })
  }
  }
  catch(err)
  {
    res.status(500).json({
      error:{
        status:"Failed",
        statusCode:500,
        errorMessage:err
      }, 
      message:"Something Went wrong while executing the employeeLogin function."
  });
  }
}

const staffLogin = async (req,res,next)=>{
  const users = await staffModel.find().populate('employee').exec();
 
  if(users.length > 0){
  let user = 0;
  for (let i=0; i < users.length ; i++){
    if(users[i].employee.email.localeCompare(req.body.email) == 0){
      user = {_id:users[i]._id, employee:{_id:users[i].employee._id ,name:users[i].employee.name,email:users[i].employee.email,staffImage:users[i].employee.employeeImage,designation:users[i].employee.designation,department:users[i].employee.department,password:users[i].employee.password,__v:users[i].employee.__v},inChargeOf:users[i].inChargeOf,isAvailable:users[i].isAvailable};
      user = JSON.stringify(user);
      user = JSON.parse(user);
      break;
    }
  }
  // const user = await staffModel.find({email:req.body.email}).exec();
  try{
    if(user == 0){
      next();
    }
    else if(user.length >= 1){
      next();
      // return res.status(401).json({
      //   message:'Auth Failed'
      // });
    }
    else{
    bcrypt.compare(req.body.password, user.employee.password, (err,result)=>{
      if(err){
        return res.status(401).json({
          error:{
            status:"Auth Failed",
            statusCode:401,
            errorMessage:err
          }, 
          message:"No User Found with given Email and Password."
        });
      }
      if(result){
        // user = {_id:user._id, employee_ID:{_id:user.employee_ID._id ,name:user.employee_ID.name,email:user.employee_ID.email,staffImage:user.employee_ID.employeeImage,designation:user.employee_ID.designation,department:user.employee_ID.department,__v:user.employee_ID.__v},inChargeOf:user.inChargeOf,isAvailable:user.isAvailable};
        const token = jwt.sign({
          email : user.employee.email,
          _id : user._id
        },
        process.env.JWT_STAFF_KEY,
        {
          expiresIn:"1h"
        })
        return res.status(200).json({
          message:'Auth Successful',
          token:token,
          userType:"Staff",
          staff:user
        });
      }
      res.status(401).json({
        error:{
          status:"Auth Failed",
          statusCode:401,
        }, 
        message:"No User Found with given Email and Password."
      });
    })
  }
}
  catch(err)
  {
    res.status(500).json({
      error:{
    status:"Failed",
    statusCode:500,
    errorMessage:err
  }, 
  message:"Something Went wrong while executing the staffLogin function."
  });
  }
}
else{
  next();
}
}



  const studentLogin = async (req,res,next)=>{
    const user = await studentsModel.find({email:req.body.email}).exec();
    try{
      if(user.length < 1){
        next();
        // return res.status(401).json({
        //   message:'Auth Failed'
        // });
      }
      else{
      bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
        if(err){
          return res.status(401).json({
            error:{
              status:"Auth Failed",
              statusCode:401,
              errorMessage:err
            }, 
            message:"No User Found with given Email and Password."
          });
        }
        if(result){
          const studentData = {_id:user[0]._id, reg:user[0].reg,isRejected:user[0].isRejected,isApproved:user[0].isApproved, name:user[0].name,email:user[0].email,studentImage:user[0].studentImage,course:user[0].course,department:user[0].department,__v:user[0].__v};
          const token = jwt.sign({
            email : user[0].email,
            _id : user[0]._id
          },
          process.env.JWT_STUDENT_KEY,
          {
            expiresIn:"1h"
          })
          return res.status(200).json({
            message:'Auth Successful',
            token:token,
            userType:"Student",
            student: studentData
          });
        }
        res.status(401).json({
          error:{
            status:"Auth Failed",
            statusCode:401,
          }, 
          message:"No User Found with given Email and Password."
        });
      })
    }
  }
    catch(err)
    {
      res.status(500).json({
        error:{
          status:"Failed",
          statusCode:500,
          errorMessage:err
        }, 
        message:"Something Went wrong while executing the studentLogin function."
    });
    }
  }

  

  const adminLogin = async (req,res,next)=>{
    const user = await adminModel.find({email:req.body.email}).exec();
    console.log(req.body.email);
    console.log(req.body.password);
  
    try{
      if(user.length < 1){
        next();
        // return res.status(401).json({
        //   message:'Auth Failed'
        // });
      }
      else{
      bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
        if(err){
          return res.status(401).json({
            error:{
              status:"Auth Failed",
              statusCode:401,
              errorMessage:err
            }, 
            message:"No User Found with given Email and Password."
          });
        }
        if(result){
          const adminData = {_id:user[0]._id, admin_ID:user[0].admin_ID, name:user[0].name,email:user[0].email,adminImage:user[0].adminImage,__v:user[0].__v};
          const token = jwt.sign({
            email : user[0].email,
            _id : user[0]._id
          },
          process.env.JWT_ADMIN_KEY,
          {
            expiresIn:"1h"
          })
          return res.status(200).json({
            message:'Auth Successful',
            token:token,
            userType:"Admin",
            admin: adminData
          });
        }
        res.status(401).json({
          error:{
            status:"Auth Failed",
            statusCode:401,
          }, 
          message:"No User Found with given Email and Password."
        });
      })
    }
    }
    catch(err)
    {
      res.status(500).json({
        error:{
          status:"Failed",
          statusCode:500,
          errorMessage:err
        }, 
        message:"Something Went wrong while executing the adminLogin function."
    });
    }
    
    
  }
 


router.post('/login', adminLogin, studentLogin, staffLogin, employeeLogin);

router.post('/loginStudent', studentLogin);
router.post('/loginAdmin', adminLogin);
router.post('/loginEmployee',employeeLogin);
router.post('/loginStaff',staffLogin);

router.post('/getUser', getUserWithToken);

router.delete('/:userid',(req,res,next)=>{
Users.remove({_id:req.body.userId}).exec()
.then(result=>{
    res.status(200).json({
        message:"user deleted"
    });
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
}
);
});



module.exports = router;
