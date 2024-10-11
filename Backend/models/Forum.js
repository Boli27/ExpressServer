import { Schema, model } from "mongoose";

const forumSchema = Schema({
    name:{
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const Forum = model("Forum". forumSchema)

export default Forum