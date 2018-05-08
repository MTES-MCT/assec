import React from 'react';

// application
import ColorPickerInput from './colorpicker/ColorPickerInput';

class SituationInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.colorInputChange = this.colorInputChange.bind(this);
  }

  colorInputChange ({ name, value }) {
    console.log('name', name);
    console.log('value', value);
  }

  render () {
    return (
      <div className="situation-input">
        <input type="text" />
        <div className="picker-container">
          <ColorPickerInput color="#FFFFFF"
            name="color"
            onChange={this.colorInputChange} />
        </div>
      </div>
    );
  }
}

SituationInput.propTypes = {};

export default SituationInput;
