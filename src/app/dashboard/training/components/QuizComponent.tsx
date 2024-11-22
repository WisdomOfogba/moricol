import React, { useState } from "react";

interface Option {
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface Quiz {
  mark: string; // Total possible score (e.g., "50")
  user_score: number; // User's initial score (e.g., "0")
  questions: Question[];
}

interface QuizProps {
  quiz: Quiz;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [userScore, setUserScore] = useState(quiz.user_score); // Tracks the user's current score
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedOptionIndex !== null) {
      const isCorrect =
        quiz.questions[currentQuestionIndex].options[selectedOptionIndex]
          .isCorrect;
      if (isCorrect) {
        setUserScore((prevScore) => prevScore + 1);
      }
      setIsAnswerConfirmed(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswerConfirmed(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setUserScore(0);
    setIsAnswerConfirmed(false);
  };

  const handleFinish = async () => {
    const userScorePercentage = (userScore / quiz.questions.length) * 100;

    // Example API endpoint for submitting score
    await fetch("/api/submit-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_score: userScorePercentage }),
    });

    alert(`Score submitted: ${userScorePercentage}%`);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-xl rounded-lg bg-white p-6 shadow-md">
      {currentQuestionIndex < quiz.questions.length ? (
        <div>
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">
              QUESTION {currentQuestionIndex + 1} OF {quiz.questions.length}
            </h2>
            <h1 className="mt-2 text-xl font-bold">
              <div
                dangerouslySetInnerHTML={{
                  __html: quiz.questions[currentQuestionIndex].question,
                }}
              />
            </h1>
            <p className="mt-1 text-gray-500">Choose only ONE best answer</p>
          </div>
          <div className="space-y-4">
            {quiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <label
                  key={index}
                  className={`flex cursor-pointer items-center rounded-lg border p-3 transition hover:bg-gray-100 ${
                    selectedOptionIndex === index
                      ? `${isAnswerConfirmed ? `${option.isCorrect ? "bg-lime-500 hover:bg-lime-500" : "bg-red-500 hover:bg-red-500"}` : "bg-blue-200 hover:bg-blue-200"}`
                      : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option.optionText}
                    className="hidden"
                    onChange={() =>
                      !isAnswerConfirmed && setSelectedOptionIndex(index)
                    }
                  />
                  <span className="mr-4 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-200 text-gray-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700">{option.optionText}</span>
                </label>
              ),
            )}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={isAnswerConfirmed ? handleNext : handleConfirm}
              className="rounded-lg bg-yellow-500 px-6 py-2 font-bold text-white transition hover:bg-yellow-600"
              disabled={selectedOptionIndex === null}
            >
              {isAnswerConfirmed
                ? currentQuestionIndex === quiz.questions.length - 1
                  ? "complete"
                  : "Next"
                : "Confirm"}
            </button>
          </div>
          {/* <button
            onClick={isAnswerConfirmed ? handleNext : handleConfirm}
            disabled={selectedOptionIndex === null}
          >
            {isAnswerConfirmed
              ? currentQuestionIndex === quiz.questions.length - 1
                ? "complete"
                : "Next"
              : "Confirm"}
          </button> */}
        </div>
      ) : (
        <div className="mx-auto mt-10 w-full max-w-md rounded-lg bg-white p-6 text-center flex flex-col items-center">
          <h1 className="text-lg font-bold text-gray-700">
            You Completed Quiz
          </h1>
          <p className="mt-1 text-gray-500">Your score</p>

          <p className="my-4 text-4xl font-bold text-red-500">
            {(userScore / quiz.questions.length) * 100}%
          </p>

          <button
            onClick={handleFinish}
            className="rounded-lg bg-yellow-500 px-6 py-2 font-bold text-white transition hover:bg-yellow-600"
          >
            CONTINUE
          </button>

          <button
            onClick={handleRetake}
            className="mt-4 block font-bold text-gray-600 hover:underline focus:outline-none"
          >
            RETAKE QUIZ
          </button>

          <p className="mt-4 text-sm text-gray-500">
            You answered{" "}
            <span className="font-bold text-gray-700">{userScore}</span> out of{" "}
            <span className="font-bold text-gray-700">
              {quiz.questions.length}
            </span>{" "}
            questions correctly
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
