import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  @Output() messageEvent = new EventEmitter<string>();
  @Input() location;
  @Input() inputclass;
  model: any = {};

  constructor() { }

  ngOnInit() {
    if (this.location !== '') {
      console.log('location', this.location);
      this.model.location = this.location;
    }
  }

    // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.places.options.componentRestrictions = new ComponentRestrictions({
      country: 'RO'
    });
  }

  public handleAddressChange(address: Address) {
    this.model.location = address['formatted_address'];
    this.model.country = this.getCountry(address);
    this.model.judet = this.getJudet(address);
    this.model.city = this.getCity(address);
    this.model.street = this.getStreet(address);
    this.model.streetNr = this.getStreetNr(address);
    this.model.postalCode = this.getPostalCode(address);
    console.log(address, 'address');
    this.sendMessage();
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return '';
  }

  getStreet(place) {
    const street = this.getAddrComponent(place, { route: 'long_name' });
    return street;
  }

  getStreetNr(place) {
    const streetNr = this.getAddrComponent(place, {  street_number: 'long_name' });
    return streetNr;
  }

  getCity(place) {
    const city = this.getAddrComponent(place, { locality: 'long_name' });
    return city;
  }

  getJudet(place) {
    const judet = this.getAddrComponent(place, { administrative_area_level_1: 'long_name' });
    return judet;
  }

  getCountry(place) {
    const country = this.getAddrComponent(place, { country: 'long_name' });
    return country;
  }

  getPostalCode(place) {
    const postalCode = this.getAddrComponent(place, { postal_code: 'long_name' });
    return postalCode;
  }


  sendMessage() {
    this.messageEvent.emit(this.model);
  }

}
