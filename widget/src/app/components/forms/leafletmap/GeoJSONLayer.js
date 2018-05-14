import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, Tooltip } from 'react-leaflet';

// application
// import { selectSituation } from './../../../actions';
import { slugify } from './../../../core/slugify';

class GeoJSONLayerInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler () {
    const {
      input, selected, onSelect, obj,
    } = this.props;
    const isselected = obj.zoneid === selected;
    const value = (!isselected && obj) || null;
    input.onChange(value);
    onSelect(obj.zoneid);
  }

  render () {
    const {
      zIndex,
      opacity,
      selected,
      showtooltip,
      obj: {
        geojson, zoneid, shortname, label,
      },
    } = this.props;
    const isselected = zoneid === selected;
    const situclass = slugify(label);
    const selectclass = (isselected && 'active') || '';
    const classname = `geojson-layer ${situclass} ${selectclass}`;
    return (
      <GeoJSON order={zIndex}
        data={JSON.parse(geojson)}
        className={`${classname}`}
        onClick={this.clickHandler}
        style={() => ({ fillOpacity: opacity })}
        key={`mapzone_${zoneid}${(isselected && '_active') || ''}`}>
        {showtooltip && (
          <Tooltip sticky direction="right" offset={[7, 0]}>
            <span>
              <span>{shortname}</span>
            </span>
          </Tooltip>
        )}
      </GeoJSON>
    );
  }
}

GeoJSONLayerInput.propTypes = {
  obj: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  zIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  opacity: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  showtooltip: PropTypes.bool.isRequired,
};

export default GeoJSONLayerInput;
