import { useEffect, useState } from 'react';
import { listZones } from './graphql/queries';
import { type CreateZoneInput, type Zone } from './API';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button, Grid, Heading, Flex} from '@aws-amplify/ui-react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ZoneDetail from './components/ZoneDetail';
import ListTrails from './components/ListTrails';

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
        <BrowserRouter>
          <Routes>
          <Route path='/' element={
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Heading color="white" textAlign="center">Zones</Heading>
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="20px" width="100%" justifyContent="center">
                  {zones.filter(zone => zone.id !== "0" ).map((zone, index) => (
                    <ZoneCard key={zone.id ? zone.id : index} zone={zone} />
                  ))}
                </Grid>
                <Button backgroundColor="grey" color="white"
                  onClick={signOut} width="300px" variation="link" marginTop="20px">Sign out</Button>
              </Flex>
          }/>
          <Route path='/zone/:zoneId/' element={<ZoneDetail />} />
          <Route path="/zone/:zoneId/trails" element={<ListTrails />} />  
        </Routes>
        </BrowserRouter>
      )}
    </Authenticator>
  );
};