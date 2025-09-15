const { Schema, model } = require('mongoose');

//project schema, has required name and user reference, description is optional
const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Project = model('Project', projectSchema);
module.exports = Project;