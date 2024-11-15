// Results.tsx
import React from 'react';

interface ResultsProps {
  score: number;
  total: number;
  wrongAnswers: Array<{
    question: string;
    yourAnswer: string;
    correctAnswer: string;
  }>;
}

const Results: React.FC<ResultsProps> = ({ score, total, wrongAnswers }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-3xl text-center text-green-800 font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl text-center font-semibold">Your Score: {score} / {total}</p>
      {wrongAnswers.length > 0 && (
        <>
          <h3 className="text-xl text-red-600 mt-6 mb-2">Incorrect Answers</h3>
          <ul>
            {wrongAnswers.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Question:</strong> <span dangerouslySetInnerHTML={{ __html: item.question }} /><br />
                <strong>Your Answer:</strong> <span dangerouslySetInnerHTML={{ __html: item.yourAnswer }} /><br />
                <strong>Correct Answer:</strong> <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Results;
