# CareerForge Setup Guide

This guide will walk you through setting up and running CareerForge locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (usually comes with Node.js)
  - Check: `npm --version`

## 🚀 Quick Start

### Step 1: Navigate to Project Directory

```bash
cd careerforge
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- Tambo React SDK
- Lucide React (for icons)
- React Scripts (for development)

**Note**: If you get network errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Verify Environment Variables

The `.env` file should already contain:
```
REACT_APP_TAMBO_API_KEY=tambo_4+HE1xr0sSqeYes7daY3TmfAkZm35efX7tH394vQBh+WYF7qAeEyH2SMN3D9zDp73RhYxwOiVZN7MJvIyVoSLJ8j+LEq1rskD2rjh0YMZZA=
```

⚠️ **IMPORTANT**: Never commit the `.env` file to version control with real API keys.

### Step 4: Start Development Server

```bash
npm start
```

The application will:
1. Compile the React app
2. Open your default browser
3. Navigate to `http://localhost:3000`

You should see the CareerForge welcome screen!

## 🎮 Using the Application

### First Interaction

When you first open the app, try one of these prompts:

1. **For Job Seekers**:
   ```
   I just graduated with a computer science degree and I'm looking for my first software engineering job
   ```

2. **For Career Changers**:
   ```
   I'm currently a marketing manager but want to transition into product management
   ```

3. **For Interview Prep**:
   ```
   I have an interview at Amazon for a senior developer role next week
   ```

4. **For Career Decisions**:
   ```
   I have two job offers and need help deciding between them
   ```

### What to Expect

The AI will:
1. Analyze your message
2. Determine what information it needs
3. Render the appropriate UI component
4. Adapt the interface as you continue the conversation

## 🔧 Troubleshooting

### Issue: "npm: command not found"

**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 already in use

**Solution**: 
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or run on a different port
PORT=3001 npm start
```

### Issue: Module not found errors

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: React Scripts not found

**Solution**:
```bash
npm install react-scripts --save
```

### Issue: API Key not working

**Solution**: 
1. Check that `.env` file exists in the root directory
2. Verify the key starts with `REACT_APP_`
3. Restart the development server (API keys are loaded at startup)

### Issue: Components not rendering

**Solution**:
1. Check browser console for errors (F12)
2. Verify Tambo SDK is properly imported
3. Check that all component files are in `src/components/`

## 🏗️ Project Structure Explained

```
careerforge/
├── public/                  # Static files
│   └── index.html          # HTML template
├── src/                    # Source code
│   ├── components/         # UI Components
│   │   ├── WelcomeCard.js
│   │   ├── InfoGatheringForm.js
│   │   ├── ... (8 more components)
│   │   └── components.css  # Component styles
│   ├── App.js              # Main application
│   ├── App.css             # App-level styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (DO NOT COMMIT)
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.
- Opens browser to `http://localhost:3000`
- Hot-reloads on code changes
- Shows build errors and warnings

### `npm run build`
Builds the app for production.
- Creates optimized bundle in `build/` folder
- Minifies code for best performance
- Hashes filenames for caching

### `npm test`
Runs the test suite (if tests are added).

## 🎨 Customization

### Changing Colors

Edit `src/App.css` and `src/components/components.css`:

```css
/* Primary color (Cyan) */
--primary: #00d9ff;

/* Secondary color (Green) */
--secondary: #00ff88;

/* Background */
--background: #0a0a0f;
```

### Adding New Components

1. Create component file in `src/components/`:
```javascript
// src/components/MyComponent.js
import React from 'react';
import './components.css';

export default function MyComponent({ myProp }) {
  return (
    <div className="component-card">
      <h3>My Component</h3>
      <p>{myProp}</p>
    </div>
  );
}
```

2. Register in `App.js`:
```javascript
import MyComponent from './components/MyComponent';

const { streamComponent } = useTambo({
  apiKey: process.env.REACT_APP_TAMBO_API_KEY,
  components: {
    WelcomeCard,
    // ... other components
    MyComponent  // Add here
  }
});
```

3. Update system prompt to teach AI when to use it.

## 🔐 Security Best Practices

### API Key Management

1. **Never commit `.env` to version control**
   - Already included in `.gitignore`

2. **Use different keys for dev/prod**
   - Development: `.env.local`
   - Production: Environment variables in hosting platform

3. **Rotate keys periodically**
   - Generate new keys from Tambo dashboard
   - Update environment variables

### Production Deployment

When deploying to production:

1. **Set environment variables** in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - AWS Amplify: App Settings → Environment Variables

2. **Never expose API keys in client-side code**
   - Keep them in environment variables
   - Access via `process.env.REACT_APP_*`

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Add environment variable: `REACT_APP_TAMBO_API_KEY`
5. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Visit https://netlify.com
3. New site from Git → Choose repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variable: `REACT_APP_TAMBO_API_KEY`
7. Deploy!

## 📊 Performance Optimization

### For Faster Load Times

1. **Code Splitting** (already configured in React):
   - Components load on-demand

2. **Image Optimization**:
   - Use WebP format
   - Lazy load images

3. **Bundle Analysis**:
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
```

## 🐛 Debugging

### Enable Debug Mode

Add to `.env`:
```
REACT_APP_DEBUG=true
```

### View Tambo API Calls

Check browser console (F12) for:
- API request/response logs
- Component render decisions
- State updates

### Common Issues and Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| White screen | JavaScript error | Check console (F12) |
| Components not updating | State not updating | Check React DevTools |
| API errors | Invalid key or network | Verify .env file |
| Slow performance | Large bundle size | Run `npm run build` and analyze |

## 💡 Tips for Best Experience

1. **Use specific prompts**: 
   - ❌ "Help me"
   - ✅ "I need to prepare for a software engineering interview at Google"

2. **Provide context**: 
   - ❌ "Make a plan"
   - ✅ "I'm a junior developer wanting to become a senior in 2 years"

3. **Be conversational**: 
   - The AI understands natural language
   - No need for keywords or commands

## 📚 Learning Resources

- **React**: https://react.dev/
- **Tambo SDK**: https://tambo.ai/docs
- **Generative UI**: https://tambo.ai/blog/generative-ui

## 🤝 Getting Help

1. **Check the README.md** for detailed documentation
2. **Review the code comments** in component files
3. **Check browser console** for error messages
4. **Visit Tambo docs** for SDK-specific questions

## ✅ Verification Checklist

Before reporting issues, verify:

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] `.env` file exists with API key
- [ ] Development server running (`npm start`)
- [ ] Browser opened to `http://localhost:3000`
- [ ] No console errors (F12)

## 🎉 Success!

If you see the CareerForge welcome screen and can type a message, you're all set!

Try this prompt to test the full system:
```
I'm a recent CS graduate with projects in React and Python. I want to land a job at a tech startup as a full-stack developer. Can you help me create an action plan?
```

The AI should render an InfoGatheringForm, then a SkillGapAnalysis, followed by an ActionPlan.

Enjoy exploring Generative UI with CareerForge! 🚀
