declare var google: any;
declare var window: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  private map;
  private country = "SriLanka";
  private geocoder;
  private directionsService;
  private directionsDisplay;
  private originPlaceId: any;
  private destinationPlaceId: any;
  //private route: any;  

  constructor() { }

  ngOnInit() {

     //this.geocoder = new google.maps.Geocoder(); 
  	 this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 7.873054, lng: 80.771797},
          zoom: 8
        });
     //new AutocompleteDirectionsHandler(this.map);
     // var defaultBounds=new google.maps.LatLngBounds(
     //   new google.maps.LatLng()
     //   );
    // this.geocoder.geocode( {'address' : this.country}, function(results, status) {
    // if (status == google.maps.GeocoderStatus.OK) {
    //     this.map.setCenter(results[0].geometry.location);
    // }
    // });

  var inputStart = document.getElementById('startLocation');
  var inputDestination = document.getElementById('destination');
  var options = {
    types: ['(regions)'],
    componentRestrictions: {country: 'lk'}
  };

  var autocompleteStart = new google.maps.places.Autocomplete(inputStart, options);
  var autocompleteDestination = new google.maps.places.Autocomplete(inputDestination, options);
  
  //getting direction services
   this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(this.map);


  //create a marker for start
  var markerStart = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29)
        });

  //create a marker for destination
  var markerDestination = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29)
        });
    var me =this;
    //listener to start location
    autocompleteStart.addListener('place_changed', function() {
          
          //markerStart.setVisible(false);
          var place = autocompleteStart.getPlace();
          
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          //markerStart.setPosition(place.geometry.location);
          //markerStart.setVisible(true);

          me.originPlaceId=place.place_id;
          me.router(me.originPlaceId,me.destinationPlaceId);

          });

    //listener to destination location
    autocompleteDestination.addListener('place_changed', function() {
          
          //markerDestination.setVisible(false);
          
          var place = autocompleteDestination.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          //markerDestination.setPosition(place.geometry.location);
          //markerDestination.setVisible(true);
          me.destinationPlaceId=place.place_id;
          me.router(me.originPlaceId,me.destinationPlaceId);
          });


  }

   private router(originPlaceId,destinationPlaceId) {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: "DRIVING"
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);          }
        });
      }
  

}



