import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { openPopin } from './../../actions';

class ChoiceInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.bounds = bindActionCreators({ openPopin }, props.dispatch);
  }

  render () {
    const { formValue, values, type } = this.props;
    return (
      <div className="flex-rows">
        {values.map((obj, index) => {
          const htmlfor = `choice_${index}`;
          const key = `choiceinput::${obj.id}`;
          return (
            <Field key={key}
              name={type}
              value={obj.id}
              render={({ input }) => (
                <label htmlFor={htmlfor} className="choice-input items-center">
                  <input {...input}
                    id={htmlfor}
                    type="radio"
                    checked={obj.id === formValue}
                    onChange={() => {
                      input.onChange(obj.id);
                    }} />
                  <span>{obj.label}</span>
                </label>
              )} />
          );
        })}
      </div>
    );
  }
}

ChoiceInput.defaultProps = {
  formValue: null,
};

ChoiceInput.propTypes = {
  formValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ChoiceInput);
