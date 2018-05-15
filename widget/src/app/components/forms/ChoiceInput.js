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
    const { values, type } = this.props;
    return (
      <div className="flex-rows">
        {values.map((obj, index) => {
          const htmlfor = `choice_${index}`;
          const key = `choiceinput::${obj.id}`;
          return (
            <label key={key}
              htmlFor={htmlfor}
              className="choice-input items-center">
              <Field id={htmlfor}
                name={type}
                value={obj.id}
                render={({ input }) => (
                  <input {...input}
                    type="radio"
                    onChange={() => {
                      input.onChange(obj.id);
                      this.bounds.openPopin(obj);
                    }} />
                )} />
              <span>{obj.label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}

ChoiceInput.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ChoiceInput);
