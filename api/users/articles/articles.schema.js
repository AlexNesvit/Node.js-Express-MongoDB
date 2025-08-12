const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    },
});

module.exports = model("Article", articleSchema);