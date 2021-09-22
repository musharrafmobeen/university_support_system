const documentModel = require("../models/documents");
const mongoose = require("mongoose");


exports.get_Documents = async (req, res, next) => {
  try {
    const allDocumentDocs = await documentModel
      .find()
      .populate("student")
      .exec();

    const response = {
      count: allDocumentDocs.length,
      documents: allDocumentDocs.map((documentDoc) => {
        return {
          _id: documentDoc._id,
          path: documentDoc.path,
          student: documentDoc.student,
          request: {
            type: "GET",
            URL: "http://localhost:5000/documents/(studentReg)",
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
      message: "Got an error while trying to get Documents from the database.",
    });
  }
};

exports.add_Document = async (req, res, next) => {
  console.log(req.body.email);
  try {
    const document = new documentModel({
      _id: new mongoose.Types.ObjectId(),
      path: req.file.path,
      student: req.body.student,
    });

    const result = await document.save();

    console.log(result);
    res.status(201).json({
      message: "Category Created",
      createdDocument: {
        path: result.path,
        student: result.student,
        _id: result._id,
        request: {
          type: "GET",
          URL: "http://localhost:5000/documents/(studentReg)",
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to create a new document.",
    });
  }
};

exports.get_A_Document = async (req, res, next) => {
  try {
    const documentDoc = await documentModel.find().populate("student").exec();
    let documentFound = false;
    let documentIndex = 0;

    for (let i = 0; i < documentDoc.length; i++) {
      if (
        req.params.studentReg.localeCompare(documentDoc[i].student.reg) == 0
      ) {
        documentFound = true;
        documentIndex = i;
      }
    }

    if (documentDoc) {
      res.status(200).json({
        document: documentDoc[documentIndex],
        request: {
          type: "GET",
          description: "Get all documents",
          URL: "http://localhost:5000/documents",
        },
      });
    } else {
      res.status(404).json({
        status: "Document Not Found",
        statusCode: 404,
        message: "No document found with the given name.",
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
      message: "Error occured while trying to get a specific Document.",
    });
  }
};

exports.update_Document = async (req, res, next) => {
  try {
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      updateOps[ops] = req.body[ops];
    }

    const result = await documentModel
      .updateOne({ student: req.params.student }, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Category Updated",
      updated_document: await employeeModel
        .find({ student: req.params.studentReg })
        .populate("student")
        .exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/documents/studentReg",
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
      message: "Error occured while trying to update a Document.",
    });
  }
};

exports.delete_Document = async (req, res, next) => {
  try {
    const id = await documentModel.findOne({ student: req.params.studentReg }).select('_id').exec();
    const result = await documentModel
      .deleteOne({ student: req.params.studentReg })
      .exec();
      if(result == null){
        res
        .status(404)
        .json({ status:"Document Not Found For deletion",
        statusCode:404,
        message:"No Document found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Document Deleted",
      document: id,
      request: {
        type: "POST",
        description: "To Create A New Document",
        URL: "http://localhost/5000/documents/",
        body: {
          file: "file",
          student: "Object id",
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
      message: "Error occured while trying to delete a document.",
    });
  }
};
