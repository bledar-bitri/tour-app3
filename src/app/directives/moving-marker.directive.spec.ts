import { MovingMarkerDirective } from './moving-marker.directive';
import {MockGoogleMapsAPIWrapper} from '../mocks/mock-google-maps-api-wrapper';

describe('MovingMarkerDirective', () => {

  let googleMapsApiWrapper: MockGoogleMapsAPIWrapper;

  beforeEach(() => {
    googleMapsApiWrapper = new MockGoogleMapsAPIWrapper();
  });

  it('should create an instance', () => {
    const directive = new MovingMarkerDirective(googleMapsApiWrapper);
    expect(directive).toBeTruthy();
  });
});
