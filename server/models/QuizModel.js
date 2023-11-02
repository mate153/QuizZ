const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quizSchema = new Schema({    
    Difficulty: String,
    Question: String,
    A: String,
    B: String,
    C: String,
    D: String,
    Answer: String,
    Category: String
});

module.exports = model('Quiz', quizSchema);