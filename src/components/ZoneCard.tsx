import React from 'react';
import { type CreateZoneInput, type Zone } from '../API';
import { View, Text, Card } from '@aws-amplify/ui-react';

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
        <Card variation="elevated" style={{ margin: '10px', backgroundColor: '#3c5c47', borderRadius: '10px' }}>
            <View style={{ textAlign: 'center',  backgroundColor: '#3c5c47' }}>
                <Text style={{ color: 'lightGrey', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>
                    {zone.title}
                </Text>
                <Text style={{ color: 'lightGrey' }}>{zone.id}</Text>
            </View>
        </Card>
    );
};

export default ZoneCard;
