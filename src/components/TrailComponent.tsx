import { useMemo } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Chip, FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapComponent from './MapComponent';
import { Trail } from '../API';

interface TrailComponentProps {
  trail: Trail;
  trailStatusOptions: string[];
  updateTrailStatus: (trailId: string, newStatus: string) => Promise<void>;
  getChipColor: (status: string) => 'success' | 'error' | 'info';
  formatDate: (updatedAt: string) => string;
}

const TrailComponent: React.FC<TrailComponentProps> = ({ trail, trailStatusOptions, updateTrailStatus, getChipColor, formatDate }) => {
  const sanitizedCoordinates = useMemo(() => {
    if (!trail.coordinates) {
      return [];
    }
    return trail.coordinates
      .filter(coord => coord !== null && Array.isArray(coord))
      .map(coord =>
        coord!.filter(point => typeof point === 'number')
      ) as number[][];
  }, [trail.coordinates]);

  return (
    <Accordion key={trail.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
            {trail.title}
          </Typography>
          <Chip label={trail.status} color={getChipColor(trail.status)} />
        </Box>
        <Typography sx={{ fontSize: '0.875rem', marginTop: '0.3rem', marginLeft: '0.5rem' }}>
          {formatDate(trail.updatedAt)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <InputLabel id={`${trail.title}-status-label`}>Change Status</InputLabel>
          <Select
            labelId={`${trail.title}-status-label`}
            value={trail.status}
            label="Change Status"
            onChange={(e) => updateTrailStatus(trail.id, e.target.value as string)}
          >
            {trailStatusOptions.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <MapComponent status={trail.status} coordinates={sanitizedCoordinates} />
      </AccordionDetails>
    </Accordion>
  );
};

export default TrailComponent;
