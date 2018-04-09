import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const Tag = ({ name, onClick, mode }) => (
  <Field name={`${name}.name`}
    render={({ input }) => (
      <button type="button" className="tag" onClick={onClick}>
        <span>{input.value}</span>
        <i className={`icon icon-${
          mode === 'remove' ? 'cancel' : 'plus'
        }-circled`} />
      </button>
    )} />
);

Tag.defaultProps = {
  mode: 'remove',
};

Tag.propTypes = {
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tag;
