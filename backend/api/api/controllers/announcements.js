const announcementModel = require("../models/announcements");
const mongoose = require("mongoose");

exports.get_Announcements = async (req, res, next) => {
 
  try {
    const allAnnouncementsDocs = await announcementModel
      .find()
      .exec();

      console.log(allAnnouncementsDocs);

    const response = {
      count: allAnnouncementsDocs.length,
      announcements: allAnnouncementsDocs.map((announcementDoc) => {
        return {
          _id: announcementDoc._id,
          announcement: announcementDoc.announcement,
          announcerType: announcementDoc.announcerType,
          visibleTo: announcementDoc.visibleTo,
          dateCreated: announcementDoc.dateCreated,
          request: {
            type: "GET",
            URL: "http://localhost:5000/announcements/" + announcementDoc._id,
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
    message:"Got an error while trying to get announcements from the database." });
  }
};

exports.add_Announcements = async (req, res, next) => {
  try {
    // const announcementDoc = await announcementModel
    //   .find()
    //   .exec();

    // if (announcementDoc.length >= 1) {
    //   return res.status(409).json({
    //     status:"Appointment already exists",
    //     statusCode:409,
    //     message:"If You want you can schedule an appointment with another staff",
    //   });
    // } else {
        //   let incharge = null;
        //   if(req.body.incharge != undefined){
        //     incharge = req.body.incharge;
        //   }
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
          
          const appointment = new announcementModel({
            _id: new mongoose.Types.ObjectId(),
            announcement:req.body. announcement,
            announcerType:req.body.announcerType,
            visibleTo: req.body.visibleTo,
            dateCreated:dateTime
          });
          console.log(appointment);
          const result = await appointment.save();
  
          res.status(201).json({
            message: "Announcement Created",
            createdAnnouncement: {
                _id: result._id,
                announcement:result.  announcement,
                announcerType:result.announcerType,
                visibleTo: result.visibleTo,
                dateCreated: result.dateCreated,
              response: {
                type: "GET",
                URL: "http://localhost:5000/announcements/" + result._id,
              },
            },
          });
        // }
    }
    catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to create a new announcement." });
  }
};

exports.get_An_Announcement = async (req, res, next) => {
  try {

    const dataToFindAnnouncementBy = {
      [req.body.getBy]: req.params.announcementData
    }
    const announcmentDoc = await announcementModel
      .find(dataToFindAnnouncementBy)
      .exec();
    console.log(announcmentDoc);
    if (announcmentDoc) {
      res.status(200).json({
        announcement: announcmentDoc,
        request: {
          type: "GET",
          description: "Get all announcements",
          URL: "http://localhost:5000/announcements",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status:"Announcement Not Found",
          statusCode:404,
          message:"No Announcements found with the given id." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific Announcement."});
  }
};

exports.update_Announcement = async (req, res, next) => {
  try {
    const dataToUpdateAnnouncementBy = {
      [req.body.updateBy]: req.params.announcementData
    }
    console.log(dataToUpdateAnnouncementBy)
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("updateBy") != 0){
        console.log(ops);
        updateOps[ops] = req.body[ops];
      }
    }


    const result = await announcementModel
      .findOneAndUpdate(dataToUpdateAnnouncementBy, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Announcemnet Updated",
      updated_announcement: await announcementModel.findOne(dataToUpdateAnnouncementBy).exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/announcements/" + req.params.announcementData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update an Announcement." });
  }
};

exports.delete_Announcement = async (req, res, next) => {
  try {
    const dataToDeleteAnnouncementBy = {
      [req.body.deleteBy]: req.params.announcementData
    }
    // const id = await categoryModel.findOne(dataToDeleteCategoryBy).select('_id').exec();
    const result = await announcementModel
      .findOneAndDelete(dataToDeleteAnnouncementBy)
      .exec();

      if(result == null){
        res
        .status(404)
        .json({ status:"Announcement Not Found For deletion",
        statusCode:404,
        message:"No Announcement found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Announcement Deleted",
      announcement: result,
      request: {
        type: "POST",
        description: "To Create A New Announcements",
        URL: "http://localhost/5000/announcements/",
        body: {
          staff: "staff id",
          student: "student id",
          appointmentDescription:"String"
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
    message:"Error occured while trying to delete an Appointment." });
  }
};
