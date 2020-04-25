const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title:{type: String, default: ""},
    content:{type: String, default: ""},
    Date:{type: Date, default: Date.now},
    photo: {type: String, required: false, default: ''},
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Course', schema);
