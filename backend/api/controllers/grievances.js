const grievanceModel = require("../models/grievances");
const studentModel = require("../models/students");
const staffModel = require("../models/staff");
const categoryModel = require("../models/categories");
const employeeModel = require("../models/employees");
const mongoose = require("mongoose");


exports.get_Grievances = async (req, res, next) => {
  try {
    const allGrievancesDocs = await grievanceModel
      .find()
      // .populate({path:'lodgedBy',model:'Students'})
      .populate("category")
      .populate("inCharge")
      .exec();

    const response = {
      count: allGrievancesDocs.length,
      grievances: allGrievancesDocs.map((grievanceDoc) => {
        return {
          _id: grievanceDoc._id,
          lodgedBy: grievanceDoc.lodgedBy,
          title: grievanceDoc.title,
          description: grievanceDoc.description,
          category: grievanceDoc.category,
          lodgingDate: grievanceDoc.lodgingDate,
          lastUpdated: grievanceDoc.lastUpdated,
          closingDate: grievanceDoc.closingDate,
          status:grievanceDoc.status,
          ticket:grievanceDoc.ticket,
          history: grievanceDoc.history,
          inCharge: grievanceDoc.inCharge,
          isClosed: grievanceDoc.isClosed,
          isSpam: grievanceDoc.isSpam,
          isDelayed: grievanceDoc.isDelayed,
          isPaused: grievanceDoc.isPaused,
          request: {
            type: "GET",
            URL: "http://localhost:5000/grievances/" + grievanceDoc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to get all Grievances.",
    });
  }
};

exports.get_Grievances_Mobile = async (req, res, next) => {
  try {
    const allGrievancesDocs = await grievanceModel
      .find()
      .exec();

      let allgrievances = [];

      for(let i = 0; i < allGrievancesDocs.length; i++){  
      
        allgrievances.push({
          _id: allGrievancesDocs[i]._id,
          lodgedBy: allGrievancesDocs[i].lodgedBy,
          title: allGrievancesDocs[i].title,
          description: allGrievancesDocs[i].description,
          category: allGrievancesDocs[i].category,
          lodgingDate: allGrievancesDocs[i].lodgingDate,
          lastUpdated:allGrievancesDocs[i].lastUpdated,
          closingDate: allGrievancesDocs[i].closingDate,
          status:allGrievancesDocs[i].status,
          ticket:allGrievancesDocs[i].ticket,
          inCharge: allGrievancesDocs[i].inCharge,
          isClosed:allGrievancesDocs[i].isClosed,
          isSpam: allGrievancesDocs[i].isSpam,
          isDelayed: allGrievancesDocs[i].isDelayed,
          isPaused: allGrievancesDocs[i].isPaused,
        });
      }
      

    const response = {
      count: allGrievancesDocs.length,
      grievances:  allgrievances
    };

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to get all Grievances.",
    });
  }
};

exports.get_Certain_Grievances_Mobile = async (req, res, next) => {
  try {
    const allGrievancesDocs = await grievanceModel
      .find({lodgedBy:req.params.lodgerID})
      .exec();
      console.log(req.params.lodgerID);
      let allgrievances = [];

      for(let i = 0; i < allGrievancesDocs.length; i++){  
      
        allgrievances.push({
          _id: allGrievancesDocs[i]._id,
          lodgedBy: allGrievancesDocs[i].lodgedBy,
          title: allGrievancesDocs[i].title,
          description: allGrievancesDocs[i].description,
          category: allGrievancesDocs[i].category,
          lodgingDate: allGrievancesDocs[i].lodgingDate,
          lastUpdated:allGrievancesDocs[i].lastUpdated,
          closingDate: allGrievancesDocs[i].closingDate,
          status:allGrievancesDocs[i].status,
          ticket:allGrievancesDocs[i].ticket,
          inCharge: allGrievancesDocs[i].inCharge,
          isClosed:allGrievancesDocs[i].isClosed,
          isSpam: allGrievancesDocs[i].isSpam,
          isDelayed: allGrievancesDocs[i].isDelayed,
          isPaused: allGrievancesDocs[i].isPaused,
        });
      }
      

    const response = {
      count: allGrievancesDocs.length,
      grievances:  allgrievances
    };

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to get all Grievances.",
    });
  }
};

exports.get_Staff_Grievances_Mobile = async (req, res, next) => {
  try {
    const allGrievancesDocs = await grievanceModel
      .find()
      .populate('category')
      .exec();


      console.log(req.params.lodgerID);
      let allgrievances = [];

      for(let i = 0; i < allGrievancesDocs.length; i++){  

        if( allGrievancesDocs[i].category.incharge == req.params.staffID)
        {
          allgrievances.push({
            _id: allGrievancesDocs[i]._id,
            lodgedBy: allGrievancesDocs[i].lodgedBy,
            title: allGrievancesDocs[i].title,
            description: allGrievancesDocs[i].description,
            category: allGrievancesDocs[i].category._id,
            lodgingDate: allGrievancesDocs[i].lodgingDate,
            lastUpdated:allGrievancesDocs[i].lastUpdated,
            closingDate: allGrievancesDocs[i].closingDate,
            status:allGrievancesDocs[i].status,
            ticket:allGrievancesDocs[i].ticket,
            inCharge: allGrievancesDocs[i].inCharge,
            isClosed:allGrievancesDocs[i].isClosed,
            isSpam: allGrievancesDocs[i].isSpam,
            isDelayed: allGrievancesDocs[i].isDelayed,
            isPaused: allGrievancesDocs[i].isPaused,
          });
        }
      }
      

    const response = {
      count: allGrievancesDocs.length,
      grievances:  allgrievances
    };

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to get all Grievances.",
    });
  }
};

