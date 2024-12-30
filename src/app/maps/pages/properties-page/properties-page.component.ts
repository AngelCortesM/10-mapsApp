import { Component } from '@angular/core';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  standalone: false,

  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent {
  public houses: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [-75.92722289474008, 45.280015511264466],
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [-99.91287720907991, 16.828940930185748],
    },
    {
      title: 'Apartamento, Argentina',
      description:
        'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [-58.430166677283445, -34.57150108832866],
    },
    {
      title: 'Local comercial, España',
      description:
        'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [-3.7112735618380177, 40.42567285425766],
    },
    {
      title: 'Casa en las montañas, Colombia',
      description: 'Hermosa casa en las montañas de Antioquia, Colombia',
      lngLat: [-75.567, 6.251],
    },
    {
      title: 'Casa colonial, Colombia',
      description:
        'Casa colonial en el centro histórico de Cartagena, Colombia',
      lngLat: [-75.551, 10.423],
    },
    {
      title: 'Finca cafetera, Colombia',
      description: 'Finca cafetera en el Eje Cafetero, Colombia',
      lngLat: [-75.698, 4.533],
    },
    {
      title: 'Casa moderna, Colombia',
      description: 'Casa moderna en Bogotá, Colombia',
      lngLat: [-74.072, 4.711],
    },
    {
      title: 'Casa en la playa, Colombia',
      description: 'Casa en la playa en Santa Marta, Colombia',
      lngLat: [-74.211, 11.241],
    },
  ];
}
