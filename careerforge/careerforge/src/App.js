import React, { useState } from 'react';
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

// Component registry for dynamic rendering
const COMPONENTS = {
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
};

function ChatInterface() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      component: { 
        type: 'WelcomeCard', 
        props: { 
          userName: 'there',
          onGetStarted: () => console.log('Get started clicked')
        }
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userContext] = useState({
    careerStage: null,
    goals: [],
    skills: [],
    experience: [],
    preferences: {}
  });

  const callTamboAPI = async (userMessage) => {
    const systemPrompt = `You are CareerForge, an adaptive AI career coach. Based on the user's input and context, you must dynamically decide which UI component to render.

Current User Context:
${JSON.stringify(userContext, null, 2)}

Available Components and When to Use Them:

1. WelcomeCard - Use ONLY for first interaction or when user is completely new
   Response format: { "component": "WelcomeCard", "props": { "userName": "string" } }

2. InfoGatheringForm - Use when you need to collect structured information
   Response format: { "component": "InfoGatheringForm", "props": { "fields": [...], "title": "string" } }

3. CareerAssessment - Use when user needs to evaluate career fit or interests
   Response format: { "component": "CareerAssessment", "props": { "questions": [...], "category": "string" } }

4. ActionPlan - Use when user has goals and needs concrete next steps
   Response format: { "component": "ActionPlan", "props": { "goal": "string", "steps": [...] } }

5. SkillGapAnalysis - Use to identify skills needed for target role
   Response format: { "component": "SkillGapAnalysis", "props": { "targetRole": "string", "currentSkills": [...], "requiredSkills": [...], "recommendations": [...] } }

6. ResourceList - Use to provide curated resources
   Response format: { "component": "ResourceList", "props": { "category": "string", "resources": [...] } }

7. InterviewPrep - Use for interview preparation
   Response format: { "component": "InterviewPrep", "props": { "company": "string", "role": "string", "questions": [...] } }

8. DecisionMatrix - Use when user is choosing between multiple options
   Response format: { "component": "DecisionMatrix", "props": { "options": [...], "criteria": [...], "scores": {...} } }

9. ProgressTracker - Use to show user's progress toward a goal
   Response format: { "component": "ProgressTracker", "props": { "goal": "string", "milestones": [...], "percentComplete": 0 } }

10. ResumeBuilder - Use when helping with resume/CV
    Response format: { "component": "ResumeBuilder", "props": { "sections": [...], "targetRole": "string" } }

CRITICAL RULES:
- Respond ONLY with valid JSON
- Choose ONE component that best matches user's immediate need
- Provide realistic, helpful data in props
- If info is missing, use InfoGatheringForm
- Adapt to user's career stage and goals

User's message: "${userMessage}"

Respond with JSON only, no other text. Format: { "component": "ComponentName", "props": { ... } }`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_TAMBO_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [
            { role: 'user', content: systemPrompt }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;
      
      // Parse JSON response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const componentData = JSON.parse(jsonMatch[0]);
        return componentData;
      } else {
        throw new Error('Invalid AI response format');
      }
    } catch (error) {
      console.error('Tambo API Error:', error);
      // Return a fallback component
      return {
        component: 'InfoGatheringForm',
        props: {
          title: 'Tell Me About Yourself',
          fields: [
            { name: 'background', label: 'What\'s your background?', type: 'textarea', required: true },
            { name: 'goal', label: 'What are you trying to achieve?', type: 'textarea', required: true }
          ]
        }
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const componentData = await callTamboAPI(input);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        component: {
          type: componentData.component,
          props: componentData.props
        }
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponent = (component) => {
    const Component = COMPONENTS[component.type];
    if (!Component) {
      return <div className="error">Component {component.type} not found</div>;
    }
    return <Component {...component.props} />;
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">🎯</div>
          <h1>CareerForge</h1>
        </div>
        <div className="tagline">AI adapts UI • Live in Action</div>
        
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
                  renderComponent(msg.component)
                ) : (
                  <div className="message-text">{msg.content}</div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="loading">AI is thinking...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your career situation... (e.g., I'm a CS grad looking for my first job)"
              className="message-input"
              disabled={isLoading}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
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
  return <ChatInterface />;
}

export default App;
