import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
// Import Material-UI components for building the UI
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  AppBar,
  Toolbar,
  Grid,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  FormHelperText,
  Fab,
  Zoom,
  useScrollTrigger,
  Tooltip,
  Badge,
} from "@mui/material";
// Import Material-UI styling utilities
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
// Import Material-UI icons
import {
  Download,
  ContentCopy,
  Brightness4,
  Brightness7,
  ExpandMore,
  Save,
  FolderOpen,
  Schedule,
  Shuffle,
  Visibility,
  VisibilityOff,
  Print,
  Share,
  Assignment,
  AssignmentTurnedIn,
  CheckCircle,
  Cancel,
  KeyboardArrowUp,
  HelpOutline,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
// Import PDF generation components
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuestionPaperPDF from "./QuestionPaperPDF";

// Theme generator function that creates a light or dark theme based on mode
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode, // 'light' or 'dark' mode
      // Different color schemes for light and dark modes
      ...(mode === "light"
        ? {
            primary: { main: "#3f51b5", light: "#757de8", dark: "#002984" },
            secondary: { main: "#f50057", light: "#ff5983", dark: "#b50037" },
            success: { main: "#4caf50", light: "#80e27e", dark: "#087f23" },
            background: { default: "#f5f5f5", paper: "#ffffff" },
          }
        : {
            primary: { main: "#9fa8da", light: "#c5cae9", dark: "#7986cb" },
            secondary: { main: "#f48fb1", light: "#fce4ec", dark: "#f06292" },
            success: { main: "#66bb6a", light: "#98ee99", dark: "#338a3e" },
            background: { default: "#121212", paper: "#1e1e1e" },
          }),
    },
    typography: { 
      fontFamily: "'Roboto', 'Arial', sans-serif", // Set default font
      h4: {
        fontWeight: 600, // Make h4 typography bolder
      },
    },
    components: {
      // Customize Button component styles
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Rounded corners for buttons
            textTransform: 'none', // Don't uppercase button text
            fontWeight: 500, // Medium font weight
          },
        },
      },
      // Customize Paper component styles
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12, // More rounded corners for paper elements
          },
        },
      },
    },
  });

