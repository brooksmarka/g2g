import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from '@mui/material/styles';

const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (typeof token === 'undefined') {
    throw new Error("Mapbox access token is undefined");
}
mapboxgl.accessToken = token;
type Coordinates = number[][];

interface MapComponentProps {
    coordinates: Coordinates;
    status: string;
}

const MapComponent = ({ status, coordinates }: MapComponentProps) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();

    function findCenter( coordinates: Coordinates): [number, number]{
        let length = coordinates.length
        let middle = Math.floor(length/2);
        const middleCoord = coordinates[middle]

        return [middleCoord[0], middleCoord[1]]
    }

    function editTrackColor(status: string){
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
        console.log('MapComponent re-rendered with status:', status, 'and coordinates:', coordinates);
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
                }
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [status, coordinates]);

    return <div className="map" id="map" ref={mapContainerRef} />;
};

export default MapComponent;
