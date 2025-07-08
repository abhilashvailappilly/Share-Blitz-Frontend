# 🌟 Share Blitz Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io">
</div>

<div align="center">
  <h3>⚡ A modern, responsive frontend for Share Blitz - The next-generation social media platform</h3>
  <p>Built with cutting-edge technologies for blazing-fast performance and exceptional user experience</p>
</div>

---

## 🚀 About Share Blitz Frontend

**Share Blitz Frontend** is the user-facing application of the Share Blitz social media platform. Built with React 18 and Vite, it delivers a lightning-fast, interactive, and responsive experience across all devices. The frontend seamlessly integrates with the Share Blitz Backend to provide real-time social interactions.

### ✨ Key Features

- 🎨 **Modern UI/UX** - Clean, intuitive design with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Powered by Vite for instant hot module replacement
- 🔄 **Real-time Updates** - Live notifications, messaging, and feed updates
- 🎭 **Interactive Components** - Engaging user interactions and animations
- 🌙 **Dark/Light Mode** - Theme switching with persistent preferences
- 🔐 **Secure Authentication** - JWT-based authentication with auto-refresh
- 📊 **Rich Media Support** - Image, video, and document sharing
- 🔍 **Advanced Search** - Real-time search with suggestions
- 💬 **Instant Messaging** - Real-time chat with typing indicators
- 🔔 **Push Notifications** - Browser notifications for important updates
- 🎯 **Progressive Web App** - Installable with offline capabilities
- ♿ **Accessibility** - WCAG compliant with screen reader support
- 🌐 **Internationalization** - Multi-language support

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite 5 (Lightning fast development)
- **Language**: TypeScript (Type-safe development)
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Real-time**: Socket.io Client

### UI/UX Libraries
- **UI Components**: Headless UI + Custom Components
- **Icons**: Lucide React + Heroicons
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: Date-fns
- **Image Handling**: React Image Gallery
- **Drag & Drop**: React Beautiful DnD

### Development Tools
- **Bundler**: Vite with SWC
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Pre-commit**: Husky + lint-staged
- **Package Manager**: npm/yarn

### Performance & PWA
- **Code Splitting**: React.lazy + Suspense
- **Caching**: Service Worker + Cache API
- **Image Optimization**: WebP support
- **Bundle Analysis**: Rollup Bundle Analyzer
- **Error Tracking**: Sentry (optional)

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhilashvailappilly/Share-Blitz-Frontend.git
   cd Share-Blitz-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   
   # App Configuration
   VITE_APP_NAME=Share Blitz
   VITE_APP_VERSION=1.0.0
   
   # Authentication
   VITE_JWT_SECRET=your-jwt-secret
   
   # File Upload
   VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   
   # Analytics (optional)
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   
   # Sentry (optional)
   VITE_SENTRY_DSN=your-sentry-dsn
   
   # Feature Flags
   VITE_ENABLE_DARK_MODE=true
   VITE_ENABLE_PWA=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

---

## 📁 Project Structure

```
Share-Blitz-Frontend/
├── 📁 public/                  # Static assets
│   ├── icons/                 # App icons
│   ├── images/                # Static images
│   └── manifest.json          # PWA manifest
├── 📁 src/
│   ├── 📁 components/         # Reusable components
│   │   ├── 📁 common/         # Common components
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   └── LoadingSpinner/
│   │   ├── 📁 layout/         # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   └── Navigation/
│   │   └── 📁 ui/             # UI-specific components
│   │       ├── PostCard/
│   │       ├── UserProfile/
│   │       ├── ChatBubble/
│   │       └── NotificationItem/
│   ├── 📁 pages/              # Page components
│   │   ├── Home/
│   │   ├── Profile/
│   │   ├── Messages/
│   │   ├── Search/
│   │   ├── Settings/
│   │   └── Auth/
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── 📁 store/              # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── postsSlice.ts
│   │   │   ├── messagesSlice.ts
│   │   │   └── uiSlice.ts
│   │   ├── api/
│   │   │   ├── authApi.ts
│   │   │   ├── postsApi.ts
│   │   │   └── usersApi.ts
│   │   └── index.ts
│   ├── 📁 services/           # API services
│   │   ├── api.ts
│   │   ├── socket.ts
│   │   ├── auth.ts
│   │   └── upload.ts
│   ├── 📁 utils/              # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── 📁 styles/             # Global styles
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── 📁 types/              # TypeScript types
│   │   ├── api.ts
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── message.ts
│   ├── 📁 context/            # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── SocketContext.tsx
│   ├── App.tsx                # Main App component
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # Vite type definitions
├── 📁 tests/                  # Test files
│   ├── 📁 components/
│   ├── 📁 pages/
│   ├── 📁 utils/
│   └── setup.ts
├── 📄 index.html              # HTML template
├── 📄 package.json            # Dependencies
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 .env.example            # Environment variables template
└── 📄 README.md
```

