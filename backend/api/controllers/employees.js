const employeeModel = require("../models/employees");
const grievanceModel = require("../models/grievances");
const categoryModel = require("../models/categories");
const staffModel = require("../models/staff");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.get_Approved_Employees = async (req, res, next) => {
  try {
    const allEmployeeDocs = await employeeModel
      .find({isApproved:true})
      .exec();

    const response = {
      count: allEmployeeDocs.length,
      employees: allEmployeeDocs.map((employeeDoc) => {
        return {
          employee_ID: employeeDoc.employee_ID,
          name: employeeDoc.name,
          department: employeeDoc.department,
          email: employeeDoc.email,
          designation: employeeDoc.designation,
          employeeImage: employeeDoc.employeeImage,
          _id: employeeDoc._id,
          creationTime: employeeDoc.creationTime,
          lastUpdated: employeeDoc.lastUpdated,
          isApproved:employeeDoc.isApproved,
          isRejected: employeeDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/employees/" + employeeDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all Approved employees." });
  }
};

exports.get_UnApproved_Employees = async (req, res, next) => {
  try {
    const allEmployeeDocs = await employeeModel
      .find({isApproved:false, isRejected:false})
      .exec();

    const response = {
      count: allEmployeeDocs.length,
      employees: allEmployeeDocs.map((employeeDoc) => {
        return {
          employee_ID: employeeDoc.employee_ID,
          name: employeeDoc.name,
          department: employeeDoc.department,
          email: employeeDoc.email,
          designation: employeeDoc.designation,
          employeeImage: employeeDoc.employeeImage,
          _id: employeeDoc._id,
          creationTime: employeeDoc.creationTime,
          lastUpdated: employeeDoc.lastUpdated,
          isApproved:employeeDoc.isApproved,
          isRejected: employeeDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/employees/" + employeeDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all Unapproved employees." });
  }
};

exports.get_Employees = async (req, res, next) => {
  try {
    const allEmployeeDocs = await employeeModel
      .find()
      .exec();

    const response = {
      count: allEmployeeDocs.length,
      employees: allEmployeeDocs.map((employeeDoc) => {
        return {
          employee_ID: employeeDoc.employee_ID,
          name: employeeDoc.name,
          department: employeeDoc.department,
          email: employeeDoc.email,
          designation: employeeDoc.designation,
          _id: employeeDoc._id,
          employeeImage:employeeDoc.employeeImage,
          creationTime: employeeDoc.creationTime,
          lastUpdated: employeeDoc.lastUpdated,
          isApproved:employeeDoc.isApproved,
          isRejected: employeeDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/employees/" + employeeDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all Unapproved employees." });
  }
};

exports.get_NonStaffEmployees = async (req, res, next) => {
  try {
    const allEmployeeDocs = await employeeModel
      .find({isApproved:true})
      .exec();

    const allStaffs = await staffModel.find().select('employee').exec();

    let employeeIDs = []
    for(let i = 0; i<allStaffs.length;i++){
      employeeIDs.push(String(allStaffs[i].employee));
    }

    allEmployees = [];
    for(let i = 0; i<allEmployeeDocs.length;i++){
      if(!employeeIDs.includes(String(allEmployeeDocs[i]._id))){
        allEmployees.push({
          employee_ID: allEmployeeDocs[i].employee_ID,
          name: allEmployeeDocs[i].name,
          department: allEmployeeDocs[i].department,
          email: allEmployeeDocs[i].email,
          designation: allEmployeeDocs[i].designation,
          _id: allEmployeeDocs[i]._id,
          employeeImage:allEmployeeDocs[i].employeeImage,
          creationTime: allEmployeeDocs[i].creationTime,
          lastUpdated: allEmployeeDocs[i].lastUpdated,
          isApproved:allEmployeeDocs[i].isApproved,
          isRejected: allEmployeeDocs[i].isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/employees/" + allEmployeeDocs[i]._id,
          },
        });
      }
    }

    console.log(allEmployees);

    const response = {
      count: allEmployees.length,
      employees: allEmployees
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all Unapproved employees." });
  }
};

exports.get_Rejected_Employees = async (req, res, next) => {
  try {
    const allEmployeeDocs = await employeeModel
      .find({isRejected:true, isApproved:false})
      .exec();

    const response = {
      count: allEmployeeDocs.length,
      employees: allEmployeeDocs.map((employeeDoc) => {
        return {
          employee_ID: employeeDoc.employee_ID,
          name: employeeDoc.name,
          department: employeeDoc.department,
          email: employeeDoc.email,
          designation: employeeDoc.designation,
          employeeImage: employeeDoc.employeeImage,
          _id: employeeDoc._id,
          creationTime: employeeDoc.creationTime,
          lastUpdated: employeeDoc.lastUpdated,
          isApproved:employeeDoc.isApproved,
          isRejected: employeeDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/employees/" + employeeDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get all Unapproved employees." });
  }
};


exports.add_Employee = async (req, res, next) => {
  // console.log("Adrak");
  // res.status(200).json({
  //   emp:req.body
  // });
  try {
    const employeeDoc = await employeeModel
      .find({ $or:[ { email: req.body.email }, { employee_ID: req.body.employee_ID }]})
      .exec();
 
    if (employeeDoc.length >= 1) {
      return res.status(409).json({
        status:"Failed to create employee.",
        statusCode:409,
        message: "Employee with these credentials already exists. Give different credentials to create an employee.",
      });
    } else {
      let imagePath = ""
      if(req.file != undefined){
        imagePath = req.file.path;
      }
      else{
        imagePath = "uploads"+"/"+"default.jpg";
      }
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            error:{
              status:"Auth Failed",
              statusCode:401,
              errorMessage:err
            }, 
            message:"No employee exists with the given credentials."
          });
        } else {
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date+' '+time;
          const employee = new employeeModel({
            _id: new mongoose.Types.ObjectId(),
            employee_ID: req.body.employee_ID,
            name: req.body.name,
            designation: req.body.designation,
            department: req.body.department,
            email: req.body.email,
            password: hash,
            isApproved : false,
            isRejected: false,
            employeeImage: imagePath,
            creationTime: dateTime,
            lastUpdated: dateTime
          });

          const result = await employee.save();

          console.log(result);
          res.status(201).json({
            message: "Employee Created",
            statusCode:201,
            employee: {
              employee_ID: result.employee_ID,
              name: result.name,
              department: result.department,
              designation: result.designation,
              email: result.email,
              employeeImage: result.employeeImage,
              isApproved : result.isApproved,
              isRejected: result.isRejected,
              creationTime: result.creationTime,
              lastUpdated: result.lastUpdated,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/employees/" + result.name,
              },
            },
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to create a new employee." });
  }
};

exports.get_A_Employee = async (req, res, next) => {
  try{
    const dataToFindEmployeeBy = {[req.body.getBy]:req.params.employeeData};
    const employeeDoc = await employeeModel
      .find(dataToFindEmployeeBy)
      .select("employee_ID name reg department _id studentImage course email")
      .exec();
      console.log(employeeDoc);
      if (employeeDoc) {
        res.status(200).json({
          employee: employeeDoc,
          request: {
            type: "GET",
            description: "Get all employees",
            URL: "http://localhost:5000/employees",
          },
        });
      } else {
        res
          .status(404)
          .json({  status:"Employee Not Found",
          statusCode:404,
          message:"No employee found that has the given credentials." });
      }

  }
  catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific employee." });
  }
};

exports.update_Employee = async (req, res, next) => {
  try{
    const dataToUpdateEmployeeBy = {[req.body.updateBy]:req.params.employeeData};
    const updateOps = {};
  
    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("password") == 0){
        updateOps[ops]= await new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        })
      }
      else if(ops.localeCompare("updateBy") != 0){
        updateOps[ops] = req.body[ops];
      }
    }



    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    updateOps['lastUpdated'] = dateTime;
    
    // const result = await employeeModel
    //   .findOneAndUpdate(dataToUpdateEmployeeBy,updateOps)
    //   .exec();
    console.log(updateOps);
    const result = await employeeModel
      .findOneAndUpdate(dataToUpdateEmployeeBy,updateOps)
      .exec();
      console.log(result);
      console.log(dataToUpdateEmployeeBy);
      res.status(200).json({
        message: "Employee Updated",
        updatedEmployee: await employeeModel.findOne(dataToUpdateEmployeeBy).exec(),
        request: {
          type: "GET",
          URL: "http://localhost/5000/employees/",
        },
      });
  }catch(err){
    console.log(err);
    res.status(500).json({error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to Update an employee." });
  }
};

exports.delete_Employee = async (req, res, next) => {
  try{
    
    const dataToDeleteEmployeeBy = {[req.body.deleteBy]:req.params.employeeData};
    const id = await employeeModel.findOne(dataToDeleteEmployeeBy).select('_id').exec();
    const name = req.params.employeeName;
    console.log(name);
    const result = await employeeModel
      .deleteOne(dataToDeleteEmployeeBy)
      .exec();
      const greivance = await grievanceModel.updateOne({lodgedBy:id._id}, { $set: {lodgedBy:null} }).exec();
      const staff = await staffModel.findOneAndDelete({employee:id._id}).exec();
      if(staff){
        const category = await categoryModel.updateOne({incharge:staff._id}, { $set: {incharge:null} })
        .exec();
        const grievanceDeleted = await grievanceModel.updateOne({lodgedBy:staff._id}, { $set: {lodgedBy:null} }).exec();
      }
      if(result == null){
        res
        .status(404)
        .json({ status:"Employee Not Found For deletion",
        statusCode:404,
        message:"No Employee found that has the given id." });
      }
      else{
      res.status(200).json({
        message: "Employee Deleted",
        employee: id,
        request: {
          type: "POST",
          description: "To Create A New Employee",
          URL: "http://localhost/5000/employees/",
          body: {
            employee_ID:"Number",
            name: "String",
            designation: "String",
            department: "String",
            email: "String",
            teacherSImage: "File",
            password:"String"
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
    message:"Error occured while trying to Delete an employee." });
  }
};
