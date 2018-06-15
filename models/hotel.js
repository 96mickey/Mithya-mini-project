var mongoose = require("mongoose");

var HotelSchema = new mongoose.Schema({
   name: String,
   visitors: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ],
    draft: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ],
    done: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ],
});

module.exports = mongoose.model("Hotel", HotelSchema);