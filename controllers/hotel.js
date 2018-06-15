var db = require('../models/hotel');

exports.getHotels = function(req, res){
    db.find()
    .then(function(hotels){
        res.json(hotels);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createHotel = function(req, res){
      var name = req.body.name;
      var newHotel = {name: name}
      db.create(newHotel)
      .then(function(newTodo){
          res.status(201).json(newTodo);
      })
      .catch(function(err){
          res.send(err);
      })
}

exports.getHotelDetails = function(req, res){
      db.findById(req.params.id).populate('visitors').populate('draft').populate('done').exec(function(err, foundHotel){
        if(err){
            console.log(err)
        } else{
            foundHotel.visitors.push(req.user._id);
            foundHotel.save();
            console.log(foundHotel)
            res.render("hotel/hotelDetails", {hotel: foundHotel});
        }
    })
}

exports.draftHotel = function(req, res){
    db.findById(req.params.id, function(err, foundHotel){
         if(err){
            console.log(err)
        } else{
            let userId = foundHotel.draft.indexOf(req.user._id);
            if(userId > -1){
                res.redirect('/');
            } else{
                foundHotel.draft.push(req.user._id);
                foundHotel.save();
                res.redirect('/')
            }
        }
    })
}

exports.confirmHotel = function(req, res){
    db.findById(req.params.id, function(err, foundHotel){
        if(err){
            console.log(err);
        }else{
            let userId = foundHotel.draft.indexOf(req.user._id);
            if(userId > -1){
                foundHotel.draft.splice(userId, 1);
                foundHotel.done.push(req.user._id);
                foundHotel.save();
                res.redirect('/')
            }else{
                foundHotel.done.push(req.user._id);
                foundHotel.save();
                res.redirect('/')
            }
        }
    })
}

module.exports = exports;
