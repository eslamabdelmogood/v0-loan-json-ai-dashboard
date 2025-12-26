import { FileJson } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <FileJson className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-tight tracking-tight">LoanJSON AI</h1>
            <p className="text-xs text-muted-foreground">Loan Market Association Edge Hackathon</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium">System Active</span>
          </div>
        </div>
      </div>
    </header>
  )
}
