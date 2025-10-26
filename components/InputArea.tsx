
import React from 'react';
import BrainIcon from './icons/BrainIcon';
import Spinner from './Spinner';

interface InputAreaProps {
  notes: string;
  setNotes: (notes: string) => void;
  thinkingMode: boolean;
  setThinkingMode: (enabled: boolean) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  notes,
  setNotes,
  thinkingMode,
  setThinkingMode,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="bg-slate-800 rounded-lg shadow-lg p-1">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your raw notes here... e.g., 'Senior React dev, 5+ yrs exp, needs to know redux, graphql, aws. team player, good communicator.'"
          className="w-full h-48 p-4 bg-slate-800 text-slate-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none resize-y placeholder-slate-500"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <label htmlFor="thinking-mode-toggle" className="flex items-center cursor-pointer select-none">
          <div className="relative">
            <input 
              type="checkbox" 
              id="thinking-mode-toggle" 
              className="sr-only" 
              checked={thinkingMode}
              onChange={(e) => setThinkingMode(e.target.checked)}
              disabled={isLoading}
            />
            <div className={`block w-14 h-8 rounded-full transition-colors ${thinkingMode ? 'bg-teal-500' : 'bg-slate-600'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${thinkingMode ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <div className="ml-3 text-slate-300 flex items-center">
            <BrainIcon className="w-5 h-5 mr-2 text-teal-400" />
            <span className="font-medium">Pro Thinking Mode</span>
          </div>
        </label>

        <button
          onClick={onGenerate}
          disabled={isLoading || !notes.trim()}
          className="w-full sm:w-auto flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 rounded-md shadow-lg hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? <Spinner /> : 'Generate'}
        </button>
      </div>
       <p className="text-xs text-slate-500 text-center sm:text-left">
          Enable Pro Thinking Mode for complex roles. It uses a more advanced model for deeper analysis but may take longer.
        </p>
    </div>
  );
};

export default InputArea;
