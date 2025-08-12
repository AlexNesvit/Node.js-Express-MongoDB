const { Schema, model } = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: (props) => `${props.value} is not correct`,
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        //enum: ["admin", "member"],
        enum: {
            values: ["admin", "member"],
            message: "{VALUE} inconue",
        },
    },
    age: Number,
});

userSchema.pre("save", async function() {
    this.email = this.email.toLowerCase();
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model("User", userSchema);