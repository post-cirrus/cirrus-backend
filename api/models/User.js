var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  mobile: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['Kid', 'Admin', 'Family'],
    default: 'Family',
    required: true
  },
  community: {
    type: String,
    required: true,
    unique: true
  },
  devices: [{
    type: {
      type: String,
      required: true
    },
    mac: {
      type: String,
      required: true
    },
    name: {
      type: String
    }
  }]
});

// Hashes user's password and stores it
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('community') || this.isNew) {
    user.community = user.community + '.nubitekk.net';
    next();
  } else {
    return next();
  }
});

module.exports = mongoose.model('User', UserSchema);
