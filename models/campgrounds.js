var mongoose = require("mongoose"),
Comment      = require("./comments");

//setting up the app Schema
var campgroundSchema = new mongoose.Schema({

    name: {type:String},
    image:String,
    description:{type:String},
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

});


var campground = mongoose.model("Campground", campgroundSchema);


module.exports = campground;

