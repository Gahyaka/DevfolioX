import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BlogCard from '@/components/ui/BlogCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Search, Filter, Calendar, Clock } from 'lucide-react'
import { blogApi } from '@/lib/api'
import { BlogPost } from '@/lib/supabase'

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await blogApi.getAll()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags.includes(selectedTag)
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

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
          <h1 className="text-4xl lg:text-5xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, and my learning journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Total Articles</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-primary">{allTags.length}</div>
            <div className="text-sm text-muted-foreground">Topics Covered</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-primary">
              {Math.round(posts.reduce((acc, post) => acc + estimateReadTime(post.content), 0) / posts.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Read Time (min)</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedTag('')
              }}
              className="md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Tag Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Filter by Topic:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length} articles
            {searchTerm && ` for "${searchTerm}"`}
            {selectedTag && ` tagged with ${selectedTag}`}
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="mr-2">⭐</span>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            {featuredPosts.length > 0 && (
              <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="text-6xl">📝</div>
              <h3 className="text-xl font-semibold">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('')
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get notified when I publish new articles about web development and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

