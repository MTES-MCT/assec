import React from 'react';
import PropTypes from 'prop-types';
import { ScrollLink } from 'react-scroll';

const ButtonLinkComponent = ({ children, ...rest }) => (
  <button {...rest}>{children}</button>
);

ButtonLinkComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ButtonLink = ScrollLink(ButtonLinkComponent);

const TextLinkComponent = ({ children, ...rest }) => (
  <a {...rest}>{children}</a>
);

TextLinkComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TextLink = ScrollLink(TextLinkComponent);
