//requring framworks for project
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    campground  = require("./models/campgrounds"),
    comment     = require("./models/comments"),
    seedDB      = require("./seeds")

//setting up the project file and directory
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));

//connecting to mongodb 
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//seed the database with temporary data

seedDB();

//the app route

//**show the home page */
app.get("/", function(req, res){
    
    campground.find({}, function(err, found){
        console.log(found);
    });
    res.render("home");
} );

//**index : show all the campground in the DB */
app.get("/campground", function(req, res){

    //get all campground from DB
    campground.find({}, function(error, allCampgrounds){

        if(error){
            console.log("An error occured while looking for the campgrounds");
        }
        else{

            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
   
} );


//** new route: shows form to create new campground */
app.get("/campground/new", function(req, res){

    // render a form to create a new campground
    res.render("campgrounds/newCampground");
});

//**create route: create new campground */
app.post("/campground", function(req, res) {

    //get information from the form 
    var name = req.body.name;
    var campgroundImage = req.body.campground;
    var desc = req.body.description;

    //create a new campground obeject
    var newCampground = {

        name: name, 
        image: campgroundImage,
        description:desc
    };

    //add the new object to the data base
    campground.create( newCampground, function(err, newcampground){
        
        if(err){
            console.log(err);
        }
        else{

            //redirect back to the campground page
            res.redirect("/campground");
        }
    });
    
} );

//**show more info about a specific campground */
app.get("/campground/:id", function(req, res){

    var id = req.params.id;

    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){

        if(err){
            console.log(err);
        }
        else{

            res.render("campgrounds/show", {campground: foundCampground});
        }

    });

});

app.get("/campground/:id/comments/new", function(req, res){

    var id = req.params.id;
    
    campground.findById(id, function(err, foundCampground){

        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("comments/new", {campground: foundCampground});
        }

    });

});


app.post("/campground/:id/comments", function(req, res){

    var id = req.params.id;

    campground.findById(id, function(err, foundCampground){

        if(err){
            console.log(err);
        }
        else{

            comment.create(req.body.comment, function(err, newComment){

                foundCampground.comments.push(newComment);
                foundCampground.save();
            });

           res.redirect("/campground/" + id);
        }

    });

});




//** run the app on the sever */
app.listen(8080, function(){

    console.log('Yelpcamp sever has started');
} );


