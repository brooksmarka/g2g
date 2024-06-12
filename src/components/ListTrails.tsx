import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { updateTrail } from '../graphql/mutations';
import { Card, Typography, Breadcrumbs, Link, Divider, Box } from '@mui/material';
import { useAtom } from 'jotai';
import { trailsAtom, zoneAtom } from '../state';
import TrailComponent  from './TrailComponent';


const client = generateClient();

function ListTrails() {
  const { zoneId } = useParams<{ zoneId: string }>();
  const safeZoneId = zoneId || '0';

  const trailStatusOptions = ['Dry', 'Hero', 'Snow', 'Mud'];

  const [trails, setTrails] = useAtom(trailsAtom);
  const [zone, setZone] = useAtom(zoneAtom);

  const fetchTrails = useCallback(async () => {
    try {
      const response = await client.graphql({
        query: trailsByZoneIDAndTitle,
        variables: { zoneID: safeZoneId },
      });
      setTrails(response.data.trailsByZoneIDAndTitle);
    } catch (err) {
      console.error('Error fetching trail details:', err);
    }
  }, [safeZoneId]);

  const getTrailTitle = useCallback(async () => {
    try {
      const response = await client.graphql({
        query: getZone,
        variables: { id: safeZoneId },
      });
      setZone(response.data.getZone);
    } catch (err) {
      console.error('Error fetching trail title: ', err);
    }
  }, [safeZoneId]);

  const updateTrailStatus = useCallback(async (trailId: string, newStatus: string) => {
    try {
      const updatedAt = new Date().toISOString();
      await client.graphql({
        query: updateTrail,
        variables: { input: { id: trailId, status: newStatus } },
      });
      setTrails((prevTrails) => {
        if (!prevTrails) return prevTrails;
        const updatedTrails = prevTrails.items.map((trail) => {
          if (trail?.id === trailId) {
            return { ...trail, status: newStatus, updatedAt };
          }
          return trail;
        });
        return { ...prevTrails, items: updatedTrails };
      });
    } catch (err) {
      console.error('Error updating trail status: ', err);
    }
  }, []);

  const getChipColor = useCallback((status: string) => {
    switch (status) {
      case 'Dry': return 'success';
      case 'Hero': return 'success';
      case 'Snow': return 'error';
      case 'Mud': return 'error';
      // Other cases
      default: return 'info';
    }
  }, []);

  const formatDate = useCallback((updatedAt: string) => {
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
  }, []);

  useEffect(() => {
    fetchTrails();
    getTrailTitle();
  }, [fetchTrails, getTrailTitle]);

  if (!trails) {
    return <Typography>Loading trails...</Typography>;
  }

  return (
    <Box sx={{ width: '75%', margin: '0 auto' }}>
      <Card variant="outlined">
        <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "10px" }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Trails</Typography>
        </Breadcrumbs>
        <Typography sx={{ padding: "10px 10px" }} variant="h5" component="div">{zone?.title} Trails</Typography>
        <Divider />

        {trails.items.map((trail) => {
          if (!trail || !trail.coordinates) return null;

          return (
            <TrailComponent
              key={trail.id}
              trail={trail}
              trailStatusOptions={trailStatusOptions}
              updateTrailStatus={updateTrailStatus}
              getChipColor={getChipColor}
              formatDate={formatDate}
            />
          );
        })}
      </Card>
    </Box>
  );
}

export default ListTrails;
