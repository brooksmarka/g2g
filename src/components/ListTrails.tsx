import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { updateTrail } from '../graphql/mutations';
import { Card, Typography, Breadcrumbs, Link, Divider, Accordion, AccordionSummary, AccordionDetails, Chip, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import { TrailsByZoneIDAndTitleQuery, GetZoneQuery } from '../API';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapComponent from './MapComponent';

const client = generateClient();

function ListTrails() {
  const {zoneId } = useParams<{ zoneId: string }>();
  const safeZoneId = zoneId || '0';

  const trailStatusOptions = ['Dry', 'Hero', 'Snow', 'Mud'];

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

  async function getTrailTitle() {
    try {
      const response = await client.graphql({
        query: getZone,
        variables: { id: safeZoneId },
      });
      setZone(response.data.getZone);
    } catch (err) {
      console.error('Error fetching trail title: ', err)
    }
  }

  async function updateTrailStatus(trailId: string, newStatus: string) {
    try {
      await client.graphql({
        query: updateTrail,
        variables: { input: { id: trailId, status: newStatus } },
      });
      //TODO: look into making a subscription to change automatically instead of refetch
      fetchTrails();
    } catch (err) {
      console.error('Error updating trail status: ', err);
    }
  }

  const getChipColor = (status: string) => {
    switch (status) {
      case 'Dry': return 'success';
      case 'Hero': return 'success';
      case 'Snow': return 'error';
      case 'Mud': return 'error';
      // Other cases
      default: return 'info';
    }
  };

  const formatDate = (updatedAt: string) => {
    const date: Date = new Date(updatedAt);
    const now: Date = new Date();
    const differenceInMilliseconds: number = now.getTime() - date.getTime();

    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const differenceInYears = now.getFullYear() - date.getFullYear();

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minutes ago`;
    } else if (differenceInHours < 24) {
      return `${differenceInHours} hours ago`;
    } else if (differenceInDays < 365) {
      return `${differenceInDays} days ago`;
    } else {
      return `${differenceInYears} years ago`;
    }
  };
  useEffect(() => {
    fetchTrails();
    getTrailTitle();
  }, []); 

  if (!trails) {
    return <Typography>Loading trails...</Typography>;
  }

  return (
    <Box sx={{ width: '75%', margin: '0 auto' }}>
      <Card variant="outlined">
        <Breadcrumbs aria-label="breadcrumb" sx={{padding:"10px"}}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href={`/zone/${zoneId}/`}>
            Zone
          </Link>
          <Typography color="textPrimary">Trails</Typography>
        </Breadcrumbs>
        <Typography sx={{padding:"10px 10px"}} variant="h5" component="div">{zone?.title} Trails</Typography>
        <Divider />

        {trails.items.map((trail) => {
          if (!trail ||!trail.coordinates) return null;

          const sanitizedCoordinates = trail.coordinates
            .filter(coord => coord !== null && Array.isArray(coord))
            .map(coord =>
              coord!.filter(point => typeof point === 'number')
          ) as number[][];

          return (
            <Accordion key={trail.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{display: 'flex', alignItems: 'center', gap:1.5}}><strong>{trail.title} </strong>   
                  <Chip label={trail.status} color={getChipColor(trail.status)} />
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', marginTop: '0.3rem', marginLeft: '0.5rem' }}>
                  {formatDate(trail.updatedAt)}
              </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl fullWidth>
                  <InputLabel id={`${trail.title}-status-label`}>Change Status</InputLabel>
                  <Select
                    labelId={`${trail.title}-status-label`}
                    value={trail.status}
                    label="Change Status"
                    onChange={(e) => updateTrailStatus(trail.id, e.target.value)}
                  >
                    {trailStatusOptions.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <MapComponent status={trail.status} coordinates={sanitizedCoordinates} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>
    </Box>
  );

}

export default ListTrails;
