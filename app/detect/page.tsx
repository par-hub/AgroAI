"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Camera, X, Loader2, ImageIcon } from "lucide-react"

export default function DetectPage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      processFile(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setSelectedFile(null)
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    
    setIsAnalyzing(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Store the image in sessionStorage for results page
    sessionStorage.setItem("cattleImage", selectedImage)
    
    // Navigate to results with mock data
    router.push("/results")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
              Cattle Breed Detection
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Upload an image of your cattle and our AI will identify the breed instantly
            </p>
          </div>

          <Card className="border-2 border-dashed border-border overflow-hidden">
            <CardContent className="p-0">
              {!selectedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-12 text-center transition-colors duration-200 ${
                    isDragging 
                      ? "bg-primary/5 border-primary" 
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Drag and drop your image here
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        or click the buttons below to select an image
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button asChild variant="default" size="lg" className="cursor-pointer">
                          <span>
                            <ImageIcon className="w-5 h-5 mr-2" />
                            Upload Image
                          </span>
                        </Button>
                      </label>
                      
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button asChild variant="outline" size="lg" className="cursor-pointer">
                          <span>
                            <Camera className="w-5 h-5 mr-2" />
                            Take Photo
                          </span>
                        </Button>
                      </label>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Supported formats: JPG, PNG, WebP (Max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="relative aspect-video max-h-96 mx-auto mb-6 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={selectedImage}
                      alt="Selected cattle image"
                      fill
                      className="object-contain"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-3 right-3 p-2 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {selectedFile && (
                    <p className="text-center text-muted-foreground mb-6">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      size="lg"
                      className="min-w-48"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Detect Breed
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={clearImage}
                      variant="outline"
                      size="lg"
                      disabled={isAnalyzing}
                    >
                      Choose Different Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Upload Image</h3>
                <p className="text-sm text-muted-foreground">
                  Take a clear photo of your cattle or upload an existing image
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI model analyzes the image to identify the breed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  View detailed breed information and characteristics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
