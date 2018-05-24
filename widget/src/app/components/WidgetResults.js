import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

// application
import { CREATE_SUBSCRIBER } from './../apolloql/mutations';
import { LOAD_RESTRICTION_CASE } from './../apolloql/queries';
import ResultsView from './views/ResultsView';
import SummaryView from './views/SummaryView';

const choicesToVariables = choices =>
  Object.keys(choices).reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key]: (choices[key] && choices[key].value) || choices[key],
      }),
    {},
  );

const FormResults = ({ questions, choices }) => (
  <div id="assec-widget-results" className="flex-rows flex-1">
    <div className="flex-columns flex-1 flex-between">
      <div className="col-left flex-rows mr20">
        <Query query={LOAD_RESTRICTION_CASE}
          variables={choicesToVariables(choices)}>
          {({ loading, error, data }) => {
            if (error || loading) return <p>...</p>;
            const rules = (data && data.findRestriction) || [];
            const {
              restrictions,
              situation: { label, slug },
            } = rules;
            return (
              <ResultsView restrictions={restrictions}
                slug={slug}
                label={label} />
            );
          }}
        </Query>
      </div>
      <div className="col-right flex-rows ml20">
        <Mutation mutation={CREATE_SUBSCRIBER}
          variables={choicesToVariables(choices)}>
          {(createSubscriber, { loading, error }) => {
            if (error || loading) return <p>...</p>;
            return (
              <SummaryView mutate={createSubscriber}
                choices={choices}
                disabled={loading}
                questions={questions} />
            );
          }}
        </Mutation>
      </div>
    </div>
  </div>
);

FormResults.propTypes = {
  choices: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

export default FormResults;
