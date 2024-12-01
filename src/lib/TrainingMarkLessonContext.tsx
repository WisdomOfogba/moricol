"use client"
import { createContext, useContext, useState } from "react";

type ProgressContextType = {
  completedLessons: Set<string>;
  markLessonComplete: (lessonId: string) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const MarkLessonProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set(prev).add(lessonId));
  };

  return (
    <ProgressContext.Provider value={{ completedLessons, markLessonComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within a ProgressProvider");
  return context;
};
