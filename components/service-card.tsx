"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

type Service = {
  id: string
  title: string
  description: string
  image: string
  complaint: string
}

interface ServiceCardProps {
  service: Service
  isRecommended: boolean
  delay?: number
}

export function ServiceCard({ service, isRecommended, delay = 0 }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Card
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 border-0 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {isRecommended && (
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Indicado para você
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <h3 className="text-2xl font-serif text-balance leading-tight">{service.title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{service.description}</p>
        </div>
      </div>
    </Card>
  )
}
