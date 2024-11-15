// QuestionCard.tsx
import React from 'react';

interface QuestionProps {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionProps> = ({ question, answers, onAnswer }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200">
      <h2 className="text-2xl text-blue-800 mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-200 ease-in-out"
            onClick={() => onAnswer(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
