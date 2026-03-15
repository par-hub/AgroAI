import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Milk, Scale, Thermometer, Heart, Activity } from "lucide-react"

const breedsData: Record<string, {
  name: string
  origin: string
  type: string
  milkYield: string
  weight: string
  heatTolerance: string
  temperament: string
  lifespan: string
  description: string
  history: string
  characteristics: string[]
  careGuidelines: string[]
  dietRecommendations: string[]
}> = {
  gir: {
    name: "Gir",
    origin: "Gujarat, India",
    type: "Dairy",
    milkYield: "12-15 liters/day",
    weight: "385-545 kg",
    heatTolerance: "Excellent",
    temperament: "Docile and calm",
    lifespan: "12-15 years",
    description: "The Gir cattle breed is one of the principal Zebu breeds originating in India. Known for their distinctive appearance and excellent milk production, they are highly valued by dairy farmers across India and have been exported to many countries for dairy development programs.",
    history: "Originating from the Gir forest region and surrounding districts in Gujarat, this breed has been developed over centuries by local farmers. The Gir breed has been exported to Brazil where it became the foundation of the Guzerat breed.",
    characteristics: [
      "Distinctive curved horns that spiral outward and backward",
      "Red to spotted white coat with glossy hair",
      "Large pendulous ears that fold like a leaf",
      "Prominent forehead with convex profile",
      "Well-developed dewlap and hump"
    ],
    careGuidelines: [
      "Provide adequate shade and ventilation in hot weather",
      "Regular health check-ups every 3-6 months",
      "Maintain clean and dry housing conditions",
      "Regular grooming to maintain coat health",
      "Ensure proper vaccination schedule is followed"
    ],
    dietRecommendations: [
      "High-quality green fodder (40-50 kg/day)",
      "Concentrate feed based on milk production",
      "Mineral mixture supplementation",
      "Clean drinking water ad libitum",
      "Dry fodder during lean seasons"
    ]
  },
  sahiwal: {
    name: "Sahiwal",
    origin: "Punjab, India/Pakistan",
    type: "Dairy",
    milkYield: "10-16 liters/day",
    weight: "350-500 kg",
    heatTolerance: "Excellent",
    temperament: "Very docile",
    lifespan: "12-15 years",
    description: "Sahiwal is one of the best dairy breeds of zebu cattle. It originated from the Sahiwal district of Punjab. The breed is known for its high milk production, heat tolerance, and tick resistance.",
    history: "The breed takes its name from Sahiwal district in Punjab. It was extensively used for milk production in colonial times and has been exported to many countries including Australia, Africa, and the Caribbean.",
    characteristics: [
      "Reddish brown color with white patches",
      "Loose and thick skin with short hair",
      "Small horns and large drooping ears",
      "Well-developed udder",
      "Calm temperament suitable for machine milking"
    ],
    careGuidelines: [
      "Regular deworming schedule",
      "Mastitis prevention through proper milking hygiene",
      "Hoof trimming every 4-6 months",
      "Comfortable bedding for lying",
      "Protection from extreme weather"
    ],
    dietRecommendations: [
      "Green fodder: 35-45 kg/day",
      "Dry fodder: 5-7 kg/day",
      "Concentrate: 1 kg per 2.5 liters of milk",
      "Mineral supplementation daily",
      "Salt licks available"
    ]
  },
  "red-sindhi": {
    name: "Red Sindhi",
    origin: "Sindh Region",
    type: "Dairy",
    milkYield: "8-12 liters/day",
    weight: "300-400 kg",
    heatTolerance: "Excellent",
    temperament: "Docile",
    lifespan: "12-14 years",
    description: "Red Sindhi is one of the most popular Zebu dairy breeds. Known for its deep red color and excellent adaptability, it has been used worldwide for crossbreeding programs to improve local cattle.",
    history: "Originating from the Sindh province, this breed has been exported to over 40 countries. It is particularly valued in tropical regions for its heat and disease resistance.",
    characteristics: [
      "Uniform deep red color",
      "Compact body with well-developed udder",
      "Short horns curving upward",
      "Prominent hump in males",
      "Excellent disease resistance"
    ],
    careGuidelines: [
      "Regular vaccination against common diseases",
      "Clean water supply always available",
      "Adequate exercise space",
      "Regular health monitoring",
      "Proper breeding management"
    ],
    dietRecommendations: [
      "Mixed fodder diet",
      "Protein-rich concentrates during lactation",
      "Vitamin and mineral supplements",
      "Clean fresh water",
      "Seasonal fodder adjustments"
    ]
  },
  tharparkar: {
    name: "Tharparkar",
    origin: "Rajasthan, India",
    type: "Dual Purpose",
    milkYield: "8-10 liters/day",
    weight: "350-450 kg",
    heatTolerance: "Excellent",
    temperament: "Active",
    lifespan: "15-18 years",
    description: "Tharparkar is a dual-purpose breed from the Thar desert region. Known for its exceptional drought resistance and ability to thrive in harsh conditions while maintaining good milk production.",
    history: "Named after the Tharparkar district in Rajasthan, this breed evolved in the harsh desert environment, developing unique adaptations for survival in arid conditions.",
    characteristics: [
      "White to grey color",
      "Medium-sized lyre-shaped horns",
      "Long face with straight profile",
      "Deep body with strong legs",
      "Well-adapted to arid conditions"
    ],
    careGuidelines: [
      "Minimal water requirements but ensure quality",
      "Protection from extreme cold",
      "Regular parasite control",
      "Hoof care in rocky terrain",
      "Stress-free handling"
    ],
    dietRecommendations: [
      "Desert grasses and shrubs",
      "Drought-resistant fodder crops",
      "Mineral blocks for supplementation",
      "Concentrate during lactation",
      "Stored fodder for lean periods"
    ]
  },
  kankrej: {
    name: "Kankrej",
    origin: "Gujarat, India",
    type: "Dual Purpose",
    milkYield: "5-8 liters/day",
    weight: "450-550 kg",
    heatTolerance: "Good",
    temperament: "Active but manageable",
    lifespan: "15-20 years",
    description: "Kankrej is one of the heaviest Indian cattle breeds, primarily used for draft purposes. Despite being a draft breed, females are decent milk producers.",
    history: "Originating from the Kankrej taluka in Gujarat, this breed was developed for heavy agricultural work. It was exported to Brazil where it contributed to the Guzerat breed.",
    characteristics: [
      "Large lyre-shaped horns",
      "Silver-grey to iron-grey color",
      "Powerful muscular body",
      "Long legs with strong hooves",
      "Prominent hump in males"
    ],
    careGuidelines: [
      "Adequate space for movement",
      "Regular hoof trimming",
      "Proper nutrition for work animals",
      "Rest periods during heavy work",
      "Joint care for aging animals"
    ],
    dietRecommendations: [
      "High-energy feed for working animals",
      "Adequate roughage",
      "Calcium-rich supplements",
      "Electrolytes during hot weather",
      "Recovery nutrition after work"
    ]
  },
  ongole: {
    name: "Ongole",
    origin: "Andhra Pradesh, India",
    type: "Draft",
    milkYield: "3-5 liters/day",
    weight: "500-600 kg",
    heatTolerance: "Good",
    temperament: "Calm",
    lifespan: "15-18 years",
    description: "Ongole is a large muscular breed primarily used for draft purposes. It has been exported worldwide and has contributed to many composite breeds including the American Brahman.",
    history: "Named after the Ongole taluka in Andhra Pradesh, this breed has been exported extensively since the 1860s. It forms the backbone of several important composite breeds worldwide.",
    characteristics: [
      "Pure white color",
      "Large muscular frame",
      "Short thick horns",
      "Pendulous sheath in males",
      "Loose skin with folds"
    ],
    careGuidelines: [
      "Spacious housing for large frame",
      "Regular exercise",
      "Joint health monitoring",
      "Proper breeding management",
      "Vaccination schedule adherence"
    ],
    dietRecommendations: [
      "High-fiber roughage",
      "Moderate concentrates",
      "Bone meal supplements",
      "Adequate clean water",
      "Seasonal feeding adjustments"
    ]
  },
  hariana: {
    name: "Hariana",
    origin: "Haryana, India",
    type: "Dual Purpose",
    milkYield: "4-6 liters/day",
    weight: "350-450 kg",
    heatTolerance: "Good",
    temperament: "Active",
    lifespan: "14-16 years",
    description: "Hariana is a hardy dual-purpose breed known for its good working ability and reasonable milk production. It is well-adapted to the semi-arid conditions of northern India.",
    history: "Originating from the Rohtak, Hisar, and Gurgaon districts of Haryana, this breed has been developed for both draft and dairy purposes over centuries.",
    characteristics: [
      "White or light grey color",
      "Compact muscular body",
      "Short upward-curving horns",
      "Active and alert disposition",
      "Strong legs and hooves"
    ],
    careGuidelines: [
      "Regular health check-ups",
      "Proper housing with ventilation",
      "Exercise through work",
      "Parasite control",
      "Reproductive management"
    ],
    dietRecommendations: [
      "Balanced roughage and concentrate",
      "Green fodder when available",
      "Mineral mixture",
      "Clean drinking water",
      "Seasonal adjustments"
    ]
  },
  deoni: {
    name: "Deoni",
    origin: "Maharashtra, India",
    type: "Dual Purpose",
    milkYield: "4-7 liters/day",
    weight: "400-500 kg",
    heatTolerance: "Good",
    temperament: "Docile",
    lifespan: "14-16 years",
    description: "Deoni is a spotted dual-purpose breed from the Maharashtra-Karnataka border region. It is valued for both milk production and draft capabilities.",
    history: "The breed originated in the Bidar district and surrounding areas. It shows influence from both Gir and Dangi breeds in its ancestry.",
    characteristics: [
      "Black and white spotted coat",
      "Medium-sized frame",
      "Short thick horns",
      "Well-developed udder",
      "Moderate hump"
    ],
    careGuidelines: [
      "Regular milking schedule",
      "Clean housing",
      "Vaccination program",
      "Foot care",
      "Breeding record maintenance"
    ],
    dietRecommendations: [
      "Local fodder varieties",
      "Concentrate for milking cows",
      "Mineral supplements",
      "Fresh water always available",
      "Balanced nutrition"
    ]
  },
  rathi: {
    name: "Rathi",
    origin: "Rajasthan, India",
    type: "Dairy",
    milkYield: "6-8 liters/day",
    weight: "300-400 kg",
    heatTolerance: "Excellent",
    temperament: "Docile",
    lifespan: "12-15 years",
    description: "Rathi is a dairy breed from the Bikaner region of Rajasthan. It is well-adapted to arid conditions and provides good milk yield despite harsh environmental conditions.",
    history: "Named after the Rathi community who traditionally bred these cattle, the breed has been developed in the desert regions of Rajasthan over many generations.",
    characteristics: [
      "Brown to dark brown color",
      "Medium-sized compact body",
      "Short horns",
      "Well-developed udder",
      "Adapted to desert conditions"
    ],
    careGuidelines: [
      "Water management in arid areas",
      "Protection from sandstorms",
      "Regular health monitoring",
      "Hoof care",
      "Heat stress management"
    ],
    dietRecommendations: [
      "Desert fodder crops",
      "Concentrate supplementation",
      "Mineral blocks",
      "Clean water availability",
      "Silage for lean seasons"
    ]
  }
}

export default async function BreedDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const breed = breedsData[id]

  if (!breed) {
    notFound()
  }

  const stats = [
    { icon: MapPin, label: "Origin", value: breed.origin },
    { icon: Milk, label: "Milk Yield", value: breed.milkYield },
    { icon: Scale, label: "Weight", value: breed.weight },
    { icon: Thermometer, label: "Heat Tolerance", value: breed.heatTolerance },
    { icon: Heart, label: "Temperament", value: breed.temperament },
    { icon: Activity, label: "Lifespan", value: breed.lifespan }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/breeds">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Breeds
            </Link>
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-foreground">{breed.name}</h1>
              <Badge className="text-sm px-3 py-1">{breed.type}</Badge>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {breed.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History & Origin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{breed.history}</p>
              </CardContent>
            </Card>

            {/* Characteristics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {breed.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{char}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Care Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Care Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {breed.careGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Diet Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Diet Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {breed.dietRecommendations.map((diet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{diet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Have a {breed.name} cattle?
                </h3>
                <p className="text-muted-foreground">
                  Use our AI detection tool to verify the breed and get more insights.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/detect">Detect Breed</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
