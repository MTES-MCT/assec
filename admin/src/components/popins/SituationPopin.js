import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from './../ui/popins/CloseButton';
import ColorPickerInput from './../ui/colorpicker/ColorPickerInput';

const SituationPopin = ({ situations, label, onClose }) => {
  const getkey = index => `situations::${index}`;
  return (
    <div id="situation-popin" className="popin-container edit-popin">
      <CloseButton onClose={onClose} />
      <div className="popin-inner">
        <h6 className="popin-title">Définition des situations</h6>
        <h3 className="popin-subtitle">{label}</h3>
        {situations &&
          situations.map((obj, index) => (
            <div key={getkey(index)}>
              <span>{obj.label}</span>
              <ColorPickerInput color="#FFFFFF"
                name="color"
                onChange={value => console.log(value)} />
            </div>
          ))}
      </div>
    </div>
  );
};

SituationPopin.propTypes = {
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  // callback: PropTypes.func.isRequired,
  situations: PropTypes.array.isRequired,
};

export default SituationPopin;
