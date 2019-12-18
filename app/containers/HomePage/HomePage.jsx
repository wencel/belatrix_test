import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import './stylesHomePage.css';
import { getLocations, saveLocations } from './HomePageActions';
import { locationsSelector } from './HomaPageSelector';

import { getLocationsSaga } from './HomePageSaga';
import LocationsTable from '../../components/LocationsTable';
import ReadFile from '../../components/ReadFile';

const HomePage = ({ locations, onGetLocations, onSaveLocations }) => {
  const [locationsFormated, setLocationsFormated] = useState({});
  useEffect(() => {
    onGetLocations();
  }, []);

  useEffect(() => {
    updateTables(locations);
  }, [locations]);

  const updateTables = locationsString => {
    const locationsArray = locationsString
      .replace(/“/g, '')
      .replace(/”/g, '')
      .replace(/"/g, '')
      .split('\n');
    const locationsObject = {
      departamento: [],
      provincia: [],
      distrito: [],
    };
    locationsArray.forEach(location => {
      const locationSubArray = location.split('/');
      const departamento =
        locationSubArray[0] && locationSubArray[0].trim()
          ? locationSubArray[0].trim().split(/ (.+)/)
          : ['', ''];
      const provincia =
        locationSubArray[1] && locationSubArray[1].trim()
          ? locationSubArray[1].trim().split(/ (.+)/)
          : ['', ''];
      const distrito =
        locationSubArray[2] && locationSubArray[2].trim()
          ? locationSubArray[2].trim().split(/ (.+)/)
          : ['', ''];
      if (departamento[0] && departamento[1]) {
        const itemToPush = {
          codigo: departamento[0],
          nombre: departamento[1],
          codigoPadre: '',
          nombrePadre: '',
        };
        if (
          locationsObject.departamento.filter(item => isEqual(item, itemToPush))
            .length === 0
        ) {
          locationsObject.departamento.push(itemToPush);
        }
      }
      if (provincia[0] && provincia[1]) {
        const itemToPush = {
          codigo: provincia[0],
          nombre: provincia[1],
          codigoPadre: departamento[0],
          nombrePadre: departamento[1],
        };
        if (
          locationsObject.provincia.filter(item => isEqual(item, itemToPush))
            .length === 0
        ) {
          locationsObject.provincia.push(itemToPush);
        }
      }
      if (distrito[0] && distrito[1]) {
        const itemToPush = {
          codigo: distrito[0],
          nombre: distrito[1],
          codigoPadre: provincia[0],
          nombrePadre: provincia[1],
        };
        if (
          locationsObject.distrito.filter(item => isEqual(item, itemToPush))
            .length === 0
        ) {
          locationsObject.distrito.push(itemToPush);
        }
      }
    });
    setLocationsFormated(locationsObject);
  };

  const handleFileChanged = locationsString => {
    onSaveLocations(locationsString);
  };
  return (
    <div className="container">
      <LocationsTable
        title="Departamentos"
        data={locationsFormated.departamento}
      />
      <LocationsTable title="Provincias" data={locationsFormated.provincia} />
      <LocationsTable title="Distritos" data={locationsFormated.distrito} />
      <ReadFile handleFileChanged={handleFileChanged} />
    </div>
  );
};

HomePage.propTypes = {
  locations: PropTypes.string,
  onGetLocations: PropTypes.func,
  onSaveLocations: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetLocations: () => dispatch(getLocations()),
    onSaveLocations: data => dispatch(saveLocations(data)),
  };
}
const withHomeSaga = injectSaga({
  key: 'getLocationsSaga',
  saga: getLocationsSaga,
});

const locationToProps = createStructuredSelector({
  locations: locationsSelector(),
});

const withConnect = connect(
  locationToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withHomeSaga,
)(HomePage);
