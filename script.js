/*
    Assignment 4
    {Your name here}
*/

$(document).ready(function(){

    function getMyGeoCoordinate() {
        $('.loader').fadeIn()
      if (navigator !== undefined && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const myLatitude = position.coords.latitude
            const myLongitude = position.coords.longitude
            const latitudeStr = '<div>Latitude is: ' +  myLatitude + '</div>'
            const longitudeStr = '<div>Longitude is: ' + myLongitude + '</div>'
            $('#youarehere').html('')
            $('#youarehere').append(latitudeStr)
            $('#youarehere').append(longitudeStr)

            if (typeof(Storage) !== "undefined") {

                if(window.localStorage.getItem('Latitude') !== undefined && window.localStorage.getItem('Longitude') !== null && parseFloat(window.localStorage.getItem('Latitude')) !== parseFloat(myLatitude)) {
                    let latitude =  window.localStorage.getItem('Latitude')
                    let longitude =  window.localStorage.getItem('Longitude')
                    $('.oldLatLongWrapper').fadeIn()
                    $('.oldLatLongWrapper .data').html('')
                    $('.oldLatLongWrapper .data').append('<div>Latitude is: ' +  latitude + '</div>')
                    $('.oldLatLongWrapper .data').append('<div>Longitude is: ' +  longitude + '</div>')
                    let differenceDistance = calcDistance(latitude, longitude, myLatitude, myLongitude)
                    $('.distanceWraper').fadeIn().find('.distanceInCoordinates').html(parseFloat(differenceDistance).toFixed(3))
                } else {
                    $('.oldLatLongWrapper .data').html('')
                    $('.oldLatLongWrapper').fadeOut()
                    $('.distanceWraper').fadeOut()
                }

                window.localStorage.setItem('Latitude', myLatitude)
                window.localStorage.setItem('Longitude', myLongitude)
            } else {
                alert('Browser not support localStorage')
            }

        });
        $('.loader').fadeOut()
      } else { 
        alert("Geolocation detect not enable or this browser not supported.")
      }
    }

    function isLatLongExists() {
        $('.loader').fadeOut()
        $('.oldLatLongWrapper').fadeOut()
        $('.distanceWraper').fadeOut()
        if(window.localStorage.getItem('Latitude') !== undefined && window.localStorage.getItem('Latitude') !== null && window.localStorage.getItem('Longitude') !== undefined && window.localStorage.getItem('Longitude') !== null) {
            const latitudeStr = '<div>Latitude is: ' +  window.localStorage.getItem('Latitude') + '</div>'
            const longitudeStr = '<div>Longitude is: ' + window.localStorage.getItem('Longitude') + '</div>'
            $('#youarehere').html('')
            $('#youarehere').append(latitudeStr)
            $('#youarehere').append(longitudeStr)
        }
    }

    // function findLatLong(position) {
    //     let newLat = position.coords.latitude
    //     let newLong = position.coords.longitude
    //     console.log('newLat', newLat, 'newLong', newLong)
    // }

    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }

    // your code here


    $('.getMyCoordinates').click(function () {
        getMyGeoCoordinate()
    })

    isLatLongExists()
});


