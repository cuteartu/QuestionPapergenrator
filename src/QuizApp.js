import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class QuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizStarted: false,
      currentQuestion: 0,
      score: 0,
      selectedOption: null,
      showResult: false,
      timeLeft: 15, // seconds per question
      timerActive: false,
      answeredCorrectly: null,
      questions: [
        {
          id: 1,
          text: 'What is the capital of France?',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          correctAnswer: 'Paris',
          difficulty: 'easy'
        },
        {
          id: 2,
          text: 'Which language is used for web apps?',
          options: ['PHP', 'Python', 'JavaScript', 'All'],
          correctAnswer: 'All',
          difficulty: 'medium'
        },
        {
          id: 3,
          text: 'React is a ____',
          options: ['Framework', 'Library', 'Language', 'Database'],
          correctAnswer: 'Library',
          difficulty: 'medium'
        },
        {
          id: 4,
          text: 'Which company created React?',
          options: ['Google', 'Facebook', 'Apple', 'Microsoft'],
          correctAnswer: 'Facebook',
          difficulty: 'easy'
        },
        {
          id: 5,
          text: 'Bootstrap is primarily used for?',
          options: ['Backend', 'Database', 'Styling', 'Authentication'],
          correctAnswer: 'Styling',
          difficulty: 'easy'
        },
        {
          id: 6,
          text: 'Which hook is used for side effects in React?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correctAnswer: 'useEffect',
          difficulty: 'hard'
        },
        {
          id: 7,
          text: 'What does JSX stand for?',
          options: ['JavaScript XML', 'JavaScript Extension', 'JavaScript Syntax', 'JavaScript Xylophone'],
          correctAnswer: 'JavaScript XML',
          difficulty: 'hard'
        }
      ]
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startQuiz = () => {
    this.setState({ 
      quizStarted: true,
      currentQuestion: 0,
      score: 0,
      showResult: false,
      timeLeft: 15,
      timerActive: true
    }, this.startTimer);
  };

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { timeLeft, timerActive } = this.state;
      if (timeLeft > 0 && timerActive) {
        this.setState({ timeLeft: timeLeft - 1 });
      } else if (timerActive) {
        this.handleNextQuestion();
      }
    }, 1000);
  };

  stopTimer = () => {
    this.setState({ timerActive: false });
    clearInterval(this.timer);
  };

  handleOptionSelect = (option) => {
    const { questions, currentQuestion } = this.state;
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    
    this.setState({ 
      selectedOption: option,
      answeredCorrectly: isCorrect,
      timerActive: false
    });
    
    // Visual feedback animation
    setTimeout(() => {
      this.setState({ answeredCorrectly: null });
    }, 1000);
  };

  handleNextQuestion = () => {
    const { currentQuestion, questions, score, selectedOption } = this.state;
    
    // Check if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      this.setState({ score: score + 1 });
    }

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      this.setState({ 
        currentQuestion: currentQuestion + 1,
        selectedOption: null,
        timeLeft: 15,
        timerActive: true
      }, this.startTimer);
    } else {
      this.stopTimer();
      this.setState({ showResult: true });
    }
  };

  restartQuiz = () => {
    this.setState({ 
      quizStarted: false,
      currentQuestion: 0,
      score: 0,
      selectedOption: null,
      showResult: false,
      timeLeft: 15,
      answeredCorrectly: null
    });
  };

  shuffleQuestions = () => {
    this.setState(prevState => {
      const shuffled = [...prevState.questions].sort(() => 0.5 - Math.random());
      return { questions: shuffled };
    });
  };

  render() {
    const { 
      quizStarted, 
      currentQuestion, 
      questions, 
      selectedOption, 
      score, 
      showResult,
      timeLeft,
      answeredCorrectly
    } = this.state;

    if (!quizStarted) {
      return (
        <div className="quiz-container">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card animate__animated animate__zoomIn">
                  <div className="card-header bg-primary text-white">
                    <h1 className="text-center">React Quiz Challenge</h1>
                  </div>
                  <div className="card-body text-center">
                    <div className="animate__animated animate__fadeIn">
                      <h3>Test Your Knowledge!</h3>
                      <p className="lead">This quiz contains {questions.length} questions with varying difficulty.</p>
                      <div className="features mb-4">
                        <span className="badge bg-success me-2 animate__animated animate__bounceIn" style={{ animationDelay: '0.2s' }}>Timed Questions</span>
                        <span className="badge bg-info me-2 animate__animated animate__bounceIn" style={{ animationDelay: '0.4s' }}>Instant Feedback</span>
                        <span className="badge bg-warning animate__animated animate__bounceIn" style={{ animationDelay: '0.6s' }}>Randomized</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                      <button 
                        className="btn btn-success btn-lg animate__animated animate__pulse animate__infinite"
                        onClick={this.startQuiz}
                      >
                        Start Quiz
                      </button>
                      <button 
                        className="btn btn-outline-secondary btn-lg animate__animated animate__fadeIn"
                        onClick={this.shuffleQuestions}
                      >
                        Shuffle Questions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (showResult) {
      const percentage = Math.round((score / questions.length) * 100);
      let resultClass = '';
      let resultEmoji = '';
      
      if (percentage >= 80) {
        resultClass = 'text-success';
        resultEmoji = '🎉';
      } else if (percentage >= 50) {
        resultClass = 'text-info';
        resultEmoji = '👍';
      } else {
        resultClass = 'text-warning';
        resultEmoji = '💪';
      }

      return (
        <div className="quiz-container">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className={`card animate__animated animate__bounceIn ${resultClass}`}>
                  <div className="card-header bg-info text-white">
                    <h1 className="text-center">Quiz Results</h1>
                  </div>
                  <div className="card-body text-center">
                    <div className="result-circle animate__animated animate__zoomIn">
                      <h1 className="display-1">{percentage}%</h1>
                      <p className="lead">{resultEmoji}</p>
                    </div>
                    <h3 className="mt-4">Your Score: {score} / {questions.length}</h3>
                    <p className="lead">
                      {percentage >= 80 ? 'Excellent work! You really know your stuff!' : 
                       percentage >= 50 ? 'Good job! You have a solid understanding.' : 
                       'Keep practicing! You\'ll get better with time.'}
                    </p>
                    <div className="d-grid gap-2 mt-4">
                      <button 
                        className="btn btn-primary btn-lg animate__animated animate__tada"
                        onClick={this.restartQuiz}
                      >
                        Restart Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = questions[currentQuestion];
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    const timerClass = timeLeft <= 5 ? 'text-danger' : 'text-warning';

    return (
      <div className="quiz-container">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card animate__animated animate__fadeIn">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span className={`badge bg-${currentQ.difficulty === 'easy' ? 'success' : 
                                  currentQ.difficulty === 'medium' ? 'warning' : 'danger'}`}>
                    {currentQ.difficulty}
                  </span>
                  <span className={`fw-bold ${timerClass}`}>
                    Time: {timeLeft}s
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="progress mb-3">
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated" 
                      role="progressbar"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {currentQuestion + 1}/{questions.length}
                    </div>
                  </div>
                  
                  <h3 className="mb-4 animate__animated animate__fadeIn">{currentQ.text}</h3>
                  
                  <div className="options-container">
                    {currentQ.options.map((option, index) => {
                      let optionClass = 'list-group-item list-group-item-action animate__animated animate__fadeInUp';
                      if (selectedOption === option) {
                        optionClass += answeredCorrectly ? ' bg-success text-white' : ' bg-danger text-white';
                      }
                      return (
                        <button
                          key={index}
                          className={optionClass}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => this.handleOptionSelect(option)}
                          disabled={selectedOption !== null}
                        >
                          {option}
                          {selectedOption === option && (
                            <span className="float-end">
                              {answeredCorrectly ? '✓' : '✗'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {answeredCorrectly !== null && (
                    <div className={`feedback mt-3 animate__animated animate__fadeIn ${answeredCorrectly ? 'text-success' : 'text-danger'}`}>
                      {answeredCorrectly ? 'Correct! Well done!' : 'Incorrect. The right answer is: ' + currentQ.correctAnswer}
                    </div>
                  )}
                  
                  <div className="d-grid gap-2 mt-4">
                    <button
                      className="btn btn-primary btn-lg"
                      disabled={!selectedOption}
                      onClick={this.handleNextQuestion}
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizApp;