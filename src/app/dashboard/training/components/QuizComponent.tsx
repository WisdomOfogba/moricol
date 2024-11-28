"use client"
import { CourseApi } from "@/api/training";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
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
  mark: string;
  user_score: number;
  questions: Question[];
}

interface QuizProps {
  quiz: Quiz;
  courseid: string;
  lessonid: string;
  sectionid: string
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, sectionid, courseid, lessonid }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [userScore, setUserScore] = useState(quiz.user_score); // Tracks the user's current score
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

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
    try {
      setIsLoading(true);
      await CourseApi.updateQuizScore({
        userid: session?.user.id as string,
        session: session as Session,
        lessonid,
        sectionid,
        courseid,
        score: userScorePercentage,
      }
      );
      setCompleted(true);
      enqueueSnackbar("Completed Quiz Succesfully.", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("There was an Error trying to Update your score, Pls try again later.", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
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
                  className={`flex cursor-pointer items-center rounded-lg border p-3 transition  ${
                    selectedOptionIndex === index
                      ? `${isAnswerConfirmed ? `${option.isCorrect ? "bg-green-500 hover:bg-green-500" : "bg-red-500 hover:bg-red-500"}` : "bg-blue-200 hover:bg-blue-200"}`
                      : "bg-white hover:bg-gray-100"
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
            disabled={completed}
          >
            {isLoading ? "Loading..." : completed ? "SUBMITED" : "SUBMIT"}
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
