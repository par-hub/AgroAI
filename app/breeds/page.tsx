"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Milk, ArrowRight } from "lucide-react"

const breeds = [
  {
    id: "gir",
    name: "Gir",
    origin: "Gujarat",
    type: "Dairy",
    milkYield: "12-15 L/day",
    description: "One of the principal Zebu breeds, known for distinctive curved horns and excellent milk production.",
    characteristics: ["Curved horns", "Red/spotted coat", "High milk fat"]
  },
  {
    id: "sahiwal",
    name: "Sahiwal",
    origin: "Punjab",
    type: "Dairy",
    milkYield: "10-16 L/day",
    description: "Heavy milk producers with excellent heat tolerance, originally from Montgomery region.",
    characteristics: ["Reddish brown", "Loose skin", "Docile nature"]
  },
  {
    id: "red-sindhi",
    name: "Red Sindhi",
    origin: "Sindh",
    type: "Dairy",
    milkYield: "8-12 L/day",
    description: "Deep red colored breed known for disease resistance and adaptability to hot climates.",
    characteristics: ["Deep red color", "Heat tolerant", "Disease resistant"]
  },
  {
    id: "tharparkar",
    name: "Tharparkar",
    origin: "Rajasthan",
    type: "Dual Purpose",
    milkYield: "8-10 L/day",
    description: "Dual-purpose breed from the Thar desert, known for drought resistance and good milk yield.",
    characteristics: ["White/grey color", "Drought resistant", "Strong build"]
  },
  {
    id: "kankrej",
    name: "Kankrej",
    origin: "Gujarat",
    type: "Dual Purpose",
    milkYield: "5-8 L/day",
    description: "Powerful draft breed also used for milk, known for distinctive lyre-shaped horns.",
    characteristics: ["Lyre-shaped horns", "Silver-grey coat", "Strong muscles"]
  },
  {
    id: "ongole",
    name: "Ongole",
    origin: "Andhra Pradesh",
    type: "Draft",
    milkYield: "3-5 L/day",
    description: "Large muscular breed primarily used for draft purposes, exported worldwide for crossbreeding.",
    characteristics: ["White color", "Muscular build", "Long body"]
  },
  {
    id: "hariana",
    name: "Hariana",
    origin: "Haryana",
    type: "Dual Purpose",
    milkYield: "4-6 L/day",
    description: "Hardy dual-purpose breed known for good working ability and reasonable milk production.",
    characteristics: ["White color", "Active gait", "Hardy nature"]
  },
  {
    id: "deoni",
    name: "Deoni",
    origin: "Maharashtra",
    type: "Dual Purpose",
    milkYield: "4-7 L/day",
    description: "Spotted breed from Maharashtra-Karnataka border, valued for both milk and draft work.",
    characteristics: ["Black & white spots", "Medium size", "Good milkers"]
  },
  {
    id: "rathi",
    name: "Rathi",
    origin: "Rajasthan",
    type: "Dairy",
    milkYield: "6-8 L/day",
    description: "Brown colored dairy breed from Bikaner region, well adapted to arid conditions.",
    characteristics: ["Brown color", "Desert adapted", "Good milk yield"]
  }
]

const typeColors = {
  "Dairy": "bg-primary/10 text-primary",
  "Draft": "bg-accent/20 text-accent-foreground",
  "Dual Purpose": "bg-muted text-muted-foreground"
}

export default function BreedsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         breed.origin.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || breed.type === selectedType
    return matchesSearch && matchesType
  })

  const types = ["Dairy", "Dual Purpose", "Draft"]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
              Indian Cattle Breeds
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Explore our comprehensive database of indigenous Indian cattle breeds
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search breeds by name or origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                onClick={() => setSelectedType(null)}
                size="sm"
              >
                All
              </Button>
              {types.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Breeds Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBreeds.map((breed) => (
              <Card key={breed.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{breed.name}</CardTitle>
                    <Badge className={typeColors[breed.type as keyof typeof typeColors]}>
                      {breed.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {breed.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{breed.origin}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Milk className="w-4 h-4 text-primary" />
                      <span>{breed.milkYield}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {breed.characteristics.map((char, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/breeds/${breed.id}`}>
                    <Button variant="ghost" className="w-full mt-2 group-hover:bg-primary/5">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBreeds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No breeds found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType(null)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
