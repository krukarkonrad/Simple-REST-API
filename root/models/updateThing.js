const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdateThingSchema = new Schema({

    Title:{
      type:String,
      required:[true, "Titel field is required"]
    },

    Content:{
      type:String,
      required:[true, "Content field is required"]
    },

    InsideID:{
      type:String
    },

    Updated:{
      type: Date, default: Date.now
    },

    Version:{
    }
});

const UpdateThing = mongoose.model('updateThing',UpdateThingSchema);
module.exports = UpdateThing;
