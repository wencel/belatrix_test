import { GET_LOCATIONS, SAVE_LOCATIONS } from './HomePageConstants';

export const getLocations = () => ({
  type: GET_LOCATIONS,
});

export const saveLocations = data => ({
  type: SAVE_LOCATIONS,
  data,
});
