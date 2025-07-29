import { Project, BlogPost, LearningProgress, Profile } from './supabase'

export const demoProfile: Profile = {
  id: '1',
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate developer with 5+ years of experience building web applications. I love creating solutions that not only work well but also provide great user experiences.',
  email: 'john@devfoliox.com',
  location: 'San Francisco, CA',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resume_url: '/resume.pdf',
  social_links: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev'
  },
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  updated_at: new Date().toISOString()
}

export const demoProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with React frontend and Node.js backend, featuring user authentication, payment processing, and admin dashboard.',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    github_url: 'https://github.com/johndoe/ecommerce-platform',
    live_url: 'https://ecommerce-demo.vercel.app',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    featured: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    tech_stack: ['React', 'Socket.io', 'Express', 'MongoDB', 'Tailwind CSS'],
    github_url: 'https://github.com/johndoe/task-manager',
    live_url: 'https://taskmanager-demo.vercel.app',
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    featured: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    tech_stack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    github_url: 'https://github.com/johndoe/weather-dashboard',
    live_url: 'https://weather-demo.vercel.app',
    image_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    featured: false,
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  }
]

export const demoBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks have revolutionized how we write React components. In this comprehensive guide, we\'ll explore the most commonly used hooks and learn how to create custom hooks for reusable logic. Hooks allow us to use state and other React features without writing a class component, making our code more functional and easier to test.',
    excerpt: 'Learn the basics of React Hooks and how they can improve your code structure and reusability.',
    slug: 'getting-started-react-hooks',
    published: true,
    featured: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    content: 'When building APIs that need to handle thousands of requests, scalability becomes crucial. This article covers best practices for building scalable Node.js APIs, including proper error handling, database optimization, caching strategies, and deployment considerations.',
    excerpt: 'Best practices for building scalable and maintainable APIs with Node.js and Express.',
    slug: 'building-scalable-apis-nodejs',
    published: true,
    featured: false,
    tags: ['Node.js', 'API', 'Backend', 'Scalability'],
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z'
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    content: 'TypeScript has become an essential tool for modern web development. This guide covers essential TypeScript patterns and practices that will help you write better, more maintainable code. We\'ll explore advanced types, generics, and how to properly structure TypeScript projects.',
    excerpt: 'Essential TypeScript patterns and practices for better code quality and maintainability.',
    slug: 'typescript-best-practices',
    published: false,
    featured: false,
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  }
]

export const demoLearningProgress: LearningProgress[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Learning advanced React patterns like render props, HOCs, compound components, and the latest patterns with hooks.',
    category: 'Frontend',
    status: 'in_progress',
    progress_percentage: 75,
    notes: 'Currently working through compound components and context patterns. The render props pattern is particularly useful for sharing logic between components.',
    resources: ['https://reactpatterns.com', 'Advanced React Course by Kent C. Dodds'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'System Design Fundamentals',
    description: 'Understanding how to design large-scale distributed systems, including load balancing, caching, and database design.',
    category: 'Architecture',
    status: 'planned',
    progress_percentage: 0,
    notes: 'Planning to start with basic concepts and work towards more complex distributed systems.',
    resources: ['Designing Data-Intensive Applications', 'System Design Interview by Alex Xu'],
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'GraphQL with Apollo',
    description: 'Mastering GraphQL and Apollo for efficient data fetching and state management in React applications.',
    category: 'Backend',
    status: 'completed',
    progress_percentage: 100,
    notes: 'Completed the course and built a full-stack application using GraphQL. The type safety and efficient data fetching are impressive.',
    resources: ['Apollo GraphQL Documentation', 'Full Stack GraphQL Tutorial'],
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Docker and Containerization',
    description: 'Learning Docker fundamentals, container orchestration, and deployment strategies for modern applications.',
    category: 'DevOps',
    status: 'in_progress',
    progress_percentage: 60,
    notes: 'Understanding Docker basics and working on multi-container applications with Docker Compose.',
    resources: ['Docker Official Documentation', 'Docker Deep Dive Course'],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  }
]

