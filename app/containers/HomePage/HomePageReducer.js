import { SAVE_LOCATIONS } from './HomePageConstants';

export const initialState = {
  locations: '',
};

function HomePageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_LOCATIONS:
      return {
        ...state,
        locations: action.data,
      };
    default:
      return state;
  }
}

export default HomePageReducer;
