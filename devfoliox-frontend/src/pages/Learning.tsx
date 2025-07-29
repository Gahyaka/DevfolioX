import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import ProgressCard from '@/components/ui/ProgressCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { CheckCircle, Clock, PlayCircle, TrendingUp, BookOpen, Target } from 'lucide-react'
import { learningApi } from '@/lib/api'
import { LearningProgress } from '@/lib/supabase'

const Learning: React.FC = () => {
  const [learningItems, setLearningItems] = useState<LearningProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const loadLearningProgress = async () => {
      try {
        const data = await learningApi.getAll()
        setLearningItems(data)
      } catch (error) {
        console.error('Error loading learning progress:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLearningProgress()
  }, [])

  // Filter items based on selected status and category
  const filteredItems = learningItems.filter(item => {
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    return statusMatch && categoryMatch
  })

  // Get unique categories
  const categories = Array.from(new Set(learningItems.map(item => item.category))).sort()

  // Calculate statistics
  const stats = {
    total: learningItems.length,
    completed: learningItems.filter(item => item.status === 'completed').length,
    inProgress: learningItems.filter(item => item.status === 'in_progress').length,
    planned: learningItems.filter(item => item.status === 'planned').length,
    averageProgress: Math.round(
      learningItems.reduce((acc, item) => acc + item.progress_percentage, 0) / learningItems.length
    ) || 0
  }

  const statusOptions = [
    { value: 'all', label: 'All', icon: BookOpen, count: stats.total },
    { value: 'completed', label: 'Completed', icon: CheckCircle, count: stats.completed },
    { value: 'in_progress', label: 'In Progress', icon: PlayCircle, count: stats.inProgress },
    { value: 'planned', label: 'Planned', icon: Clock, count: stats.planned }
  ]

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
          <h1 className="text-4xl lg:text-5xl font-bold">Learning Journey</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My continuous learning path in technology, tracking progress and sharing insights along the way.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg border">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Topics</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <PlayCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <Target className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">{stats.averageProgress}%</div>
            <div className="text-sm text-muted-foreground">Avg. Progress</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-12 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Overall Learning Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              <span>{Math.round((stats.completed / stats.total) * 100) || 0}%</span>
            </div>
            <Progress value={(stats.completed / stats.total) * 100} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-500 font-medium">{stats.completed}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-medium">{stats.inProgress}</div>
                <div className="text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground font-medium">{stats.planned}</div>
                <div className="text-muted-foreground">Planned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Status Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Filter by Status:</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={selectedStatus === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(option.value)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                    <Badge variant="secondary" className="ml-1">
                      {option.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === 'all' ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} of {learningItems.length} learning topics
            {selectedStatus !== 'all' && ` with status "${selectedStatus}"`}
            {selectedCategory !== 'all' && ` in category "${selectedCategory}"`}
          </p>
        </div>

        {/* Learning Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <ProgressCard key={item.id} progress={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl">📚</div>
              <h3 className="text-xl font-semibold">No learning topics found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more learning topics.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedStatus('all')
                  setSelectedCategory('all')
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Learning Philosophy */}
        <div className="mt-20 text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">My Learning Philosophy</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I believe in continuous learning and staying updated with the latest technologies. 
              This page tracks my learning journey, from planned topics to completed courses and projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">📋 Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Identify learning goals and create structured learning paths.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🚀 Execute</h4>
                <p className="text-sm text-muted-foreground">
                  Actively engage with materials, build projects, and practice.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">📝 Share</h4>
                <p className="text-sm text-muted-foreground">
                  Document learnings and share insights through blog posts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Learning

