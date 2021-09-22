const staffModel = require("../models/staff");
const categoryModel = require("../models/categories");
const grievanceModel = require("../models/grievances");
const employeeModel = require("../models/employees");
const staffRatingModel = require("../models/staffRating");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { findOne, findOneAndUpdate } = require("../models/staff");


exports.get_AllStaff = async (req, res, next) => {
  try {
    const allStaffDocs = await staffModel
      .find()
      .populate('employee')
      .exec();

    const response = {
      count: allStaffDocs.length,
      staffs: allStaffDocs.map((staffDoc) => {
        return {
          employee: staffDoc.employee,
          _id: staffDoc._id,
          inChargeOf: staffDoc.inChargeOf,
          isAvailable:staffDoc.isAvailable,
          request: {
            type: "GET",
            URL: "http://localhost:5000/staffs/" + staffDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({  error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all staff." });
  }
};

exports.add_Staff = async (req, res, next) => {
  try {
    console.log(req.body);
    const staffDoc = await staffModel
      .find({ employee: req.body.employee })
      .exec();
    if (staffDoc.length >= 1) {
      return res.status(409).json({
        status:"Failed to create staff/ staff already exists.",
        statusCode:409,
        message: "Staff with these credentials already exists. Give different credentials to create an staff."
      });
    } else {
      const staff_ID = new mongoose.Types.ObjectId();
      let inChargeOf = ""
      let category = null;
      if(req.body.inChargeOf != undefined){
        category = await categoryModel.findOneAndUpdate({_id:req.body.inChargeOf},{ $set: {incharge:staff_ID} }).exec();
        inChargeOf = req.body.inChargeOf;
      }
      else{
        inChargeOf = null;
      }
      console.log(category);
        const staff = new staffModel({
            _id: staff_ID,
            employee: req.body.employee,
            inChargeOf: category.name,
            isAvailable: req.body.isAvailable
          });

          const result = await staff.save();

          console.log(result);
          res.status(201).json({
            message: "Staff Created",
            createdStaff: {
               employee: await employeeModel.findOne({_id:req.body.employee}).select('_id employee_ID name department designation email isApproved isRejected employeeImage creationTime lastUpdated').exec(),
               inChargeOf: result.inChargeOf,
               isAvailable: result.isAvailable,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/staffs/" + result.employee,
              },
            },
          });
    }
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to create a staff." });
  }
};

exports.add_Staff_Mobile = async (req, res, next) => {
  try {
    console.log(req.body);
    const staffDoc = await staffModel
      .find({ employee: req.body.employee })
      .exec();
    if (staffDoc.length >= 1) {
      return res.status(409).json({
        status:"Failed to create staff/ staff already exists.",
        statusCode:409,
        message: "Staff with these credentials already exists. Give different credentials to create an staff."
      });
    } else {
      const staff_ID = new mongoose.Types.ObjectId();
      let inChargeOf = ""
      let category = null;
      if(req.body.inChargeOf != undefined){
        category = await categoryModel.findOneAndUpdate({_id:req.body.inChargeOf},{ $set: {incharge:staff_ID} }).exec();
        inChargeOf = req.body.inChargeOf;
      }
      else{
        inChargeOf = null;
      }
      console.log(category);
        const staff = new staffModel({
            _id: staff_ID,
            employee: req.body.employee,
            inChargeOf: category.name,
            isAvailable: req.body.isAvailable
          });

          const result = await staff.save();

          console.log(result);
          res.status(201).json({
            message: "Staff Created",
            createdStaff: {
               employee: result.employee,
               inChargeOf: result.inChargeOf,
               isAvailable: result.isAvailable,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/staffs/" + result.employee,
              },
            },
          });
    }
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to create a staff." });
  }
};

exports.get_A_Staff = async (req, res, next) => {
  try{
    const dataToFindStaffBy = {[req.body.getBy]:req.params.staffData};
    const staffDoc = await staffModel
      .find(dataToFindStaffBy)
      .select("employee inChargeOf isAvailable _id")
      .populate('employee')
      .exec();
      console.log(staffDoc);
      if (staffDoc) {
        res.status(200).json({
          staff: staffDoc,
          request: {
            type: "GET",
            description: "Get all staff",
            URL: "http://localhost:5000/staffs",
          },
        });
      } else {
        res
          .status(404)
          .json({
          status:"Staff Not Found",
          statusCode:404,
          message:"No staff found that has the given credentials." });
      }

  }
  catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific staff." });
  }
};

exports.update_Staff = async (req, res, next) => {
  try{
    const updateOps = {};
    const updateOpsEmployee = {};
    const dataToUpdateStaffBy = {[req.body.updateBy]:req.params.staff_id};
 
    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("name") == 0 || ops.localeCompare("employeeImage") == 0){
          updateOpsEmployee[ops] = req.body[ops];
      }
      else if(ops.localeCompare("password") == 0){
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(401).json({
              error:{
                status:"Password Hasing Failed",
                statusCode:401,
                errorMessage:err
              }, 
              message:"Unable to hash the new password given."
            });
          }
          else{
            updateOpsEmployee[ops] = hash;
          }
        });
      }
      else if(ops.localeCompare("updateBy") != 0){
        updateOps[ops] = req.body[ops];
      }
    }

    
    const result = await staffModel
      .findOneAndUpdate(dataToUpdateStaffBy, { $set: updateOps })
      .exec();
      if(Object.keys(updateOpsEmployee).length >= 1){
        console.log("adrak")
        const employeeUpdated = await employeeModel.findOneAndUpdate({_id:result.employee},updateOpsEmployee).exec();
      }

      console.log(updateOps);
      console.log(result);
      res.status(200).json({
        message: "Staff Updated",
        updatedStaff:await staffModel.find(dataToUpdateStaffBy).select("employee inChargeOf isAvailable _id").populate('employee').exec(),
        request: {
          type: "GET",
          URL: "http://localhost/5000/staffs/" + result.employee,
        },
      });
  }catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update a staff." });
  }
};

exports.delete_Staff = async (req, res, next) => {
  try{

    const dataToDeleteStaffBy = {[req.body.deleteBy]:req.params.staff_id};
    // const id = await staffModel.findOne({employee: req.params.employeeID}).select('_id').exec();
    console.log(dataToDeleteStaffBy);
    const result = await staffModel
      .findOneAndDelete(dataToDeleteStaffBy)
      .exec();
      console.log(result);
      const category = await categoryModel.updateOne({incharge:result._id}, { $set: {incharge:null} })
      .exec();
      const staffrating = await staffRatingModel.deleteOne({staff:result._id})
      .exec();
      const grievance = await grievanceModel.updateOne({inCharge:result._id}, { $set: {inCharge:null} }).exec();
      const grievanceDeleted = await grievanceModel.updateOne({lodgedBy:result._id}, { $set: {lodgedBy:null} }).exec();
      if(result == null){
        res
        .status(404)
        .json({ status:"Staff Not Found For deletion",
        statusCode:404,
        message:"No Staff found that has the given id." });
      }
      else{
      res.status(200).json({
        message: "Staff Deleted",
        staff: result._id,
        request: {
          type: "POST",
          description: "To Create A New Staff",
          URL: "http://localhost/5000/staffs/",
          body: {
           employee_ID:"Object Id",
           inChargeOf:"Boolean",
           isAvailable:"Boolean"
          },
        },
      })
    }
  }catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to delete a staff." });
  }
};
