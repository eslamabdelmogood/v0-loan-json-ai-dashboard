"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { LoanOverview } from "@/components/loan-overview"
import { LoanJsonViewer } from "@/components/loan-json-viewer"
import { EventTimeline } from "@/components/event-timeline"
import { AiInsights } from "@/components/ai-insights"
import { mockLoanData } from "@/lib/mock-data"
import { UploadButtons } from "@/components/upload-buttons"
import { Toaster } from "sonner"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [loanData, setLoanData] = useState(mockLoanData)

  return (
    <div className="min-h-screen">
      <Header />
      <Toaster position="top-right" />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="ml-64 flex-1 p-8">
          <div className="container max-w-7xl">
            <div className="mb-8 p-6 bg-card rounded-xl border border-border shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Loan Document Management</h2>
              <UploadButtons onDataLoaded={setLoanData} />
            </div>

            {activeSection === "overview" && <LoanOverview data={loanData} />}
            {activeSection === "loanjson" && <LoanJsonViewer data={loanData} />}
            {activeSection === "timeline" && <EventTimeline events={loanData.timeline} />}
            {activeSection === "insights" && <AiInsights data={loanData} />}
          </div>
        </main>
      </div>
    </div>
  )
}
