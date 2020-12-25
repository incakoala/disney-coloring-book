// creating a route
const router = require('express').Router();
const auth = require("../middleware/auth");
// requiring the model
const userImage = require('../models/user_images.model');

// Gets all of a specific user's images that have been showcased by user
router.get('/', async (req, res) => {
  const images = await userImage.find({public : true});
  res.json(images);
});

// Gets all of a specific user's images
router.get('/all', auth, async (req, res) => {
  const images = await userImage.find({ userId: req.user });
  res.json(images);
});

// Posts an image for a specific user 
router.post('/add', auth, async (req, res) => {
  try {
    const imageId = req.body.imageId;
    const component = req.body.component;

    // Creates a new instance of a user image with the request information 
    const newUserImage = new userImage({
      imageId,
      component,
      userId: req.user,
    });
    const savedUserImage = await newUserImage.save();
    res.json(savedUserImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gets specific user image for a specific user (uses user image object id)
router.get('/:id', auth, async (req, res) => {
  const image = await userImage.findOne({ userId: req.user, _id: req.params.id });
  res.json(image);
});

// updates existing user image for a specific user with response fill_colors array
router.post('/:id', auth, async (req, res) => {
  const image = await userImage.findOne({ userId: req.user, _id: req.params.id });
  console.log(image)
  image.fill_colors = req.body.fill_colors;
  const savedUserImage = await image.save()
  res.json(savedUserImage);
});

// updates existing user image for a specific user with response public boolean variable value
router.post('/add/:id', auth, async (req, res) => {
  const image = await userImage.findOne({ userId: req.user, _id: req.params.id });
  console.log(image)
  image.public = req.body.public;
  const savedUserImage = await image.save()
  res.json(savedUserImage);
});

// Deletes an image for a specific user
router.delete('/:id', auth, async (req, res) => {
  await userImage.deleteOne({ userId: req.user, _id: req.params.id })
});

module.exports = router; // standard in router files