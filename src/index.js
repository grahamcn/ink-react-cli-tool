import React, { Component } from "react";
import { render, Box } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import execa from "execa";

import Prompt from "./prompt";
import Running from "./running";
import { QUESTIONS, QUESTION_TYPE, getExecaArgs } from "./seed";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 0,
      running: false,
      questions: QUESTIONS
    };
  }

  render() {
    const { currentQuestion, running, questions } = this.state;

    return (
      <Box flexDirection="column">
        <Gradient name="mind">
          <BigText font="chrome" letterSpacing={2} text="CLI Optionizer" />
        </Gradient>

        {questions
          .filter((_, idx) => idx <= currentQuestion)
          .map(this.renderQuestion)}

        {running && <Running />}
      </Box>
    );
  }

  renderQuestion = (question, idx) => {
    const { type, value, id, prompt, options, defaultValue } = question;
    const { currentQuestion } = this.state;
    const focus = idx === currentQuestion;

    if (QUESTION_TYPE.TEXT === type) {
      const placeholder = defaultValue ? `(${defaultValue})` : undefined;

      return (
        <Box key={id}>
          <Prompt prompt={prompt} />
          <TextInput
            focus={focus}
            placeholder={placeholder}
            onChange={value => this.handleChange(id, value)}
            value={value || ""}
            onSubmit={this.submit}
          />
        </Box>
      );
    }

    if (QUESTION_TYPE.SINGLE_SELECT === type) {
      return (
        <Box key={id} flexDirection="column">
          <Prompt prompt={prompt} />
          <SelectInput
            focus={focus}
            items={options}
            onSelect={selected => this.handleSelect(id, selected)}
          />
        </Box>
      );
    }
  };

  handleSelect = (questionId, selected) => {
    const { value } = selected;
    this.handleChange(questionId, value);

    this.submit();
  };

  handleChange = (questionId, value) => {
    this.setState(state => ({
      ...state,
      questions: state.questions.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            value
          };
        }

        return question;
      })
    }));
  };

  getOptions = questions =>
    questions.reduce((map, { id, value, defaultValue }) => {
      map[id] = value || defaultValue;
      return map;
    }, {});

  submit = () => {
    const { currentQuestion, questions } = this.state;

    if (
      !questions[currentQuestion].value &&
      !questions[currentQuestion].defaultValue
    ) {
      return;
    }

    if (currentQuestion === questions.length - 1) {
      this.setState(
        state => ({
          ...state,
          running: true
        }),
        () => {
          const execArgs = getExecaArgs(this.getOptions(questions));
          const subprocess = execa(...execArgs);

          subprocess.stdout.pipe(process.stdout);
          subprocess.stdout.on("end", () => {
            process.exit(0);
            return;
          });
        }
      );
    } else {
      this.setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };
}

render(<App />);
