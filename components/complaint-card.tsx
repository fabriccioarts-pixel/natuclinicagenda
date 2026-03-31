"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface ComplaintCardProps {
  complaint: {
    id: string
    label: string
    icon: string
  }
  isSelected: boolean
  onClick: () => void
}

export function ComplaintCard({ complaint, isSelected, onClick }: ComplaintCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`relative p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
          : "bg-card border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{complaint.icon}</div>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{complaint.label}</p>
        </div>
        {isSelected && (
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>

      {isSelected && <div className="mt-3 text-xs text-muted-foreground italic">anotando...</div>}
    </Card>
  )
}
