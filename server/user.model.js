const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardId: { type: String, required: true },
  cardName: String,
  cardPrice: Number,
  cardUrl: String,
  cardPicture: String,
  count: Number
}, { _id: false });

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  collection: {
    type: Map,
    of: cardSchema,
    default: {}
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User; 