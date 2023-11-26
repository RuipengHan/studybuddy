const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attachments: [{
        fileName: String,
        filePath: String,
        fileType: String,
        fileSize: String // Size in bytes
    }],
    creationDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: false
    },
    tags: [{
        type: String
    }],
    userDefinedFields: [{
        fieldName: String,
        fieldValue: mongoose.Schema.Types.Mixed // Can be any type of data as per user's choice
    }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
