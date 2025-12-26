"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { LoanOverview } from "@/components/loan-overview"
import { LoanJsonViewer } from "@/components/loan-json-viewer"
import { EventTimeline } from "@/components/event-timeline"
import { AiInsights } from "@/components/ai-insights"
import { mockLoanData } from "@/lib/mock-data"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="ml-64 flex-1 p-8">
          <div className="container max-w-7xl">
            {activeSection === "overview" && <LoanOverview data={mockLoanData} />}
            {activeSection === "loanjson" && <LoanJsonViewer data={mockLoanData} />}
            {activeSection === "timeline" && <EventTimeline events={mockLoanData.timeline} />}
            {activeSection === "insights" && <AiInsights data={mockLoanData} />}
          </div>
        </main>
      </div>
    </div>
  )
}
