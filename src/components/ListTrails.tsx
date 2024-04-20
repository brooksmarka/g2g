import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { updateTrail } from '../graphql/mutations'
import { Card, Text, Divider, View, Breadcrumbs, Heading, Badge, SelectField, Accordion } from '@aws-amplify/ui-react';
import { TrailsByZoneIDAndTitleQuery, GetZoneQuery } from '../API';

const client = generateClient();

function ListTrails() {
  const {zoneId } = useParams<{ zoneId: string }>();
  //TODO: Create a not found trail with id of 0
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

  const getBadgeVariation = (status: string) => {
    switch (status) {
      case 'Dry': return 'success';
      case 'Hero': return 'success';
      case 'Snow': return 'error';
      case 'Mud': return 'error';
      // Other cases
      default: return 'info';
    }
  };

  const handleStatusChange = (trailId : string, newStatus : string) => {

    console.log("here is the new Status", newStatus);
    // Update the status in the local state
    const updatedTrails = trails?.items.map(trail => {
      if (trail?.id === trailId) {
        updateTrailStatus(trailId, newStatus);
        return { ...trail, status: newStatus };
      }
      return trail;
    });
    console.log("updated Trails", updatedTrails)
  };
  

  useEffect(() => {
    fetchTrails();
    getTrailTitle();
  }, []);

  if (!trails) {
    return <Text>Loading trails...</Text>;
  }

  
return (
  <Card variation="outlined">
    <Breadcrumbs
      items={[
        {
          href: '/',
          label: 'Home',
        },
        {
          href: `/zone/${zoneId}/`,
          label: 'Zone',
        },
        {
          label: 'Trail',
        },
      ]}
    />
    <Heading>{zone?.title} Trails</Heading>
    <Divider orientation="horizontal" />

    {trails && trails.items.map((trail) => {
        if (!trail) return null;
        return (
          <View key={trail.id}>
            <Accordion allowMultiple
              items={[
                {
                  trigger: (
                    <Text><strong>{trail.title}</strong> - Status:  
                      <Badge variation={getBadgeVariation(trail.status)}>{trail.status}</Badge>
                    </Text>),
                  value: 'statusChange',
                  content: (
                    <SelectField
                      label={`Change ${trail.title} status`}
                      aria-label={`Change ${trail.title} status`}
                      defaultValue={trail.status}
                      onChange={(e) => handleStatusChange(trail.id, e.target.value)}
                    >
                      {trailStatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </SelectField>
                  )
                }
              ]}
            />
          </View>
        );
      })}
  </Card>
);
  
}

export default ListTrails;
