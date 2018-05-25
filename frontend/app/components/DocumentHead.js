import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { slugify } from './../core/slugify';

const DocumentHead = ({ pagetitle }) => (
  <React.Fragment>
    <Head>
      <body className={`${slugify(pagetitle)}-page`} />
      <title>{pagetitle} | ASSEC</title>
      <link rel="shortcut icon" href="/static/favicon.ico?v=beta.gouv.fr" />
      <meta name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i" />
      <link rel="stylesheet" href="/static/fontello/css/animation.css" />
      <link rel="stylesheet"
        href="/static/fontello/css/fontello-embedded.css" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
  </React.Fragment>
);

DocumentHead.propTypes = {
  pagetitle: PropTypes.string.isRequired,
};

export default DocumentHead;
