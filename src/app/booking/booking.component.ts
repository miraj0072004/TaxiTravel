declare var google: any;
declare var window: any;
import { Component, OnInit,OnChanges,DoCheck,ViewChild,ElementRef  } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit,OnChanges,DoCheck {

 
  private map;
  private country = "SriLanka";
  private geocoder;
  private directionsService;
  private directionsDisplay;
  private originPlaceId: any;
  private destinationPlaceId: any;
  private journeyInformation;
  //private route: any; 

  options =["one way","two way"]; 
   @ViewChild('journeyInfo') journeyInfo:ElementRef;

  constructor() { }

  ngOnInit() {
    console.log("OnInit");

     //this.geocoder = new google.maps.Geocoder(); 
  	 this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 7.873054, lng: 80.771797},
          zoom: 7
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


  // //create a marker for start
  // var markerStart = new google.maps.Marker({
  //         map: this.map,
  //         anchorPoint: new google.maps.Point(0, -29)
  //       });

  // //create a marker for destination
  // var markerDestination = new google.maps.Marker({
  //         map: this.map,
  //         anchorPoint: new google.maps.Point(0, -29)
  //       });


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
            //me.directionsDisplay.setPanel(document.getElementById('detail-panel'));
            // var distance  = document.createTextNode(response.routes[0].legs[0].distance.text);
            // var duration  = document.createTextNode(response.routes[0].legs[0].duration.text); 
            //document.getElementById('detail-panel').appendChild(distance);
            //document.getElementById('detail-panel').appendChild(duration);

            //me.journeyDetails(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text);
        var distance= response.routes[0].legs[0].distance.text;
        var duration= response.routes[0].legs[0].duration.text;
           
        var tempDistance=distance.substring (0,distance.indexOf(" km"));
        var numDistance=+tempDistance;
        var totalCost=0;

        if (numDistance > 100) {
          totalCost=5000 + (numDistance-100)*20;
        }
        else
        {
          totalCost=numDistance* 35;
        }

        me.journeyInformation=" Your total estimated cost would be Rs " +totalCost +" and your journey distance is "+distance+
           " which will have an estimated duration of "+ duration +". Please mind that these are rough values"
          +" calculated based on the given details and could be subject to minor changes depending on the circumstances.";

        // me.journeyInformation=new Promise ((resolve,reject)=>{resolve
        //   (" Your total estimated cost would be Rs " +totalCost +" and your journey distance is "+distance+
        //    " which will have an estimated duration of "+ duration +". Please mind that these are rough values"
        //   +" calculated based on the given details and could be subject to minor changes depending on the circumstances.")});

        //" Your total estimated cost would be Rs " +totalCost +" and your journey distance is "+distance+" which will have an estimated duration of "+ duration +". Please mind that these values are rough values calculated based on the given details and could be subject to minor changes depending on the circumstances."
        var line = document.createElement("p");
        line.innerHTML =me.journeyInformation;
        // this.journeyInfo.innerHTML(me.journeyInformation);

        var parent=document.getElementById("journeyInfo");
        var child= parent.childNodes[0];
        
        // this.journeyInfo.nativeElement.insertAdjacentHTML('beforeend',me.journeyInformation);
        if (child)
        {
          parent.removeChild(parent.childNodes[0]);
        }
          
          parent.appendChild( line);
          

          } else {
            window.alert('Directions request failed due to ' + status);          }
        });
      }

      private journeyDetails(distance : string, duration : string)
      {
        var tempDistance=distance.substring (0,distance.indexOf(" km"));
        var numDistance=+tempDistance;
        var totalCost=0;

        if (numDistance > 100) {
          totalCost=5000 + (numDistance-100)*20;
        }
        else
        {
          totalCost=numDistance* 35;
        }

        this.journeyInformation=" Your total estimated cost would be Rs " +totalCost +" and your journey distance is "+distance+" which will have an estimated duration of "+ duration +". Please mind that these values are rough values calculated based on the given details and could be subject to minor changes depending on the circumstances.";
        document.getElementById('journeyInformation').appendChild(this.journeyInformation);
      } 

      ngOnChanges ()
      {
        console.log("On Changes");
      }

      ngDoCheck()
      {
        console.log("Do Check");
      }
  

}



