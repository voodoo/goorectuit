import React, { useState } from 'react';
import type { RecruitmentAssets } from '../types';
import GuideIcon from './icons/GuideIcon';
import LinkedInIcon from './icons/LinkedInIcon';

interface OutputDisplayProps {
  result: RecruitmentAssets | null;
  error: string | null;
  isLoading: boolean;
}

const JobDescriptionCard: React.FC<{ content: string }> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    // A simple inline markdown parser for **bold** text.
    const processInlineMarkdown = (text: string): React.ReactNode => {
        const parts = text.split(/(\*\*.*?\*\*)/g); // Split by bold tags, keeping the delimiters
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const renderMarkdown = () => {
        if (!content) return null;

        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: string[] = [];
        let paragraphLines: string[] = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-5 my-2 space-y-1">
                        {listItems.map((item, i) => <li key={i}>{processInlineMarkdown(item)}</li>)}
                    </ul>
                );
                listItems = [];
            }
        };

        const flushParagraph = () => {
            if (paragraphLines.length > 0) {
                 elements.push(
                    <p key={`p-${elements.length}`} className="whitespace-pre-line">
                        {processInlineMarkdown(paragraphLines.join('\n'))}
                    </p>
                );
                paragraphLines = [];
            }
        };

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('## ')) {
                flushList();
                flushParagraph();
                elements.push(<h2 key={`h2-${elements.length}`} className="text-xl font-semibold text-slate-200 mt-4 mb-2">{processInlineMarkdown(trimmedLine.substring(3))}</h2>);
            } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                flushParagraph();
                listItems.push(trimmedLine.substring(2));
            } else if (trimmedLine === '') {
                // An empty line acts as a block separator
                flushList();
                flushParagraph();
            } else {
                // This line is part of a paragraph
                flushList();
                paragraphLines.push(trimmedLine);
            }
        });

        // Flush any remaining items at the end of the content
        flushList();
        flushParagraph();

        return elements;
    };


    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 relative">
            <div className="flex items-center mb-4">
                <LinkedInIcon className="w-7 h-7 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-slate-100">Job Description</h3>
            </div>
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 text-sm text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md transition-all"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                {renderMarkdown()}
            </div>
        </div>
    );
};

const InterviewGuideCard: React.FC<{ questions: string[] }> = ({ questions }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
                <GuideIcon className="w-7 h-7 text-teal-400 mr-3" />
                <h3 className="text-2xl font-bold text-slate-100">Interview Guide</h3>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-slate-300">
                {questions.map((q, i) => <li key={i}>{q}</li>)}
            </ol>
        </div>
    );
};

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center p-8 text-slate-400">
        <p>Generating your recruitment assets...</p>
        <p className="text-sm">This may take a moment, especially with Pro Thinking Mode.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">An error occurred: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
        <div className="text-center p-8 text-slate-500">
            Your generated content will appear here.
        </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <JobDescriptionCard content={result.jobDescription} />
      <InterviewGuideCard questions={result.interviewGuide} />
    </div>
  );
};

export default OutputDisplay;