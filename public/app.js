/* global $ */
$(document).ready(function(){
  $.getJSON("/api/hotel")
  .then(addHotels);
});

function addHotels(hotels) {
  //add todos to page here
  hotels.forEach(function(hotel){
    addHotel(hotel);
  });
}

function addHotel(hotel){
  var newHotel = $('<li class="task"><a href="/hotel/' + hotel._id + '">'+hotel.name +' </a></li>');
  $('.list').append(newHotel);
}