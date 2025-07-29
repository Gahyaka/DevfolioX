import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Star } from 'lucide-react'
import { Project } from '@/lib/supabase'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <Card className={`group hover-lift transition-all duration-300 ${featured ? 'ring-2 ring-primary/50' : ''}`}>
      {project.image_url && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
              {project.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {project.github_url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            </Button>
          )}
          
          {project.live_url && (
            <Button
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard

