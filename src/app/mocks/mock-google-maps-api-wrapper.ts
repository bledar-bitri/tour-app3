/**
 * Created by bledi on 9/24/2017.
 */

import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {NgZone} from '@angular/core';



export class MockGoogleMapsAPIWrapper extends GoogleMapsAPIWrapper {
  constructor () {
    super (new MockMapsAPILoader(), new MockNgZone())
  }
}

export class MockMapsAPILoader extends MapsAPILoader {
  load(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export class MockNgZone extends NgZone {
  constructor () {
    super({ enableLongStackTrace: false });
  }
}
