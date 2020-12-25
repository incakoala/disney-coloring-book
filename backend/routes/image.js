// creating a route
const router = require('express').Router();
const auth = require("../middleware/auth");
// requiring the model
const Image = require('../models/image.model');

// posts the blank svg image title, component name, and cloudinary url to the database
router.post('/add', async (req, res) => {
    try{
      const title = req.body.title; 
      const component = req.body.component; 
      const svg_url = req.body.svg_url;
  
      const newImage = new Image({
        title,
        component,
        svg_url,
      });
      const savedImage = await newImage.save(); 
      res.json(savedImage);
    } catch (err){
        res.status(500).json({error: err.message});
    }
  });

  // gets all blank svg images from the database 
  router.get('/all', async (req, res) => {
    const images = await Image.find({});
    res.json(images);
});

module.exports = router; // standard in router files