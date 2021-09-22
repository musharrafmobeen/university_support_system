const documentRequestModel = require("../models/documentRequests");
const mongoose = require("mongoose");

exports.get_Document_Requests = async (req, res, next) => {
  try {
    const allDocumentRequestsDocs = await documentRequestModel.find().exec();

    console.log(allDocumentRequestsDocs);

    const response = {
      count: allDocumentRequestsDocs.length,
      documentRequests: allDocumentRequestsDocs.map((documentRequestDoc) => {
        return {
          _id: documentRequestDoc._id,
          staff: documentRequestDoc.staff,
          student: documentRequestDoc.student,
          isGranted: documentRequestDoc.isGranted,
          documentUrl: documentRequestDoc.documentUrl,
          documentType: documentRequestDoc.documentType,
          dateGranted: documentRequestDoc.dateGranted,
          request: {
            type: "GET",
            URL:
              "http://localhost:5000/documentrequests/" +
              documentRequestDoc._id,
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
      message:
        "Got an error while trying to get document requests from the database.",
    });
  }
};

exports.add_Document_Request = async (req, res, next) => {
  try {
    console.log(req);
    const documentRequestDoc = await documentRequestModel
      .find({ student: req.body.student, documentType: req.body.documentType })
      .exec();
      

    if (documentRequestDoc.length >= 1) {
      return res.status(409).json({
        status: "Document already exists",
        statusCode: 409,
        message:
          "The request for the document you specified has already been lodged ",
      });
    } else {
      let filePath = "";
      if (req.file != undefined) {
        filePath = req.file.path;
      }

      let dateGranted = "";

      const documentRequest = new documentRequestModel({
        _id: new mongoose.Types.ObjectId(),
        staff: req.body.staff,
        student: req.body.student,
        documentUrl: filePath,
        documentType: req.body.documentType,
        isGranted: false,
        dateGranted: dateGranted,
      });
      // console.log(documentRequest);
      const result = await documentRequest.save();

      res.status(201).json({
        message: "Document Request Created",
        createdDocuementRequest: {
          _id: result._id,
          staff: result.staff,
          student: result.student,
          documentUrl: result.documentUrl,
          documentType: result.documentType,
          isGranted: result.isGranted,
          dateGranted: result.dateGranted,
          response: {
            type: "GET",
            URL: "http://localhost:5000/documentrequests/" + result._id,
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
      message: "Error occured while trying to create a new documentRequest.",
    });
  }
};

exports.add_Document_Request_Mobile = async (req, res, next) => {
  try {
    
    const student = {
      _id:req.body.id,
      name:req.body.name,
      reg:req.body.reg,
      faculty:req.body.faculty,
      batch:req.body.batch,
      course:req.body.course,
      passPortNumber:req.body.passPortNumber,
      fatherName:req.body.fatherName,
      initialDateOfJoining:req.body.initialDateOfJoining,
      currentSmester:req.body.currentSmester,
      department:req.body.department,
      desiredUni:req.body.desiredUni,
      nationality:req.body.nationality,
    }


    const documentRequestDoc = await documentRequestModel
      .find({ student: student, documentType: req.body.documentType })
      .exec();
      

    if (documentRequestDoc.length >= 1) {
      return res.status(409).json({
        status: "Document already exists",
        statusCode: 409,
        message:
          "The request for the document you specified has already been lodged ",
      });
    } else {
      let filePath = "";
      if (req.file != undefined) {
        filePath = req.file.path;
      }

      let dateGranted = "";

      

      const documentRequest = new documentRequestModel({
        _id: new mongoose.Types.ObjectId(),
        staff: req.body.staff,
        student: student,
        documentUrl: filePath,
        documentType: req.body.documentType,
        isGranted: false,
        dateGranted: dateGranted,
      });
      // console.log(documentRequest);
      const result = await documentRequest.save();

      res.status(201).json({
        message: "Document Request Created",
        createdDocuementRequest: {
          _id: result._id,
          staff: result.staff,
          student: result.student,
          documentUrl: result.documentUrl,
          documentType: result.documentType,
          isGranted: result.isGranted,
          dateGranted: result.dateGranted,
          response: {
            type: "GET",
            URL: "http://localhost:5000/documentrequests/" + result._id,
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
      message: "Error occured while trying to create a new documentRequest.",
    });
  }
};

exports.get_A_Document_Request = async (req, res, next) => {
  try {
    const dataToFindDocumentRequestBy = {
      [req.body.getBy]: req.params.documentRequestData,
    };
    const documentRequestDoc = await documentRequestModel
      .find(dataToFindDocumentRequestBy)
      .exec();
    console.log(documentRequestDoc);
    if (documentRequestDoc) {
      res.status(200).json({
        documentRequest: documentRequestDoc,
        request: {
          type: "GET",
          description: "Get all Document Requests",
          URL: "http://localhost:5000/documentrequests",
        },
      });
    } else {
      res.status(404).json({
        status: "Document Request Not Found",
        statusCode: 404,
        message: "No Document Request found with the given id.",
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
      message: "Error occured while trying to get a specific Document Request.",
    });
  }
};

exports.update_Document_Request = async (req, res, next) => {
  try {
    const dataToUpdateDocumentRequestBy = {
      [req.body.updateBy]: req.params.documentRequestData,
    };

    console.log(dataToUpdateDocumentRequestBy);
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      if (ops.localeCompare("updateBy") != 0) {
        console.log(ops);
        updateOps[ops] = req.body[ops];
      }
    }
    let filePath = "";
    if (req.file != undefined) {
      filePath = req.file.path;
    }

    updateOps["documentUrl"] = filePath;

    if ("isGranted" in updateOps) {
      if (updateOps["isGranted"] == "true" || update["isGranted"] == true) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const dateTime = date + " " + time;

        updateOps["dateGranted"] = dateTime;
      }
    }

    const result = await documentRequestModel
      .findOneAndUpdate(dataToUpdateDocumentRequestBy, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Document Request Updated",
      updated_documentRequest: await documentRequestModel
        .findOne(dataToUpdateDocumentRequestBy)
        .exec(),
      request: {
        type: "GET",
        URL:
          "http://localhost/5000/documentrequests/" +
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
      message: "Error occured while trying to update a Document Request.",
    });
  }
};

exports.delete_Docement_Request = async (req, res, next) => {
  try {
    const dataToDeleteDocumentRequestBy = {
      [req.body.deleteBy]: req.params.documentRequestData,
    };
    console.log(dataToDeleteDocumentRequestBy);
    // const id = await categoryModel.findOne(dataToDeleteCategoryBy).select('_id').exec();
    const result = await documentRequestModel
      .findOneAndDelete(dataToDeleteDocumentRequestBy)
      .exec();

    console.log(result);

    if (result == null) {
      res
        .status(404)
        .json({
          status: "document Request Not Found For deletion",
          statusCode: 404,
          message: "No Document Request found that has the given id.",
        });
    } else {
      res.status(200).json({
        message: "Document Request Deleted",
        documentRequest: result,
        request: {
          type: "POST",
          description: "To Create A New Document Request",
          URL: "http://localhost/5000/documentrequests/",
          body: {
            staff: "staff id",
            student: "student id",
            documentType: "String",
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
      message: "Error occured while trying to delete a Document Request.",
    });
  }
};
