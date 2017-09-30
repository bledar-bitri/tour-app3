import { Directive, Input, Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { LatLngPoint } from "app/classes/lat-lng-point";
import { MercatorProjection } from "app/classes/mercator-projection";
import { Observable } from "rxjs/Rx";
import { Epolys } from "app/classes/epolys";
import { GoogleMap } from "@agm/core/services/google-maps-types";


declare var google: any;

@Directive({
  selector: 'appMovingMarker'
})
export class MovingMarkerDirective {

  directionsService: any;
  markerArray = [];

  map: GoogleMap;
  
  marker = [];
  polyline = [];
  poly2 = [];
  poly: any;
  startLocation = [];
  endLocation = [];
  timerHandle = [];

  speed = 0.000005;
  wait = 1;

  //myPano: any;
  //panoClient: any;
  //nextPanoId: any;

  startLoc = [];

  endLoc = [];

  //Colors = ["#FF0000", "#00FF00", "#0000FF"];
  epolys: Epolys;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {

    let me = this;

    this.epolys = new Epolys();

    this.startLoc.push('salzburg, austria');
    this.startLoc.push('bischofshofen, austria');
    
    this.endLoc.push('bad ischl, austria');
    this.endLoc.push('aigen, salzburg, austria');
    
    this.gmapsApi.getNativeMap()
      .then(map => {
        me.map = map;
        me.setRoutes();
      })
      .catch(error => console.log('getNativeMap() Error: ', error));
    this.gmapsApi.getBounds()
      .then(bounds => console.log('bounds: ', bounds))
      .catch(error => console.log('getBounds() Error: ', error));
  }


  createMarker(latlng, label, html) {
    //alert("createMarker(" + latlng + "," + label + "," + html + ")");
    var contentString = '<b>' + label + '</b><br>' + html;
    var marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      title: label,
      zIndex: Math.round(latlng.lat() * -100000) << 5
    });
    marker.myname = label;

    return marker;
  }

  setRoutes() {

    let me = this;
    let directionsDisplay = new Array();
    me.polyline = new Array(me.startLoc.length);

    for (var i = 0; i < me.startLoc.length; i++) {

      me.startLocation.push(new Object());
      me.endLocation.push(new Object());
      
      var rendererOptions = {
        map: me.map,
        suppressMarkers: true,
        preserveViewport: true
      }
      me.directionsService = new google.maps.DirectionsService();

      var travelMode = google.maps.DirectionsTravelMode.DRIVING;

      var request = {
        origin: me.startLoc[i],
        destination: me.endLoc[i],
        travelMode: travelMode
      };

      me.directionsService.route(request, me.makeRouteCallback(i, directionsDisplay[i]));

    }
  }

  makeRouteCallback(routeNum, disp) {
    const me = this;
    if (me.polyline[routeNum] && (me.polyline[routeNum].getMap() != null)) {
      me.startAnimation(routeNum);
      return;
    }
    return function (response, status) {

      if (status == google.maps.DirectionsStatus.OK) {

        var bounds = new google.maps.LatLngBounds();
        var route = response.routes[0];
        me.startLocation[routeNum] = new Object();
        me.endLocation[routeNum] = new Object();


        me.polyline[routeNum] = new google.maps.Polyline({
          path: [],
          strokeColor: '#FFFF00',
          strokeWeight: 3
        });

        me.poly2[routeNum] = new google.maps.Polyline({
          path: [],
          strokeColor: '#FFFF00',
          strokeWeight: 3
        });


        // For each route, display summary information.
        var path = response.routes[0].overview_path;
        var legs = response.routes[0].legs;


        disp = new google.maps.DirectionsRenderer(this.rendererOptions);
        disp.setMap(me.map);
        disp.setDirections(response);

        //Markers               
        for (var i = 0; i < legs.length; i++) {
          if (i == 0) {
            me.startLocation[routeNum].latlng = legs[i].start_location;
            me.startLocation[routeNum].address = legs[i].start_address;
            
            me.marker[routeNum] = me.createMarker(legs[i].start_location, "start", legs[i].start_address);
          }
          me.endLocation[routeNum].latlng = legs[i].end_location;
          me.endLocation[routeNum].address = legs[i].end_address;
          var steps = legs[i].steps;

          for (var j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            var nextSegment = steps[j].path;

            for (var k = 0; k < nextSegment.length; k++) {
              me.polyline[routeNum].getPath().push(nextSegment[k]);
              //bounds.extend(nextSegment[k]);
            }
          }
        }
      }
      me.polyline[routeNum].setMap(me.map);
      //map.fitBounds(bounds);
      me.startAnimation(routeNum);
    } // else alert("Directions request failed: "+status);
  }


  lastVertex = 1;
  stepnum = 0;
  step = 50; // 5; // metres
  tick = 100; // milliseconds
  eol = [];
  //----------------------------------------------------------------------                
  updatePoly(i, d) {
    const me = this;
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (me.poly2[i].getPath().getLength() > 20) {
      me.poly2[i] = new google.maps.Polyline([me.polyline[i].getPath().getAt(me.lastVertex - 1)]);
      // map.addOverlay(poly2)
    }
    

    if (me.epolys.GetIndexAtDistance(me.polyline[i], d) < me.lastVertex + 2) {
      if (me.poly2[i].getPath().getLength() > 1) {
        me.poly2[i].getPath().removeAt(me.poly2[i].getPath().getLength() - 1)
      }
      me.poly2[i].getPath().insertAt(me.poly2[i].getPath().getLength(), me.epolys.GetPointAtDistance(me.polyline[i], d));
    } else {
      me.poly2[i].getPath().insertAt(me.poly2[i].getPath().getLength(), me.endLocation[i].latlng);
    }
  }
  //----------------------------------------------------------------------------

  animate(index, d) {
    
    let me = this;
    if (d > me.eol[index]) {

      me.marker[index].setPosition(me.endLocation[index].latlng);
      return;
    }
    var p = me.epolys.GetPointAtDistance(me.polyline[index], d);

    //map.panTo(p);
    me.marker[index].setPosition(p);
    me.updatePoly(index, d);
    
    setTimeout(function() {
      me.animate(index, d + me.step);
    }, me.tick);
  }

  //-------------------------------------------------------------------------

  startAnimation(index) {
    const me = this;
    if (me.timerHandle[index]) 
      clearTimeout(me.timerHandle[index]);
    me.eol[index] = me.epolys.Distance(me.polyline[index]);
    me.map.setCenter(me.polyline[index].getPath().getAt(0));

    me.poly2[index] = new google.maps.Polyline({ path: [me.polyline[index].getPath().getAt(0)], strokeColor: "#FFFF00", strokeWeight: 3, map: me.map });
    
    setTimeout(function() {
      me.animate(index, 50);
    }, 2000);// Allow time for the initial map display
  }

  //----------------------------------------------------------------------------    



}
