import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Clock, PlayCircle, ExternalLink } from 'lucide-react'
import { LearningProgress } from '@/lib/supabase'

interface ProgressCardProps {
  progress: LearningProgress
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-primary" />
      case 'planned':
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_progress':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'planned':
        return 'bg-muted text-muted-foreground border-border'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="group hover-lift transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center space-x-2">
              {getStatusIcon(progress.status)}
              <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                {progress.title}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {progress.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getStatusColor(progress.status)}`}>
                {progress.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {progress.description && (
          <CardDescription className="text-muted-foreground">
            {progress.description}
          </CardDescription>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress.progress_percentage}%</span>
          </div>
          <Progress value={progress.progress_percentage} className="h-2" />
        </div>

        {/* Notes */}
        {progress.notes && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Notes</h4>
            <p className="text-sm text-muted-foreground">{progress.notes}</p>
          </div>
        )}

        {/* Resources */}
        {progress.resources.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Resources</h4>
            <div className="space-y-1">
              {progress.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-primary hover:text-accent transition-colors duration-300"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="truncate">{resource}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Date */}
        <div className="text-xs text-muted-foreground">
          Started: {formatDate(progress.created_at)}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressCard

