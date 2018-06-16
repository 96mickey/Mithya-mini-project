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
            db.find({}, function(err, allHotels){
                if(err){
                    res.redirect('/')
                }else{
                    var name = maxVisitors(allHotels);
                    var desired = maxBooked(allHotels);
                    res.render("hotel/hotelDetails", {hotel: foundHotel, maxhotelvisitors: name, desired: desired});
                }
            })
        }
    })
}

function maxVisitors(arr){
    var maxVisited = arr[0].visitors,
        nameHigh = arr[0].name;
        
    for(let i=0; i <arr.length; i++){
        if(arr[i].visitors.length > maxVisited.length){
            maxVisited = arr[i].visitors;
            nameHigh = arr[i].name
        }
    }
    return nameHigh;
}

function maxBooked(arr){
    var maxDesired = arr[0].done,
        nameHigh = arr[0].name;
        
    for(let i=0; i <arr.length; i++){
        if(arr[i].done.length > maxDesired.length){
            maxDesired = arr[i].visitors;
            nameHigh = arr[i].name
        }
    }
    return nameHigh;
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
