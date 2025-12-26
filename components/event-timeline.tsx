import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, CheckCircle2, DollarSign, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  date: string
  event: string
  description: string
  type: string
}

interface EventTimelineProps {
  events: Event[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "origination":
        return FileText
      case "breach":
        return AlertTriangle
      case "review":
        return CheckCircle2
      case "payment":
        return DollarSign
      case "amendment":
        return RefreshCw
      default:
        return FileText
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "origination":
        return "border-primary bg-primary/5"
      case "breach":
        return "border-destructive bg-destructive/5"
      case "review":
        return "border-success bg-success/5"
      case "payment":
        return "border-primary bg-primary/5"
      case "amendment":
        return "border-warning bg-warning/5"
      default:
        return "border-border bg-card"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "origination":
        return "text-primary"
      case "breach":
        return "text-destructive"
      case "review":
        return "text-success"
      case "payment":
        return "text-primary"
      case "amendment":
        return "text-warning"
      default:
        return "text-muted-foreground"
    }
  }

  const getBadgeVariant = (type: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (type) {
      case "breach":
        return "destructive"
      case "review":
      case "payment":
        return "default"
      default:
        return "secondary"
    }
  }

  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">Event Timeline</h2>
        <p className="text-muted-foreground mt-1">Complete history of loan activity from origination to present</p>
      </div>

      <Card className="p-6">
        <div className="relative space-y-6">
          {sortedEvents.map((event, index) => {
            const Icon = getEventIcon(event.type)
            const isLast = index === sortedEvents.length - 1

            return (
              <div key={index} className="relative flex gap-4">
                {/* Timeline connector */}
                {!isLast && <div className="absolute left-6 top-12 h-full w-px bg-border" />}

                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2",
                    getEventColor(event.type),
                  )}
                >
                  <Icon className={cn("h-5 w-5", getIconColor(event.type))} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{event.event}</h3>
                        <Badge variant={getBadgeVariant(event.type)} className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Events</p>
          <p className="text-2xl font-bold">{events.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Days Since Origin</p>
          <p className="text-2xl font-bold">
            {Math.floor(
              (new Date().getTime() - new Date(events.find((e) => e.type === "origination")?.date || "").getTime()) /
                (1000 * 60 * 60 * 24),
            )}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Amendments</p>
          <p className="text-2xl font-bold">{events.filter((e) => e.type === "amendment").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Breaches</p>
          <p className="text-2xl font-bold text-destructive">{events.filter((e) => e.type === "breach").length}</p>
        </Card>
      </div>
    </div>
  )
}
