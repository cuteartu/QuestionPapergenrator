import React, { Component } from 'react';
import { Button, Card, Container,Alert,ProgressBar,Form,Row,Col,Badge,Modal,ListGroup,Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ReactQuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          question: 'What is the correct command to create a new React app?',
          options: [
            'npm install create-react-app',
            'npm create-react-app my-app',
            'npx create-react-app my-app',
            'node create-react-app my-app'
          ],
          answer: 'npx create-react-app my-app',
          explanation: 'npx is a package runner tool that comes with npm 5.2+ and is the recommended way to create a new React app.',
          category: 'Setup',
          difficulty: 'Easy'
        },
        {
          id: 2,
          question: 'What does JSX stand for?',
          options: [
            'JavaScript XML',
            'JavaScript Extension',
            'JavaScript Syntax',
            'JavaScript Xcode'
          ],
          answer: 'JavaScript XML',
          explanation: 'JSX stands for JavaScript XML. It allows us to write HTML in React and makes the syntax more readable.',
          category: 'Fundamentals',
          difficulty: 'Easy'
        },
        {
          id: 3,
          question: 'Which hook is used to manage side effects in functional components?',
          options: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer'
          ],
          answer: 'useEffect',
          explanation: 'The useEffect hook is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.',
          category: 'Hooks',
          difficulty: 'Medium'
        },
        {
          id: 4,
          question: 'How do you pass data to a child component in React?',
          options: [
            'Using state',
            'Using props',
            'Using refs',
            'Using context'
          ],
          answer: 'Using props',
          explanation: 'Props (short for properties) are how components talk to each other. Parents can pass data to children via props.',
          category: 'Components',
          difficulty: 'Easy'
        },
        {
          id: 5,
          question: 'Which method is called when a component is being removed from the DOM?',
          options: [
            'componentWillUnmount',
            'componentDidMount',
            'componentWillUpdate',
            'componentDidUpdate'
          ],
          answer: 'componentWillUnmount',
          explanation: 'componentWillUnmount is called right before a component is unmounted and destroyed. This is where you would perform any cleanup.',
          category: 'Lifecycle',
          difficulty: 'Medium'
        },
        {
          id: 6,
          question: 'What is the purpose of keys in React lists?',
          options: [
            'To provide style to list items',
            'To identify which items have changed',
            'To make list items clickable',
            'To add animation to list items'
          ],
          answer: 'To identify which items have changed',
          explanation: 'Keys help React identify which items have changed, are added, or are removed. They should be given to the elements inside the array to give the elements a stable identity.',
          category: 'Performance',
          difficulty: 'Medium'
        },
        {
          id: 7,
          question: 'Which of these is NOT a React hook?',
          options: [
            'useState',
            'useEffect',
            'useComponent',
            'useReducer'
          ],
          answer: 'useComponent',
          explanation: 'useComponent is not a valid React hook. The other options are all built-in React hooks.',
          category: 'Hooks',
          difficulty: 'Easy'
        },
        {
          id: 8,
          question: 'What is the virtual DOM in React?',
          options: [
            'A lightweight copy of the actual DOM',
            'A 3D representation of the DOM',
            'A backup of the DOM',
            'A shadow version of the DOM'
          ],
          answer: 'A lightweight copy of the actual DOM',
          explanation: 'The virtual DOM is a lightweight representation of the real DOM in memory. React uses it to determine what changed and efficiently update the browser DOM.',
          category: 'Performance',
          difficulty: 'Medium'
        },
        {
          id: 9,
          question: 'Which lifecycle method is called after a component renders?',
          options: [
            'componentWillMount',
            'componentDidMount',
            'componentWillRender',
            'componentDidRender'
          ],
          answer: 'componentDidMount',
          explanation: 'componentDidMount is invoked immediately after a component is mounted (inserted into the tree). This is a good place to set up subscriptions or network requests.',
          category: 'Lifecycle',
          difficulty: 'Medium'
        },
        {
          id: 10,
          question: 'What is the purpose of React Router?',
          options: [
            'To manage state in React applications',
            'To handle API calls in React',
            'To enable navigation between views in a React app',
            'To optimize performance of React components'
          ],
          answer: 'To enable navigation between views in a React app',
          explanation: 'React Router is a standard library for routing in React. It enables navigation between views from different components in a React application.',
          category: 'Routing',
          difficulty: 'Medium'
        },
        {
          id: 11,
          question: 'What is the purpose of useMemo hook?',
          options: [
            'To perform side effects',
            'To memoize expensive calculations',
            'To manage component state',
            'To handle component lifecycle'
          ],
          answer: 'To memoize expensive calculations',
          explanation: 'useMemo is used to memoize expensive calculations and optimize performance by caching the result.',
          category: 'Hooks',
          difficulty: 'Advanced'
        },
        {
          id: 12,
          question: 'What is the correct way to update state based on previous state?',
          options: [
            'setState(newValue)',
            'setState(prevState => newValue)',
            'this.state = newValue',
            'All of the above'
          ],
          answer: 'setState(prevState => newValue)',
          explanation: 'When the new state depends on the previous state, you should use the functional form of setState.',
          category: 'State',
          difficulty: 'Medium'
        },
        {
          id: 13,
          question: 'What does the children prop represent?',
          options: [
            'Child components of a parent',
            'Elements between the opening and closing tags',
            'Both A and B',
            'None of the above'
          ],
          answer: 'Both A and B',
          explanation: 'The children prop represents both child components and any elements between the opening and closing tags of a component.',
          category: 'Components',
          difficulty: 'Easy'
        },
        {
          id: 14,
          question: 'Which method is used for error boundaries?',
          options: [
            'componentDidCatch',
            'getDerivedStateFromError',
            'Both A and B',
            'None of the above'
          ],
          answer: 'Both A and B',
          explanation: 'Error boundaries use both componentDidCatch and getDerivedStateFromError methods to catch JavaScript errors in their child component tree.',
          category: 'Error Handling',
          difficulty: 'Advanced'
        },
        {
          id: 15,
          question: 'What is the purpose of React.Fragment?',
          options: [
            'To group multiple elements without adding extra nodes',
            'To improve performance',
            'To handle conditional rendering',
            'To create reusable components'
          ],
          answer: 'To group multiple elements without adding extra nodes',
          explanation: 'React.Fragment lets you group multiple elements without adding extra nodes to the DOM.',
          category: 'Components',
          difficulty: 'Medium'
        }
      ],
      currentQuestionIndex: 0,
      selectedOption: '',
      score: 0,
      quizStarted: false,
      quizCompleted: false,
      showAnswer: false,
      showExplanation: false,
      darkMode: false,
      showLeaderboard: false,
      userName: '',
      leaderboard: JSON.parse(localStorage.getItem('reactQuizLeaderboard')) || [],
      correctAnswers: [],
      incorrectAnswers: [],
      skippedQuestions: [],
      quizSettings: {
        questionCount: 10,
        difficulty: 'All',
        categories: []
      },
      showSettings: false,
      loading: false,
      stats: JSON.parse(localStorage.getItem('quizStats')) || {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        categories: {}
      },
      showQuestionNavigation: false
    };
  }

  componentDidMount() {
    console.log('Quiz component mounted');
  }

  componentWillUnmount() {
    console.log('Quiz component will unmount');
  }

  startQuiz = () => {
    const selectedQuestions = this.getFilteredQuestions();
    
    this.setState({ 
      quizStarted: true,
      showAnswer: false,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: [],
      incorrectAnswers: [],
      skippedQuestions: [],
      questions: selectedQuestions,
      loading: true
    });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 800);
  };

  getFilteredQuestions = () => {
    const { questions, quizSettings } = this.state;
    let filtered = [...questions];
    
    if (quizSettings.difficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === quizSettings.difficulty);
    }
    
    if (quizSettings.categories.length > 0) {
      filtered = filtered.filter(q => quizSettings.categories.includes(q.category));
    }
    
    return this.shuffleArray(filtered).slice(0, quizSettings.questionCount);
  };

  shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  handleOptionChange = (e) => {
    this.setState({ 
      selectedOption: e.target.value,
      showAnswer: false,
      showExplanation: false
    });
  };

  handleNextQuestion = () => {
    const { questions, currentQuestionIndex, selectedOption, score, correctAnswers, incorrectAnswers } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
      this.setState({ 
        score: score + 1,
        showAnswer: true,
        correctAnswers: [...correctAnswers, currentQuestion.id]
      });
    } else {
      this.setState({ 
        showAnswer: true,
        incorrectAnswers: [...incorrectAnswers, currentQuestion.id]
      });
    }

    setTimeout(() => {
      this.setState({ selectedOption: '' });

      if (currentQuestionIndex < questions.length - 1) {
        this.setState({ 
          currentQuestionIndex: currentQuestionIndex + 1,
          showAnswer: false,
          showExplanation: false
        });
      } else {
        this.updateStats();
        this.setState({ quizCompleted: true });
      }
    }, 1500);
  };

  handleSkipQuestion = () => {
    const { currentQuestionIndex, questions, skippedQuestions } = this.state;
    this.setState({
      skippedQuestions: [...skippedQuestions, questions[currentQuestionIndex].id],
      selectedOption: '',
      showAnswer: false,
      showExplanation: false
    }, this.handleNextQuestion);
  };

  toggleExplanation = () => {
    this.setState(prevState => ({
      showExplanation: !prevState.showExplanation
    }));
  };

  restartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      selectedOption: '',
      score: 0,
      quizStarted: false,
      quizCompleted: false,
      showAnswer: false,
      showExplanation: false,
      correctAnswers: [],
      incorrectAnswers: [],
      skippedQuestions: []
    });
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };

  handleNameChange = (e) => {
    this.setState({ userName: e.target.value });
  };

  saveScore = () => {
    const { userName, score, questions, leaderboard } = this.state;
    if (!userName.trim()) return;

    const newEntry = {
      name: userName,
      score,
      total: questions.length,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score || a.time.localeCompare(b.time))
      .slice(0, 10);

    this.setState({
      leaderboard: updatedLeaderboard,
      showLeaderboard: true
    });

    localStorage.setItem('reactQuizLeaderboard', JSON.stringify(updatedLeaderboard));
  };

  updateStats = () => {
    const { score, questions, stats } = this.state;
    const newStats = { ...stats };
    
    newStats.totalQuizzes += 1;
    newStats.totalQuestions += questions.length;
    newStats.correctAnswers += score;
    
    questions.forEach(q => {
      if (!newStats.categories[q.category]) {
        newStats.categories[q.category] = { total: 0, correct: 0 };
      }
      newStats.categories[q.category].total += 1;
    });
    
    this.state.correctAnswers.forEach(id => {
      const question = questions.find(q => q.id === id);
      newStats.categories[question.category].correct += 1;
    });
    
    localStorage.setItem('quizStats', JSON.stringify(newStats));
    this.setState({ stats: newStats });
  };

  toggleSettings = () => {
    this.setState(prev => ({ showSettings: !prev.showSettings }));
  };

  handleSettingChange = (setting, value) => {
    this.setState(prev => ({
      quizSettings: {
        ...prev.quizSettings,
        [setting]: value
      }
    }));
  };

  toggleCategory = (category) => {
    this.setState(prev => {
      const categories = [...prev.quizSettings.categories];
      const index = categories.indexOf(category);
      
      if (index === -1) {
        categories.push(category);
      } else {
        categories.splice(index, 1);
      }
      
      return {
        quizSettings: {
          ...prev.quizSettings,
          categories
        }
      };
    });
  };

  resetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics?')) {
      const emptyStats = {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        categories: {}
      };
      localStorage.setItem('quizStats', JSON.stringify(emptyStats));
      this.setState({ stats: emptyStats });
    }
  };

  toggleQuestionNavigation = () => {
    this.setState(prevState => ({
      showQuestionNavigation: !prevState.showQuestionNavigation
    }));
  };

  navigateToQuestion = (index) => {
    this.setState({
      currentQuestionIndex: index,
      selectedOption: '',
      showAnswer: false,
      showExplanation: false,
      showQuestionNavigation: false
    });
  };

  renderQuestionNavigation() {
    const { questions, currentQuestionIndex, showQuestionNavigation, darkMode } = this.state;
    
    if (!showQuestionNavigation) return null;

    return (
      <Card className={`mt-3 ${darkMode ? 'bg-dark text-white' : ''}`}>
        <Card.Body>
          <Card.Title>Question Navigation</Card.Title>
          <div className="d-flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={
                  index === currentQuestionIndex ? 'primary' : 
                  this.state.correctAnswers.includes(q.id) ? 'success' :
                  this.state.incorrectAnswers.includes(q.id) ? 'danger' :
                  this.state.skippedQuestions.includes(q.id) ? 'warning' :
                  'outline-secondary'
                }
                onClick={() => this.navigateToQuestion(index)}
                className="question-nav-btn"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }

  renderStartScreen() {
    const { darkMode, quizSettings, showSettings } = this.state;
    const categories = [...new Set(this.state.questions.map(q => q.category))];
    const difficulties = ['All', 'Easy', 'Medium', 'Advanced'];
    
    return (
      <div className="start-screen">
        <Card className={`text-center mt-5 ${darkMode ? 'bg-dark text-white' : ''}`}>
          <Card.Body>
            <Card.Title as="h4" className="d-flex align-items-center justify-content-center">
              🏆 React Knowledge Quiz
            </Card.Title>
            
            <Card.Text className="mt-3">
              Test your React knowledge with customizable quizzes.
            </Card.Text>
            
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={this.startQuiz}
                className="me-2"
              >
                Start Quiz
              </Button>
              
              <Button 
                variant={darkMode ? "light" : "dark"} 
                size="lg"
                onClick={this.toggleSettings}
              >
                {showSettings ? 'Hide Settings' : 'Quiz Settings'}
              </Button>
            </div>
            
            {this.state.leaderboard.length > 0 && (
              <div className="mt-4">
                <Button 
                  variant="outline-info"
                  onClick={() => this.setState({ showLeaderboard: true })}
                >
                  🏆 View Leaderboard
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {showSettings && (
          <Card className={`mt-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
              <Card.Title>Quiz Settings</Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Questions: {quizSettings.questionCount}</Form.Label>
                  <Form.Range 
                    min="5" 
                    max="15" 
                    value={quizSettings.questionCount} 
                    onChange={(e) => this.handleSettingChange('questionCount', parseInt(e.target.value))}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Difficulty Level</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {difficulties.map(diff => (
                      <Button
                        key={diff}
                        variant={quizSettings.difficulty === diff ? 'primary' : 'outline-primary'}
                        onClick={() => this.handleSettingChange('difficulty', diff)}
                      >
                        {diff}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Categories</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={quizSettings.categories.includes(cat) ? 'success' : 'outline-secondary'}
                        onClick={() => this.toggleCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}
        
        <Card className={`mt-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
          <Card.Body>
            <Card.Title>Your Statistics</Card.Title>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className={darkMode ? 'bg-dark text-white' : ''}>
                    📚 Total Quizzes: {this.state.stats.totalQuizzes}
                  </ListGroup.Item>
                  <ListGroup.Item className={darkMode ? 'bg-dark text-white' : ''}>
                    📊 Questions Attempted: {this.state.stats.totalQuestions}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item className={darkMode ? 'bg-dark text-white' : ''}>
                    🏆 Correct Answers: {this.state.stats.correctAnswers}
                  </ListGroup.Item>
                  <ListGroup.Item className={darkMode ? 'bg-dark text-white' : ''}>
                    📈 Accuracy: {this.state.stats.totalQuestions > 0 
                      ? Math.round((this.state.stats.correctAnswers / this.state.stats.totalQuestions) * 100) 
                      : 0}%
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            
            <div className="mt-3">
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={this.resetStats}
              >
                🔄 Reset Statistics
              </Button>
            </div>
          </Card.Body>
        </Card>
        
        <Modal 
          show={this.state.showLeaderboard} 
          onHide={() => this.setState({ showLeaderboard: false })}
          centered
          className={darkMode ? 'dark-modal' : ''}
        >
          <Modal.Header closeButton className={darkMode ? 'bg-dark text-white' : ''}>
            <Modal.Title>Quiz Leaderboard</Modal.Title>
          </Modal.Header>
          <Modal.Body className={darkMode ? 'bg-dark text-white' : ''}>
            {this.state.leaderboard.length === 0 ? (
              <p>No scores yet. Be the first!</p>
            ) : (
              <ListGroup variant="flush">
                {this.state.leaderboard.map((entry, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className={darkMode ? 'bg-dark text-white' : ''}
                    active={entry.name === this.state.userName && entry.score === this.state.score}
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {index + 1}. {entry.name} 
                        {entry.name === this.state.userName && entry.score === this.state.score && (
                          <Badge bg="info" className="ms-2">You</Badge>
                        )}
                      </span>
                      <span>
                        {entry.score}/{entry.total} ({Math.round((entry.score / entry.total) * 100)}%)
                      </span>
                    </div>
                    <small className="text-muted">{entry.date} {entry.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Modal.Body>
          <Modal.Footer className={darkMode ? 'bg-dark text-white' : ''}>
            <Button 
              variant="secondary" 
              onClick={() => this.setState({ showLeaderboard: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  renderQuestion() {
    const { 
      questions, 
      currentQuestionIndex, 
      selectedOption, 
      showAnswer, 
      showExplanation,
      darkMode,
      loading
    } = this.state;
    
    if (loading) {
      return (
        <Card className={`mt-5 text-center ${darkMode ? 'bg-dark text-white' : ''}`}>
          <Card.Body>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Preparing your quiz...</p>
          </Card.Body>
        </Card>
      );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div>
        <Card className={`mt-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Badge bg="secondary" className="me-2">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </Badge>
                <Badge 
                  bg={
                    currentQuestion.difficulty === 'Easy' ? 'success' :
                    currentQuestion.difficulty === 'Medium' ? 'warning' :
                    'danger'
                  }
                  className="me-2"
                >
                  {currentQuestion.difficulty}
                </Badge>
                <Badge bg="info">
                  {currentQuestion.category}
                </Badge>
              </div>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={this.toggleQuestionNavigation}
              >
                {this.state.showQuestionNavigation ? 'Hide Navigation' : 'Show Navigation'}
              </Button>
            </div>

            <ProgressBar 
              now={progress} 
              variant="info" 
              className="mb-3" 
              label={`${Math.round(progress)}%`}
            />

            <Card.Title as="h5" className="mb-4">
              {currentQuestion.question}
            </Card.Title>

            <Form>
              {currentQuestion.options.map((option, index) => {
                let style = {};
                if (showAnswer) {
                  if (option === currentQuestion.answer) {
                    style = { 
                      color: 'green', 
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(0, 255, 0, 0.1)'
                    };
                  } else if (option === selectedOption && !isCorrect) {
                    style = { 
                      color: 'red', 
                      textDecoration: 'line-through',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)'
                    };
                  }
                }
                return (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option-${index}`}
                    name="quiz-options"
                    label={<span style={style}>{option}</span>}
                    value={option}
                    checked={selectedOption === option}
                    onChange={this.handleOptionChange}
                    disabled={showAnswer}
                    className={`mb-3 p-2 rounded ${darkMode ? 'bg-secondary bg-opacity-10' : ''}`}
                  />
                );
              })}
            </Form>

            {showAnswer && (
              <div className="mt-3">
                <Alert variant={isCorrect ? "success" : "danger"}>
                  {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
                  <div className="mt-2">
                    <Button 
                      variant="outline-info" 
                      size="sm"
                      onClick={this.toggleExplanation}
                    >
                      {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                    </Button>
                  </div>
                </Alert>
                
                {showExplanation && (
                  <Alert variant="info" className="mt-2">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </Alert>
                )}
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <div>
                <Button
                  variant="secondary"
                  onClick={this.restartQuiz}
                  className="me-2"
                >
                  Restart Quiz
                </Button>
                
                {!showAnswer && (
                  <Button
                    variant="warning"
                    onClick={this.handleSkipQuestion}
                  >
                    Skip Question
                  </Button>
                )}
              </div>
              
              <Button
                variant="primary"
                disabled={!selectedOption || showAnswer}
                onClick={this.handleNextQuestion}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </Card.Body>
        </Card>

        {this.renderQuestionNavigation()}
      </div>
    );
  }

  renderResult() {
    const { 
      score, 
      questions, 
      userName,
      leaderboard,
      showLeaderboard,
      correctAnswers,
      incorrectAnswers,
      darkMode,
      stats
    } = this.state;
    const percentage = Math.round((score / questions.length) * 100);
    const categoryStats = Object.entries(stats.categories).map(([category, data]) => ({
      category,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    }));

    let resultVariant = 'primary';
    if (percentage < 50) resultVariant = 'danger';
    else if (percentage < 75) resultVariant = 'warning';
    else resultVariant = 'success';

    return (
      <div className={`mt-5 ${darkMode ? 'text-white' : ''}`}>
        <Card className={`text-center ${darkMode ? 'bg-dark' : ''}`}>
          <Card.Body>
            <Card.Title as="h4">Quiz Completed!</Card.Title>
            
            <Alert variant={resultVariant} className="my-4">
              <h5>Your Score: {score} / {questions.length}</h5>
              <h6>({percentage}%)</h6>
              {percentage === 100 && (
                <div className="mt-2">
                  <Badge bg="success">Perfect Score!</Badge>
                </div>
              )}
            </Alert>

            <Row className="mb-4">
              <Col>
                <Card className={darkMode ? 'bg-secondary text-white' : ''}>
                  <Card.Body>
                    <Card.Title>Correct Answers</Card.Title>
                    <Badge bg="success" pill>{correctAnswers.length}</Badge>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={darkMode ? 'bg-secondary text-white' : ''}>
                  <Card.Body>
                    <Card.Title>Incorrect Answers</Card.Title>
                    <Badge bg="danger" pill>{incorrectAnswers.length}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className={`mb-4 ${darkMode ? 'bg-secondary text-white' : ''}`}>
              <Card.Body>
                <Card.Title>Category Performance</Card.Title>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  {categoryStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div>{stat.category}</div>
                      <ProgressBar 
                        now={stat.accuracy} 
                        label={`${stat.accuracy}%`}
                        variant={
                          stat.accuracy >= 80 ? 'success' :
                          stat.accuracy >= 50 ? 'warning' :
                          'danger'
                        }
                        style={{ width: '100px', height: '30px' }}
                      />
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {!showLeaderboard && (
              <div className="mb-4">
                <Form.Group controlId="userName">
                  <Form.Label>Enter your name to save your score:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={this.handleNameChange}
                    className="mb-2"
                  />
                  <Button 
                    variant="primary"
                    onClick={this.saveScore}
                    disabled={!userName.trim()}
                  >
                    Save Score
                  </Button>
                </Form.Group>
              </div>
            )}

            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="primary"
                onClick={this.restartQuiz}
                className="me-2"
              >
                Take Quiz Again
              </Button>
              
              <Button 
                variant="info"
                onClick={() => this.setState({ showLeaderboard: true })}
              >
                🏆 View Leaderboard
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal 
          show={showLeaderboard} 
          onHide={() => this.setState({ showLeaderboard: false })}
          centered
          className={darkMode ? 'dark-modal' : ''}
        >
          <Modal.Header closeButton className={darkMode ? 'bg-dark text-white' : ''}>
            <Modal.Title>Quiz Leaderboard</Modal.Title>
          </Modal.Header>
          <Modal.Body className={darkMode ? 'bg-dark text-white' : ''}>
            {leaderboard.length === 0 ? (
              <p>No scores yet. Be the first!</p>
            ) : (
              <ListGroup variant="flush">
                {leaderboard.map((entry, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className={darkMode ? 'bg-dark text-white' : ''}
                    active={entry.name === userName && entry.score === score}
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {index + 1}. {entry.name} 
                        {entry.name === userName && entry.score === score && (
                          <Badge bg="info" className="ms-2">You</Badge>
                        )}
                      </span>
                      <span>
                        {entry.score}/{entry.total} ({Math.round((entry.score / entry.total) * 100)}%)
                      </span>
                    </div>
                    <small className="text-muted">{entry.date} {entry.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Modal.Body>
          <Modal.Footer className={darkMode ? 'bg-dark text-white' : ''}>
            <Button 
              variant="secondary" 
              onClick={() => this.setState({ showLeaderboard: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    const { quizStarted, quizCompleted, darkMode } = this.state;

    return (
      <div className={darkMode ? 'dark-mode' : ''}>
        <Container className={`py-4 min-vh-100 ${darkMode ? 'bg-dark text-white' : ''}`}>
          <Row className="mb-4">
            <Col>
              <h1 className="text-center">React Quiz Challenge</h1>
              <p className="text-center">Test your React.js knowledge with {this.state.quizSettings.questionCount} questions</p>
            </Col>
            <Col xs="auto">
              <Button 
                variant={darkMode ? "light" : "dark"}
                onClick={this.toggleDarkMode}
                size="sm"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </Button>
            </Col>
          </Row>

          {!quizStarted && !quizCompleted && this.renderStartScreen()}
          {quizStarted && !quizCompleted && this.renderQuestion()}
          {quizCompleted && this.renderResult()}
        </Container>
        
        <footer className={`py-3 ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
          <Container>
            <p className="text-center mb-0">
              React Quiz App &copy; {new Date().getFullYear()} | Built with React and Bootstrap
            </p>
          </Container>
        </footer>
      </div>
    );
  }
}

export default ReactQuizApp;