import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { trailsByZoneIDAndTitle } from '../graphql/queries';
import { Card, Text, Divider, View, Breadcrumbs, Heading, Badge, SelectField } from '@aws-amplify/ui-react';
import { TrailsByZoneIDAndTitleQuery } from '../API';
import { useNavigate } from 'react-router-dom';

const client = generateClient();

function ListTrails() {
  const {zoneId } = useParams<{ zoneId: string }>();
  //TODO: Create a not found trail with id of 0
  const safeZoneId = zoneId || '0';
  const navigate = useNavigate();

  const [trails, setTrails] = useState<TrailsByZoneIDAndTitleQuery["trailsByZoneIDAndTitle"] | null>(null);

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

  useEffect(() => {
    fetchTrails();
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
    
    <Heading>Trails</Heading>
    <Divider orientation="horizontal" />

    <SelectField label="Select a Trail" onChange={(event) => navigate(`/trail/${event.target.value}`)}>
      {trails.items.map((trail) => {
        if (!trail) return null;
        return <option key={trail.id} value={trail.id}>{trail.title}</option>;
      })}
    </SelectField>

    {trails.items.map((trail) => {
      if (!trail) return null;
      return (
        <View key={trail.id}>
          <Text><strong>{trail.title}</strong> - Status: <Badge variation="error">{trail.status}</Badge></Text>
        </View>
      );
    })}
</Card>
);
  
}

export default ListTrails;
