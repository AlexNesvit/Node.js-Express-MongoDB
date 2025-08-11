const { Schema } = require("mongoose");
const { isEmail } = require('validator');

const userSchema = Schema({
    name: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlinght: 8,
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
});

module.exports = model('User', userSchema);