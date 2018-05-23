import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import { CREATE_SUBSCRIBER } from './../apolloql/mutations';
import { LOAD_RESTRICTION_CASE } from './../apolloql/queries';

const FormResults = ({ values }) => (
  <Form initialValues={values}
    onSubmit={() => {}}
    render={({ handleSubmit }) => (
      <div id="assec-widget-results" className="flex-rows flex-1">
        <div className="flex-columns flex-1 flex-between">
          <div className="col-left flex-rows mr20">
            <Query query={LOAD_RESTRICTION_CASE} variables={values}>
              {({ loading, error, data }) => {
                if (error || loading) return <p>...</p>;
                const rules = (data && data.findRestriction) || [];
                const {
                  restrictions,
                  situation: { label, slug },
                } = rules;
                return (
                  <React.Fragment>
                    <h5 className="mb20">
                      <span>Vos Règles</span>
                    </h5>
                    <p className="note large p20">
                      Votre territoire est placé en situation de{' '}
                      <b className={`situation-${slug}`}>{`${label}`}.</b> Les
                      règles de partage de l&apos;eau qui vous sont applicables
                      sont les suivantes:
                    </p>
                    <div className="relative">
                      <ul className="descriptions absolute">
                        {restrictions.map(obj => (
                          <li className="description" key={obj.id}>
                            <ReactMarkdown source={obj.description} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }}
            </Query>
          </div>
          <div className="col-right flex-rows ml20">
            <Mutation mutation={CREATE_SUBSCRIBER}>
              {(createSubscriber, { loading, error }) => {
                if (error || loading) return <p>...</p>;
                return (
                  <div className="col-right flex-rows">
                    <h5 className="mb20">
                      <span>Vos Préférences</span>
                    </h5>
                    <form name="preferences-form" onSubmit={handleSubmit}>
                      <label htmlFor="email" className="mb12">
                        <span>
                          <i className="icon icon-mail mr3" />
                          <span>
                            Prévenez moi de tout changement des règles
                          </span>
                        </span>
                      </label>
                      <div id="alert-input" className="flex-columns">
                        <Field className="field flex-2 py12 px20"
                          id="email"
                          type="email"
                          name="email"
                          component="input"
                          disabled={loading}
                          placeholder="Votre email" />
                        <button className="flex-1 py12 px12 pl20"
                          type="submit"
                          disabled={loading}>
                          <span>
                            {loading && (
                              <i className="animate-spin icon-spin6" />
                            )}
                            {!loading && <span>Rester informé</span>}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                );
              }}
            </Mutation>
          </div>
        </div>
      </div>
    )} />
);
/*
  <Query query={LOAD_RESTRICTION_CASE} variables={values}>
    {({ loading, error, data }) => {
      if (error || loading) return <p>...</p>;
      const rules = (data && data.findRestriction) || [];
      const {
        restrictions,
        situation: { label, slug },
      } = rules;
      return (
        <div className="col-left flex-rows">
          <p className="note large p20">
            Votre territoire est placé en situation de{' '}
            <b className={`situation-${slug}`}>{`${label}`}.</b> Les règles de
            partage de l&apos;eau qui vous sont applicables sont les suivantes:
          </p>
          <div className="relative">
            <ul className="descriptions absolute">
              {restrictions.map(obj => (
                <li className="description" key={obj.id}>
                  <ReactMarkdown source={obj.description} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }}
  </Query>
);
*/

FormResults.propTypes = {
  values: PropTypes.object.isRequired,
};

export default FormResults;
