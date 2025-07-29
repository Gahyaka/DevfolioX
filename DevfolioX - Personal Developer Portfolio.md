# DevfolioX - Personal Developer Portfolio

A modern, dark-themed personal developer portfolio web application built with React, TypeScript, and Supabase. DevfolioX helps developers showcase their projects, blog posts, learning progress, and skills to HR, fellow developers, and general visitors.

![DevfolioX Screenshot](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop)

## ✨ Features

### 🌐 Public Portfolio
- **Homepage**: Hero section with profile, featured projects, and blog posts
- **Projects Showcase**: Filterable project gallery with technology tags
- **Blog System**: Article listing with topic filtering and featured content
- **Learning Progress**: Public timeline of learning journey and achievements
- **About Page**: Professional profile with skills and experience

### 🔐 Admin Dashboard (CMS)
- **Authentication**: Secure login with Supabase Auth
- **Content Management**: Full CRUD operations for all content types
- **Dashboard Overview**: Statistics and recent content overview
- **Project Management**: Add, edit, and manage portfolio projects
- **Blog Management**: Create and publish blog articles
- **Learning Tracker**: Track and update learning progress

### 🎨 Design & UX
- **Dark Theme**: Modern dark theme with cyan and coral accents
- **Responsive Design**: Mobile-first design optimized for all devices
- **Smooth Animations**: Hover effects and smooth transitions
- **Professional UI**: Clean, modern interface using shadcn/ui components
- **Typography**: Inter and Fira Code fonts for optimal readability

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Supabase Auth** - Authentication and user management
- **Supabase Storage** - File storage for images and assets
- **Real-time subscriptions** - Live updates for content changes

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Vite** - Development server and build tool
- **pnpm** - Fast, efficient package manager

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account (optional for demo mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devfoliox.git
   cd devfoliox
   ```

2. **Install dependencies**
   ```bash
   cd devfoliox-frontend
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database setup** (if using Supabase)
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Enable Row Level Security (RLS) policies

5. **Start development server**
   ```bash
   pnpm run dev
   ```

6. **Access the application**
   - Public site: `http://localhost:5173`
   - Admin login: `http://localhost:5173/login`

### Demo Mode

DevfolioX includes a demo mode that works without Supabase configuration:

- Uses demo data for all content
- Simulates API delays for realistic experience
- Allows testing all features without backend setup
- Demo login: any email/password combination

## 📊 Database Schema

### Tables

#### `profiles`
```sql
- id (uuid, primary key)
- name (text)
- title (text)
- bio (text)
- email (text)
- location (text)
- avatar_url (text)
- resume_url (text)
- social_links (jsonb)
- skills (text[])
- updated_at (timestamp)
```

#### `projects`
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- tech_stack (text[])
- github_url (text)
- live_url (text)
- image_url (text)
- featured (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `blog_posts`
```sql
- id (uuid, primary key)
- title (text)
- content (text)
- excerpt (text)
- slug (text, unique)
- published (boolean)
- featured (boolean)
- tags (text[])
- image_url (text)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `learning_progress`
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- category (text)
- status (text) -- 'planned', 'in_progress', 'completed'
- progress_percentage (integer)
- notes (text)
- resources (text[])
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎨 Design System

### Colors
- **Primary**: `#00F0FF` (Cyan) - Main brand color
- **Accent**: `#FF6F61` (Coral) - Secondary accent color
- **Background**: `#0A0A0A` (Dark) - Main background
- **Card**: `#1A1A1A` - Card backgrounds
- **Border**: `#2A2A2A` - Borders and dividers

### Typography
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Code**: Fira Code (monospace)

### Spacing
- Uses Tailwind CSS spacing scale (4px base unit)
- Consistent padding and margins throughout
- Responsive spacing adjustments

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components are designed mobile-first with progressive enhancement.

## 🔐 Authentication

### Demo Authentication
- Any email/password combination works in demo mode
- Simulates real authentication flow
- Maintains session state

### Production Authentication
- Supabase Auth with email/password
- Protected routes for admin dashboard
- Automatic session management
- Secure logout functionality

## 📝 Content Management

### Projects
- Add/edit/delete projects
- Upload project images
- Set featured status
- Manage technology tags
- GitHub and live demo links

### Blog Posts
- Rich text content editing
- Draft and published states
- Featured post selection
- Tag management
- SEO-friendly slugs

### Learning Progress
- Track learning goals
- Progress percentage tracking
- Category organization
- Resource links
- Status management (planned/in-progress/completed)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment
```bash
# Build for production
pnpm run build

# Deploy the dist/ folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: GitHub Integration
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_USERNAME=your_github_username

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### Customization
- Update profile information in demo data or database
- Modify color scheme in Tailwind config
- Add custom components in `src/components`
- Extend API functionality in `src/lib/api.ts`

## 🧪 Testing

### Manual Testing
- All public pages load correctly
- Authentication flow works
- Dashboard functionality operates
- Responsive design on all devices
- Demo mode fallback functions

### Automated Testing (Future)
- Unit tests with Vitest
- Component testing with React Testing Library
- E2E testing with Playwright

## 📈 Performance

### Optimization Features
- Code splitting with React.lazy
- Image optimization and lazy loading
- Efficient bundle size with Vite
- Minimal re-renders with proper React patterns

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 85+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Maintain responsive design principles
- Test on multiple devices and browsers
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful React components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Supabase](https://supabase.com/) for backend infrastructure
- [Lucide](https://lucide.dev/) for icon library
- [Unsplash](https://unsplash.com/) for demo images

## 📞 Support

For support, email support@devfoliox.com or create an issue on GitHub.

---

**Built with ❤️ by [Your Name]**

*DevfolioX - Showcase your development journey with style*

