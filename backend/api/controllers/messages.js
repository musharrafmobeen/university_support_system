const messagesModel = require("../models/messages");
const mongoose = require("mongoose");


exports.get_Messages = async (req, res, next) => {
  try {
    const allMessagesDocs = await messagesModel.find().exec();

    console.log(allMessagesDocs);

    const response = {
      count: allMessagesDocs.length,
      messages: allMessagesDocs.map((messageDoc) => {
        return {
          _id: messageDoc._id,
          sender: messageDoc.sender,
          reciever: messageDoc.reciever,
          message: messageDoc.message,
          request: {
            type: "GET",
            URL: "http://localhost:5000/messages/" + messageDoc._id,
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
      message: "Got an error while trying to get messages from the database.",
    });
  }
};

exports.add_Message = async (req, res, next) => {
  try {
    const messageDoc = await messagesModel
    .find({ sender: req.body.sender, reciever: req.body.reciever})
    .exec();

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

    const message = new messagesModel();


  if (messageDoc.length >= 1) {
    const result = await messagesModel
      .findOneAndUpdate({_id:messageDoc[0]._id}, {$push:{message:{text:req.body.message,flag:req.body.flag,sendTime: dateTime}}})
      .exec();

      res.status(201).json({
        message: "Message Created",
        createdMessage: await messagesModel.findOne({_id:messageDoc[0]._id}).exec(),
          response: {
            type: "GET",
            URL: "http://localhost:5000/messages/" + result._id,
          }
      });


  } else {
      
   
    
    message._id = new mongoose.Types.ObjectId();
    message.sender = req.body.sender;
    message.reciever = req.body.reciever;
    message.message.push({text:req.body.message,flag:req.body.flag,sendTime: dateTime});
    

    console.log(message);
    const result = await message.save();

    res.status(201).json({
      message: "Message Created",
      createdMessage: {
        _id: result._id,
        sender: result.sender,
        reciever: result.reciever,
        message: result.message,
        response: {
          type: "GET",
          URL: "http://localhost:5000/messages/" + result._id,
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
      message: "Error occured while trying to create a new Message.",
    });
  }
};

exports.get_A_Message = async (req, res, next) => {
  try {
    
    const messageDoc = await messagesModel
      .findOne({_id:req.params.messageID})
      .exec();
    console.log(messageDoc);
    if (messageDoc) {
      res.status(200).json({
        message: messageDoc,
        request: {
          type: "GET",
          description: "Get all Messages",
          URL: "http://localhost:5000/messages",
        },
      });
    } else {
      res.status(404).json({
        status: "Message Request Not Found",
        statusCode: 404,
        message: "No Message Request found with the given id.",
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
      message: "Error occured while trying to get a specific Message.",
    });
  }
};

exports.update_Message = async (req, res, next) => {
  try {
    
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
        updateOps[ops] = req.body[ops];
    }

    const result = await messagesModel
      .findOneAndUpdate({_id:req.params.messageID}, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Message Updated",
      updated_Message: await messagesModel
        .findOne({_id:req.params.messageID})
        .exec(),
      request: {
        type: "GET",
        URL:
          "http://localhost/5000/messages/" +
          req.params.documentRequestData,
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
      message: "Error occured while trying to update a Message.",
    });
  }
};

exports.delete_Message = async (req, res, next) => {
  try {
    console.log({_id:req.params.messageID});
    // const id = await categoryModel.findOne(dataToDeleteCategoryBy).select('_id').exec();
    const result = await messagesModel
      .findOneAndDelete({_id:req.params.messageID})
      .exec();

    console.log(result);

    if (result == null) {
      res
        .status(404)
        .json({
          status: "Message Not Found For deletion",
          statusCode: 404,
          message: "No Message found that has the given id.",
        });
    } else {
      res.status(200).json({
        message: "Message Deleted",
        message: result,
        request: {
          type: "POST",
          description: "To Create A New Message",
          URL: "http://localhost/5000/messages/",
          body: {
            sender: "_id",
            reciever: "_id",
            message: "String",
            flag:"binary"
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
      message: "Error occured while trying to delete a Message.",
    });
  }
};
