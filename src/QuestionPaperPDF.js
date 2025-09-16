import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

// ✅ Register Roboto Font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontStyle: "italic",
    },
  ],
});

// ✅ Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Roboto",
    lineHeight: 1.4,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 25,
    borderBottom: "2pt solid #3f51b5",
    paddingBottom: 15,
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: 60,
    color: 'rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  institution: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#3f51b5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
    color: "#2c387e",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
    color: "#555",
  },
  instructions: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
    fontStyle: "italic",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    fontSize: 10,
  },
  detailBox: {
    width: "48%",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    border: "1pt solid #e0e0e0",
  },
  detailTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 11,
    color: "#3f51b5",
  },
  questionBlock: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "0.5pt solid #eee",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  questionNumber: {
    fontWeight: "bold",
    width: "90%",
  },
  questionMarks: {
    fontWeight: "bold",
    color: "#f50057",
    width: "10%",
    textAlign: "right",
  },
  questionText: {
    fontSize: 12,
    marginBottom: 8,
  },
  option: {
    fontSize: 11,
    marginLeft: 15,
    marginBottom: 3,
  },
  correctOption: {
    fontSize: 11,
    marginLeft: 15,
    marginBottom: 3,
    backgroundColor: "#e8f5e9",
    padding: 3,
    borderRadius: 3,
  },
  questionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  questionType: {
    fontSize: 10,
    color: "#3f51b5",
    fontStyle: "italic",
  },
  questionDifficulty: {
    fontSize: 10,
    color: "#4caf50",
    fontStyle: "italic",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1pt solid #ccc",
    backgroundColor: "#fafafa",
    padding: 8,
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
    borderTop: "1pt solid #ccc",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  markAllocation: {
    fontSize: 11,
    marginTop: 25,
    padding: 10,
    backgroundColor: "#f9f9f9",
    border: "1pt solid #ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  markAllocationTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#3f51b5",
  },
  markRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  answerSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e8f5e9",
    border: "1pt solid #c8e6c9",
    borderRadius: 5,
  },
  answerTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2e7d32",
  },
  answerText: {
    fontSize: 11,
  },
  gradingScheme: {
    marginTop: 25,
    padding: 10,
    backgroundColor: "#fff3e0",
    border: "1pt solid #ffcc80",
    borderRadius: 5,
  },
  gradingTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#ef6c00",
  },
  signatureArea: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureLine: {
    width: "40%",
    borderTop: "1pt solid #000",
    paddingTop: 3,
    fontSize: 10,
    textAlign: "center",
  },
  confidential: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#f50057",
    color: "white",
    padding: "3px 10px",
    borderRadius: 3,
    fontSize: 8,
    transform: "rotate(15deg)",
  },
});

// ✅ Helper to group questions
const groupQuestionsByType = (questions) => {
  return questions.reduce((groups, question) => {
    const type = question.type || "General";
    if (!groups[type]) groups[type] = [];
    groups[type].push(question);
    return groups;
  }, {});
};

// ✅ Final Component
const QuestionPaperPDF = ({
  topic,
  questions,
  totalMarks,
  timeEstimate,
  includeAnswers = false,
  institutionName = "ABC UNIVERSITY",
  courseCode = "CS101",
  examinationType = "End Semester Examination",
  academicYear = "2023-2024",
  maxMarks = 100,
  instructions = [
    "Answer all questions",
    "Write your answers in the space provided",
    "Calculators are not permitted",
    "Mobile phones are strictly prohibited",
  ],
}) => {
  const groupedQuestions = groupQuestionsByType(questions);
  const currentDate = new Date().toLocaleDateString();

  const marksByType = {};
  questions.forEach((q) => {
    const type = q.type || "General";
    marksByType[type] = (marksByType[type] || 0) + (q.marks || 0);
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.confidential}>CONFIDENTIAL</Text>
        <Text style={styles.watermark}>{institutionName}\n{examinationType}</Text>

        <View style={styles.header}>
          <Text style={styles.institution}>{institutionName}</Text>
          <Text style={styles.subtitle}>Department of Computer Science</Text>
          <Text style={styles.title}>{examinationType}</Text>
          <Text style={styles.subtitle}>{topic} ({courseCode})</Text>
          <Text style={styles.instructions}>Academic Year: {academicYear}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Examination Details:</Text>
              <Text>Date: {currentDate}</Text>
              <Text>Time: {timeEstimate} minutes</Text>
              <Text>Maximum Marks: {maxMarks}</Text>
              <Text>Course Code: {courseCode}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Instructions:</Text>
              {instructions.map((ins, i) => (
                <Text key={i}>• {ins}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.markAllocation}>
          <Text style={styles.markAllocationTitle}>MARK ALLOCATION</Text>
          {Object.entries(marksByType).map(([type, marks]) => (
            <View key={type} style={styles.markRow}>
              <Text>{type.charAt(0).toUpperCase() + type.slice(1)} Questions:</Text>
              <Text>{marks} marks</Text>
            </View>
          ))}
          <View style={[styles.markRow, { marginTop: 5, paddingTop: 5, borderTop: "0.5pt solid #ddd" }]}>
            <Text style={{ fontWeight: "bold" }}>TOTAL:</Text>
            <Text style={{ fontWeight: "bold" }}>{totalMarks} marks</Text>
          </View>
        </View>

        {Object.entries(groupedQuestions).map(([type, typeQuestions], sectionIndex) => (
          <View key={type} break={sectionIndex > 0}>
            <Text style={styles.sectionHeader}>
              SECTION {String.fromCharCode(65 + sectionIndex)}: {type.toUpperCase()} QUESTIONS
              {" "}(Total: {marksByType[type] || 0} Marks)
            </Text>

            {typeQuestions.map((q, i) => (
              <View key={i} style={styles.questionBlock}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>
                    Q{sectionIndex + 1}.{i + 1}: {q.question}
                  </Text>
                  <Text style={styles.questionMarks}>
                    [{q.marks}]
                  </Text>
                </View>

                {q.options?.map((opt, idx) => (
                  <Text key={idx} style={
                    includeAnswers && q.answer === String.fromCharCode(65 + idx)
                      ? styles.correctOption
                      : styles.option
                  }>
                    ({String.fromCharCode(97 + idx)}) {opt}
                  </Text>
                ))}

                <View style={styles.questionMeta}>
                  <Text style={styles.questionType}>Type: {q.type}</Text>
                  {q.difficulty && <Text style={styles.questionDifficulty}>Difficulty: {q.difficulty}</Text>}
                </View>

                {includeAnswers && q.answer && (
                  <View style={styles.answerSection}>
                    <Text style={styles.answerTitle}>Answer:</Text>
                    <Text style={styles.answerText}>
                      {q.answer}{q.answerExplanation && ` - ${q.answerExplanation}`}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.signatureArea}>
          <Text style={styles.signatureLine}>Invigilator's Signature</Text>
          <Text style={styles.signatureLine}>Student's Signature</Text>
        </View>

        <Text style={styles.footer}>
          This question paper consists of {questions.length} questions printed on {Object.keys(groupedQuestions).length} pages
        </Text>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default QuestionPaperPDF;
