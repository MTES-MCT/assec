import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import 'react-select/dist/react-select.css';

// application
import { capitalize } from './../../core/capitalize';
import SubmitButton from './../buttons/SubmitButton';
import ConfirmButton from './../buttons/ConfirmButton';

class ListInput extends React.PureComponent {
  render () {
    const {
      type, values, islast, formValue,
    } = this.props;
    return (
      <div className="input-type-list">
        <div className="fields">
          <label htmlFor={type}>
            <Field name={type}
              render={({ input }) => (
                <Select name={type}
                  value={formValue}
                  searchable={false}
                  className="select-box"
                  placeholder="Sélectionner une valeur"
                  onChange={obj => input.onChange((obj && obj.value) || null)}
                  options={values.map(value => ({
                    value: value.id,
                    label: capitalize(value.label),
                  }))} />
              )} />
          </label>
        </div>
        <nav className="navigation mt12">
          {(islast && <SubmitButton />) || <ConfirmButton />}
        </nav>
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
  islast: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
};

export default ListInput;
