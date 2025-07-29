import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Star } from 'lucide-react'
import { BlogPost } from '@/lib/supabase'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
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

  return (
    <Card className={`group hover-lift transition-all duration-300 ${featured ? 'ring-2 ring-primary/50' : ''}`}>
      {post.image_url && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={post.image_url}
            alt={post.title}
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
        <div className="space-y-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            <Link to={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{estimateReadTime(post.content)} min read</span>
            </div>
          </div>
          
          <CardDescription className="text-muted-foreground line-clamp-3">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-accent transition-colors duration-300 font-medium"
        >
          Read more →
        </Link>
      </CardContent>
    </Card>
  )
}

export default BlogCard

