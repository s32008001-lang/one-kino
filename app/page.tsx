"use client";
import React, { useState, useEffect } from 'react';
import { allQuestions, Question } from './data/questions';
import { motion, AnimatePresence } from 'framer-motion';

export default function KahootLite() {
  const [quizList, setQuizList] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
    setQuizList(shuffled);
  }, []);

  const checkAnswer = (selected: string) => {
    if (selected === quizList[step].answer) {
      setScore(score + 1);
      if (step + 1 < quizList.length) {
        setStep(step + 1);
      } else {
        setGameOver(true);
      }
    } else {
      if (step > 0) {
        alert("Xato! Afsuski, qoidalarga ko'ra 1 qadam orqaga qaytasiz!");
        setStep(step - 1);
      } else {
        alert("Xato! Lekin siz hali 0-bosqichdasiz, orqaga yo'l yo'q.");
      }
    }
  };

  if (quizList.length === 0) return <div className="text-white text-center mt-20">Yuklanmoqda...</div>;

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-900 text-white p-6">
        <h1 className="text-5xl font-black mb-4">G'ALABA! 🎉</h1>
        <p className="text-2xl mb-8">Siz 20 ta savoldan o'tdingiz!</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-full hover:scale-105 transition-transform"
        >
          Qaytadan boshlash
        </button>
      </div>
    );
  }

  const current = quizList[step];

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Progress Line */}
      <div className="w-full max-w-3xl mb-6">
        <div className="flex justify-between text-slate-400 mb-2 font-mono">
          <span>SAVOL {step + 1}/20</span>
          <span>BALL: {score}</span>
        </div>
        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
            animate={{ width: `${((step + 1) / 20) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-center max-w-3xl bg-slate-800 p-8 rounded-3xl shadow-2xl border-b-8 border-slate-950"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center leading-tight">
            {current.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.options.map((opt, index) => {
              const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(opt)}
                  className={`${colors[index]} hover:brightness-110 active:scale-95 transition-all text-white font-bold py-6 px-4 rounded-2xl text-xl shadow-lg flex items-center justify-center`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-8  underline  underline-offset-7  italic   decoration-3  text-red-500  ">Ehtiyot bo'ling, xato qilsangiz orqaga qaytasiz!</p>
    </main>
  );
}   