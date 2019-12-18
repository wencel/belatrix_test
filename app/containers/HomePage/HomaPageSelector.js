import { createSelector } from 'reselect';

const selectLocations = state => state.homePageReducer;

const locationsSelector = () =>
  createSelector(
    selectLocations,
    reducerHome => reducerHome.locations,
  );

export { locationsSelector };
