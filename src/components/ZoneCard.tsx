import { type CreateZoneInput, type Zone } from '../API'

interface ZoneCardProps {
    zone: CreateZoneInput | Zone;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone }) => {

    const isZone = (object: any): object is Zone => {
        return 'id' in object && 'title' in object;
    };

    if (!isZone(zone)) {
        // Handle the case where zone is not a Zone type
        return null; // Or some other fallback UI
    }

    const cardStyles = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        textAlign: 'center' as const,
        backgroundColor: '#3c5c47',
    };

    const titleStyles = {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const idStyles = {
        color: '#555',
    };

    return (
        <div style={cardStyles}>
        <p style={titleStyles}>{zone.title}</p>
        <p style={idStyles}>{zone.id}</p>
        </div>
    );
};

export default ZoneCard;
