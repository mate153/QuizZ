const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const leaderboardSchema = new Schema({
    PlayerName: String,
    Points: {
        type: Number,
        default: 0
    }
});

const LB_TimeAttack_30 = model('LB_TimeAttack_30', leaderboardSchema);
const LB_TimeAttack_60 = model('LB_TimeAttack_60', leaderboardSchema);
const LB_TimeAttack_90 = model('LB_TimeAttack_90', leaderboardSchema);
const LB_TimeAttack_120 = model('LB_TimeAttack_120', leaderboardSchema);
const LB_TimeAttack_150 = model('LB_TimeAttack_150', leaderboardSchema);
const LB_TimeAttack_180 = model('LB_TimeAttack_180', leaderboardSchema);

module.exports = {
    LB_TimeAttack_30: LB_TimeAttack_30,
    LB_TimeAttack_60: LB_TimeAttack_60,
    LB_TimeAttack_90: LB_TimeAttack_90,
    LB_TimeAttack_120: LB_TimeAttack_120,
    LB_TimeAttack_150: LB_TimeAttack_150,
    LB_TimeAttack_180: LB_TimeAttack_180
};