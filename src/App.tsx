import { useEffect, useState } from 'react';
import { listZones } from './graphql/queries';
import { type CreateZoneInput, type Zone } from './API';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { Box, Grid } from '@mui/material';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ZoneDetail from './components/ZoneDetail';
import ListTrails from './components/ListTrails';

import '@aws-amplify/ui-react/styles.css';
import titleImage from '/mudorhero.webp';

import './App.css';
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
      console.log('error fetching zones', err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" p={2}>
        <img src={titleImage} alt="Zones" style={{ width: '80%', maxWidth: '300px' }} />
      </Box>
      <Authenticator components={authComponents}>
        {({ signOut }) => (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Box textAlign="center" p={1} display="flex" flexDirection="column" alignItems="center">
                    <Grid container justifyContent="center">
                      {zones.filter(zone => zone.id !== "0").map((zone, index) => (
                        <Grid item xs={12} sm={8} key={zone.id ? zone.id : index}>
                          <Box display="flex" justifyContent="center" p={2}>
                            <ZoneDetail id={zone.id || '0'} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      onClick={signOut}
                      width="300px"
                      variation="link"
                      marginTop="20px"
                    >
                      Sign out
                    </Button>
                </Box>
                }
              />
              <Route path="/zone/:zoneId/trails" element={<ListTrails />} />
            </Routes>
          </BrowserRouter>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};