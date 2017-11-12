export class GeoCodeConverter {

  static ToIntegerMultiplier = 1000000;
  static ToGeoCoordinateMultiplier = 0.000001;

  public static ToInteger(geoCoordinate: number): number {
    return geoCoordinate * GeoCodeConverter.ToIntegerMultiplier;
  };

  public static ToGeoCoordinate(intValue: number): number {
    return intValue * GeoCodeConverter.ToGeoCoordinateMultiplier;
  };

}
