"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Info, Milk, MapPin, Thermometer, Scale } from "lucide-react"

// Mock breed detection results
const mockResults = {
  primaryBreed: {
    name: "Gir",
    confidence: 94,
    origin: "Gujarat, India",
    characteristics: [
      "Distinctive curved horns",
      "Red to spotted white coat",
      "Large pendulous ears",
      "Prominent forehead"
    ],
    milkYield: "12-15 liters/day",
    temperament: "Docile and calm",
    weight: "385-545 kg",
    heatTolerance: "Excellent",
    description: "The Gir cattle breed is one of the principal Zebu breeds originating in India. Known for their distinctive appearance and excellent milk production, they are highly valued by dairy farmers across India and have been exported to many countries for dairy development programs."
  },
  alternativeBreeds: [
    { name: "Sahiwal", confidence: 4 },
    { name: "Red Sindhi", confidence: 2 }
  ]
}

export default function ResultsPage() {
  const router = useRouter()
  const [cattleImage, setCattleImage] = useState<string | null>(null)

  useEffect(() => {
    const storedImage = sessionStorage.getItem("cattleImage")
    if (storedImage) {
      setCattleImage(storedImage)
    }
  }, [])

  const result = mockResults

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/detect")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Analyze Another Image
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Image and Detection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Detection Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cattleImage ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                      <Image
                        src={cattleImage}
                        alt="Analyzed cattle"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4">
                      <p className="text-muted-foreground">No image available</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Identified Breed</p>
                      <p className="text-2xl font-bold text-foreground">{result.primaryBreed.name}</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary/10 text-primary">
                      {result.primaryBreed.confidence}% Match
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confidence Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{result.primaryBreed.name}</span>
                      <span className="text-primary font-semibold">{result.primaryBreed.confidence}%</span>
                    </div>
                    <Progress value={result.primaryBreed.confidence} className="h-3" />
                  </div>
                  
                  {result.alternativeBreeds.map((breed) => (
                    <div key={breed.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">{breed.name}</span>
                        <span className="text-muted-foreground">{breed.confidence}%</span>
                      </div>
                      <Progress value={breed.confidence} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Breed Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Breed Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {result.primaryBreed.description}
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Origin</p>
                        <p className="font-medium">{result.primaryBreed.origin}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Milk className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Milk Yield</p>
                        <p className="font-medium">{result.primaryBreed.milkYield}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Scale className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Weight Range</p>
                        <p className="font-medium">{result.primaryBreed.weight}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Thermometer className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Heat Tolerance</p>
                        <p className="font-medium">{result.primaryBreed.heatTolerance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Characteristics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.primaryBreed.characteristics.map((char, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Want to learn more about {result.primaryBreed.name} cattle?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our comprehensive breed information database for detailed care guidelines and farming tips.
                  </p>
                  <Button asChild>
                    <Link href="/breeds">
                      View All Breeds
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
