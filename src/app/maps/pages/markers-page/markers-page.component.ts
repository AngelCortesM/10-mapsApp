import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

@Component({
  standalone: false,

  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.1, 4.65);

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('No divMap reference');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando herrera';

    // const marker = new Marker({
    //   color: '#224422',
    //   element: markerHtml,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  createMarker() {
    if (!this.map) return;
    const generateBeautifulColor = () => {
      const hue = Math.floor(Math.random() * 360); // Tono: 0-360
      const saturation = Math.random() * 30 + 70; // Saturación: 70-100%
      const lightness = Math.random() * 30 + 50; // Luminosidad: 50-80%
      const alpha = (Math.random() * 0.4 + 0.6).toFixed(2); // Transparencia: 0.6-1.0
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    };
    const color = generateBeautifulColor();
    const lgnLat = this.map.getCenter();
    this.addMarker(lgnLat, color);
  }
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map!);
  }
}
