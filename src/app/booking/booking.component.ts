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

  constructor() { }

  ngOnInit() {

     //this.geocoder = new google.maps.Geocoder(); 
  	 this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 7.873054, lng: 80.771797},
          zoom: 8
        });

     var defaultBounds=new google.maps.LatLngBounds(
       new google.maps.LatLng()
       );
    // this.geocoder.geocode( {'address' : this.country}, function(results, status) {
    // if (status == google.maps.GeocoderStatus.OK) {
    //     this.map.setCenter(results[0].geometry.location);
    // }
    // });

  var input = document.getElementById('startLocation');
  var options = {
    types: ['(regions)'],
    componentRestrictions: {country: 'lk'}
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  }

   private handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }        

}
