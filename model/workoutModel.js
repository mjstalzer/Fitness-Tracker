const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date
    },
    exercises: [{
        type: {
            type: String,
        },
        name: {
            type: String,
            trim: true,
            required: [true, "Please give this exercise a name!!!"]
        },
        weight: {
            type: Number,
            trim: true,
            required: [true, "Please give this exercise some weight!!!"]
        },
        reps: {
            type: Number,
            trim: true,
            required: [true, "Please give this exercise a number of sets!!!"]
        },
        sets: {
            type: Number,
            trim: true,
            required: [true, "Please give this exercise a number of reps!!!"]
        },
        duration: {
            type: Number,
            trim: true,
            required: [true, "Please give this exercise an amount of time!!!"]
        },
        distance: {
            type: Number,
            trim: true,
            required: [true, "Please give this cardio exercise a distance!!!"]
        },
    }]

},
    {
        toJSON: {
            virtuals: true
        }
    });

WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout