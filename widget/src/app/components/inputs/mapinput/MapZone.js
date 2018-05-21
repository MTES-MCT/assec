import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, Tooltip } from 'react-leaflet';

// application
// import { selectSituation } from './../../../actions';
import { slugify } from './../../../core/slugify';

const MapZone = ({
  zIndex,
  opacity,
  showtooltip,
  obj: {
    geojson, zoneid, shortname, label,
  },
}) => {
  const situclass = slugify(label);
  const classname = `geojson-layer ${situclass}`;
  return (
    <GeoJSON order={zIndex}
      data={JSON.parse(geojson)}
      className={`${classname}`}
      style={() => ({ fillOpacity: opacity, opacity })}
      key={`mapzone_${zoneid} || ''}`}>
      {opacity > 0 &&
        showtooltip && (
        <Tooltip sticky direction="right" offset={[7, 0]}>
          <span>
            <span>{shortname}</span>
          </span>
        </Tooltip>
      )}
    </GeoJSON>
  );
};

MapZone.propTypes = {
  obj: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  showtooltip: PropTypes.bool.isRequired,
};

export default MapZone;
