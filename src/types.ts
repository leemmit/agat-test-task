export interface GeometryPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface GeometryPolygon {
  type: "Polygon";
  coordinates: [number, number][][];
}

export type Geometry = GeometryPoint | GeometryPolygon;

export interface ShapeFeature {
  type: "Feature";
  properties: {
    id: number;
    name: string;
  };
  geometry: Geometry;
}

export type ShapeCollection = ShapeFeature[];