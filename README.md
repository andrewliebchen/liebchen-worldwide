# Andrew.AI Terminal Portfolio

A terminal-style portfolio website powered by Next.js and OpenAI's GPT-4. This interactive terminal interface allows visitors to explore my work and experience through natural language conversations.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Styled Components
- **AI Integration**: OpenAI GPT-4 API
- **Analytics**: Vercel Analytics
- **Session Management**: Iron Session
- **UI Components**: 
  - React Markdown for rendering responses
  - Typewriter Effect for terminal-like animations
  - React Spring for smooth animations

## Content Rules

The application follows specific content rules to maintain a consistent voice and user experience:

1. **Third-Person Perspective**: All content refers to Andrew Liebchen in the third person (he/his/him), never in first person (I/my/me)
2. **AI Self-Reference**: The AI assistant refers to itself as "Liebchen.world" rather than using first-person pronouns
3. **Tagline Format**: Dynamic taglines always follow the format "liebchen.world is [descriptor]" in lowercase
4. **Welcome Messages**: Initial welcome messages introduce Andrew as a senior freelance product designer with varying emphasis on different aspects of his expertise

## Project Structure

```
├── src/                # Source directory
│   ├── components/     # React components
│   ├── config/        # Configuration files
│   ├── context/       # React context providers
│   ├── styles/        # Styled components and theme
│   ├── types/         # TypeScript types
│   └── ai/            # AI integration and commands
├── pages/             # Next.js pages and API routes
│   └── api/          # Backend API endpoints
└── public/           # Static assets
```

## OpenAI API Integration

The application uses OpenAI's GPT-4 API to generate contextual responses based on user queries. The integration follows a structured approach:

### API Response Structure

The OpenAI API returns responses in a JSON format that includes:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "This is the AI's response text"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

### Processing and Display

Our application processes these responses in several steps:

1. **Extraction**: The content from the assistant's message is extracted from the JSON response
2. **Formatting**: The content is formatted with Markdown for rich text display
3. **Animation**: The formatted content is displayed with a typewriter effect for a terminal-like experience
4. **Interactive Elements**: Special elements like "WATCH CASE STUDY" buttons are added based on metadata in the response

### Custom Response Format

We've extended the standard OpenAI response format to include portfolio-specific metadata:

```json
{
  "type": "ai-response",
  "content": "Here's information about my design process...",
  "caseStudy": "project-id-123",
  "awaitCaseStudy": true
}
```

This custom format allows the terminal to:
- Display the main response with the typewriter effect
- Show case study buttons when relevant
- Track the conversation context for follow-up questions

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/andrew-ai-terminal.git
   cd andrew-ai-terminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Add your environment variables:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `SESSION_SECRET`: A secure string for Iron Session (min 32 chars)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

## Deployment

This project is optimized for deployment on Vercel:

1. **Connect to Vercel**
   - Fork this repository
   - Create a new project on Vercel
   - Connect your forked repository

2. **Environment Variables**
   - Add the required environment variables in Vercel's project settings
   - Ensure all environment variables from `.env.example` are set

3. **Deploy**
   - Vercel will automatically deploy your site
   - Each push to the main branch will trigger a new deployment

## Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Key Features

- Terminal-style interface with command history
- Natural language processing with GPT-4
- Markdown rendering for rich text responses
- Session-based query tracking
- Responsive design with Tokyo Night-inspired theme
- Real-time status indicators
- Type animations for authentic terminal feel
- Dynamic typewriter effect for both welcome messages and AI responses
- Interactive case study buttons that appear after message completion

## Recent Improvements

- **Enhanced Typewriter Effect**: Applied the typewriter animation to both welcome messages and AI responses for a consistent, engaging user experience
- **Case Study Integration**: Added "WATCH CASE STUDY" buttons that appear after message completion, providing seamless access to detailed project information
- **Video Overlay Component**: Implemented a responsive video overlay for case study videos with a terminal-inspired design
- **Unified Button System**: Created a consistent button component system using styled-components for all interactive elements
- **Animation State Management**: Implemented ref-based animation tracking to prevent duplicate animations and ensure smooth transitions
- **Performance Optimization**: Reduced unnecessary re-renders by using refs instead of state variables for animation tracking

## Browser Support

The application is optimized for modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and not open for public use or distribution.

## Component System

### Terminal Button
The application uses a unified button component system based on styled-components:

```typescript
const TerminalButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.text.accent};
  color: ${colors.text.accent};
  text-transform: uppercase;
  // ... other styles
`;
```

This button component is used consistently throughout the application for:
- Case study buttons
- Video overlay controls
- Interactive terminal elements

The design follows the Tokyo Night theme and maintains a consistent terminal aesthetic across all interactive elements.
