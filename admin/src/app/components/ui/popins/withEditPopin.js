import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Query, Mutation } from 'react-apollo';

// application
import EditPopin from './EditPopin';
import { Logger } from './../../../core/logger';

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withEditPopin = (
  WrappedComponent,
  {
    entityname, suptitle, query, mutation, validator, calculator,
  },
) => {
  const PopinHOC = props => (
    <Query query={query} variables={{ id: props.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error </p>;
        const entity = data[entityname];
        return (
          <Mutation mutation={mutation}>
            {(update, result) => (
              <Form initialValues={entity}
                onSubmit={(variables) => {
                  Logger.debug(variables);
                  return update({ variables })
                    .then(() => {})
                    .catch((err) => {
                      /* eslint-disable */
                      console.log('err', err);
                      console.log(
                        'FIXME -> gestion des erreurs dans withEditPopin'
                      );
                      /* eslint-enable */
                    });
                }}
                validate={validator}
                mutators={{ ...arrayMutators }}
                decorators={(calculator && [calculator]) || null}
                render={formprops => (
                  <EditPopin {...props}
                    entity={entity}
                    suptitle={suptitle}
                    formprops={formprops}
                    loading={result.loading}>
                    <WrappedComponent formprops={formprops}
                      disabled={
                        result.loading ||
                        formprops.invalid ||
                        formprops.pristine
                      } />
                  </EditPopin>
                )} />
            )}
          </Mutation>
        );
      }}
    </Query>
  );

  PopinHOC.propTypes = {
    id: PropTypes.string.isRequired,
  };

  PopinHOC.displayName = `withEditPopin(${getDisplayName(WrappedComponent)})`;

  return PopinHOC;
};

export default withEditPopin;
