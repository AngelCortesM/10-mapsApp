import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}
interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  standalone: false,

  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.1, 4.65);

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      if (!this.divMap) throw new Error('No divMap reference');

      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.currentLngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });
      this.readFromLocalStorage();

      // const markerHtml = document.createElement('div');
      // markerHtml.innerHTML = 'Fernando herrera';

      // const marker = new Marker({
      //   color: '#224422',
      //   element: markerHtml,
      // })
      //   .setLngLat(this.currentLngLat)
      //   .addTo(this.map);
    }
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
      .addTo(this.map);
    this.markers.push({
      color,
      marker,
    });
    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
      essential: true,
    });
  }
  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }
  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
