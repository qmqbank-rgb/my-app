"use client";

interface FreeQuestionsProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function FreeQuestions({ isUnlocked, onUnlock }: FreeQuestionsProps) {
  return (
    <section className="bg-green-50 rounded-2xl p-6 shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">📝 Free Questions</h3>
      {isUnlocked ? (
        <ul className="list-disc list-inside space-y-2">
          <li>Q1: What is React?</li>
          <li>Q2: Explain useState hook.</li>
          <li>Q3: Difference between client and server side rendering.</li>
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">🔒 Unlock free questions to view them.</p>
          <button
            onClick={onUnlock}
            className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Unlock Free Questions
          </button>
        </div>
      )}
    </section>
  );
}
