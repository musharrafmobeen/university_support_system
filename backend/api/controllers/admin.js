const adminModel = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.get_Admins = async (req, res, next) => {
  try {
    const allAdminDocs = await adminModel
      .find()
      .select("name email admin_ID _id")
      .exec();

    const response = {
      count: allAdminDocs.length,
      admins: allAdminDocs.map((adminDoc) => {
        return {
          admin_ID: adminDoc.admin_ID,
          _id: adminDoc._id,
          name: adminDoc.name,
          email: adminDoc.email,
          adminImage: adminDoc.adminImage,
          creationTime: adminDoc.creationTime,
          lastUpdated: adminDoc.lastUpdated,
          request: {
            type: "GET",
            URL: "http://localhost:5000/admin/" + adminDoc.admin_ID,
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
      message: "Got an error while trying to get admins from the database.",
    });
  }
};

exports.add_Admin = async (req, res, next) => {
  console.log(req.body.email);
  try {
    const adminDoc = await adminModel
      .find({ admin_ID: req.body.admin_ID })
      .exec();
    if (adminDoc.length >= 1) {
      return res.status(409).json({
        status: "Admin already exists",
        statusCode: 409,
        message: "Give a new email and pasword to create a new admin",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            error: {
              status: "Auth Failed",
              statusCode: 401,
              errorMessage: err,
            },
            message: "No User Found with given Email and Password.",
          });
        } else {
          let imagePath = ""
          if(req.file != undefined){
            imagePath = req.file.path;
          }
          else{
            imagePath = "uploads\default.jpg";
          }
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
          const admin = new adminModel({
            _id: new mongoose.Types.ObjectId(),
            admin_ID: req.body.admin_ID,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            adminImage: imagePath,
            creationTime: dateTime,
            lastUpdated: dateTime,
          });

          const result = await admin.save();

          console.log(result);
          res.status(201).json({
            message: "Admin Created",
            createdProduct: {
              admin_ID: result.admin_ID,
              name: result.name,
              email: result.email,
              adminImage: result.adminImage,
              creationTime: result.creationTime,
              lastUpdated: result.lastUpdated,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/admin/" + result.admin_ID,
              },
            },
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        status: "Failed",
        statusCode: 500,
        errorMessage: err,
      },
      message: "Error occured while trying to create a new admin.",
    });
  }
};

exports.get_An_Admin = async (req, res, next) => {
  try {
    const dataToFindAdminBy = { [req.body.getBy]: req.params.AdminData };
    const staffDoc = await adminModel
      .find(dataToFindAdminBy)
      .select("name email admin_ID _id")
      .exec();
    console.log(staffDoc);
    if (staffDoc) {
      res.status(200).json({
        admin: staffDoc,
        request: {
          type: "GET",
          description: "Get all admins",
          URL: "http://localhost:5000/admin",
        },
      });
    } else {
      res.status(404).json({
        status: "Admin Not Found",
        statusCode: 404,
        message: "No admin found with the given credentials.",
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
      message: "Error occured while trying to get a specific admin.",
    });
  }
};

exports.update_Admin = async (req, res, next) => {
  try {
    const dataToUpdateAdminBy = { [req.body.updateBy]: req.params.AdminData };
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("password") == 0){
        updateOps[ops]= await new Promise((resolve, reject) => {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        });
      }
      else if (ops.localeCompare("updateBy") != 0) {
        updateOps[ops] = req.body[ops];
      }
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
    updateOps["lastUpdated"] = dateTime;

    console.log(dataToUpdateAdminBy);
    console.log(updateOps);

    const result = await adminModel
      .updateOne(dataToUpdateAdminBy, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Admin Updated",
      updated_admin: await adminModel.find(dataToUpdateAdminBy).exec(),
      request: {
        type: "GET",
        URL: "http://localhost/5000/admin/" + result.admin_ID,
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
      message: "Error occured while trying to update an admin.",
    });
  }
};

exports.delete_Admin = async (req, res, next) => {
  try {
    const dataToDeleteAdminBy = { [req.body.deleteBy]: req.params.AdminData };
    const id = await adminModel
      .findOne({ dataToDeleteAdminBy })
      .select("_id")
      .exec();
    const result = await adminModel.deleteOne(dataToDeleteAdminBy).exec();
    if (result == null) {
      res
        .status(404)
        .json({
          status: "Admin Not Found For deletion",
          statusCode: 404,
          message: "No Admin found that has the given id.",
        });
    } else {
      res.status(200).json({
        message: "Admin Deleted",
        admin: id,
        request: {
          type: "POST",
          description: "To Create A New Admin",
          URL: "http://localhost/5000/admin/",
          body: {
            admin_ID: "Number",
            name: "String",
            email: "String",
            password: "String",
            adminImage: "file(Image)",
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
      message: "Error occured while trying to delete an admin.",
    });
  }
};
