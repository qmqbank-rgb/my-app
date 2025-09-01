"use client";

import { useEffect, useState } from "react";

interface Question {
  id: number;
  title: string;
  content: string;
}

interface Props {
  token: string;
}

export default function QuestionsList({ token }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data: Question[] = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchQuestions();
  }, [token]);

  if (loading) return <p className="text-center text-gray-500">Loading questions...</p>;
  if (!questions.length) return <p className="text-center text-gray-500">No questions available.</p>;

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{q.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{q.content}</p>
        </div>
      ))}
    </div>
  );
}