// Styles generator function that returns different styles based on theme mode
const getStyles = (mode) => ({
  appContainer: {
    minHeight: "100vh", // Full viewport height
    // Gradient background that changes based on theme
    background:
      mode === "light"
        ? "linear-gradient(135deg, #f5f7fa 0%, rgba(130, 165, 222, 1) 100%)"
        : "linear-gradient(135deg, #1a1a1a 0%, rgba(27, 40, 55, 1) 100%)",
  },
  appBar: {
    // Gradient background for app bar
    background:
      mode === "light"
        ? "linear-gradient(45deg, #3f51b5 0%, #5c6bc0 100%)"
        : "linear-gradient(45deg, #424242 0%, #616161 100%)",
    // Shadow effect that changes based on theme
    boxShadow: mode === "light" ? "0 4px 12px rgba(0,0,0,0.1)" : "0 4px 12px rgba(0,0,0,0.3)",
  },
  mainContainer: { py: 4 }, // Padding for main container
  formPaper: { p: 4, mb: 4 }, // Padding and margin for form paper
  resultPaper: { p: 4 }, // Padding for result paper
  generateButton: { py: 1.5, fontWeight: "bold" }, // Style for generate button
  actionButtons: { display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 1, mb: 2 }, // Style for action buttons container
  actionIcon: {
    background: mode === "light" ? "#3f51b5" : "#616161", // Background color for action icons
    color: "white", // Icon color
    "&:hover": {
      background: mode === "light" ? "#002984" : "#424242", // Hover background color
    },
  },
  questionCard: {
    mb: 2, // Margin bottom for question cards
    p: 2, // Padding for question cards
    backgroundColor: mode === "light" ? "#ffffff" : "#2a2a2a", // Background color based on theme
    transition: "all 0.2s ease", // Smooth transition for hover effects
    "&:hover": {
      // Hover effects for question cards
      boxShadow: mode === "light" 
        ? "0 6px 16px rgba(0,0,0,0.1)" 
        : "0 6px 16px rgba(255,255,255,0.1)",
      transform: "translateY(-2px)", // Lift effect on hover
    },
  },
  markChip: {
    background: mode === "light" ? "#66b2b7ff" : "#f06292", // Background for mark chips
    color: "white", // Text color
    fontWeight: "bold", // Bold text
  },
  typeChip: {
    background: mode === "light" ? "#3f51b5" : "#616161", // Background for type chips
    color: "white", // Text color
    fontWeight: "bold", // Bold text
  },
  difficultyChip: {
    background: mode === "light" ? "#4caf50" : "#66bb6a", // Background for difficulty chips
    color: "white", // Text color
    fontWeight: "bold", // Bold text
  },
  tabPanel: { py: 3 }, // Padding for tab panels
  distributionRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },
  timeEstimate: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2,
    p: 2,
    backgroundColor: mode === "light" ? "#e8f5e9" : "#1b5e20", // Background for time estimate box
    borderRadius: 2,
  },
  answerBox: {
    mt: 2,
    p: 2,
    backgroundColor: mode === "light" ? "#e3f2fd" : "#0d47a1", // Background for answer box
    borderRadius: 2,
    borderLeft: `4px solid ${mode === "light" ? "#1976d2" : "#64b5f6"}`, // Left border for answer box
  },
  scrollTop: {
    position: "fixed", // Fixed position for scroll-to-top button
    bottom: 16,
    right: 16,
    zIndex: 1000, // High z-index to stay on top
  },
  helpIcon: {
    position: "fixed", // Fixed position for help button
    bottom: 16,
    left: 16,
    zIndex: 1000, // High z-index to stay on top
  },
  templateCard: {
    cursor: "pointer", // Pointer cursor for template cards
    transition: "all 0.2s ease", // Smooth transition for hover
    "&:hover": {
      backgroundColor: mode === "light" ? "#f5f5f5" : "#2a2a2a", // Hover background color
    },
  },
  previewMode: {
    backgroundColor: mode === "light" ? "#fafafa" : "#1a1a1a", // Background for preview mode
    border: `2px solid ${mode === "light" ? "#e0e0e0" : "#424242"}`, // Border for preview mode
  },
  editButton: {
    position: "absolute", // Absolute positioning for edit button
    top: 8,
    right: 8,
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
  },
  editDialog: {
    minWidth: "500px", // Minimum width for edit dialog
  },
});

// Scroll to top component that appears when user scrolls down
function ScrollTop(props) {
  const { children } = props;
  // Hook to detect when user has scrolled past threshold
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Function to handle click on scroll-to-top button
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={props.sx}
      >
        {children}
      </Box>
    </Zoom>
  );
}

