const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const leaderboardSchema = new Schema({
    PlayerName: String,
    Points: {
        type: Number,
        default: 0
    }
});

const LB_QuizZ_default = model('LB_QuizZ_default', leaderboardSchema);
const LB_QuizZ_easy = model('LB_QuizZ_easy', leaderboardSchema);
const LB_QuizZ_normal = model('LB_QuizZ_normal', leaderboardSchema);
const LB_QuizZ_hard = model('LB_QuizZ_hard', leaderboardSchema);

module.exports = {
    LB_QuizZ_default: LB_QuizZ_default,
    LB_QuizZ_easy: LB_QuizZ_easy,
    LB_QuizZ_normal: LB_QuizZ_normal,
    LB_QuizZ_hard: LB_QuizZ_hard
};