const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true
    },
    description: String,
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['To do', 'In progress', 'Done']
    },
    dueDate: Date,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

const Task = model('Task', taskSchema);
module.exports = Task;