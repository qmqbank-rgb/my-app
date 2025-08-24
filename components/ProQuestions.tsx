interface ProQuestionsProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function ProQuestions({ isUnlocked, onUnlock }: ProQuestionsProps) {
  return (
    <section className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-800 flex items-center gap-2">💎 Pro Questions</h2>
        {isUnlocked && (
          <span className="px-3 py-1 text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow animate-pulse">
            🔥 Pro Activated
          </span>
        )}
      </div>

      {isUnlocked ? (
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>Pro Q1: Solve x² + 5x + 6 = 0</li>
          <li>Pro Q2: Explain Newton&apos;s 2nd Law of Motion.</li>
          <li>Pro Q3: Long Essay on Liberation War 1971.</li>
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">🔒 এই প্রশ্নগুলো দেখতে হলে Pro Upgrade করতে হবে।</p>
          <button
            onClick={onUnlock}
            className="
              px-6 py-3
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r from-yellow-500 to-orange-600
              shadow-lg
              hover:scale-105
              hover:shadow-2xl
              active:scale-95
              transition
              duration-300
              ease-in-out
              transform
            "
          >
            Upgrade to Pro
          </button>
        </div>
      )}
    </section>
  );
}
