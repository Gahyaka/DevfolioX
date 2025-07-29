import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Calendar,
  Code2,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  Music,
  Camera
} from 'lucide-react'
import { profileApi } from '@/lib/api'
import { Profile } from '@/lib/supabase'

const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileApi.get()
        setProfile(data)
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Mock data for demonstration
  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies.'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      description: 'Built responsive user interfaces and improved user experience for web applications.'
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019',
      description: 'Focused on software engineering, algorithms, and web development.'
    }
  ]

  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Vue.js', level: 75 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 }
      ]
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'GraphQL', level: 70 }
      ]
    }
  ]

  const interests = [
    { name: 'Open Source', icon: Code2, description: 'Contributing to open source projects' },
    { name: 'Photography', icon: Camera, description: 'Capturing moments and landscapes' },
    { name: 'Music', icon: Music, description: 'Playing guitar and discovering new artists' },
    { name: 'Coffee', icon: Coffee, description: 'Exploring different brewing methods' }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives my passion for development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Code2 className="h-16 w-16 text-primary/50" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">{profile?.name || 'John Doe'}</CardTitle>
                <CardDescription className="text-lg">{profile?.title || 'Full Stack Developer'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile?.location || 'San Francisco, CA'}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{profile?.email || 'contact@example.com'}</span>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile?.social_links?.github || '#'} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile?.social_links?.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={profile?.social_links?.twitter || '#'} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                {/* Resume Download */}
                <Button className="w-full" asChild>
                  <a href={profile?.resume_url || '#'} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Skills Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile?.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']).map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <section>
              <h2 className="text-2xl font-bold mb-6">My Story</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.bio || `I'm a passionate full-stack developer with over 5 years of experience building web applications. 
                  My journey started with a curiosity about how websites work, which led me to dive deep into both 
                  frontend and backend technologies.`}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I love creating solutions that not only work well but also provide great user experiences. 
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                  or sharing my knowledge through blog posts and mentoring.
                </p>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="mr-2 h-6 w-6" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          <CardDescription className="text-primary">{exp.company}</CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{edu.degree}</CardTitle>
                          <CardDescription className="text-primary">{edu.school}</CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Detailed Skills */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category) => (
                  <Card key={category.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="mr-2 h-6 w-6" />
                Interests & Hobbies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interests.map((interest) => {
                  const Icon = interest.icon
                  return (
                    <Card key={interest.name} className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/20 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{interest.name}</h3>
                            <p className="text-sm text-muted-foreground">{interest.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="glass p-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-4">Let's Connect</CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href={`mailto:${profile?.email || 'contact@example.com'}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send me an email
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={profile?.social_links?.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About

