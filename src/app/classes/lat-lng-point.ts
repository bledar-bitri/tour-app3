export class LatLngPoint {
    
    public lat: number;
    public lng: number;
    public descrption: string;

    constructor(latitude: number, longitude: number) {
        this.lat = latitude;
        this.lng = longitude;
        this.descrption = "[Lat: ".concat(this.lat.toString()).concat("]    [Lng: ").concat(this.lng.toString()).concat("]");
    }

}
