interface FreeQuestionsProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function FreeQuestions({ isUnlocked, onUnlock }: FreeQuestionsProps) {
  return (
    <section className="bg-blue-50 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">🆓 Free Questions</h2>

      {isUnlocked ? (
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Question 1: 2 + 2 = ?</li>
          <li>Question 2: What is the capital of Bangladesh?</li>
          <li>Question 3: Who wrote &quot;Sonar Bangla&quot;?</li>
        </ul>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">🔒 Unlock করলে প্রশ্নগুলো দেখতে পাবে।</p>
          <button
            onClick={onUnlock}
            className="
              px-6 py-3
              rounded-xl
              font-semibold
              text-white
              bg-blue-600
              shadow-lg
              hover:bg-blue-700
              hover:scale-105
              hover:shadow-2xl
              active:scale-95
              transition
              duration-300
              ease-in-out
              transform
            "
          >
            Unlock Free Questions
          </button>
        </div>
      )}
    </section>
  );
}
