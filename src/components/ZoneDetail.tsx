import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { Typography, Card, CardContent, Button, Breadcrumbs, Link as MuiLink, Chip } from '@mui/material';
import { GetZoneQuery, TrailsByZoneIDAndTitleQuery } from '../API'; // Import the generated type for GetZoneQuery

const client = generateClient();

function ZoneDetail() {
  const { zoneId } = useParams<{ zoneId: string }>();
  const safeZoneId = zoneId || '0';

  const [trails, setTrails] = useState<TrailsByZoneIDAndTitleQuery["trailsByZoneIDAndTitle"] | null>(null);
  const [zone, setZone] = useState<GetZoneQuery["getZone"] | null>(null);

  async function fetchTrails() {
    try {
      const response = await client.graphql({
        query: trailsByZoneIDAndTitle,
        variables: { zoneID: safeZoneId },
      });
      setTrails(response.data.trailsByZoneIDAndTitle);
    } catch (err) {
      console.error('Error fetching trail details:', err);
    }
  }

  async function fetchZoneDetail() {
    try {
      const response = await client.graphql({
        query: getZone,
        variables: { id: safeZoneId },
      });
      setZone(response.data.getZone);
    } catch (err) {
      console.error('Error fetching zone details:', err);
    }
  }

  useEffect(() => {
    fetchTrails();
    fetchZoneDetail();
  }, [zoneId]);

  const renderCorrectBadge = () => {
    if (!trails) return <Chip label="Loading..." color="warning" />;

    let hasGood = false;
    let hasBad = false;

    trails.items.forEach(trail => {
      if (!trail) return;
      if (["Dry", "Hero"].includes(trail.status)) {
        hasGood = true;
      } else if (["Snow", "Mud"].includes(trail.status)) {
        hasBad = true;
      }
    });

    if (hasGood && hasBad) {
      return <Chip label="Mixed" color="warning" />;
    } else if (hasBad) {
      return <Chip label="Not Good to Go" color="error" />;
    } else {
      return <Chip label="Good To Go" color='success' />;
    }
  };

  if (!zone) {
    return <Typography>Loading zone details...</Typography>;
  }

  return (
    <Card variant="outlined" sx={{ width: '75%', margin: '0 auto', maxWidth: 1280 }}>
      <CardContent>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} color="inherit" to="/">
            Home
          </MuiLink>
          <MuiLink component={Link} color="inherit" to={`/zone/${zoneId}/`}>
            Zone
          </MuiLink>
        </Breadcrumbs>
        <Typography variant="h5" component="div" gutterBottom>
          {zone.title}
        </Typography>
        <Typography color="textSecondary">
          {zone.description}
        </Typography>
        <Typography sx={{marginTop: '15px'}}>
          Current Status: {renderCorrectBadge()}
        </Typography>
        <Button sx={{marginTop: '15px', '&:hover': {backgroundColor: '#0a2623',}}}variant="contained" component={Link} to={`/zone/${zoneId}/trails`}>
          View Trail Status
        </Button>
      </CardContent>
    </Card>
  );
}

export default ZoneDetail;
