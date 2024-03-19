import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone } from '../graphql/queries';
import { Flex, Card, Text, Image, Badge, Button, StepperField, RadioGroupField, Radio, Menu, MenuItem, Divider, Tabs } from '@aws-amplify/ui-react';
import { GetZoneQuery } from '../API'; // Import the generated type for GetZoneQuery
import { useNavigate } from 'react-router-dom';

const client = generateClient();

function ZoneDetail() {
  const { zoneId } = useParams<{ zoneId: string }>();
  //TODO: Create a not found zone with id of 0
  const safeZoneId = zoneId || '0';
  const navigate = useNavigate(); // Initialize useNavigate

  const [zone, setZone] = useState<GetZoneQuery["getZone"] | null>(null);

  async function fetchZoneDetail() {
    try {
      const response = await client.graphql({
        query: getZone,
        variables: { id: safeZoneId },
      });
      console.log("response", response);
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
        <Menu menuAlign="start" >
        <MenuItem onClick={() => alert('Mark as Draft')}>
            Add A Trail Status
        </MenuItem>
        <MenuItem onClick={() => alert('Mark as Draft')}>
            View All Trail Status
        </MenuItem>
        
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
            Delete
        </MenuItem>
        <MenuItem onClick={() => navigate('/')}>
            Back
        </MenuItem>
    </Menu>
    <Flex alignItems="start">
    

  
      {/* Replace with actual image path */}
      {/* <Image src="/path-to-your-zone-image.jpg" alt={zone.title} width="8rem" /> */}
      <Flex direction="column" gap="xs" padding="1rem">
        <Flex>
          <Badge variation="success">New</Badge> {/* Adjust or remove as necessary */}
        </Flex>
        <Text fontSize="large" fontWeight="semibold">
          {zone.title}
        </Text>
        {/* Replace with actual zone description */}
        <Text color="font.tertiary">
          Zone description here...
        </Text>
        <Text color="font.info">
            Current Status: <Badge variation="success">Green</Badge> {/* Adjust or remove as necessary */}
        </Text>
        <Text >
            Last Update: <Date></Date>
        </Text>
        <Button variation="primary" onClick={() => alert('add trail')}>Add A Trail Status</Button>
        <Button variation="link" onClick={()=> alert('view trails')}>View Trail Status</Button>
      </Flex>
    </Flex>
  </Card>
  );
}

export default ZoneDetail;
