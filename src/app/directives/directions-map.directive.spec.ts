import { DirectionsMapDirective } from './directions-map.directive';
import {MockGoogleMapsAPIWrapper} from './../mocks/mock-google-maps-api-wrapper'

describe('DirectionsMapDirective', () => {

  let googleMapsApiWrapper: MockGoogleMapsAPIWrapper;

  beforeEach(() => {
    googleMapsApiWrapper = new MockGoogleMapsAPIWrapper();
  });

  it('should create an instance', () => {
    const directive = new DirectionsMapDirective(googleMapsApiWrapper);
    expect(directive).toBeTruthy();
  });
});



