const express = require('express');
const router = express.Router();
const Thing = require('../models/thing');
const UpdateThing = require('../models/updateThing');
const DeletedThing = require('../models/deletedThing');
var version

function writeUpdateHistory(writeHistoryThing, version){
  var updateThing = new UpdateThing();
  updateThing.Version = version + 1;
  updateThing.Title = writeHistoryThing.Title;
  updateThing.Content  = writeHistoryThing.Content;
  updateThing.InsideID = writeHistoryThing._id.valueOf();

  UpdateThing.create(updateThing);
}

function writeDeletedThing(writeDeletedThing){
  var deletedThing = new DeletedThing();
  deletedThing.InsideID = writeDeletedThing._id.valueOf();;
  deletedThing.Title = writeDeletedThing.Title;
  deletedThing.Content  = writeDeletedThing.Content;
  deletedThing.Created = writeDeletedThing.Created;
  deletedThing.Modified = writeDeletedThing.Modified;
  
  DeletedThing.create(deletedThing);
}

router.get('/thing', function(req, res, next){
  Thing.find({}).then(function(things){
    res.send(things);
  })
});

router.get('/thing/:id', function(req,res,next){
  Thing.find({_id: req.params.id}).then(function(thing){
    res.send(thing);
  })
});

router.post('/thing', function(req, res, next){
    Thing.create(req.body).then(function(thing){
        res.send(thing);
    }).catch(next);
});

router.put('/thing/:id', function(req, res, next){
    Thing.findOne({_id: req.params.id}).then(function(thing){
      UpdateThing.find({InsideID:req.params.id}).then(function(things){
        var version = things.length;
        writeUpdateHistory(thing,version);
      });
    });

    Thing.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        Thing.findByIdAndUpdate({_id: req.params.id}, {$set: {Modified: Date.now()}}, { new: true }, function (err, thing) {
            if (err) return handleError(err);
        });

        Thing.findOne({_id: req.params.id}).then(function(thing){
            res.send(thing);
        });
    }).catch(next);
});

router.get('/updated', function(req, res, next){
  UpdateThing.find({}).then(function(things){
    if(things.length>0)
      res.send(things);
      else
        res.send("Updated items do not exist");
  })
});

router.get('/updated/:id', function(req,res,next){
  UpdateThing.find({InsideID: req.params.id}).then(function(updateThing){
    if(updateThing.length>0)
      res.send(updateThing);
      else
        res.send("Updated items for this id do not exist");
  }).catch(next);
});

router.delete('/thing/:id', function(req, res, next){
    Thing.findOne({_id: req.params.id}).then(function(thing){
      writeDeletedThing(thing);
    });
    Thing.findByIdAndRemove({_id: req.params.id}).then(function(thing){
        res.send(thing);
    }).catch(next);
});

router.get('/deleted', function(req, res, next){
  DeletedThing.find({}).then(function(deletedThing){
    if(deletedThing.length>0)
      res.send(deletedThing);
      else
        res.send("Deleted items do not exist");
  })
});

router.get('/deleted/:id', function(req,res,next){
  DeletedThing.find({InsideID: req.params.id}).then(function(updateThing){
    if(updateThing.length>0)
      res.send(updateThing);
      else
        res.send("Deleted item for this id does not exist");
  }).catch(next);
});

module.exports = router;
