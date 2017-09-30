import { MapDirectionsDirective } from './map-directions.directive';
import {MockGoogleMapsAPIWrapper} from './../mocks/mock-google-maps-api-wrapper'

describe('MapDirectionsDirective', () => {

  let googleMapsApiWrapper: MockGoogleMapsAPIWrapper;

  beforeEach(() => {
    googleMapsApiWrapper = new MockGoogleMapsAPIWrapper();
  });

  it('should create an instance', () => {
    const directive = new MapDirectionsDirective(googleMapsApiWrapper);
    expect(directive).toBeTruthy();
  });
});
