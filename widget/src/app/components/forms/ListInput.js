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
    const { values, type } = this.props;
    return (
      <label className="list-input" htmlFor={type}>
        <Field name={type}
          render={({ input }) => (
            <select {...input}
              onChange={({ target }) => {
                const value = values[target.value];
                input.onChange(value.id);
                this.bounds.openPopin(value);
              }}>
              <option key="listinput::default" />
              {values.map((value, index) => (
                <option key={`listinput::${value.id}`} value={index}>
                  {value.label}
                </option>
              ))}
            </select>
          )} />
      </label>
    );
  }
}

ListInput.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ListInput);
