const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating 'thing' Schema & model
const DeletedThingSchema = new Schema({

    InsideID:{
      type:String,
    },

    Title:{
      type:String,
    },

    Content:{
      type:String,
    },

    Created:{
      type: Date
    },

    Modified:{
      type: Date
    },

    Deleted:{
      type: Date, default: Date.now
    }

});

const DeletedThing = mongoose.model('deletedThing',DeletedThingSchema);
module.exports = DeletedThing;
