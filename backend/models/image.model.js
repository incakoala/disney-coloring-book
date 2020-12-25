const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Source:
// https://uxdesign.cc/5-steps-to-create-a-simple-digital-coloring-book-in-react-3d4f5b2af822

// all info we are going to store about image in the database
const imageSchema = new Schema({ 
  title: { type: String, unique: true },
  component: { type: String, unique: true },
  svg_url: { type: String, unique: true },
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;