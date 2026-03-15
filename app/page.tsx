import Link from "next/link"
import { ArrowRight, Zap, Target, Database, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const features = [
  {
    icon: Target,
    title: "Accurate Breed Detection",
    description:
      "Our AI model trained on thousands of images can accurately identify over 30 Indian cattle breeds with high precision.",
  },
  {
    icon: Zap,
    title: "Instant AI Analysis",
    description:
      "Get results in seconds. Simply upload an image and our advanced neural network processes it instantly.",
  },
  {
    icon: Database,
    title: "Breed Information & Milk Yield",
    description:
      "Access comprehensive breed details including origin, milk production capacity, and key characteristics.",
  },
]

const breeds = [
  { name: "Gir", origin: "Gujarat", milk: "12-15 L/day" },
  { name: "Sahiwal", origin: "Punjab", milk: "10-16 L/day" },
  { name: "Red Sindhi", origin: "Sindh", milk: "8-12 L/day" },
  { name: "Tharparkar", origin: "Rajasthan", milk: "8-10 L/day" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-20 md:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  AI-Powered Detection
                </div>

                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  AI-Based Indian Cattle Breed Detection
                </h1>

                <p className="max-w-lg text-lg text-muted-foreground">
                  Helping dairy farmers identify cattle breeds instantly using advanced artificial intelligence. 
                  Upload an image and get accurate breed information in seconds.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/detect" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/breeds" className="gap-2">
                      Explore Breeds
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
                  <div className="absolute inset-4 flex items-center justify-center rounded-2xl border border-border bg-card shadow-2xl">
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <div className="rounded-full bg-primary/10 p-6">
                        <svg viewBox="0 0 100 100" className="h-24 w-24 text-primary" fill="currentColor">
                          <ellipse cx="50" cy="45" rx="35" ry="30" opacity="0.3" />
                          <ellipse cx="50" cy="50" rx="28" ry="24" />
                          <circle cx="38" cy="45" r="4" fill="white" />
                          <circle cx="62" cy="45" r="4" fill="white" />
                          <ellipse cx="50" cy="58" rx="8" ry="5" fill="white" opacity="0.8" />
                          <ellipse cx="25" cy="30" rx="8" ry="12" transform="rotate(-20 25 30)" opacity="0.6" />
                          <ellipse cx="75" cy="30" rx="8" ry="12" transform="rotate(20 75 30)" opacity="0.6" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Upload an image to detect the breed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Powerful Features for Dairy Farmers
              </h2>
              <p className="text-muted-foreground">
                Our AI system is designed specifically for Indian cattle breeds, providing accurate 
                detection and valuable insights for dairy farming.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Breeds Preview */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Popular Indian Cattle Breeds
              </h2>
              <p className="text-muted-foreground">
                Explore some of the most renowned Indian cattle breeds known for their milk production 
                and adaptability to local conditions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {breeds.map((breed) => (
                <Card
                  key={breed.name}
                  className="group cursor-pointer border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg viewBox="0 0 50 50" className="h-10 w-10" fill="currentColor">
                        <circle cx="25" cy="28" r="15" opacity="0.8" />
                        <circle cx="19" cy="25" r="2" fill="white" />
                        <circle cx="31" cy="25" r="2" fill="white" />
                        <ellipse cx="25" cy="33" rx="4" ry="3" fill="white" opacity="0.8" />
                        <ellipse cx="12" cy="18" rx="4" ry="7" transform="rotate(-25 12 18)" opacity="0.5" />
                        <ellipse cx="38" cy="18" rx="4" ry="7" transform="rotate(25 38 18)" opacity="0.5" />
                      </svg>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{breed.name}</h3>
                    <p className="text-sm text-muted-foreground">Origin: {breed.origin}</p>
                    <p className="mt-2 text-sm font-medium text-primary">Milk: {breed.milk}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/breeds" className="gap-2">
                  View All Breeds
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center md:px-16">
              <div className="absolute inset-0 -z-10">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              </div>

              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Ready to Identify Your Cattle Breed?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
                Upload an image of your cattle and let our AI identify the breed instantly. 
                Get detailed information about milk yield, characteristics, and more.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/detect" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Start Detection Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
