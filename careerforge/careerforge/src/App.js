import React, { useState } from 'react';
import { TamboProvider, useTambo, RenderStream } from '@tamboai/tambo-react-sdk';
import './App.css';

// UI Components that AI can dynamically render
import WelcomeCard from './components/WelcomeCard';
import InfoGatheringForm from './components/InfoGatheringForm';
import CareerAssessment from './components/CareerAssessment';
import ActionPlan from './components/ActionPlan';
import DecisionMatrix from './components/DecisionMatrix';
import ProgressTracker from './components/ProgressTracker';
import ResourceList from './components/ResourceList';
import InterviewPrep from './components/InterviewPrep';
import ResumeBuilder from './components/ResumeBuilder';
import SkillGapAnalysis from './components/SkillGapAnalysis';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userContext, setUserContext] = useState({
    careerStage: null,
    goals: [],
    skills: [],
    experience: [],
    preferences: {}
  });

  const { streamComponent } = useTambo({
    apiKey: process.env.REACT_APP_TAMBO_API_KEY,
    components: {
      WelcomeCard,
      InfoGatheringForm,
      CareerAssessment,
      ActionPlan,
      DecisionMatrix,
      ProgressTracker,
      ResourceList,
      InterviewPrep,
      ResumeBuilder,
      SkillGapAnalysis
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const systemPrompt = `You are CareerForge, an adaptive AI career coach. Based on the user's input and context, you must dynamically decide which UI component to render.

Current User Context:
${JSON.stringify(userContext, null, 2)}

Available Components and When to Use Them:

1. WelcomeCard - Use ONLY for first interaction or when user is completely new
   Props: { userName: string, onGetStarted: function }

2. InfoGatheringForm - Use when you need to collect structured information
   Props: { 
     fields: [{ name: string, label: string, type: 'text'|'select'|'textarea', options?: string[], required: boolean }],
     onSubmit: function,
     title: string
   }

3. CareerAssessment - Use when user needs to evaluate career fit or interests
   Props: {
     questions: [{ id: string, question: string, options: string[] }],
     onComplete: function,
     category: string
   }

4. ActionPlan - Use when user has goals and needs concrete next steps
   Props: {
     goal: string,
     steps: [{ id: string, title: string, description: string, timeframe: string, priority: 'high'|'medium'|'low' }],
     onStepComplete: function
   }

5. DecisionMatrix - Use when user is choosing between multiple options
   Props: {
     options: [{ name: string, id: string }],
     criteria: [{ name: string, weight: number }],
     scores: { [optionId]: { [criteriaName]: number } },
     onDecide: function
   }

6. ProgressTracker - Use to show user's progress toward a goal
   Props: {
     goal: string,
     milestones: [{ title: string, completed: boolean, date: string }],
     percentComplete: number
   }

7. ResourceList - Use to provide curated resources
   Props: {
     category: string,
     resources: [{ title: string, type: 'article'|'video'|'course'|'tool', url: string, description: string }],
     onSelect: function
   }

8. InterviewPrep - Use for interview preparation
   Props: {
     company: string,
     role: string,
     questions: [{ question: string, category: string }],
     onPractice: function
   }

9. ResumeBuilder - Use when helping with resume/CV
   Props: {
     sections: [{ type: 'summary'|'experience'|'education'|'skills', content: any }],
     onUpdate: function,
     targetRole: string
   }

10. SkillGapAnalysis - Use to identify skills needed for target role
    Props: {
      targetRole: string,
      currentSkills: string[],
      requiredSkills: string[],
      recommendations: [{ skill: string, priority: string, resources: string[] }]
    }

CRITICAL RULES:
- Render ONLY ONE component per response
- Choose the component that best matches user's immediate need
- Update user context based on interactions
- Transition between components as conversation progresses
- If info is missing, use InfoGatheringForm
- Never render static text - always use a component
- Adapt to user's career stage and goals

User's message: "${input}"

Decide which component to render and provide appropriate props.`;

      await streamComponent(systemPrompt, {
        onComponentRender: (component) => {
          setMessages(prev => [...prev, { role: 'assistant', component }]);
        },
        onContextUpdate: (newContext) => {
          setUserContext(prev => ({ ...prev, ...newContext }));
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I encountered an error. Please try again.' 
      }]);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">🎯</div>
          <h1>CareerForge</h1>
        </div>
        <div className="tagline">AI adapts UI • You in Live</div>
        
        <div className="live-decisions">
          <h3>TAMBO AI LOG</h3>
          <div className="decision-log">
            <div className="log-entry">
              <span className="timestamp">{new Date().toLocaleTimeString()}</span>
              <span className="event">Initial Greeting</span>
            </div>
            <div className="status">User context: {userContext.careerStage || 'Unknown'}</div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.component ? (
                  <RenderStream component={msg.component} />
                ) : (
                  <div className="message-text">{msg.content}</div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your career situation... (e.g., I'm a CS grad looking for my first job)"
              className="message-input"
            />
            <button type="submit" className="send-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TamboProvider apiKey={process.env.REACT_APP_TAMBO_API_KEY}>
      <ChatInterface />
    </TamboProvider>
  );
}

export default App;
