// src/Quiz.js
import React, { Component } from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import './Quize2.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        { question: "What is React?", answer: "A JavaScript library for building user interfaces" },
        { question: "What is a component?", answer: "A reusable piece of UI" },
        { question: "What is JSX?", answer: "A syntax extension for JavaScript" },
        { question: "What is state in React?", answer: "An object that determines how that component renders & behaves" },
        { question: "What is props in React?", answer: "Short for properties, used to pass data to components" },
        { question: "What is a hook?", answer: "A special function that lets you use state and other React features" },
        { question: "What is useEffect?", answer: "A hook that lets you perform side effects in function components" },
        { question: "What is the virtual DOM?", answer: "A lightweight copy of the actual DOM" },
        { question: "What is Redux?", answer: "A state management library for JavaScript apps" },
        { question: "What is the purpose of keys in React?", answer: "To help React identify which items have changed, are added, or are removed" },
      ],
      currentQuestionIndex: 0,
      timer: 60,
      isQuizFinished: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer <= 0) {
          clearInterval(this.timer);
          this.handleNextQuestion();
          return { timer: 60 };
        }
        return { timer: prevState.timer - 1 };
      });
    }, 1000);
  };

  handleNextQuestion = () => {
    const { currentQuestionIndex, questions } = this.state;
    if (currentQuestionIndex < questions.length - 1) {
      this.setState({ currentQuestionIndex: currentQuestionIndex + 1, timer: 60 });
    } else {
      this.setState({ isQuizFinished: true });
      console.log("Quiz Finished");
    }
  };

  render() {
    const { questions, currentQuestionIndex, timer, isQuizFinished } = this.state;

    if (isQuizFinished) {
      return (
        <Container>
          <Typography variant="h4">Quiz Finished!</Typography>
        </Container>
      );
    }

    return (
      <Container className="quiz-container">
        <Paper elevation={3} className="quiz-paper">
          <Typography variant="h5">{questions[currentQuestionIndex].question}</Typography>
          <Typography variant="h6">Time Left: {timer} seconds</Typography>
          <Button variant="contained" color="primary" onClick={this.handleNextQuestion}>
            Next Question
          </Button>
        </Paper>
      </Container>
    );
  }
}

export default Quiz;