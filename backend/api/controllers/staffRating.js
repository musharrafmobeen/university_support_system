const staffRatingModel = require("../models/staffRating");
const grievanceModel = require("../models/grievances");
const mongoose = require("mongoose");


exports.get_Staff_Ratings = async (req, res, next) => {
  try {
    const allRatingDocs = await staffRatingModel
      .find()
      .select('_id staff rating ratingCount')
      .exec();

    const response = {
      count: allRatingDocs.length,
      ratings: allRatingDocs.map((staffRatingDoc) => {
        return {
          _id: staffRatingDoc._id,
          rating: staffRatingDoc.rating,
          averageRating:staffRatingDoc.averageRating,
          ratingCount: staffRatingDoc.ratingCount,
          staff: staffRatingDoc.staff,
          request: {
            type: "GET",
            URL: "http://localhost:5000/staffratings/" + staffRatingDoc.staff,
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
    message:"Got an error while trying to get ratings from the database." });
  }
};

exports.add_Staff_Rating = async (req, res, next) => {
  try {
    const staffRatingDoc = await staffRatingModel
      .find({staff: req.body.staff})
      .exec();

    

    let ratingAlreadySubmitted = false;
    if(staffRatingDoc.length>0){
        for(let i = 0 ; i<staffRatingDoc[0].student.length; i++){
            if(staffRatingDoc[0].student[i].equals(req.body.student)){
                ratingAlreadySubmitted = true;
            }
        }
    }
    

    console.log(ratingAlreadySubmitted);

    if (ratingAlreadySubmitted) {
      return res.status(409).json({
        status:"Rating already submitted",
        statusCode:409,
        message:"You Have Already Submitted Your Rating For The Following Staff",
      });
    } else {
        //   let incharge = null;
        //   if(req.body.incharge != undefined){
        //     incharge = req.body.incharge;
        //   }
         
          const ratingObject = await staffRatingModel.findOne({staff: req.body.staff}).select('rating ratingCount').exec();
          console.log("adrak");
          
          console.log(ratingObject);
          let averageRating = req.body.rating;
          let ratingCount = 1;
          if(ratingObject){
            for(let i = 0; i<ratingObject.rating.length;i++){
                averageRating =  parseInt(ratingObject.rating[i]) + parseInt(averageRating);
                console.log(i+" "+averageRating);
            }
            averageRating = averageRating/(ratingObject.rating.length+1);
            ratingCount  = parseInt(ratingObject.ratingCount) + parseInt(ratingCount);
            const result = await staffRatingModel.findOneAndUpdate({staff: req.body.staff},{$set:{ratingCount:ratingCount, averageRating:averageRating},$push:{student:req.body.student,rating:req.body.rating}}).exec();
            res.status(201).json({
                message: "Rating Added",
                createdRating: {
                  rating: result.rating,
                  ratingCount: result.ratingCount,
                  averageRating:result.averageRating,
                  staff: result.staff,
                  _id: result._id,
                  response: {
                    type: "GET",
                    URL: "http://localhost:5000/staffratings/" + result.staff,
                  },
                },
              });
          }
          else{
            console.log("adrak");
            const staffRating = new staffRatingModel();

              staffRating._id = new mongoose.Types.ObjectId();
              staffRating.rating.push(req.body.rating);
              staffRating.ratingCount = ratingCount;
              staffRating.staff = req.body.staff;
              staffRating.averageRating = req.body.rating;
              staffRating.student.push(req.body.student);

              console.log("adrak");

              const result = await staffRating.save();
      
              res.status(201).json({
                message: "Rating Added",
                createdRating: {
                  rating: result.rating,
                  ratingCount: result.ratingCount,
                  averageRating: result.averageRating,
                  staff: result.staff,
                  _id: result._id,
                  response: {
                    type: "GET",
                    URL: "http://localhost:5000/staffratings/" + result.staff,
                  },
                },
              });
          }

          console.log(ratingObject);
          
         
        }
    }
    catch (err) {
    res.status(500).json({ error:{
      status:"Failed",
      statusCode:500,
      errorMessage:err
    }, 
    message:"Error occured while trying to Add a new rating." });
  }
};

exports.get_A_Category = async (req, res, next) => {
  try {

    const dataToFindCategoryBy = {
      [req.body.getBy]: req.params.categoryData
    }
    const categoryDoc = await staffRatingModel
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
      updateOps[ops] = req.body[ops];
    }

    const result = await staffRatingModel
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
    // const id = await categoryModel.findOne(dataToDeleteCategoryBy).select('_id').exec();
    const result = await staffRatingModel
      .findOneAndDelete(dataToDeleteCategoryBy)
      .exec();
      const grievanceDeleted = await grievanceModel.updateOne({category:result._id}, { $set: {category:null} }).exec();
      if(result == null){
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
