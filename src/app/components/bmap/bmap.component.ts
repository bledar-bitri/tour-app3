/// <reference path="../../../../node_modules/bingmaps/scripts/MicrosoftMaps/Microsoft.Maps.d.ts" />

import {Component, OnInit, ViewChild, ElementRef, Inject, Injectable} from '@angular/core';
import { DOCUMENT  } from '@angular/platform-browser';

@Component({
  selector: 'app-bmap',
  templateUrl: './bmap.component.html',
  styleUrls: ['./bmap.component.css']
})

export class BmapComponent implements OnInit {
  @ViewChild('myMap') myMap: ElementRef;

  public pageTitle = 'Map';

  constructor(@Inject (DOCUMENT) private document: any) { }

  ngOnInit() {}

  ngAfterViewInitx() {

    if (typeof Microsoft !== 'undefined' && typeof Microsoft.Maps !== 'undefined' && typeof Microsoft.Maps.Map !== 'undefined' ) {
      const map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
          credentials: 'AiisyBTVtvji2DY-4CR23hWfe_EMoVMW_CX1U_cfT4Q_GCEmT7LBz8Cxm9qi2T6F'
        }
      );
      const pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      const layer = new Microsoft.Maps.Layer();
      layer.add(pushpin);
      map.layers.insert(layer);
    }
  }

  GetMap() {
  if (typeof Microsoft !== undefined && typeof Microsoft.Maps !== undefined &&  Microsoft.Maps.Map !== null) {
    // Map API available add your map load code.
    this.document.ready(function() {
      const map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
          credentials: 'AiisyBTVtvji2DY-4CR23hWfe_EMoVMW_CX1U_cfT4Q_GCEmT7LBz8Cxm9qi2T6F'
        }
      );
    });
  } else {
    setTimeout(this.GetMap(), 100);
  }
}

}
