var mangoose = require("mongoose"),
campground   = require("./models/campgrounds"),
Comment     = require("./models/comments")

// var coment = {
//     content: "blsh yilrkej",
//     author:"rhkf"
// };

var data = [
    {
        name: "salmon creek",
        image:"pics/photo (2).jpeg",    
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Quae fugiat eius maxime placeat in, earum corporis odio onsectetur blanditiis. Accusamus."
    
    },

    {
        name: "heades pit", 
        image:"pics/photo (7).jpeg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Quae fugiat eius maxime placeat in, earum corporis odio onsectetur blanditiis. Accusamus."
    },

    {
        name: "devil's layer",
        image:"pics/photo (4).jpeg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Quae fugiat eius maxime placeat in, earum corporis odio onsectetur blanditiis. Accusamus."
    }

];


function seedDB()
{
    Comment.deleteMany({}, function(err){

        if(err){
            console.log(err);
        }
        else{
            console.log("comment deleted");
        }
    });
    
    campground.deleteMany({}, function(err){

        if(err){

            console.log("error");
        }
        else{

            console.log("campground removed");
        
            data.forEach(function(dataCampgrounds){

                campground.create( dataCampgrounds, function(err, newcampground){
        
                    if(err){
                        console.log(err);
                    }
                    else{
                       Comment.create({
                           author:"some Guy",
                            content:"this is a crazy place to be in december or during the holidays" 
                        }, 
                        function(err, foundComment){
                           
                            newcampground.comments.push(foundComment)
                           
                            newcampground.save();
                        });
                        
                        console.log("created new campground");
                       
                    } 
                        
                });
            });

        }

    });


}


module.exports = seedDB;

