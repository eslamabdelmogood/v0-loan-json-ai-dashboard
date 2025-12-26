"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, AlertTriangle, TrendingUp, FileText, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface AiInsightsProps {
  data: any
}

export function AiInsights({ data }: AiInsightsProps) {
  const [loading, setLoading] = useState(false)
  const [activeInsight, setActiveInsight] = useState<string | null>(null)
  const [insightData, setInsightData] = useState<any>(null)

  const generateInsight = async (type: string) => {
    setLoading(true)
    setActiveInsight(type)

    try {
      const response = await fetch("/api/generate-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanData: data, insightType: type }),
      })

      const result = await response.json()
      setInsightData(result)
    } catch (error) {
      console.error("Error generating insight:", error)
      setInsightData({
        error: "Failed to generate insight. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">AI Insights</h2>
        <p className="text-muted-foreground mt-1">Powered by Google Gemini AI for banking professionals</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          size="lg"
          variant={activeInsight === "explain" ? "default" : "outline"}
          className="h-auto flex-col gap-3 py-6"
          onClick={() => generateInsight("explain")}
          disabled={loading}
        >
          <FileText className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Explain Loan</p>
            <p className="text-xs text-muted-foreground font-normal">Get comprehensive loan explanation</p>
          </div>
        </Button>

        <Button
          size="lg"
          variant={activeInsight === "risk" ? "default" : "outline"}
          className="h-auto flex-col gap-3 py-6"
          onClick={() => generateInsight("risk")}
          disabled={loading}
        >
          <AlertTriangle className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">Risk Summary</p>
            <p className="text-xs text-muted-foreground font-normal">Analyze risks and mitigation strategies</p>
          </div>
        </Button>

        <Button
          size="lg"
          variant={activeInsight === "esg" ? "default" : "outline"}
          className="h-auto flex-col gap-3 py-6"
          onClick={() => generateInsight("esg")}
          disabled={loading}
        >
          <TrendingUp className="h-6 w-6" />
          <div className="text-center">
            <p className="font-semibold">ESG Impact</p>
            <p className="text-xs text-muted-foreground font-normal">Evaluate ESG considerations</p>
          </div>
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing loan data with AI...</p>
          </div>
        </Card>
      )}

      {/* Insight Display */}
      {!loading && insightData && !insightData.error && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{insightData.title}</h3>
                <Badge variant="secondary">AI Generated</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{insightData.subtitle}</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="space-y-4 text-foreground">
              {insightData.sections?.map((section: any, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold text-foreground mb-2">{section.heading}</h4>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          {insightData.recommendations && (
            <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">Strategic Recommendations</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {insightData.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex gap-2 leading-relaxed">
                    <span className="text-primary font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {/* Error State */}
      {!loading && insightData?.error && (
        <Card className="p-6 border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium text-destructive">{insightData.error}</p>
          </div>
        </Card>
      )}

      {/* Info Card */}
      {!activeInsight && !loading && (
        <Card className="p-6 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">AI-Powered Banking Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI assistant uses Google Gemini to provide conservative, regulator-friendly analysis of loan data.
                Select an insight type above to receive clear, non-technical explanations suitable for compliance
                reporting and risk assessment. All analysis is based on the standardized LoanJSON format.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
