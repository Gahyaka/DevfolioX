import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProjectCard from '@/components/ui/ProjectCard'
import BlogCard from '@/components/ui/BlogCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Code2, BookOpen, TrendingUp } from 'lucide-react'
import { projectsApi, blogApi, profileApi } from '@/lib/api'
import { Project, BlogPost, Profile } from '@/lib/supabase'

const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, projectsData, postsData] = await Promise.all([
          profileApi.get(),
          projectsApi.getFeatured(),
          blogApi.getFeatured()
        ])
        
        setProfile(profileData)
        setFeaturedProjects(projectsData.slice(0, 3))
        setFeaturedPosts(postsData.slice(0, 2))
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-left">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="gradient-text">
                    {profile?.name || 'John Doe'}
                  </span>
                </h1>
                <h2 className="text-xl lg:text-2xl text-muted-foreground">
                  {profile?.title || 'Full Stack Developer'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg">
                  {profile?.bio || 'Passionate developer with 5+ years of experience building web applications.'}
                </p>
              </div>

              <div className="flex items-center space-x-4 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{profile?.location || 'San Francisco, CA'}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(profile?.skills || ['React', 'TypeScript', 'Node.js', 'Python']).slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group">
                  <Link to="/projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={profile?.resume_url || '#'} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={profile?.social_links?.github || '#'} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={profile?.social_links?.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${profile?.email || 'contact@example.com'}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <Code2 className="h-32 w-32 text-primary/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Latest Blog Posts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog">
                Read All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Code2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">{featuredProjects.length}+</CardTitle>
                <CardDescription>Featured Projects</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">{featuredPosts.length}+</CardTitle>
                <CardDescription>Blog Articles</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">5+</CardTitle>
                <CardDescription>Years Experience</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass text-center p-12">
            <CardHeader>
              <CardTitle className="text-3xl lg:text-4xl font-bold mb-4">
                Let's Work Together
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                I'm always interested in new opportunities and exciting projects. 
                Let's discuss how we can bring your ideas to life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href={`mailto:${profile?.email || 'contact@example.com'}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">
                    Learn More About Me
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Home

