import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

// application
import { subscribeSuccess } from './../actions';
import { CREATE_SUBSCRIBER } from './../apolloql/mutations';
import { LOAD_RESTRICTION_CASE } from './../apolloql/queries';
import ResultsView from './views/ResultsView';
import SummaryView from './views/SummaryView';
import SummaryError from './views/SummaryError';
import SummarySuccess from './views/SummarySuccess';

const choicesToVariables = choices =>
  Object.keys(choices).reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key]: (choices[key] && choices[key].value) || choices[key],
      }),
    {},
  );

const FormResults = ({
  dispatch, questions, choices, subscribed,
}) => (
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
          onCompleted={() => dispatch(subscribeSuccess())}
          variables={choicesToVariables(choices)}>
          {(createSubscriber, { loading, error }) => {
            if (loading) return <p>...</p>;
            if (error) return <SummaryError />;
            if (subscribed) return <SummarySuccess />;
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
  dispatch: PropTypes.func.isRequired,
  choices: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  subscribed: PropTypes.bool.isRequired,
};

export default connect(({ subscribed }) => ({ subscribed }))(FormResults);
