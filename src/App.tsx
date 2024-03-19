import { useEffect, useState } from 'react';

import { createZone } from './graphql/mutations';
import { listZones } from './graphql/queries';
import { type CreateZoneInput, type Zone } from './API';
import './App.css';

import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import ZoneCard from './components/ZoneCard';

import config from './amplifyconfiguration.json';
import authComponents from './components/Auth/authComponents';

Amplify.configure(config);

const initialState: CreateZoneInput = { id: '', title: '' };
const client = generateClient();

export default function App() {
  const [formState, setFormState] = useState<CreateZoneInput>(initialState);
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

  async function addZone() {
    try {
      if (!formState.id || !formState.title) return;
      const zone = { ...formState };
      setZones([...zones, zone]);
      setFormState(initialState);
      const data = await client.graphql({
        query: createZone,
        variables: {
          input: zone,
        },
      });
      console.log("data", data)
    } catch (err) {
      console.log('error creating zone:', err);
    }
  }
  return (
    <Authenticator components={authComponents}>
      {({ signOut }) => (
        <div style={styles.container}>
        <header style={styles.header}>Zones</header>
          {zones.map((zone, index) => (
            <ZoneCard key={zone.id ? zone.id : index} zone={zone}/>
          ))}
          <h2>Create a zone</h2>
          <input
            onChange={(event) =>
              setFormState({ ...formState, title: event.target.value })
            }
            style={styles.input}
            value={formState.title as string}
            placeholder="title"
          />
          <input
            onChange={(event) =>
              setFormState({ ...formState, id: event.target.value })
            }
            style={styles.input}
            value={formState.id || ''}
            placeholder="id"
          />
          <button style={styles.button} onClick={addZone}>
            Create Zone
          </button>
          <button style={styles.signOut} onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    border: "none",
    backgroundColor: "black",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  zonetitle: { fontSize: 20, fontWeight: "bold" },
  zoneid: { marginBottom: 0 },
  button: {
    backgroundColor: "#3c5c47",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
  signOut: {
    marginTop: '30px',
  },
  header: {
    paddingTop: '30px',
    fontSize: 30,
  },
} as const;