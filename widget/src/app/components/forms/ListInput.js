import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { openPopin } from './../../actions';

class ListInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.bounds = bindActionCreators({ openPopin }, props.dispatch);
  }

  render () {
    const { formValue, values, type } = this.props;
    const [selection] = (formValue &&
      values
        .map((obj, index) => (obj.id === formValue && index + 1) || false)
        .filter(v => v)) || [0];
    return (
      <label className="list-input" htmlFor={type}>
        <Field name={type}
          render={({ input }) => (
            <select {...input}
              value={selection}
              onChange={({ target }) => {
                if (!target.value) {
                  input.onChange(null);
                  return;
                }
                const value = values[target.value - 1];
                input.onChange(value.id);
              }}>
              <option key="listinput::default" />
              {values.map((value, index) => (
                <option key={`listinput::${value.id}`} value={index + 1}>
                  {value.label}
                </option>
              ))}
            </select>
          )} />
      </label>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ListInput);
