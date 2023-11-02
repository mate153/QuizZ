/*
 ___   ___   ___  ___     _  ___   ___
/ __| / _ \/__   \\  \   // / _ \/__   \
\__ \|  __/   |  | \  \ // |  __/   |  |
\___/ \___|   |__|  \___/   \___|   |__|
*/


//DotEnv//
require('dotenv').config();

const username = process.env.db_username;
const password = process.env.db_password;
const cluster = process.env.db_cluster;

//Mongoose//
const mongoose = require('mongoose');

async function isConnect(){
    try{
        await mongoose.connect('mongodb+srv://'+username+':'+password+'@'+cluster+'.mongodb.net/quiz')
        console.log('connected to database');
    }catch(err){
        console.log(err)
    }
}
isConnect();

//Model//
const Quiz = require("./models/QuizModel.js");
const {LB_TimeAttack_30} = require("./models/LB_TimeAttack.js");
const {LB_TimeAttack_60} = require("./models/LB_TimeAttack.js");
const {LB_TimeAttack_90} = require("./models/LB_TimeAttack.js");
const {LB_TimeAttack_120} = require("./models/LB_TimeAttack.js");
const {LB_TimeAttack_150} = require("./models/LB_TimeAttack.js");
const {LB_TimeAttack_180} = require("./models/LB_TimeAttack.js");

const {LB_QuizZ_default} = require("./models/LB_QuizZ.js");
const {LB_QuizZ_easy} = require("./models/LB_QuizZ.js");
const {LB_QuizZ_normal} = require("./models/LB_QuizZ.js");
const {LB_QuizZ_hard} = require("./models/LB_QuizZ.js");

const UserData = require("./models/UserDataModel.js")

//Express//
const express = require('express');
const app = express();
app.use(express.json());

//Encryption//
const bcrypt = require('bcryptjs');

//Webtoken//
const jwt = require('jsonwebtoken');

//Cors//
const cors = require('cors');
app.use(cors({origin:'http://localhost:3000'}));


//Code//
app.get('/api/data', (req, res) => {
    Quiz.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));  
})

//
const hashPassword = async (password) => {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

app.get('/api/leaderboard/timeattack/:gamemode', (req, res) => {
  const gamemode = Number(req.params.gamemode)
  const modelName = `LB_TimeAttack_${gamemode}`;
  const Model = mongoose.model(modelName);

  Model.find()
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log(err));  
})

app.get('/api/leaderboard/quizz/:gamemode', (req, res) => {
  const gamemode = req.params.gamemode
  const modelName = `LB_QuizZ_${gamemode}`;
  const Model = mongoose.model(modelName);

  Model.find()
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log(err));  
})

app.post('/api/handleUser/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
  
    // Check if userEmail and userName exist in database
    const userExists = await UserData.exists({
      $or: [{ UserName: userName }, { Email: userEmail }]
    });
  
    if (userExists) {
      res.send({ message: 'User already exists' });
      return;
    }
  
    //If user doesn't exist, add to database
    try {
      await UserData.create({
        UserName: userName,
        Email: userEmail,
        Password: await hashPassword(userPassword)
      });
      res.json({ message: 'User created successfully', registrated: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});


app.post('/api/handleUser/login', async (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    try {
        //Find user in database by email
        const user = await UserData.findOne({ Email: userEmail });

        //Check if user exists
        if (!user) {
            throw new Error('Invalid email or password');
        }

        //Compare passwords
        const isPasswordValid = await bcrypt.compare(userPassword, user.Password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        //Return success message
        res.send({ message: 'Login successful', success: true, user: user.UserName});

    } catch (error) {
        console.error(error);
        res.send({ message: error.message, success: false });
    }
});

app.patch('/api/scoreboard/timeattack/:number', async(req, res) => {
  const gamemode = Number(req.params.number)
  const modelName = `LB_TimeAttack_${gamemode}`;
  const Model = mongoose.model(modelName);

  try{
    const userProfile =  await Model.findOne({PlayerName: req.body.user});
    if(userProfile === null) {
      await Model.create({
        PlayerName: req.body.user,
        Points: req.body.points,
      });
      return res.json("OK"); 
    } else {
      if(userProfile.Points < req.body.points){
        userProfile.Points = req.body.points;
      }
      userProfile.save();
      return res.json("OK");  
    }
  }catch(err){
    console.log(err);
  }
});

app.patch('/api/scoreboard/quizz/:difficulty', async(req, res) => {
  const gamemode = req.params.difficulty
  const modelName = `LB_QuizZ_${gamemode}`;
  const Model = mongoose.model(modelName);

  try{
    const userProfile =  await Model.findOne({PlayerName: req.body.user});
    if(userProfile === null) {
      await Model.create({
        PlayerName: req.body.user,
        Points: req.body.points,
      });
      return res.json("OK"); 
    } else {
      if(userProfile.Points < req.body.points){
        userProfile.Points = req.body.points;
      }
      userProfile.save();
      return res.json("OK");  
    }
  }catch(err){
    console.log(err);
  }
});

app.listen(3001, () => console.log('Server started on port 3001'));