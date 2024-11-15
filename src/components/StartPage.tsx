import React, { useState } from 'react';

interface StartPageProps {
  onStart: (category: string, difficulty: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <div className='bg-blue-500'>
      <h1>Welcome to the Quiz!</h1>
      <div>
        <label>
          Choose a category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            // Diğer kategoriler
          </select>
        </label>
      </div>
      <div>
        <label>
          Choose difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <button onClick={() => onStart(category, difficulty)}>Start Quiz</button>
    </div>
  );
};

export default StartPage;