exports.add_Grievance = async (req, res, next) => {
  try {
    const employeeDoc = await grievanceModel
      .find({ lodgedBy: req.body.lodgedBy, category: req.body.category })
      .exec();
    if (employeeDoc.length >= 1) {
      return res.status(409).json({
        status: "Failed to create Grievance.",
        statusCode: 409,
        message:
          "Grievance with these credentials already exists. Give different credentials to create an Grievance.",
      });
    } else {
      
      let ticketNumber = 1001
      const allgrievances = await grievanceModel.find().exec();
      if(allgrievances.length>0){
        ticketNumber = 1 + allgrievances[allgrievances.length-1].ticket;
      }

      let description = null;
      if(req.body.description != undefined){
        description = req.body.description;
      }
       
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      const grievance = new grievanceModel();

      grievance._id = new mongoose.Types.ObjectId();
      grievance.lodgedBy = req.body.lodgedBy;
      grievance.title =  req.body.title;
      grievance.description = description;
      grievance.category = req.body.category;
      grievance.lodgingDate = dateTime;
      grievance.lastUpdated = dateTime;
      grievance.closingDate = "In Progress";
      grievance.ticket = ticketNumber;
      grievance.status = req.body.status,
      grievance.history.push({message:"Grievance Created", status : req.body.status ,  date :  dateTime});
      grievance.inCharge = req.body.inCharge;
      grievance.isClosed = false;
      grievance.isSpam = false;
      grievance.isDelayed = false;
      grievance. isPaused = false;


      const result = await grievance.save();

      console.log(result);
      res.status(201).json({
        message: "Grievance Created",
        statusCode: 201,
        grievance: {
          _id: result._id,
          lodgedBy: result.lodgedBy, 
          title: result.title,
          description: result.description,
          category: result.category,
          lodgingDate: result.lodgingDate,
          lastUpdated: result.lastUpdated,
          closingDate: result.closingDate,
          status: result.status,
          history:result.history,
          ticket:result.ticket,
          inCharge: result.inCharge,
          isClosed: result.isClosed,
          isSpam: result.isSpam,
          isDelayed: result.isDelayed,
          isPaused: result.isPaused,
          response: {
            type: "GET",
            URL: "http://localhost:5000/grievances/" + result._id,
          },
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to create a new employee.",
    });
  }
};

exports.get_A_Grievance = async (req, res, next) => {
  try {
    const dataToFindGrievanceBy = {
      [req.body.getBy]: req.params.grievanceData,
    };
    const grievanceDoc = await grievanceModel
      .find(dataToFindGrievanceBy)
      .populate("category")
      .populate("Staff")
      .exec();
    console.log(grievanceDoc);
    if (grievanceDoc) {
      res.status(200).json({
        grievance: grievanceDoc,
        request: {
          type: "GET",
          description: "Get all grievances",
          URL: "http://localhost:5000/grievances",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status: "Grievance Not Found",
          statusCode: 404,
          message: "No Grievance found that has the given credentials.",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to get a specific grievance.",
    });
  }
};

exports.update_Grievance = async (req, res, next) => {
  try {
    const dataToUpdateGrievanceBy = {
      [req.body.updateBy]: req.params.grievanceData,
    };

    let updatedHistory = null;
    let updatedHistoryObject = {};
    const updateOps = {};
    const history  = await grievanceModel
    .findOne(dataToUpdateGrievanceBy)
    .populate("category")
    .populate("Staff")
    .exec();

    console.log(history.history) 

    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;

    for (const ops of Object.keys(req.body)) {
      if (ops.localeCompare("updateBy") != 0) {
        updateOps[ops] = req.body[ops];
      }
      if(ops.localeCompare("status") == 0){
        updatedHistory = {message:"Grievance Updated", status : req.body.status ,  date :  dateTime};
      }
    }
    
    if(updatedHistory != null){
      updatedHistoryObject = {history:updatedHistory}
    }

    updateOps["lastUpdated"] = dateTime;

    const result = await grievanceModel
      .updateOne(dataToUpdateGrievanceBy, { $set: updateOps, $push:updatedHistoryObject})
      .exec();
    console.log(dataToUpdateGrievanceBy);
    console.log(updateOps);
    res.status(200).json({
      message: "Grievance Updated",
      updatedGrievance: await grievanceModel
        .find(dataToUpdateGrievanceBy)
        .exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/grievances/",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to Update a grievance.",
    });
  }
};

exports.delete_Grievance = async (req, res, next) => {
  try {
    
    const dataToDeleteGrievanceBy = {
      [req.body.deleteBy]: req.params.grievanceData,
    };
    // const id = await grievanceModel.findOne(dataToDeleteGrievanceBy).select('_id').exec();
    const name = req.params.employeeName;
    console.log(name);
    const result = await grievanceModel
      .findOneAndDelete(dataToDeleteGrievanceBy)
      .exec();
      if(result == null){
        res
        .status(404)
        .json({ status:"Grievance Not Found For deletion",
        statusCode:404,
        message:"No Grievance found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Grievance Deleted",
      grievance: result._id,
      request: {
        type: "POST",
        description: "To Create A New Grievance",
        URL: "http://localhost/5000/grievances/",
        body: {
          lodgedBy: "Object id",
          title: "String",
          description: "String",
          category: "String",
          inCharge: "Object id",
        },
      },
    });
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to Delete a Grievance.",
    });
  }
};
