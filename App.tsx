
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import OutputDisplay from './components/OutputDisplay';
import { generateRecruitmentAssets } from './services/geminiService';
import type { RecruitmentAssets } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<string>('');
  const [thinkingMode, setThinkingMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecruitmentAssets | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!notes.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedAssets = await generateRecruitmentAssets(notes, thinkingMode);
      setResult(generatedAssets);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [notes, thinkingMode]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <InputArea
          notes={notes}
          setNotes={setNotes}
          thinkingMode={thinkingMode}
          setThinkingMode={setThinkingMode}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
        <OutputDisplay
          result={result}
          error={error}
          isLoading={isLoading}
        />
      </main>
      <footer className="text-center p-4 text-xs text-slate-600">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
