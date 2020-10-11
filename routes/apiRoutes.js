let mongoose = require("mongoose");
const Workout = require("../model/workoutModel");


mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = app => {
        // create a new workout if not existed
        app.post("/api/workouts", (req, res) => {
            Workout.create({day: new Date().setDate(new Date().getDate()-10)})
                .then(dbWorkout => {console.log(dbWorkout);
                    res.json(dbWorkout)})
                .catch(err => {res.status(500).send(err)});
        });
        
        app.get("/api/workouts", (req, res) => {
            console.log("=======");
            Workout.find({})
                .then(data => {res.json(data)})
                .catch(err => {res.status(500).send(err)});
        });

        // allows for adding exercises to current workout \\
        app.put("/api/workouts/:id", (req,res) => {
            console.log(req.body);
            console.log("--------");
            const workoutID = req.params.id;
            Workout.update({_id: workoutID}, {$push: {exercises: req.body}})
                .then(data => {console.log(data);
                                res.json(data);})
                .catch(err => {res.status(500).send(err)});
        });

        app.get("/api/workouts/range", (req, res) => {
            Workout.find({})
                .then(dbWorkout => {res.json(dbWorkout);})
                .catch(err => {res.status(500).send(err);})
        })
}
