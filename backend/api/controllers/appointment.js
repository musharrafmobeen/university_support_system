const appointmentModel = require("../models/appointment");
const mongoose = require("mongoose");

exports.get_Appointments = async (req, res, next) => {
 
  try {
    const allAppointmentDocs = await appointmentModel
      .find()
      .exec();

      console.log(allAppointmentDocs);

    const response = {
      count: allAppointmentDocs.length,
      appointsments: allAppointmentDocs.map((appointmentDoc) => {
        return {
          _id: appointmentDoc._id,
          staff: appointmentDoc.staff,
          student: appointmentDoc.student,
          isGranted: appointmentDoc.isGranted,
          appointment_ID: appointmentDoc.appointment_ID,
          appointmentDescription: appointmentDoc.appointmentDescription,
          request: {
            type: "GET",
            URL: "http://localhost:5000/appointments/" + appointmentDoc._id,
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
    message:"Got an error while trying to get appointments from the database." });
  }
};

exports.get_Staff_Appointments = async (req, res, next) => {
 
  try {
    const dataToFindAppointmentBy = {
      'staff': req.params.appointmentData
    }
    const allAppointmentDocs = await appointmentModel
      .find(dataToFindAppointmentBy)
      .populate('student')
      .exec();

      console.log(allAppointmentDocs);

    const response = {
      count: allAppointmentDocs.length,
      appointsments: allAppointmentDocs.map((appointmentDoc) => {
        return {
          _id: appointmentDoc._id,
          staff: appointmentDoc.staff,
          student: appointmentDoc.student,
          isGranted: appointmentDoc.isGranted,
          appointment_ID: appointmentDoc.appointment_ID,
          appointmentDescription: appointmentDoc.appointmentDescription,
          request: {
            type: "GET",
            URL: "http://localhost:5000/appointments/" + appointmentDoc._id,
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
    message:"Got an error while trying to get appointments from the database." });
  }
};

exports.add_Appointments= async (req, res, next) => {
  try {
    const appointmentDoc = await appointmentModel
      .find({ staff: req.body.staff, student: req.body.student})
      .exec();

    if (appointmentDoc.length >= 1) {
      return res.status(409).json({
        status:"Appointment already exists",
        statusCode:409,
        message:"If You want you can schedule an appointment with another staff",
      });
    } else {
        //   let incharge = null;
        //   if(req.body.incharge != undefined){
        //     incharge = req.body.incharge;
        //   }
            let appointments = await appointmentModel.find().exec();
            const appointmentID = appointments[appointments.length-1].appointment_ID+1;
          
          const appointment = new appointmentModel({
            _id: new mongoose.Types.ObjectId(),
            staff:req.body.staff,
            student:req.body.student,
            appointmentDescription: req.body.appointmentDescription,
            appointment_ID: appointmentID,
            isGranted: false
          });
          console.log(appointment);
          const result = await appointment.save();
  
          res.status(201).json({
            message: "Category Created",
            createdAppointment: {
                _id: result._id,
                staff:result.staff,
                student:result.student,
                appointmentDescription: result.appointmentDescription,
                isGranted: false,
              response: {
                type: "GET",
                URL: "http://localhost:5000/appointments/" + result._id,
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
    message:"Error occured while trying to create a new appointment." });
  }
};

exports.get_An_Appointment = async (req, res, next) => {
  try {

    const dataToFindAppointmentBy = {
      [req.body.getBy]: req.params.appointmentData
    }
    const appointmentDoc = await appointmentModel
      .find(dataToFindAppointmentBy)
      .exec();
    console.log(appointmentDoc);
    if (appointmentDoc) {
      res.status(200).json({
        appointment: appointmentDoc,
        request: {
          type: "GET",
          description: "Get all appointments",
          URL: "http://localhost:5000/appointments",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status:"Appointment Not Found",
          statusCode:404,
          message:"No Appointment found with the given id." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to get a specific Appointment."});
  }
};

exports.update_Appointment = async (req, res, next) => {
  try {
    const dataToUpdateAppointmentBy = {
      [req.body.updateBy]: req.params.appointmentData
    }
    console.log(dataToUpdateAppointmentBy)
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("updateBy") != 0){
        console.log(ops);
        updateOps[ops] = req.body[ops];
      }
    }

    const appointmentCheck = await appointmentModel.findOne(dataToUpdateAppointmentBy).exec();

    if(updateOps['isGranted'].localeCompare('true') == 0 && appointmentCheck.isGranted == false){
        console.log("addrakk");
        const appointments = await appointmentModel.find({isGranted:true}).exec();
        if(appointments.length > 0){
            updateOps['appointment_ID'] = appointments[appointments.length -1].appointment_ID + 1;
        }
        else{
            console.log("adrak");
            updateOps['appointment_ID'] = 1;
        }
    }


    const result = await appointmentModel
      .findOneAndUpdate(dataToUpdateAppointmentBy, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Appointment Updated",
      updated_appointment: await appointmentModel.findOne(dataToUpdateAppointmentBy).exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/appointments/" + req.params.appointmentData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update an Appointment." });
  }
};

exports.delete_Appointment = async (req, res, next) => {
  try {
    const dataToDeleteAppointmentBy = {
      [req.body.deleteBy]: req.params.appointmentData
    }

    const result = await appointmentModel
      .findOneAndDelete(dataToDeleteAppointmentBy)
      .exec();

      if(result == null){
        res
        .status(404)
        .json({ status:"Appointment Not Found For deletion",
        statusCode:404,
        message:"No Appointment found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Appointment Deleted",
      appointment: result,
      request: {
        type: "POST",
        description: "To Create A New Appointments",
        URL: "http://localhost/5000/appointments/",
        body: {
          announcment: "String",
          announcerType: "String",
          visibleTo:"Enum String"
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
