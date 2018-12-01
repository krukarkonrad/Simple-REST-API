const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThingSchema = new Schema({

    Title:{
      type:String,
      required:[true, "Titel field is required"]
    },

    Content:{
      type:String,
      required:[true, "Content field is required"]
    },

    Created:{
      type: Date, default: Date.now
    },

    Modified:{
      type: Date, default: null
    }

});

const Thing = mongoose.model('thing',ThingSchema);
module.exports = Thing;
