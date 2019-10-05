/**
 * Example data
 */

const QUESTION_TYPE = {
  TEXT: Symbol("Text"),
  SINGLE_SELECT: Symbol("Single Select")
};

const question1 = {
  id: 1,
  prompt: "Please enter an answer to this question",
  defaultValue: "default answer 1",
  type: QUESTION_TYPE.TEXT
};

const question2 = {
  id: 2,
  prompt: "Please enter your answer",
  defaultValue: "default answer 2",
  type: QUESTION_TYPE.TEXT
};

const question3 = {
  id: 3,
  prompt: "Select one of these options",
  type: QUESTION_TYPE.SINGLE_SELECT,
  options: [
    // first option in list is the default
    {
      label: "First",
      value: "first"
    },
    {
      label: "Second",
      value: "second"
    },
    {
      label: "Third",
      value: "third"
    }
  ]
};

// no default value
const question4 = {
  id: 4,
  prompt: "Please enter an answer to this question",
  type: QUESTION_TYPE.TEXT
};

const question5 = {
  id: 5,
  prompt: "Select one of these options",
  type: QUESTION_TYPE.SINGLE_SELECT,
  options: [
    {
      label: "1.0",
      value: "1.0"
    },
    {
      label: "2.0",
      value: "2.0"
    },
    {
      label: "3.0",
      value: "3.0"
    }
  ]
};

// linear
const QUESTIONS = [question1, question3, question2, question4, question5];

/**
 * Interpolates the options into arguments for execa
 * @param options Map of values keyed by question Id
 * @package https://github.com/sindresorhus/execa
 * */

const getExecaArgs = options => {
  return ["echo", [`Selected options: ${JSON.stringify(options, null, 2)}`]];
};

export { QUESTION_TYPE, QUESTIONS, getExecaArgs };
