
import { LatLngPoint } from "app/classes/lat-lng-point";
import { PixelPoint } from "app/classes/pixel-point";

declare var google: any;

export class MercatorProjection {
    
    TILE_SIZE = 256;
    pixelOrigin_: PixelPoint;
    pixelsPerLonDegree_: number;
    pixelsPerLonRadian_: number;

    constructor() {
        this.pixelOrigin_ = new google.maps.Point(this.TILE_SIZE / 2, this.TILE_SIZE / 2);
        this.pixelsPerLonDegree_ = this.TILE_SIZE / 360;
        this.pixelsPerLonRadian_ = this.TILE_SIZE / (2 * Math.PI);
    }

    public fromLatLngToPixelPoint (latLng: LatLngPoint, opt_point: PixelPoint) : PixelPoint {
        var me = this;
        var point = opt_point || new PixelPoint(0, 0);
        var origin = me.pixelOrigin_;

        point.x = origin.x + latLng.lng * me.pixelsPerLonDegree_;

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is about a third of a tile past the edge of the world tile.
        var siny = this.bound(Math.sin(this.degreesToRadians(latLng.lat)), -0.9999, 0.9999);
        point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
        return this.createReferencePoint(point.x, point.y);
    };


    public fromPixelPointToLatLng (point) {
        var me = this;
        var origin = me.pixelOrigin_;
        var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
        var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
        var lat = this.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

        return this.createReferenceLatLng(lat, lng);
    }

    degreesToRadians(deg: number) : number {
        return deg * (Math.PI / 180);
    }

    radiansToDegrees(rad: number) : number {
        return rad / (Math.PI / 180);
    }

    bound(value: number, opt_min: number, opt_max: number) : number {
        if (opt_min != null) value = Math.max(value, opt_min);
        if (opt_max != null) value = Math.min(value, opt_max);
        return value;
    }

    createReferenceLatLng(lat: number, lng: number) : LatLngPoint {
        return new LatLngPoint(lat, lng);
    }

     createReferencePoint(x, y) : PixelPoint {
        return new PixelPoint(x,y);
    }
}

