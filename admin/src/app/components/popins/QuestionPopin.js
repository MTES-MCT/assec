import React from 'react';

// application
import { GET_QUESTION, UPDATE_QUESTION } from './../../apolloql';
import TextInput from './../ui/forms/TextInput';
import SelectBox from './../ui/forms/SelectBox';
import RadioGroup from './../ui/forms/RadioGroup';
import MarkdownInput from './../ui/forms/MarkdownInput';
import withEditPopin from './../ui/popins/withEditPopin';
import { questions } from './../../components/forms/helpers/questions';

const QuestionPopin = () => (
  <div className="flex-rows">
    <TextInput inline name="title" label="Titre de la question block" />
    <RadioGroup inline
      name="type"
      provider={questions.provider.types}
      label="Type des valeurs de la question" />
    <SelectBox inline
      name="display"
      label="Type d'affichage"
      provider={questions.provider.displays} />
    <MarkdownInput inline
      name="description"
      label="Description de la question" />
  </div>
);

export default withEditPopin(QuestionPopin, {
  query: GET_QUESTION,
  entityname: 'question',
  mutation: UPDATE_QUESTION,
  validator: questions.validator,
  calculator: questions.calculator,
  suptitle: "Modification d'un Block CMS",
});
