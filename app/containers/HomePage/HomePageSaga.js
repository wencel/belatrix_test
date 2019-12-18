import { call, put, takeLatest } from 'redux-saga/effects';
import { saveLocations } from './HomePageActions';
import { GET_LOCATIONS } from './HomePageConstants';

export function* getLocations() {
  const request = (url, { method }) => {
    const options = {
      method,
      headers: { 'Content-Type': 'text/plain' },
    };
    return fetch(url, options).then(response => {
      const locations = response.text();
      return locations;
    });
  };
  const url = `/static/text.txt`;
  const options = {
    method: 'GET',
  };
  try {
    const data = yield call(request, url, options);
    yield put(saveLocations(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getLocationsSaga() {
  yield takeLatest(GET_LOCATIONS, getLocations);
}
