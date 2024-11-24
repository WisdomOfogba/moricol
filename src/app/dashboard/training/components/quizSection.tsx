import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { CourseApi } from "@/api/training";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export type Option = {
  optionText: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  options: Option[];
};

export type Quiz = {
  mark: number;
  user_score: number;
  questions: Question[];
};

export default function QuizSection({ quiz, lessonid, courseid, sectionid }: { quiz: Quiz, lessonid: string, courseid: string, sectionid: string }) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(quiz.user_score);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleAnswerChange = (questionIndex: number, optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionText,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length !== quiz.questions.length) {
      alert("Please answer all the questions!");
      return;
    }

    setLoading(true);
    let calculatedScore = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find((option) => option.isCorrect);
      if (correctOption && correctOption.optionText === userAnswer) {
        calculatedScore += quiz.mark / quiz.questions.length;
      }
    });

    try {
      setLoading(true);
      const response = await CourseApi.updateQuizScore({
        userid: session?.user.id as string,
        courseid: courseid as string,
        session: session as Session,
        sectionid,
        lessonid,
        score,
      });

      if (response.status === 200) {
        setScore(calculatedScore);
        setSubmitted(true);
      }
      enqueueSnackbar("Quiz submitted successfully!", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error marking course", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-section">
      <h3 className="mb-4 text-xl font-semibold">Quiz</h3>

      {submitted ? (
        <div className="text-lg">
          <p>
            Your Score: {score}/{quiz.mark}
          </p>
        </div>
      ) : (
        quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question mb-6">
            <p className="mb-2 font-medium">{question.question}</p>
            <div className="options space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option.optionText}
                    onChange={() =>
                      handleAnswerChange(questionIndex, option.optionText)
                    }
                  />
                  <span>{option.optionText}</span>
                </label>
              ))}
            </div>
          </div>
        ))
      )}

      {!submitted && (
        <button
          onClick={handleSubmitQuiz}
          disabled={loading}
          className="mt-4 bg-primary-500 px-4 py-2 text-white"
        >
          {loading ? "Submitting..." : "Submit Quiz"}
        </button>
      )}
    </div>
  );
}
