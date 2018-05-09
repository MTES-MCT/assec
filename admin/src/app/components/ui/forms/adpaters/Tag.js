import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const Tag = ({
  name, onClick, mode, ...rest
}) => {
  const iconclass = mode === 'remove' ? 'cancel' : 'plus';
  return (
    <Field {...rest}
      name={name}
      render={({ input }) => (
        <button type="button" className="tag" onClick={onClick}>
          <span>{input.value}</span>
          <i className={`icon icon-${iconclass}-circled`} />
        </button>
      )} />
  );
};

Tag.defaultProps = {
  mode: 'remove',
};

Tag.propTypes = {
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tag;
