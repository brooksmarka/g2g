import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { type CreateZoneInput, type Zone } from '../API';
import { Link as RouterLink } from 'react-router-dom';

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
        <Link component={RouterLink} to={`/zone/${zone.id}`} style={{ textDecoration: 'none' }}>
            <Card raised style={{ margin: '10px', width: "300px", backgroundColor: '#3c5c47', borderRadius: '10px' }}>
                <CardContent style={{ textAlign: 'center', backgroundColor: '#3c5c47' }}>
                    <Typography variant="h6" style={{ color: 'lightGrey', fontWeight: 'bold', marginBottom: '5px' }}>
                        {zone.title}
                    </Typography>
                    <Typography style={{ color: 'lightGrey' }}>
                        {zone.description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ZoneCard;
