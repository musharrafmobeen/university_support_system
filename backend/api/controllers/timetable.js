const timetableModel = require("../models/timetable");
const mongoose = require("mongoose");

exports.get_TimeTables = async (req, res, next) => {
  try {
    const allTimeTableDocs = await timetableModel
      .find()
      .exec();

    const response = {
      count: allTimeTableDocs.length,
      timetables: allTimeTableDocs.map((timetableDoc) => {
        return {
          _id: timetableDoc._id,
          employee: timetableDoc.employee,
          timetable: timetableDoc.timetable,
          request: {
            type: "GET",
            URL: "http://localhost:5000/timetables/" + timetableDoc._id,
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
    message:"Got an error while trying to get timetables from the database." });
  }
};

exports.add_TimeTable = async (req, res, next) => {
  try {
    
    const timetableDoc = await timetableModel
      .find({ employee: req.body.employee })
      .exec();
    if (timetableDoc.length >= 1) {
      return res.status(409).json({
        status:"TimeTable already exists",
        statusCode:409,
        message:"TimeTable for the given employee already exists",
      });
    } else {
        //   let incharge = null;
        //   if(req.body.incharge != undefined){
        //     incharge = req.body.incharge;
        //   }
  
        console.log(req.body);
          const timetable = new timetableModel();

          timetable._id = new mongoose.Types.ObjectId();
          timetable.employee= mongoose.Types.ObjectId(req.body.employee);
          timetable.timetable = req.body.timetable;
          console.log(timetable);

          const result = await timetable.save();
          console.log("adrak");
          res.status(201).json({
            message: "TimeTable Created",
            createdTimeTable: {
              employee: result.employee,
              timetable: result.timetable,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/timetables/" + result._id,
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
    message:"Error occured while trying to create a new timetable." });
  }
};

exports.get_A_TimeTable = async (req, res, next) => {
  try {

    const dataToFindTimeTableBy = {
      [req.body.getBy]: req.params.categoryData
    }
    const categoryDoc = await timetableModel
      .find(dataToFindTimeTableBy)
      .exec();
    console.log(categoryDoc);
    if (categoryDoc) {
      res.status(200).json({
        category: categoryDoc,
        request: {
          type: "GET",
          description: "Get all timetables",
          URL: "http://localhost:5000/timetables",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status:"timetable Not Found",
          statusCode:404,
          message:"No timetable found with the given id." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific Category."});
  }
};

exports.update_Timetable= async (req, res, next) => {
  try {
    let dataToUpdateTimeTableBy={};
    const updateOps = {};
    if(req.body.updateBy.localeCompare('id') == 0){
        console.log("adrak");
        dataToUpdateTimeTableBy = {
            'timetable.id': parseInt(req.params.timetableData)
        }
        for (const ops of Object.keys(req.body)){
            if(ops.localeCompare("updateBy") != 0){
              console.log(ops);
              updateOps['timetable.$.'+ ops] = req.body[ops];
            }
        }
    }
    else{
        dataToUpdateTimeTableBy = {
            [req.body.updateBy]: req.params.timetableData
        }
        for (const ops of Object.keys(req.body)){
            if(ops.localeCompare("updateBy") != 0){
              console.log(ops);
              updateOps[ops] = req.body[ops];
            }
        }
    }
    console.log(dataToUpdateTimeTableBy)
    console.log(updateOps);
    
    const result = await timetableModel
      .findOneAndUpdate(dataToUpdateTimeTableBy, { $set: updateOps })
      .exec();
    console.log(updateOps);

    if(result){
        res.status(200).json({
            message: "timetable Updated",
            updated_timeTable: await timetableModel.findOne( dataToUpdateTimeTableBy).exec(),
            request: {
              type: "GET",
              URL: "http://localhost/5000/timetables/" + result._id,
            },
          });
    }
    else{
        res
        .status(404)
        .json({ status:"TimeTable Not Found For updation",
        statusCode:404,
        message:"No TimeTable found that has the given id." });
    }
    
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update timetable." });
  }
};

exports.delete_TimeTable = async (req, res, next) => {
  try {
    const dataToDeleteTimeTableBy = {
      [req.body.deleteBy]: req.params.timetableData
    }
    const result = await timetableModel
      .findOneAndDelete(dataToDeleteTimeTableBy)
      .exec();

      if(result == null){
        res
        .status(404)
        .json({ status:"TimeTable Not Found For deletion",
        statusCode:404,
        message:"No TimeTable found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "TimeTable Deleted",
      timetable: result,
      request: {
        type: "POST",
        description: "To Create A New timetable",
        URL: "http://localhost/5000/timetables/",
        body: {
          employee: "employee id",
          timetable: "An array of Objects",
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
    message:"Error occured while trying to delete a TimeTable." });
  }
};
