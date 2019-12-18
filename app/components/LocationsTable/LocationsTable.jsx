import React from 'react';
import PropTypes from 'prop-types';
import './stylesLocationsTable.css';

const LocationsTable = ({ title, data }) => {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="tableGrid">
        <div className="tableGridHead">Código</div>
        <div className="tableGridHead">Nombre</div>
        <div className="tableGridHead">Código Padre</div>
        <div className="tableGridHead">Descripción Padre</div>
        {data &&
          data.map(item => (
            <div className="tableGridRow" key={item.codigo + item.nombre}>
              <div className="tableGriditem">{item.codigo}</div>
              <div className="tableGriditem">{item.nombre}</div>
              <div className="tableGriditem">
                {item.codigoPadre ? item.codigoPadre : '-'}
              </div>
              <div className="tableGriditem">
                {item.nombrePadre ? item.nombrePadre : '-'}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

LocationsTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default LocationsTable;
