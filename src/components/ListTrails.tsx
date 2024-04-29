import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getZone, trailsByZoneIDAndTitle } from '../graphql/queries';
import { updateTrail } from '../graphql/mutations'
import { Card, Text, Divider, View, Breadcrumbs, Heading, Badge, SelectField, Accordion } from '@aws-amplify/ui-react';
import { TrailsByZoneIDAndTitleQuery, GetZoneQuery } from '../API';
import MapComponent from './MapComponent';

const client = generateClient();
const hardCodedCoord: number[][] = [[-105.233121668108,39.7143688528891],[-105.233238515882,39.7144226787329],[-105.233343879411,39.7145305907519],[-105.233519273342,39.7146473711801],[-105.233694515835,39.7147190995708],[-105.233892757234,39.7146916696873],[-105.234021181449,39.7147184434176],[-105.234126120184,39.7147002113902],[-105.234568719492,39.7144830724244],[-105.234533536639,39.7144290811868],[-105.234334899904,39.7143393799056],[-105.234323111391,39.7143033618552],[-105.234357501251,39.7141230886381],[-105.234333101133,39.7138077796319],[-105.234402215594,39.7135463432701],[-105.234460273217,39.7134651339184],[-105.234541755053,39.7134109079316],[-105.234541449914,39.7133208061806],[-105.234599752523,39.7133116781564],[-105.234832284836,39.7130769419245],[-105.235087660016,39.7126979951691],[-105.235098378152,39.7124186560916],[-105.235121343574,39.7123104867301],[-105.235191004337,39.7122112330235],[-105.235272545343,39.7121750268711],[-105.235365937342,39.7121928580697],[-105.235611324887,39.7123094925799],[-105.235705053296,39.7124264363428],[-105.235728815125,39.7125525323355],[-105.235729581813,39.71277778582],[-105.235695104189,39.7129310298488],[-105.235637140433,39.7130392712456],[-105.235625871429,39.7131564262953],[-105.235637753554,39.7132194738398],[-105.235672905983,39.7132644536778],[-105.235719694181,39.713300399646],[-105.235813117325,39.7133272406533],[-105.235929811947,39.7133360138271],[-105.236128017765,39.7132995699606],[-105.236197893175,39.713263386888],[-105.236302829124,39.713245152897],[-105.236361008431,39.7131999832925],[-105.236535787411,39.7131365548056],[-105.236769176223,39.7131541013871],[-105.236967751021,39.7132257772744],[-105.23735274138,39.7132249909011],[-105.237656159863,39.7132514009551],[-105.237935967207,39.7131967655738],[-105.238087753907,39.7132324962715],[-105.238285834272,39.7131600080329],[-105.238414165423,39.7131597436905],[-105.238682305443,39.7131051322695],[-105.238740698161,39.7131230326909],[-105.238764186184,39.7131680346745],[-105.238717707072,39.7132221916635],[-105.238694871196,39.7133664032943],[-105.23861348581,39.7134476627033],[-105.238357289931,39.7135833433701],[-105.238334267136,39.7136734920889],[-105.238474791962,39.7138263766543],[-105.238579759193,39.7138171507782],[-105.238743369363,39.7138979065939],[-105.23887179395,39.7139246740604],[-105.239000653959,39.71407758288],[-105.239257908754,39.7142482466137],[-105.23936331251,39.7143651633167],[-105.239468559673,39.714437028171],[-105.239492049789,39.7144820308931],[-105.239679245253,39.7146348176995],[-105.24019335734,39.7148590120318],[-105.240403482099,39.7148946180862],[-105.24083477224,39.7147856023809],[-105.241301249222,39.7147305706504],[-105.241767443534,39.7145944491336],[-105.242222408286,39.7145844897441],[-105.242642120557,39.7145025212778],[-105.242712152811,39.7145113851366],[-105.243085293809,39.7144565431141],[-105.243458655936,39.7144647710667],[-105.243774002413,39.7145632219786],[-105.243925730443,39.7145809237848],[-105.244054318199,39.7146527354369],[-105.244194443422,39.7146884808456],[-105.244241269938,39.7147334344198],[-105.244381429548,39.7147781897631],[-105.244521555198,39.714813936577],[-105.244708253211,39.7148225543748],[-105.244836458795,39.7147862422626],[-105.244871300554,39.7147411167186],[-105.245046171209,39.71470470775],[-105.245150563578,39.7145332929446],[-105.24541825766,39.7143525227478],[-105.245593256018,39.7143521527185],[-105.245815176454,39.7144237649646],[-105.245990271,39.7144504248342],[-105.246037065333,39.7144863657175],[-105.245792514873,39.7146130278451],[-105.245699564506,39.71472134828],[-105.245641775887,39.7148746436174],[-105.245619048611,39.7150458861233],[-105.245642573716,39.7150998968499],[-105.245783118714,39.7152527742736],[-105.245888886908,39.7154687959014],[-105.245982604925,39.7155767201726],[-105.245983052992,39.7157028615675],[-105.246053661976,39.7158739081554],[-105.246053822045,39.7159189580722],[-105.246100745496,39.7159909413732],[-105.246136354474,39.7161620593802],[-105.246241548462,39.7162158977144],[-105.246464437596,39.7165578126503],[-105.246663097484,39.7166474939764],[-105.246826915255,39.716782299285],[-105.247037145635,39.716844923778],[-105.24743469208,39.7170873543384],[-105.247516456642,39.7171142098462],[-105.247633128015,39.7171139610642],[-105.247761626432,39.7171587380737]]

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
                    <>
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
                    <MapComponent coordinates={hardCodedCoord} />
                    </>
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
