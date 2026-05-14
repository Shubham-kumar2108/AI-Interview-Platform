import mongoose from "mongoose";

const interviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        questions: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Interview = mongoose.model(
    "Interview",
    interviewSchema
);

export default Interview;