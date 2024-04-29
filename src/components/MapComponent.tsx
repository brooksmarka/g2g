import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (typeof token === 'undefined') {
    throw new Error("Mapbox access token is undefined");
}
mapboxgl.accessToken = token;
type Coordinates = number[][];

interface MapComponentProps {
    coordinates: Coordinates;
}

const MapComponent = ({ coordinates }: MapComponentProps) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    function findCenter( coordinates: Coordinates): [number, number]{
        let length = coordinates.length
        let middle = length/2;
        const middleCoord = coordinates[middle]

        return [middleCoord[0], middleCoord[1]]
    }

    useEffect(() => {
        if (!mapRef.current && mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                center: findCenter(coordinates),
                zoom: 13,
            });

            mapRef.current.on('load', () => {
                const map = mapRef.current;

                // Define the GeoJSON data
                const geojsonData = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates,
                    }
                };

                // Add the source and line layer
                if (map) {
                    map.addSource('route', {
                        type: 'geojson',
                        data: geojsonData
                    });

                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': "#3c5c47",
                            'line-width': 7
                        }
                    });
                }
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [coordinates]);

    return <div id="map" ref={mapContainerRef} style={{ width: 400, height: 400 }} />;
};

export default MapComponent;
