import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Users, Lightbulb, Shield, Zap, ArrowRight } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Lead AI Researcher",
    description: "PhD in Computer Vision with 10+ years experience in agricultural AI systems."
  },
  {
    name: "Priya Sharma",
    role: "Veterinary Consultant",
    description: "Expert veterinarian specializing in indigenous Indian cattle breeds."
  },
  {
    name: "Amit Patel",
    role: "Agricultural Scientist",
    description: "Former ICAR researcher with expertise in dairy farming practices."
  },
  {
    name: "Sneha Reddy",
    role: "Product Designer",
    description: "UX specialist focused on creating accessible tools for rural communities."
  }
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Empowering Indian dairy farmers with accessible AI technology to preserve and promote indigenous cattle breeds."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously improving our AI models to provide accurate and reliable breed detection results."
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building tools that serve the real needs of farmers and agricultural communities across India."
  },
  {
    icon: Shield,
    title: "Trust & Accuracy",
    description: "Committed to providing scientifically validated information about cattle breeds and their care."
  }
]

const stats = [
  { value: "50+", label: "Cattle Breeds" },
  { value: "95%", label: "Detection Accuracy" },
  { value: "10,000+", label: "Farmers Helped" },
  { value: "25+", label: "States Covered" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              About CattleAI
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              We are dedicated to preserving India&apos;s rich heritage of indigenous cattle breeds through cutting-edge AI technology, making breed identification accessible to every farmer.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize access to cattle breed identification technology, enabling Indian dairy farmers to make informed decisions about breeding, healthcare, and farm management. We believe that preserving indigenous breeds is crucial for sustainable agriculture and maintaining biodiversity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A future where every Indian farmer has access to AI-powered tools that help them understand, protect, and optimize their cattle herds. We envision technology bridging the gap between traditional knowledge and modern science for better agricultural outcomes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at CattleAI
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Powered by Advanced AI
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our cattle breed detection system uses state-of-the-art deep learning models trained on thousands of images of indigenous Indian cattle breeds. The AI has been developed in collaboration with veterinary experts and agricultural scientists to ensure accuracy and reliability.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Real-time Detection</p>
                      <p className="text-sm text-muted-foreground">Get instant breed identification results in seconds</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Scientifically Validated</p>
                      <p className="text-sm text-muted-foreground">Models verified by veterinary experts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Farmer-Friendly Design</p>
                      <p className="text-sm text-muted-foreground">Simple interface designed for ease of use</p>
                    </div>
                  </li>
                </ul>
              </div>
              <Card className="bg-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">How Our AI Works</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <p className="font-medium">Image Upload</p>
                        <p className="text-sm text-muted-foreground">Upload a clear photo of your cattle</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <p className="font-medium">Feature Extraction</p>
                        <p className="text-sm text-muted-foreground">AI analyzes physical characteristics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <p className="font-medium">Pattern Matching</p>
                        <p className="text-sm text-muted-foreground">Compares with trained breed database</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <p className="font-medium">Results Delivery</p>
                        <p className="text-sm text-muted-foreground">Receive breed info with confidence score</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A dedicated team of AI researchers, veterinarians, and agricultural experts working together to serve Indian farmers
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <Card key={member.name}>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Identify Your Cattle Breed?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Try our AI-powered detection tool and learn more about your indigenous Indian cattle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/detect">
                  Start Detection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/breeds">
                  Browse Breeds
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
