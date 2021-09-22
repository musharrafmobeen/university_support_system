const departmetModel = require("../models/departments");
const mongoose = require("mongoose");


exports.get_Departments = async (req, res, next) => {
  try {
    const allDeparmentDocs = await departmetModel
      .find()
      .exec();

    const response = {
      count: allDeparmentDocs.length,
      admins: allDeparmentDocs.map((deparmentDoc) => {
        return {
          _id: deparmentDoc._id,
          name: deparmentDoc.name,
          request: {
            type: "GET",
            URL: "http://localhost:5000/departments/" + deparmentDoc.name,
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
    message:"Got an error while trying to get departments from the database." });
  }
};

exports.add_Department = async (req, res, next) => {
  console.log(req.body.name);
  try {
    const departmentDoc = await departmetModel
      .find({ name: req.body.name })
      .exec();
    if (departmentDoc.length >= 1) {
      return res.status(409).json({
        status:"Department already exists",
        statusCode:409,
        message:"Give a name to create a new department",
      });
    } else {
          const department = new departmetModel({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name,
          });
    
          const result = await department.save();
    
          console.log(result);
          res.status(201).json({
            message: "Category Created",
            createdDepartment: {
              name: result.name,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/departments/" + result.name,
              },
            },
          });
        }
    }
    catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to create a new department." });
  }
};

exports.get_A_Department = async (req, res, next) => {
  try {

    const departmentDoc = await departmetModel
      .find({name:req.params.departmentName })
      .exec();
    console.log(departmentDoc);
    if (departmentDoc) {
      res.status(200).json({
        department: departmentDoc,
        request: {
          type: "GET",
          description: "Get all departments",
          URL: "http://localhost:5000/departments",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status:"Department Not Found",
          statusCode:404,
          message:"No Department found with the given name." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific Department."});
  }
};

exports.update_Department = async (req, res, next) => {
  try {
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      updateOps[ops] = req.body[ops];
    }

    const result = await departmetModel
      .updateOne({name:req.params.departmentName}, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Category Updated",
      updated_department: await employeeModel.find({name:req.params.departmentName}).exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/departments/" + req.params.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update a Department." });
  }
};

exports.delete_Department = async (req, res, next) => {
  try {
    const id = await departmetModel.findOne({name:req.params.departmentName}).select('_id').exec();
    const result = await departmetModel
      .deleteOne({name:req.params.departmentName})
      .exec();
      if(result == null){
        res
        .status(404)
        .json({ status:"Department Not Found For deletion",
        statusCode:404,
        message:"No Department found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Department Deleted",
      department: id,
      request: {
        type: "POST",
        description: "To Create A Newdepartment",
        URL: "http://localhost/5000/dapertments/",
        body: {
          name: "String",
        },
      },
    });
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to delete a Department" });
  }
};
