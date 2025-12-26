"use client"
import { FileJson, Clock, Sparkles, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "loanjson", label: "LoanJSON Viewer", icon: FileJson },
    { id: "timeline", label: "Event Timeline", icon: Clock },
    { id: "insights", label: "AI Insights", icon: Sparkles },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card">
      <nav className="flex flex-col gap-1 p-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-muted/30 p-4">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Demo Mode</p>
          <p>Using sample LoanJSON data</p>
        </div>
      </div>
    </aside>
  )
}
