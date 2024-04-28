import React from 'react';
import { View, Text, Card } from '@aws-amplify/ui-react';
import { type CreateZoneInput, type Zone } from '../API'
import { Link } from 'react-router-dom'

interface ZoneCardProps {
    zone: CreateZoneInput | Zone;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone }) => {
    const isZone = (object: any): object is Zone => {
        return 'id' in object && 'title' in object;
    };

    if (!isZone(zone)) {
        return null;
    }

    return (
            <Link to={`/zone/${zone.id}`} style={{ textDecoration: 'none' }}>
                <Card variation="elevated" style={{ margin: '10px', width: "300px", backgroundColor: '#3c5c47', borderRadius: '10px' }}>
                    <View style={{ textAlign: 'center',  backgroundColor: '#3c5c47' }}>
                        <Text style={{ color: 'lightGrey', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>
                            {zone.title}
                        </Text>
                        <Text style={{ color: 'lightGrey' }}>{zone.description}</Text>
                    </View>
                </Card>
            </Link>
    );
};

export default ZoneCard;
