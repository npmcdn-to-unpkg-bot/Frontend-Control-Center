import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google: any;

@Injectable()
export class MapService {

  constructor(private jsonp: Jsonp, private _loader: MapsAPILoader) { }

  getGeoDataForPostalCode(postalCode, callback) {
    var search = new URLSearchParams();
    search.set('output', 'json');
    search.set('q', postalCode);
    search.set('client', '');
    search.set('sensor', 'false');

    // get address information from gothere.sg
    this.jsonp.get(
      'http://gothere.sg/maps/geo?callback=JSONP_CALLBACK', { search }
    ).map((response) => response.json()).subscribe(data => {
      console.log(data);
      if (data.Status.code === 200) {
        callback({
          code: 200,
          address: data.Placemark[0].AddressDetails.Country.Thoroughfare
            .ThoroughfareName,
          addressLine: data.Placemark[0].AddressDetails.Country.AddressLine, // (not all have) building, etc...
          geolocation: {
            lat: data.Placemark[0].Point.coordinates[1],
            lng: data.Placemark[0].Point.coordinates[0]
          }
        })
      } else {
        callback({ code: 400 });
      }
    });
  }

  private getGeoDataForPlaceId(placeId: string, callback) {
    this._loader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      geocoder.geocode({ 'placeId': placeId }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          callback({
            code: 200,
            geolocation: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            },
            // address: results[0].formatted_address,
            postal: results[0].address_components[5] == undefined ? undefined : parseInt(results[0].address_components[5].short_name)
          })
        } else {
          callback({
            code: 400
          })
        }
      })
    });
  }

  streetAutoComplete(id: string, callback) {
    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace();
        this.getGeoDataForPlaceId(place.place_id, callbackValue => {
          callback(callbackValue);
        });
      });
    });
  }

}
