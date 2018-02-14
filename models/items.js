var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  category: {
    type: String
  },
  availbility: {
    type: String
  },
  cost: {
    type: String
  }

});




var Items = mongoose.model('Items', ItemSchema);
module.exports = Items;
