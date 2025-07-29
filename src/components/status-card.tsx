'use client'

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

interface StatusCardProps {
  stats: { icon: string; title: string; value: number }[];
}

export default function StatusCard({ stats }: StatusCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="rounded-[20px] hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={stat.icon}
                width={64}
                height={64}
                alt={`${stat.title} icon`}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}