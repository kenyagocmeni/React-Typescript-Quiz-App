// Quiz.tsx
import React, { useState } from 'react';
import Timer from './Timer';
import QuestionCard from './QuestionCard';
import Results from './Result';
import StartPage from './StartPage';
import { fetchQuestions } from '../api/api';  // API dosyasından fetchQuestions fonksiyonunu import ediyoruz

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [resetTimer, setResetTimer] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);  // Yanlış cevaplanan sorular için

    const handleStart = async (category: string, difficulty: string) => {
        const fetchedQuestions = await fetchQuestions({ amount: 10, category, difficulty });
        setQuestions(fetchedQuestions);
        setStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFinished(false);
        setResetTimer(prev => prev + 1);
        setWrongAnswers([]);  // Yeni quiz başladığında sıfırla
    };

    const handleAnswer = (answer: string) => {
        const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
        if (isCorrect) {
            setScore(score + 1);
        } else {
            setWrongAnswers(prev => [...prev, {
                question: questions[currentQuestionIndex].question,
                yourAnswer: answer,
                correctAnswer: questions[currentQuestionIndex].correct_answer
            }]);
        }
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
            setResetTimer(prev => prev + 1);
        } else {
            setFinished(true);
        }
    };

    const handleTimeout = () => {
        handleAnswer('');  // Cevap verilmediği kabul edilir
    };

    if (!started) {
        return <StartPage onStart={handleStart} />;
    }

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
            {!finished ? (
                <div className="container mx-auto px-4">
                    <Timer onTimeout={handleTimeout} reset={resetTimer} />
                    <QuestionCard
                        question={questions[currentQuestionIndex].question}
                        answers={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort(() => Math.random() - 0.5)}
                        onAnswer={handleAnswer}
                    />
                </div>
            ) : (
                <Results score={score} total={questions.length} wrongAnswers={wrongAnswers} />
            )}
        </div>
    );
};

export default Quiz;
