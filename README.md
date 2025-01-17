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

## Project Structure

```
├── components/          # React components
│   ├── Terminal/       # Terminal-related components
│   ├── theme/          # Theme constants and types
│   └── styles/         # Styled components
├── config/             # Configuration files
├── context/            # React context providers
├── pages/             # Next.js pages and API routes
│   └── api/           # Backend API endpoints
├── public/            # Static assets
└── commands/          # Terminal command handlers
```

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
