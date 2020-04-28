const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photo: {type: String, required: false, default: ''},
    isAdmin: {type:Boolean, required: false, default: false},
    activeCourse: [{type: Types.ObjectId, ref: 'Course'}],
    finishedCourse: [{type: Types.ObjectId, ref: 'Course'}],
})

module.exports = model('User', schema);
