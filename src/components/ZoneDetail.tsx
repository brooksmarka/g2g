import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { Flex, Card, Text, Badge, Button, Breadcrumbs } from '@aws-amplify/ui-react';
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
      console.log("what is happening here", response.data.trailsByZoneIDAndTitle)
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
    if (!trails) return <Badge variation="warning">Loading...</Badge>;

    let hasGood = false;
    let hasBad = false;

    trails.items.forEach(trail => {
      if (!trail) return
      if (["Dry", "Hero"].includes(trail.status)) {
        hasGood = true;
      } else if (["Snow", "Mud"].includes(trail.status)) {
        hasBad = true;
      }
    });

    if (hasGood && hasBad) {
      return <Badge variation="warning">Mixed</Badge>;
    } else if (hasBad) {
      return <Badge variation="error">Not Good to Go</Badge>;
    } else {
      return <Badge variation="success">Good To Go</Badge>;
    }
  };

  if (!zone) {
    return <Text>Loading zone details...</Text>;
  }

  return (
    <Card variation="outlined">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: `/zone/${zoneId}/`, label: 'Zone' },
        ]}
      />
      <Flex alignItems="start">
        <Flex direction="column" gap="xs" padding="1rem">
          <Text fontSize="large" fontWeight="semibold">
            {zone.title}
          </Text>
          <Text color="font.tertiary">
            {zone.description}
          </Text>
          <Text color="font.info">
            Current Status: {renderCorrectBadge()}
          </Text>
          <Link to={`/zone/${zoneId}/trails`} >
            <Button variation="primary" >View Trail Status</Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}

export default ZoneDetail;
