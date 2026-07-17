import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Zap, Bot, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmptyState = ({ onSelectPrompt }) => {
  const suggestedPrompts = [
    "Write a factorial function in JavaScript",
    "Explain React Hooks",
    "Optimize this SQL query",
    "Generate a Python REST API",
    "Compare BFS vs DFS",
    "Explain Docker in simple words",
    "Build a Todo App",
    "What is Retrieval-Augmented Generation?",
    "Write a resume summary",
    "Explain JWT Authentication",
  ];

  const supportedTasks = [
    "Programming",
    "Debugging",
    "Code Review",
    "Algorithms",
    "System Design",
    "Interview Questions",
    "SQL",
    "Machine Learning",
    "JavaScript",
    "Python",
    "Reasoning",
    "General Knowledge",
  ];

  const steps = [
    {
      icon: <Zap className="text-primary" size={16} />,
      title: "Ask",
      description: "Enter any programming, technical, reasoning, or general question.",
    },
    {
      icon: <Bot className="text-primary" size={16} />,
      title: "Compare",
      description: "The application sends the prompt to two AI models simultaneously.",
    },
    {
      icon: <Award className="text-primary" size={16} />,
      title: "Judge",
      description: "An AI Judge scores both responses and selects the better answer.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-4xl mx-auto w-full pt-2 pb-6"
    >
      {/* Welcome Card */}
      <Card variant="white" className="border border-border p-6 md:p-8 text-center space-y-2.5">
        <h2 className="text-lg md:text-xl font-extrabold text-heading flex items-center justify-center gap-2">
          👋 Welcome to AI Battle Arena
        </h2>
        <p className="text-xs md:text-sm text-body max-w-2xl mx-auto leading-relaxed">
          Compare responses from multiple AI models and let an AI Judge evaluate which answer is better based on quality, correctness, and clarity.
        </p>
      </Card>

      {/* How It Works */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted select-none">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <Card key={idx} variant="surface" className="p-4 border border-border flex items-start gap-3 shadow-none">
              <div className="bg-white p-2 rounded-lg border border-border shadow-2xs">
                {step.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-heading">{step.title}</h4>
                <p className="text-[11px] text-body leading-normal">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted select-none">
          Try one of these
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(promptText)}
              className="text-xs text-body hover:text-primary bg-white hover:bg-primary/[0.03] border border-border hover:border-primary/20 rounded-full px-3.5 py-1.5 transition-all duration-150 cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Supported Tasks */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted select-none">
          Supported Tasks
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {supportedTasks.map((task, idx) => (
            <Badge key={idx} variant="neutral" className="text-[10px] select-none lowercase">
              {task}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