---

## 🎨 Features Overview

### 🏠 Home Feed
- **Infinite Scroll** - Seamless content loading
- **Real-time Updates** - Live post updates
- **Interactive Posts** - Like, comment, share functionality
- **Media Support** - Images, videos, and documents
- **Smart Filtering** - Content filtering and sorting

### 👤 User Profiles
- **Profile Management** - Edit profile information
- **Media Gallery** - User's posts and shared content
- **Follower System** - Follow/unfollow functionality
- **Activity Feed** - User activity tracking
- **Privacy Settings** - Control profile visibility

### 💬 Messaging System
- **Real-time Chat** - Instant messaging with Socket.io
- **Typing Indicators** - See when users are typing
- **Message Status** - Read receipts and delivery status
- **Media Sharing** - Share images and files
- **Group Chats** - Multi-user conversations

### 🔍 Advanced Search
- **Real-time Search** - Instant search results
- **Multiple Categories** - Search users, posts, hashtags
- **Search History** - Recent searches
- **Trending Topics** - Popular hashtags and topics
- **Filter Options** - Date, type, and relevance filters

### 🔔 Notifications
- **Real-time Notifications** - Instant updates
- **Notification Types** - Likes, comments, follows, messages
- **Browser Notifications** - Desktop notifications
- **Notification Settings** - Customize notification preferences
- **Notification History** - View past notifications

### 🌙 Theme System
- **Dark/Light Mode** - Toggle between themes
- **System Theme** - Follow system preferences
- **Custom Themes** - Personalized color schemes
- **Theme Persistence** - Remember user preferences
- **Smooth Transitions** - Animated theme switching

---

## 🔧 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run analyze` | Analyze bundle size |

### Development Server

The development server runs at `http://localhost:5173` with:



- **Framework**: Vitest (Jest-compatible)
- **Testing Library**: React Testing Library
- **Utilities**: Testing utilities for components
- **Coverage**: Istanbul coverage reports
- **Mocking**: MSW for API mocking

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- PostCard.test.tsx

# Run tests for specific pattern
npm run test -- --testNamePattern="authentication"
```

---

## 🌍 Deployment

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview

# Test the build
npm run test:ci
```

### Deployment Options

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Environment Variables for Production

```env
VITE_API_BASE_URL=https://api.shareblitz.com
VITE_SOCKET_URL=https://api.shareblitz.com
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-production-sentry-dsn
```

---

## 🤝 Contributing

We welcome contributions to Share Blitz Frontend! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- **Follow TypeScript best practices**
- **Write comprehensive tests**
- **Use semantic commit messages**
- **Update documentation**
- **Ensure accessibility compliance**
- **Follow the existing code style**


---

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check

# Restart TypeScript service in IDE
# VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

#### Development Server Issues
```bash
# Check port availability
lsof -ti:5173

# Use different port
npm run dev -- --port 3000
```

### Environment Issues

```bash
# Check environment variables
echo $VITE_API_BASE_URL

# Verify .env file
cat .env.local
```

### Performance Issues

```bash
# Analyze bundle size
npm run analyze

# Check for memory leaks
# Use React DevTools Profiler
```

---

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

### Learning Resources
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Modern JavaScript](https://javascript.info/)
- [Web Performance](https://web.dev/performance/)

### Community
- [React Community](https://reactjs.org/community/support.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [Discord Communities](https://discord.gg/reactjs)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhilash Vailappilly**
- GitHub: [@abhilashvailappilly](https://github.com/abhilashvailappilly)
- LinkedIn: [Connect with me](https://linkedin.com/in/abhilashvailappilly)
- Portfolio: [https://abhilashvailappilly.dev](https://abhilashvailappilly.dev)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Tailwind CSS for the utility-first styling
- Redux Toolkit for state management
- All contributors and beta testers
- Open source community for inspiration

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Documentation](docs/)
2. Search [Issues](https://github.com/abhilashvailappilly/Share-Blitz-Frontend/issues)
3. Create a new [Issue](https://github.com/abhilashvailappilly/Share-Blitz-Frontend/issues/new)

---

<div align="center">
  <p>Made with ❤️ by Abhilash Vailappilly</p>
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🚀 <a href="https://shareblitz.com">Try Share Blitz Live</a> | 📱 <a href="https://github.com/abhilashvailappilly/Share-Blitz-Backend">Backend Repository</a></p>
</div>