import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone } from '../graphql/queries';
import { Flex, Card, Text, Badge, Button, Breadcrumbs } from '@aws-amplify/ui-react';
import { GetZoneQuery } from '../API'; // Import the generated type for GetZoneQuery

const client = generateClient();

function ZoneDetail() {
  const { zoneId } = useParams<{ zoneId: string }>();
  //TODO: Create a not found zone with id of 0
  const safeZoneId = zoneId || '0';

  const [zone, setZone] = useState<GetZoneQuery["getZone"] | null>(null);

  async function fetchZoneDetail() {
    try {
      const response = await client.graphql({
        query: getZone,
        variables: { id: safeZoneId },
      });
      console.log("response eee", response);
      setZone(response.data.getZone);
    } catch (err) {
      console.error('Error fetching zone details:', err);
    }
  }

  useEffect(() => {
    fetchZoneDetail();
  }, [zoneId]);

  if (!zone) {
    return <Text>Loading zone details...</Text>;
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
            
            ]}
          />
    <Flex alignItems="start">
      {/* Replace with actual image path */}
      {/* <Image src="/path-to-your-zone-image.jpg" alt={zone.title} width="8rem" /> */}
      <Flex direction="column" gap="xs" padding="1rem">
        <Flex>
          <Badge variation="success">New</Badge>
        </Flex>
        <Text fontSize="large" fontWeight="semibold">
          {zone.title}
        </Text>
        <Text color="font.tertiary">
          {zone.description}
        </Text>
        <Text color="font.info">
            Current Status: <Badge variation="success">Green</Badge>
        </Text>
        <Text >
            Last Update: <Date></Date>
        </Text>
        <Button variation="primary" onClick={() => alert('add trail')}>Add A Trail Status</Button>
        <Link to={`/zone/${zoneId}/trails`} >
          <Button variation="link" >View Trail Status</Button>
        </Link>

        
      </Flex>
    </Flex>
  </Card>
  );
}

export default ZoneDetail;
