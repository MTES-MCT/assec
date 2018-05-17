import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import 'react-select/dist/react-select.css';

// application
import { capitalize } from './../../core/capitalize';

class ListInput extends React.PureComponent {
  render () {
    const { formValue, values, type } = this.props;
    const options = values.map(value => ({
      value: value.id,
      label: capitalize(value.label),
    }));
    return (
      <div className="list-input">
        <label htmlFor={type}>
          <Field name={type}
            render={({ input }) => (
              <Select name={type}
                options={options}
                value={formValue}
                searchable={false}
                className="select-box"
                placeholder="Sélectionner une valeur"
                onChange={obj => input.onChange((obj && obj.value) || null)} />
            )} />
        </label>
      </div>
    );
  }
}

ListInput.defaultProps = {
  formValue: null,
};

ListInput.propTypes = {
  formValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default ListInput;
