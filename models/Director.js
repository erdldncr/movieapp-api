const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  director_id: mongoose.Schema.Types.ObjectId,
  
  name: { type: String, maxlength: 60, minlength: 1 },
  surname: { type: String, maxlength: 60, minlength: 1 },
  bio: { type: String, maxlength: 1000, minlength: 0 },
  country: { type: String, maxlength: 30, minlength: 3 },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("director", DirectorSchema);
