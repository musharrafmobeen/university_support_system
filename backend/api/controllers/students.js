const studentModel = require("../models/students");
const grievanceModel = require("../models/grievances");
const documentModel = require("../models/documents");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.get_Students = async (req, res, next) => {
  try {
    const allStudentDocs = await studentModel
      .find()
      .exec();

    const response = {
      count: allStudentDocs.length,
      students: allStudentDocs.map((studentDoc) => {
        return {
          reg: studentDoc.reg,
          name: studentDoc.name,
          department: studentDoc.department,
          course: studentDoc.course,
          email: studentDoc.email,
          studentImage: studentDoc.studentImage,
          _id: studentDoc._id,
          creationTime: studentDoc.creationTime,
          lastUpdated: studentDoc.lastUpdated,
          isApproved: studentDoc.isApproved,
          isRejected: studentDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/students/(reg no)",
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
    message:"Error occured while trying to get all students." });
  }
};


exports.get_Approved_Students = async (req, res, next) => {
  try {
    const allStudentDocs = await studentModel
      .find({isApproved:true})
      .exec();

      

    const response = {
      count: allStudentDocs.length,
      students: allStudentDocs.map((studentDoc) => {
        return {
          reg: studentDoc.reg,
          name: studentDoc.name,
          department: studentDoc.department,
          course: studentDoc.course,
          email: studentDoc.email,
          studentImage: studentDoc.studentImage,
          _id: studentDoc._id,
          creationTime: studentDoc.creationTime,
          lastUpdated: studentDoc.lastUpdated,
          isApproved: studentDoc.isApproved,
          isRejected: studentDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/students/(reg no)",
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
    message:"Error occured while trying to get all students." });
  }
};

exports.get_Unapproved_Students = async (req, res, next) => {
  try {
    const allStudentDocs = await studentModel
      .find({isApproved:false, isRejected:false})
      .exec();

    const response = {
      count: allStudentDocs.length,
      students: allStudentDocs.map((studentDoc) => {
        return {
          reg: studentDoc.reg,
          name: studentDoc.name,
          department: studentDoc.department,
          course: studentDoc.course,
          email: studentDoc.email,
          studentImage: studentDoc.studentImage,
          _id: studentDoc._id,
          creationTime: studentDoc.creationTime,
          lastUpdated: studentDoc.lastUpdated,
          isApproved: studentDoc.isApproved,
          isRejected: studentDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/students/(reg no)",
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
    message:"Error occured while trying to get all students." });
  }
};

exports.get_Rejected_Students = async (req, res, next) => {
  try {
    const allStudentDocs = await studentModel
      .find({isRejected:true, isApproved:false})
      .exec();

    const response = {
      count: allStudentDocs.length,
      students: allStudentDocs.map((studentDoc) => {
        return {
          reg: studentDoc.reg,
          name: studentDoc.name,
          department: studentDoc.department,
          course: studentDoc.course,
          email: studentDoc.email,
          studentImage: studentDoc.studentImage,
          _id: studentDoc._id,
          creationTime: studentDoc.creationTime,
          lastUpdated: studentDoc.lastUpdated,
          isApproved: studentDoc.isApproved,
          isRejected: studentDoc.isRejected,
          request: {
            type: "GET",
            URL: "http://localhost:5000/students/(reg no)",
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
    message:"Error occured while trying to get all students." });
  }
};

exports.add_A_Student = async (req, res, next) => {

  try {
    console.log("email: " + req.body.email);

    const studentDoc = await studentModel
      .find({$or:[{ email: req.body.email},{reg: req.body.reg}]})
      .exec();
    if (studentDoc.length >= 1) {
      return res.status(409).json({
        status:"Failed to create student.",
        statusCode:409,
        message: "Student with these credentials already exists. Give different credentials to create a student."
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            error:{
              status:"Auth Failed",
              statusCode:401,
              errorMessage:err
            }, 
            message:"No student exists with the given credentials."
          });
        } else {
          let imagePath = ""
          if(req.file != undefined){
            imagePath = req.file.path;
          }
          else{
            imagePath = "uploads/default.jpg";
          }
          console.log(imagePath)
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date+' '+time;
          const student = new studentModel({
            _id: new mongoose.Types.ObjectId(),
            reg: req.body.reg,
            name: req.body.name,
            department: req.body.department,
            course: req.body.course,
            email: req.body.email,
            password: hash,
            studentImage: imagePath,
            isApproved:false,
            isRejected: false,
            creationTime: dateTime,
            lastUpdated: dateTime,
          });

          const result = await student.save();

          
          res.status(201).json({
            message: "Student Created",
            createdStudent: {
              reg: result.reg,
              name: result.name,
              department: result.department,
              course: result.course,
              email: result.email,
              studentImage: result.studentImage,
              _id: result._id,
              isApproved:result.isApproved,
              isRejected: result.isRejected,
              creationTime: result.creationTime,
              lastUpdated: result.lastUpdated,
              response: {
                type: "GET",
                URL: "http://localhost:5000/students/" + result.reg,
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
    message:"Error occured while trying to create a student." });
  }
};

exports.get_A_Student = async (req, res, next) => {
  try{
    const dataToFindStudentBy = {[req.body.getBy]:req.params.studentData};
    console.log(dataToFindStudentBy);
    const studentDoc = await studentModel
      .find(dataToFindStudentBy)
      .select("name reg department _id studentImage course email")
      .exec();
      console.log(studentDoc);
      if (studentDoc) {
        res.status(200).json({
          student: studentDoc,
          request: {
            type: "GET",
            description: "Get all students",
            URL: "http://localhost:5000/students",
          },
        });
      } else {
        res
          .status(404)
          .json({ status:"Student Not Found",
          statusCode:404,
          message:"No Student found that has the given credentials." });
      }

  }
  catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific student." });
  }
};

exports.update_A_Student = async (req, res, next) => {
  try{
    const dataToUpdateStudentBy = {[req.body.updateBy]:req.params.studentData};
    const updateOps = {};
    console.log(req.body);
  
    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("password") == 0){
        updateOps[ops]= await new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        });
      }
      else if(ops.localeCompare("updateBy") != 0){
        console.log(ops);
        updateOps[ops] = req.body[ops];
      }
    }

   
    console.log(updateOps);

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    updateOps['lastUpdated'] = dateTime;
    const result = await studentModel
      .updateOne(dataToUpdateStudentBy, { $set: updateOps })
      .exec();
      console.log(updateOps);
      console.log(result);
      res.status(201).json({
        message: "Student Updated",
        updatedStudent: await studentModel.findOne(dataToUpdateStudentBy).exec(),
        request: {
          type: "GET",
          URL: "http://localhost/5000/students/",
        },
      });
  }catch(err){
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update a student." });
  }
};

exports.delete_A_Student = async (req, res, next) => {
  try{
    
    const dataToDeleteStudentBy = {[req.body.deleteBy]:req.params.studentData};
    const id = await studentModel.findOne(dataToDeleteStudentBy).select('_id').exec();
    console.log(dataToDeleteStudentBy);
    const result = await studentModel
      .deleteOne(dataToDeleteStudentBy)
      .exec();
    const gr = await grievanceModel.deleteOne({lodgedBy:id._id,isClosed:true}).exec();
    const dc = await documentModel.deleteOne({student:id._id}).exec();
      if(result == null){
        res
        .status(404)
        .json({ status:"Student Not Found For deletion",
        statusCode:404,
        message:"No Student found that has the given id." });
      }
      else{
        res.status(200).json({
          message: "Student Deleted",
          student: id,
          request: {
            type: "POST",
            description: "To Create A New Student",
            URL: "http://localhost/5000/students/",
            body: {
              name: "String",
              reg: "String",
              department: "String",
              course: "String",
              email: "String",
              studentImage: "File",
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
    message:"Error occured while trying to delete a student." });
  }
};
