"use client";

interface ProQuestionsProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function ProQuestions({ isUnlocked, onUnlock }: ProQuestionsProps) {
  return (
    <section className="bg-yellow-50 rounded-2xl p-6 shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">💎 Pro Questions</h3>
      {isUnlocked ? (
        <ul className="list-disc list-inside space-y-2 text-yellow-800">
          <li>Pro Q1: Solve x² + 5x + 6 = 0</li>
          <li>Pro Q2: Explain Newton's 2nd Law of Motion.</li>
          <li>Pro Q3: Long Essay on Liberation War 1971.</li>
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">🔒 Pro questions are locked.</p>
          <button
            onClick={onUnlock}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </section>
  );
}
