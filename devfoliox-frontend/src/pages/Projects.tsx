import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ProjectCard from '@/components/ui/ProjectCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Search, Filter, Github, ExternalLink } from 'lucide-react'
import { projectsApi } from '@/lib/api'
import { Project } from '@/lib/supabase'

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState<string>('')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectsApi.getAll()
        setProjects(data)
        setFilteredProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech_stack.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by selected technology
    if (selectedTech) {
      filtered = filtered.filter(project =>
        project.tech_stack.includes(selectedTech)
      )
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedTech])

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.tech_stack))
  ).sort()

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've worked on, showcasing different technologies and approaches to problem-solving.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedTech('')
              }}
              className="md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Technology Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Filter by Technology:</h3>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <Badge
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedTech(selectedTech === tech ? '' : tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
            {searchTerm && ` for "${searchTerm}"`}
            {selectedTech && ` using ${selectedTech}`}
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="mr-2">⭐</span>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h2 className="text-2xl font-bold mb-8">All Projects</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-semibold">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTech('')
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-20 text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub profile for more projects and contributions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:contact@example.com">
                  Discuss a Project
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects

