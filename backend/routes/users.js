// creating a route
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
// requiring the model
let User = require('../models/user.model');

router.post('/add', async (req, res) => {
  try{
    // destructuring all of the fields out of the request object into variables
    let {username, password, passwordCheck} = req.body;

    if (!username || !password || !passwordCheck){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }
    if (password.length < 5)
      return res.status(400).json({msg: "The password needs to be at least 5 characters long."});
    if (password != passwordCheck)
      return res.status(400).json({msg: "Enter the same password twice for verification."});
    
    // checks if acount with username is already in database 
    const existingUser = await User.findOne({username: username});
    if (existingUser){
      return res.status(400).json({msg: "An account with this username already exists."});
    }

    const salt = await bcrypt.genSalt();
    //returns complete gibberish
    const passwordHash = await bcrypt.hash(password, salt);

    // creates an instance of a new user with request info entered by user
    const newUser = new User({username, 
      password : passwordHash
    });
    const savedUser = await newUser.save(); 
    res.json(savedUser);

  } catch (err){
      res.status(500).json({error: err.message});
  }
});

// posts login username and password
router.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body;

    //validate
    if (!username || !password){
      return res.status(400).json({msg: "Not all fields have been entered."});
    }

    // if username is not found
    const user = await User.findOne({username: username});
    if(!user){
      return res.status(400).json({msg: "No account with this username has been registered."});
    }

    // if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password doesn't match
    if (!isMatch){
      return res.status(400).json({msg: "Invalid credentials."});
    }

    // token stores which user has been logged in by using unique id assigned to an object in the database
    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      },
    })

  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/delete', auth, async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// checks if the token created is valid
router.post("/tokenIsValid", async (req, res) => {
  try{
    const token = req.header("x-auth-token");
    if (!token){
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if(!user){
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// gets a single logged in user
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    username: user.username
  });
});

module.exports = router; // standard in router files