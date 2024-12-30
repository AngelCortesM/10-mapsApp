import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  standalone: false,

  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      if (!this.divMap?.nativeElement) throw new Error('No lngLat provided');
      if (!this.lngLat) throw new Error('No lngLat provided');
      const map = new Map({
        container: this.divMap.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.lngLat,
        zoom: 15,
        interactive: false,
      });
      new Marker().setLngLat(this.lngLat).addTo(map);
    }
  }
}
