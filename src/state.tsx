// state.js
import { atom } from 'jotai';
import { type Zone, type CreateZoneInput } from './API';
import { type TrailsByZoneIDAndTitleQuery, type GetZoneQuery } from './API';
import { type Coordinates } from './components/MapComponent';

export const trailsAtom = atom<TrailsByZoneIDAndTitleQuery["trailsByZoneIDAndTitle"] | null>(null);
export const zonesAtom = atom<Zone[] | CreateZoneInput[]>([]);
export const zoneAtom = atom<GetZoneQuery["getZone"] | null>(null);
export const coordinatesAtom = atom<Coordinates>([]);
export const statusAtom = atom<string>('');