// Main component function
function QuestionPaper() {
  // State for theme mode (light/dark)
  const [mode, setMode] = useState(
    // Get theme from localStorage or use system preference
    localStorage.getItem("themeMode") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  // State variables for various component functionalities
  const [activeTab, setActiveTab] = useState(0); // Active tab index
  const [topic, setTopic] = useState(""); // Selected topic
  const [numQuestions, setNumQuestions] = useState(""); // Number of questions
  const [totalMarks, setTotalMarks] = useState(""); // Total marks
  const [loading, setLoading] = useState(false); // Loading state
  const [questionPaper, setQuestionPaper] = useState(null); // Generated question paper
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [templateName, setTemplateName] = useState(""); // Template name
  const [savedTemplates, setSavedTemplates] = useState([]); // Saved templates
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false); // Open template dialog
  const [timeEstimate, setTimeEstimate] = useState(0); // Time estimate
  const [showAnswers, setShowAnswers] = useState(false); // Show answers
  const [shuffleQuestions, setShuffleQuestions] = useState(false); // Shuffle questions
  const [previewMode, setPreviewMode] = useState(false); // Preview mode
  const [editingQuestion, setEditingQuestion] = useState(null); // Editing question
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Edit dialog open

  // Memoized theme and styles that update when mode changes
  const theme = useMemo(() => getTheme(mode), [mode]);
  const styles = useMemo(() => getStyles(mode), [mode]);

  // Load saved templates from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("questionTemplates");
    if (saved) {
      setSavedTemplates(JSON.parse(saved));
    }
  }, []);

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save preference to localStorage
  };

  // Function to generate question paper by making API call
  const generatePaper = () => {
    if (!topic || !numQuestions || !totalMarks) {
      setError("Please fill all required fields");
      return;
    }
    setError("");
    setLoading(true);

    // Make POST request to generate question paper
    axios
      .post("http://localhost:3000/generate-question-paper", {
        topic,
        numQuestions: parseInt(numQuestions),
        totalMarks: parseInt(totalMarks),
        shuffle: shuffleQuestions,
        includeAnswers: showAnswers,
      })
      .then((res) => {
        setQuestionPaper(res.data); // Set the generated question paper
        setLoading(false);
        setSuccessMessage("Question paper generated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.error || "Failed to generate question paper");
        setLoading(false);
      });
  };

  // Function to open edit dialog for a question
  const handleEditQuestion = (question, index) => {
    setEditingQuestion({ ...question, index }); // Store question and its index
    setEditDialogOpen(true);
  };

  // Function to save edited question
  const handleSaveEditedQuestion = () => {
    if (!editingQuestion) return;
    
    // Create updated questions array
    const updatedQuestions = [...questionPaper.questions];
    updatedQuestions[editingQuestion.index] = {
      ...editingQuestion,
      index: undefined // Remove the temporary index property
    };
    
    // Update question paper with edited question
    setQuestionPaper({
      ...questionPaper,
      questions: updatedQuestions
    });
    
    setEditDialogOpen(false);
    setEditingQuestion(null);
    setSuccessMessage("Question updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to add a new option to a question
  const handleAddOption = () => {
    if (!editingQuestion) return;
    
    setEditingQuestion({
      ...editingQuestion,
      options: [...(editingQuestion.options || []), ""] // Add empty option
    });
  };

  // Function to remove an option from a question
  const handleRemoveOption = (index) => {
    if (!editingQuestion || !editingQuestion.options) return;
    
    const newOptions = [...editingQuestion.options];
    newOptions.splice(index, 1); // Remove option at specified index
    
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions
    });
  };

  // Function to update an option's text
  const handleOptionChange = (index, value) => {
    if (!editingQuestion || !editingQuestion.options) return;
    
    const newOptions = [...editingQuestion.options];
    newOptions[index] = value; // Update option text
    
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions
    });
  };

  // Function to copy question paper JSON to clipboard
  const handleCopyToClipboard = () => {
    if (!questionPaper) return;
    navigator.clipboard.writeText(JSON.stringify(questionPaper, null, 2))
      .then(() => {
        setSuccessMessage("Question paper copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((err) => console.error("Copy error:", err));
  };

  // Function to download question paper as JSON file
  const handleDownload = () => {
    if (!questionPaper) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionPaper, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `question_paper_${topic}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Function to save current settings as a template
  const saveTemplate = () => {
    if (!templateName.trim()) {
      setError("Please enter a template name");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: templateName,
      topic,
      numQuestions,
      totalMarks,
      createdAt: new Date().toISOString(),
    };

    const updatedTemplates = [...savedTemplates, newTemplate];
    setSavedTemplates(updatedTemplates);
    localStorage.setItem("questionTemplates", JSON.stringify(updatedTemplates)); // Save to localStorage
    setOpenTemplateDialog(false);
    setTemplateName("");
    setSuccessMessage("Template saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to load a saved template
  const loadTemplate = (template) => {
    setTopic(template.topic);
    setNumQuestions(template.numQuestions);
    setTotalMarks(template.totalMarks);
    setOpenTemplateDialog(false);
    setSuccessMessage(`Template "${template.name}" loaded successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to delete a saved template
  const deleteTemplate = (id, e) => {
    e.stopPropagation(); // Prevent triggering the list item click event
    const updatedTemplates = savedTemplates.filter(t => t.id !== id);
    setSavedTemplates(updatedTemplates);
    localStorage.setItem("questionTemplates", JSON.stringify(updatedTemplates));
    setSuccessMessage("Template deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to export to Word (placeholder)
  const exportToWord = () => {
    setSuccessMessage("Word export feature coming soon!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Function to export to HTML
  const exportToHTML = () => {
    const htmlContent = document.getElementById('question-paper-preview').innerHTML;
    const blob = new Blob([`<!DOCTYPE html><html><head><title>${topic} Question Paper</title><meta charset="utf-8"></head><body>${htmlContent}</body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `question_paper_${topic}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to print question paper
  const printPaper = () => {
    const printContent = document.getElementById('question-paper-preview');
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Function to share question paper
  const sharePaper = () => {
    if (navigator.share) {
      navigator.share({
        title: `${topic} Question Paper`,
        text: `Check out this question paper on ${topic}`,
        url: window.location.href,
      })
      .then(() => setSuccessMessage('Question paper shared successfully!'))
      .catch((error) => setError('Error sharing: ' + error.toString()));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setSuccessMessage('Link copied to clipboard!');
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch((err) => setError('Failed to copy link: ' + err.toString()));
    }
  };

  // Function to toggle question shuffling
  const toggleShuffle = () => {
    setShuffleQuestions(!shuffleQuestions);
    if (questionPaper) {
      const shuffledQuestions = [...questionPaper.questions];
      if (!shuffleQuestions) {
        // Shuffle algorithm (Fisher-Yates)
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }
      }
      setQuestionPaper({ ...questionPaper, questions: shuffledQuestions });
    }
  };

  // Main component render
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.appContainer}>
        <AppBar position="static" sx={styles.appBar} id="back-to-top-anchor">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} /> Question Paper Generator
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit" aria-label="Toggle dark mode">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <FormControlLabel
              control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
              label={mode === "dark" ? "Dark Mode" : "Light Mode"}
              sx={{ color: "white" }}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={styles.mainContainer}>
          {/* FORM SECTION */}
          <Paper sx={styles.formPaper}>
            <Typography variant="h4" gutterBottom>
              Create Question Paper
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Topic" 
                  variant="outlined" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  helperText="Enter the main topic for your question paper"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField 
                  fullWidth 
                  type="number" 
                  label="Number of Questions" 
                  variant="outlined" 
                  value={numQuestions} 
                  onChange={(e) => setNumQuestions(e.target.value)}
                  required
                  inputProps={{ min: 1, max: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField 
                  fullWidth 
                  type="number" 
                  label="Total Marks" 
                  variant="outlined" 
                  value={totalMarks} 
                  onChange={(e) => setTotalMarks(e.target.value)}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormGroup row sx={{ gap: 2, alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={shuffleQuestions} 
                        onChange={toggleShuffle} 
                      />
                    }
                    label="Shuffle Questions"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={showAnswers} 
                        onChange={(e) => setShowAnswers(e.target.checked)} 
                      />
                    }
                    label="Include Answers"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={previewMode} 
                        onChange={(e) => setPreviewMode(e.target.checked)} 
                      />
                    }
                    label="Preview Mode"
                  />
                </FormGroup>
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={generatePaper} 
                  disabled={loading} 
                  sx={styles.generateButton}
                  size="large"
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Generate Question Paper"}
                </Button>
              </Grid>
            </Grid>
            {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
          </Paper>

          {/* RESULT SECTION */}
          {questionPaper && (
            <Paper sx={{ ...styles.resultPaper, ...(previewMode && styles.previewMode) }} id="question-paper-preview">
              <Box sx={styles.actionButtons}>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={handleCopyToClipboard} sx={styles.actionIcon} aria-label="Copy to clipboard">
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download JSON">
                  <IconButton onClick={handleDownload} sx={styles.actionIcon} aria-label="Download JSON">
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export to Word">
                  <Button variant="contained" color="secondary" onClick={exportToWord} startIcon={<Download />}>
                    Word
                  </Button>
                </Tooltip>
                <Tooltip title="Export to HTML">
                  <Button variant="contained" color="secondary" onClick={exportToHTML} startIcon={<Download />}>
                    HTML
                  </Button>
                </Tooltip>
                <Tooltip title="Print">
                  <Button variant="contained" color="secondary" onClick={printPaper} startIcon={<Print />}>
                    Print
                  </Button>
                </Tooltip>
                <Tooltip title="Share">
                  <Button variant="contained" color="secondary" onClick={sharePaper} startIcon={<Share />}>
                    Share
                  </Button>
                </Tooltip>
                <PDFDownloadLink 
                  document={
                    <QuestionPaperPDF 
                      topic={topic} 
                      questions={questionPaper.questions} 
                      totalMarks={totalMarks}
                      timeEstimate={timeEstimate}
                    />
                  } 
                  fileName={`question_paper_${topic}.pdf`} 
                  style={{ textDecoration: "none" }}
                >
                  {({ loading }) => (
                    <Button variant="contained" color="primary" disabled={loading}>
                      {loading ? "Generating PDF..." : "Download PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
                <Button 
                  variant="outlined" 
                  onClick={() => setOpenTemplateDialog(true)} 
                  startIcon={<Save />}
                >
                  Save Template
                </Button>
              </Box>

              <Typography variant="h4" gutterBottom>
                {topic} - Question Paper
              </Typography>
              
              <Box sx={styles.timeEstimate}>
                <Schedule />
                <Typography>Estimated time: {timeEstimate} minutes</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />

              {/* QUESTIONS LIST */}
              {questionPaper.questions?.map((q, i) => (
                <Card key={i} sx={styles.questionCard}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Typography variant="body1">
                        <strong>Q{i + 1}:</strong> {q.question}
                      </Typography>
                      <Box>
                        {q.marks && (
                          <Chip 
                            label={`${q.marks} mark${q.marks > 1 ? "s" : ""}`} 
                            sx={styles.markChip} 
                          />
                        )}
                        {/* EDIT BUTTON */}
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditQuestion(q, i)}
                          sx={{ ml: 1 }}
                          aria-label="Edit question"
                        >
                          <Edit />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    {/* OPTIONS LIST */}
                    {q.options && (
                      <Box sx={{ mt: 1, ml: 2 }}>
                        {q.options.map((opt, idx) => (
                          <Typography key={idx}>
                            {String.fromCharCode(65 + idx)}) {opt}
                            {showAnswers && q.answer === String.fromCharCode(65 + idx) && (
                              <CheckCircle color="success" sx={{ ml: 1, fontSize: '16px', verticalAlign: 'middle' }} />
                            )}
                          </Typography>
                        ))}
                      </Box>
                    )}
                    
                    {/* QUESTION METADATA CHIPS */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                      {q.type && (
                        <Chip label={q.type} size="small" sx={styles.typeChip} />
                      )}
                      {q.difficulty && (
                        <Chip label={q.difficulty} size="small" sx={styles.difficultyChip} />
                      )}
                    </Box>
                    
                    {/* ANSWER SECTION (IF SHOW ANSWERS IS ENABLED) */}
                    {showAnswers && q.answerExplanation && (
                      <Box sx={styles.answerBox}>
                        <Typography variant="subtitle2" gutterBottom>
                          <strong>Answer:</strong> {q.answer}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Explanation:</strong> {q.answerExplanation}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Paper>
          )}

          {/* EDIT QUESTION DIALOG */}
          <Dialog 
            open={editDialogOpen} 
            onClose={() => setEditDialogOpen(false)} 
            maxWidth="md" 
            fullWidth
          >
            <DialogTitle>Edit Question</DialogTitle>
            <DialogContent sx={styles.editDialog}>
              {editingQuestion && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Question"
                    multiline
                    rows={3}
                    value={editingQuestion.question || ""}
                    onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Marks"
                    type="number"
                    value={editingQuestion.marks || ""}
                    onChange={(e) => setEditingQuestion({...editingQuestion, marks: parseInt(e.target.value) || 0})}
                    sx={{ mb: 3 }}
                    inputProps={{ min: 0 }}
                  />
                  
                  {/* OPTIONS EDITING SECTION */}
                  {editingQuestion.options && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Options
                      </Typography>
                      {editingQuestion.options.map((option, idx) => (
                        <Box key={idx} sx={styles.optionContainer}>
                          <TextField
                            fullWidth
                            label={`Option ${String.fromCharCode(65 + idx)}`}
                            value={option}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                          />
                          
                          <IconButton 
                            onClick={() => handleRemoveOption(idx)}
                            color="error"
                            aria-label="Remove option"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                      <Button 
                        onClick={handleAddOption}
                        startIcon={<Add />}
                        sx={{ mt: 1 }}
                      >
                        Add Option
                      </Button>
                    </Box>
                  )}
                  
                  {/* ANSWER EDITING SECTION (IF SHOW ANSWERS IS ENABLED) */}
                  {showAnswers && (
                    <>
                      <TextField
                        fullWidth
                        label="Correct Answer"
                        value={editingQuestion.answer || ""}
                        onChange={(e) => setEditingQuestion({...editingQuestion, answer: e.target.value})}
                        sx={{ mb: 3 }}
                        helperText="For multiple choice, enter the letter of the correct answer (A, B, C, etc.)"
                      />
                      
                      <TextField
                        fullWidth
                        label="Answer Explanation"
                        multiline
                        rows={3}
                        value={editingQuestion.answerExplanation || ""}
                        onChange={(e) => setEditingQuestion({...editingQuestion, answerExplanation: e.target.value})}
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEditedQuestion} variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>

          {/* TEMPLATE DIALOG */}
          <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Save/Load Templates</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Template Name"
                fullWidth
                variant="outlined"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                sx={{ mb: 3 }}
              />
              
              <Button 
                variant="contained" 
                onClick={saveTemplate} 
                disabled={!templateName.trim()}
                fullWidth
              >
                Save Current Settings as Template
              </Button>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Saved Templates
              </Typography>
              
              {savedTemplates.length > 0 ? (
                <List>
                  {savedTemplates.map((template) => (
                    <ListItem 
                      key={template.id} 
                      button 
                      onClick={() => loadTemplate(template)}
                      sx={styles.templateCard}
                      secondaryAction={
                        <IconButton edge="end" onClick={(e) => deleteTemplate(template.id, e)}>
                          <Cancel />
                        </IconButton>
                      }
                    >
                      <ListItemText 
                        primary={template.name} 
                        secondary={`Topic: ${template.topic}, Questions: ${template.numQuestions}, Marks: ${template.totalMarks}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No templates saved yet. Save your current settings as a template to load them later.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenTemplateDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Container>

        {/* SCROLL TO TOP BUTTON */}
        <ScrollTop sx={styles.scrollTop}>
          <Fab color="primary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>

        {/* HELP BUTTON */}
        <Tooltip title="Help and Instructions">
          <Fab color="secondary" size="medium" sx={styles.helpIcon} aria-label="help">
            <HelpOutline />
          </Fab>
        </Tooltip>

        {/* SUCCESS SNACKBAR */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default QuestionPaper;