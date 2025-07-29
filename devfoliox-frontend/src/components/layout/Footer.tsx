import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@example.com', color: 'hover:text-primary' },
  ]

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Learning', path: '/learning' },
    { name: 'About', path: '/about' },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">DevfolioX</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              A modern developer portfolio showcasing projects, blog posts, and learning journey. 
              Built with React, TypeScript, and Supabase.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground transition-colors duration-300 ${link.color}`}
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Interested in collaborating or have a project in mind?
              </p>
              <a
                href="mailto:contact@example.com"
                className="inline-flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>contact@example.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} DevfolioX. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-accent fill-current" />
              <span>using React & TypeScript</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

