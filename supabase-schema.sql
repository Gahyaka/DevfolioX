-- DevfolioX Database Schema
-- Run this SQL in your Supabase SQL editor to set up the database

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    avatar_url TEXT,
    resume_url TEXT,
    social_links JSONB DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create learning_progress table
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('planned', 'in_progress', 'completed')) DEFAULT 'planned',
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    notes TEXT,
    resources TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learning_progress_status ON learning_progress(status);
CREATE INDEX IF NOT EXISTS idx_learning_progress_category ON learning_progress(category);
CREATE INDEX IF NOT EXISTS idx_learning_progress_created_at ON learning_progress(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_progress_updated_at BEFORE UPDATE ON learning_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public learning progress is viewable by everyone" ON learning_progress FOR SELECT USING (true);

-- Create policies for admin access (you'll need to set up authentication)
-- These policies assume you have a way to identify admin users
CREATE POLICY "Admins can do everything on profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can do everything on learning_progress" ON learning_progress FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can view admin_users" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO profiles (name, title, bio, email, location, skills) VALUES 
('John Doe', 'Full Stack Developer', 'Passionate developer with 5+ years of experience building web applications.', 'john@example.com', 'San Francisco, CA', ARRAY['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']);

INSERT INTO projects (title, description, tech_stack, github_url, featured) VALUES 
('E-commerce Platform', 'A full-stack e-commerce platform with React frontend and Node.js backend.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://github.com/johndoe/ecommerce', true),
('Task Management App', 'A collaborative task management application with real-time updates.', ARRAY['React', 'Socket.io', 'Express', 'MongoDB'], 'https://github.com/johndoe/taskmanager', true),
('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts.', ARRAY['React', 'TypeScript', 'OpenWeather API'], 'https://github.com/johndoe/weather-dashboard', false);

INSERT INTO blog_posts (title, content, excerpt, slug, published, featured, tags) VALUES 
('Getting Started with React Hooks', 'React Hooks have revolutionized how we write React components...', 'Learn the basics of React Hooks and how they can improve your code.', 'getting-started-react-hooks', true, true, ARRAY['React', 'JavaScript', 'Frontend']),
('Building Scalable APIs with Node.js', 'When building APIs that need to handle thousands of requests...', 'Best practices for building scalable and maintainable APIs.', 'building-scalable-apis-nodejs', true, false, ARRAY['Node.js', 'API', 'Backend']),
('TypeScript Best Practices', 'TypeScript has become an essential tool for modern web development...', 'Essential TypeScript patterns and practices for better code.', 'typescript-best-practices', false, false, ARRAY['TypeScript', 'JavaScript']);

INSERT INTO learning_progress (title, description, category, status, progress_percentage, resources) VALUES 
('Advanced React Patterns', 'Learning advanced React patterns like render props, HOCs, and compound components.', 'Frontend', 'in_progress', 75, ARRAY['https://reactpatterns.com', 'Advanced React Course']),
('System Design Fundamentals', 'Understanding how to design large-scale distributed systems.', 'Architecture', 'planned', 0, ARRAY['Designing Data-Intensive Applications', 'System Design Interview']),
('GraphQL with Apollo', 'Mastering GraphQL and Apollo for efficient data fetching.', 'Backend', 'completed', 100, ARRAY['Apollo Docs', 'GraphQL Tutorial']);

