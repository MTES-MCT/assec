import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';
import createDecorator from 'final-form-calculate';

// application
import { CREATE_BLOCK, UPDATE_ALL_BLOCKS } from './../../apolloql';
import { slugify } from './../../core/utils/slugify';
import Legend from './../../components/ui/forms/Legend';
import TextInput from './../../components/ui/forms/TextInput';
import FormButtons from './../../components/ui/forms/FormButtons';
import MarkdownInput from './../../components/ui/forms/MarkdownInput';

const calculator = createDecorator({
  field: 'label',
  updates: { slug: label => slugify(label) },
});

const validator = (values) => {
  // valide que les valeurs du formulaire
  // sont OK avec ce que l'on attend
  const errors = {};
  if (!values.slug || values.slug === '') {
    errors.slug = 'Required';
  }
  if (!values.content || values.content === '') {
    errors.content = 'Required';
  }

  return errors;
};

const initialValues = {
  slug: '',
  label: '',
  content: '',
};

const DepartementForm = () => (
  <Mutation mutation={CREATE_BLOCK} update={UPDATE_ALL_BLOCKS}>
    {(createBlock, result) => (
      <Form validate={validator}
        decorators={[calculator]}
        initialValues={initialValues}
        render={({
          form, invalid, pristine, handleSubmit,
        }) => {
          const disabled = result.loading;
          const sdisabled = invalid || pristine || result.loading;
          return (
            <form onSubmit={handleSubmit} className="mb20">
              <fieldset>
                <Legend label="Ajouter un block CMS" />
                <TextInput disabled={disabled}
                  name="label"
                  autoComplete="off"
                  label="Titre du block" />
                <TextInput disabled name="slug" label="Identifiant du block" />
                <MarkdownInput disabled={disabled}
                  name="content"
                  label="Contenu du block" />
                <FormButtons disabled={sdisabled}
                  reset={() => form.reset(initialValues)} />
              </fieldset>
            </form>
          );
        }}
        onSubmit={(variables, form) =>
          createBlock({ variables })
            .then(() => form.reset())
            .catch(() => {})
        } />
    )}
  </Mutation>
);

export default DepartementForm;
