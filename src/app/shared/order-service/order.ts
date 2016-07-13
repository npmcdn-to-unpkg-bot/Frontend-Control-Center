import {Injectable} from '@angular/core';

@Injectable()
export class GeoLocation {
    lat: number;
    lng: number;
}

@Injectable()
export class Location {
    type: string;
    coordinates: number[]
}

@Injectable()
export class Address{
    constructor(public geoLocation: GeoLocation) {
    }
    postal: number;
    street: string;
    extra: string;
}

@Injectable()
export class FromAddress extends Address{
}

@Injectable()
export class ToAddress extends Address{
}

@Injectable()
export class Order {
    constructor(public fromAddress: FromAddress, public toAddress: ToAddress, public location: Location) {

    }
    _id: string;
    created_by: string;
    contactName: string;
    contactNumber: string;
    amount: number;
    recipientName: string;
    recipientContact: number;
    comments: string;
    orderId: string;
    updated_at: string;
    created_at: string;
    status: number;
    orderType: number;
    deliver_by: string;
    released_to_driver: boolean;
    paid: boolean;
}

