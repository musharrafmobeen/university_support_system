const categoryModel = require("../models/categories");
const grievanceModel = require("../models/grievances");
const mongoose = require("mongoose");


exports.get_Categories = async (req, res, next) => {
  try {
    const allCategoryDocs = await categoryModel
      .find()
      .populate({path:'incharge',populate:{path:'employee',model:'Employee'}})
      .exec();

    const response = {
      count: allCategoryDocs.length,
      categories: allCategoryDocs.map((categoryDoc) => {
        return {
          _id: categoryDoc._id,
          name: categoryDoc.name,
          incharge: categoryDoc.incharge,
          request: {
            type: "GET",
            URL: "http://localhost:5000/category/" + categoryDoc.name,
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
    message:"Got an error while trying to get categories from the database." });
  }
};

exports.get_Unassigned_Categories = async (req, res, next) => {
  try {
    const allCategoryDocs = await categoryModel
      .find({incharge:null})
      .exec();

    const response = {
      count: allCategoryDocs.length,
      categories: allCategoryDocs.map((categoryDoc) => {
        return {
          _id: categoryDoc._id,
          name: categoryDoc.name,
          incharge: categoryDoc.incharge,
          request: {
            type: "GET",
            URL: "http://localhost:5000/category/" + categoryDoc.name,
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
    message:"Got an error while trying to get categories from the database." });
  }
};

exports.add_Category = async (req, res, next) => {
  try {
    const categoryDoc = await categoryModel
      .find({ name: req.body.name })
      .exec();
      console.log(req.body.name);
    if (categoryDoc.length >= 1) {
      return res.status(409).json({
        status:"Category already exists",
        statusCode:409,
        message:"Give a name to create a new category",
      });
    } else {
          let incharge = null;
          if(req.body.incharge != undefined){
            incharge = req.body.incharge;
          }
  
          
          const category = new categoryModel({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name.toLowerCase(),
            incharge:  incharge
          });
    
          const result = await category.save();
  
          res.status(201).json({
            message: "Category Created",
            createdCategory: {
              name: result.name,
              incharge: result.incharge,
              _id: result._id,
              response: {
                type: "GET",
                URL: "http://localhost:5000/category/" + result.name,
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
    message:"Error occured while trying to create a new category." });
  }
};

exports.get_A_Category = async (req, res, next) => {
  try {

    const dataToFindCategoryBy = {
      [req.body.getBy]: req.params.categoryData
    }
    const categoryDoc = await categoryModel
      .find(dataToFindCategoryBy)
      .populate({path:'incharge',populate:{path:'employee',model:'Employee'}})
      .exec();
    console.log(categoryDoc);
    if (categoryDoc) {
      res.status(200).json({
        category: categoryDoc,
        request: {
          type: "GET",
          description: "Get all categories",
          URL: "http://localhost:5000/category",
        },
      });
    } else {
      res
        .status(404)
        .json({
          status:"Category Not Found",
          statusCode:404,
          message:"No category found with the given name." });
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

exports.update_Category = async (req, res, next) => {
  try {
    const dataToUpdateCategoryBy = {
      [req.body.updateBy]: req.params.categoryData
    }
    console.log(dataToUpdateCategoryBy)
    const updateOps = {};

    for (const ops of Object.keys(req.body)) {
      if(ops.localeCompare("updateBy") != 0){
        console.log(ops);
        updateOps[ops] = req.body[ops];
      }
    }

    const result = await categoryModel
      .findOneAndUpdate(dataToUpdateCategoryBy, { $set: updateOps })
      .exec();
    console.log(updateOps);
    console.log(result);
    res.status(200).json({
      message: "Category Updated",
      updated_category: result._id,
      request: {
        type: "GET",
        URL: "http://localhost/5000/category/" + req.params.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to update a Category." });
  }
};

exports.delete_Category = async (req, res, next) => {
  try {
    const dataToDeleteCategoryBy = {
      [req.body.deleteBy]: req.params.categoryData
    }
    const result = await categoryModel
      .findOneAndDelete(dataToDeleteCategoryBy)
      .exec();
      const grievanceDeleted = await grievanceModel.updateOne({category:result._id}, { $set: {category:null} }).exec();
      if(result = null){
        res
        .status(404)
        .json({ status:"Category Not Found For deletion",
        statusCode:404,
        message:"No Category found that has the given id." });
      }
      else{
    res.status(200).json({
      message: "Category Deleted",
      category: result._id,
      request: {
        type: "POST",
        description: "To Create A New Category",
        URL: "http://localhost/5000/Category/",
        body: {
          name: "String",
          incharge: "staffs _id",
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
    message:"Error occured while trying to delete a Category." });
  }
};
