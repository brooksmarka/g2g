import { useEffect, useState } from 'react';
import { listZones } from './graphql/queries';
import { type CreateZoneInput, type Zone } from './API';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button, Heading, Grid } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import './App.css';
import ZoneCard from './components/ZoneCard';
import authComponents from './components/authComponents';

import config from './amplifyconfiguration.json';
Amplify.configure(config);

const client = generateClient();

export default function App() {
  const [zones, setZones] = useState<Zone[] | CreateZoneInput[]>([]);

  useEffect(() => {
    fetchZones();
  }, []);

  async function fetchZones() {
    try {
      const zoneData = await client.graphql({
        query: listZones,
      });
      const zones = zoneData.data.listZones.items;
      setZones(zones);
    } catch (err) {
      console.log('error fetching zones');
    }
  }

  return (
    <Authenticator components={authComponents}>
      {({ signOut }) => (
        <>
          <Heading level={3} color = "white" padding="30px 0 0 40px">Zones</Heading>
        <Grid templateColumns="repeat(1, 1fr)" gap="5px">
          {zones.map((zone, index) => (
            <ZoneCard key={zone.id ? zone.id : index} zone={zone} />
          ))}
          <Button backgroundColor = "grey" color ="white"
            onClick={signOut} variation="link" marginTop="20px">Sign out</Button>
              </Grid>
          </> 
      )}
    </Authenticator>
  );
};