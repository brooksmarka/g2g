import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from '@mui/material/styles';

const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (typeof token === 'undefined') {
    throw new Error("Mapbox access token is undefined");
}
mapboxgl.accessToken = token;

export type Coordinates = number[][];

interface MapComponentProps {
    coordinates: Coordinates;
    status: string;
}

const MapComponent = ({ status, coordinates }: MapComponentProps) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();
    const startingCenter: [number, number] = [-104.985223, 39.739162]; //Denver

    function findCenter(coordinates: Coordinates): [number, number]{
        let length = coordinates.length
        let middle = Math.floor(length/2);
        const middleCoord = coordinates[middle]
        return [middleCoord[0], middleCoord[1]]
    }

    function editTrackColor(status: string) {
        switch (status) {
            case 'Dry':
            case 'Hero':
                return theme.palette.primary.main
            case 'Snow':
            case 'Mud':
                return theme.palette.error.dark
            default: return 'black';
        }
    }

    useEffect(() => {
        if (!mapRef.current && mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/satellite-streets-v12',
                center: startingCenter,
                zoom: 5,
            });

            mapRef.current.on('load', () => {
                const map = mapRef.current;

                // Define the GeoJSON data
                const geojsonData: GeoJSON.Feature<GeoJSON.LineString> = {
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
                            'line-color': editTrackColor(status),
                            'line-width': 7
                        }
                    });

                    map.addSource('mapbox-dem', {
                        type: 'raster-dem',
                        url: 'mapbox://mapbox.terrain-rgb',
                        tileSize: 512,
                        maxzoom: 13
                    });

                    map.setTerrain({source: 'mapbox-dem', exaggeration: 1.1 });

                    map.setFog({
                        'range': [0.5, 10],
                        'horizon-blend': 0.3,
                        'color': 'white',
                        'high-color': '#d8f2ff',
                        'star-intensity': 0.2
                    });
                }
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && mapRef.current) {
                        mapRef.current.flyTo({
                            center: findCenter(coordinates),
                            zoom: 15,
                            bearing: 260,
                            pitch: 75,
                            duration: 8000,
                            essential: true,
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (mapContainerRef.current) {
            observer.observe(mapContainerRef.current);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            if (mapContainerRef.current) {
                observer.unobserve(mapContainerRef.current);
            }
        };
    }, [status, coordinates, theme]);

    return <div className="map" id="map" ref={mapContainerRef} />;
};

export default MapComponent;
