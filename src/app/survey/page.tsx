"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Ship, Plane, Star, MessageCircle } from "lucide-react"

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    businessType: "",
    shipmentVolume: "",
    services: [] as string[],
    currentSoftware: "",
    challenges: [] as string[],
    satisfaction: "",
    feedback: "",
    recommend: "",
    npsScore: null as number | null,
    npsReason: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s !== service),
      }))
    }
  }

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        challenges: [...prev.challenges, challenge],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        challenges: prev.challenges.filter((c) => c !== challenge),
      }))
    }
  }

  const handleNPSScoreSelect = (score: number) => {
    setFormData((prev) => ({ ...prev, npsScore: score }))
  }

  const getScoreCategory = (score: number) => {
    if (score >= 9) return { label: "Promoter", color: "bg-green-100 text-green-800" }
    if (score >= 7) return { label: "Passive", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Detractor", color: "bg-red-100 text-red-800" }
  }

  const getNPSFollowUpQuestion = () => {
    if (formData.npsScore === null) return ""
    if (formData.npsScore >= 9) {
      return "What do you love most about working with NewAge Global?"
    }
    if (formData.npsScore >= 7) {
      return "What would make your experience with NewAge Global even better?"
    }
    return "We'd like to understand your concerns. What specific areas can we improve?"
  }

  const handleSubmit = () => {
    console.log("Survey submitted:", formData)
    alert("Thank you for your comprehensive feedback! Our team will reach out to you soon with tailored solutions for your freight forwarding needs.")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Optimize Your Freight Operations</h1>
          <p className="text-sm text-muted-foreground">
            Help us understand your logistics needs. Share your insights to receive personalized recommendations for streamlining your freight forwarding operations.
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 py-4">
        <Progress value={progress} className="h-2" />
        <div className="text-sm text-muted-foreground text-end mt-2">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <Card className="shadow-lg">
          {/* Step 1 - Company Information */}
          {currentStep === 1 && (
            <CardContent className="p-8 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-playfair text-2xl flex items-center gap-2">
                  <Ship className="h-6 w-6" />
                  Company Information
                </CardTitle>
                <CardDescription>Tell us about your organization and role</CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your business email"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter your company name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Job Title/Position *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g., Operations Manager, CEO, Logistics Coordinator"
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 2 - Business Profile */}
          {currentStep === 2 && (
            <CardContent className="p-8 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-playfair text-2xl flex items-center gap-2">
                  <Plane className="h-6 w-6" />
                  Business Profile
                </CardTitle>
                <CardDescription>Help us understand your freight forwarding operations</CardDescription>
              </CardHeader>

              <div className="space-y-6">
                {/* Business Type */}
                <div className="space-y-3">
                  <Label>What type of business are you in? *</Label>
                  <RadioGroup
                    value={formData.businessType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                  >
                    {[
                      { id: "freight-forwarder", label: "Freight Forwarder" },
                      { id: "logistics-provider", label: "Third-Party Logistics (3PL)" },
                      { id: "warehouse-operator", label: "Warehouse Operator" },
                      { id: "customs-broker", label: "Customs Broker" },
                      { id: "shipping-line", label: "Shipping Line/Carrier" },
                      { id: "manufacturer-shipper", label: "Manufacturer/Shipper" },
                      { id: "other", label: "Other" },
                    ].map((opt) => (
                      <div key={opt.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <Label htmlFor={opt.id}>{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Shipment Volume */}
                <div className="space-y-3">
                  <Label>Monthly shipment volume? *</Label>
                  <RadioGroup
                    value={formData.shipmentVolume}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, shipmentVolume: value }))}
                  >
                    {[
                      { id: "1-50", label: "1-50 shipments" },
                      { id: "51-200", label: "51-200 shipments" },
                      { id: "201-500", label: "201-500 shipments" },
                      { id: "501-1000", label: "501-1,000 shipments" },
                      { id: "1000+", label: "1,000+ shipments" },
                    ].map((opt) => (
                      <div key={opt.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <Label htmlFor={opt.id}>{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <Label>Which services are you interested in? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "NewageNXT Platform (End-to-End TMS)",
                      "Warehouse Management System (WMS)",
                      "Business Process Outsourcing (BPO)",
                      "Sales & Customer Service",
                      "Documentation Services",
                      "Finance & Accounting Services",
                      "API Integration & Custom Solutions",
                      "Multi-Modal Operations Support",
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) =>
                            handleServiceChange(service, checked as boolean)
                          }
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 3 - Current Challenges */}
          {currentStep === 3 && (
            <CardContent className="p-8 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-playfair text-2xl">Current Operations & Challenges</CardTitle>
                <CardDescription>Tell us about your current setup and pain points</CardDescription>
              </CardHeader>

              <div className="space-y-6">
                {/* Current Software */}
                <div className="space-y-2">
                  <Label htmlFor="currentSoftware">What software do you currently use for freight forwarding? (Optional)</Label>
                  <Input
                    id="currentSoftware"
                    value={formData.currentSoftware}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currentSoftware: e.target.value }))}
                    placeholder="e.g., CargoWise, Magaya, homegrown system, Excel, etc."
                    className="h-12"
                  />
                </div>

                {/* Challenges */}
                <div className="space-y-3">
                  <Label>What are your biggest operational challenges? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Managing disconnected systems and re-entering data",
                      "Manual handling of routine tasks",
                      "Lack of real-time visibility into shipments",
                      "Difficulty integrating with customers/vendors",
                      "Inefficient warehouse operations",
                      "Complex financial reconciliation and accounting",
                      "Poor customer service capabilities",
                      "Scaling operations to meet growing demands",
                      "Compliance and documentation challenges",
                      "High operational costs",
                    ].map((challenge) => (
                      <div key={challenge} className="flex items-center space-x-2">
                        <Checkbox
                          id={challenge}
                          checked={formData.challenges.includes(challenge)}
                          onCheckedChange={(checked) =>
                            handleChallengeChange(challenge, checked as boolean)
                          }
                        />
                        <Label htmlFor={challenge} className="text-sm">{challenge}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Additional Comments or Specific Requirements</Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback}
                    onChange={(e) => setFormData((prev) => ({ ...prev, feedback: e.target.value }))}
                    placeholder="Tell us about any specific requirements, integration needs, or challenges you're facing..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
          )}

          {/* Step 4 - NPS Survey & Partnership Interest */}
          {currentStep === 4 && (
            <CardContent className="p-8 space-y-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-playfair text-2xl flex items-center gap-2">
                  <Star className="h-6 w-6" />
                  Your Experience & Partnership Interest
                </CardTitle>
                <CardDescription>Help us understand your satisfaction level and interest in our solutions</CardDescription>
              </CardHeader>

              <div className="space-y-8">
                {/* NPS Survey Section */}
                <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Promoter Score</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Based on your interaction with NewAge Global so far, how likely are you to recommend us to a friend or colleague?
                      </p>
                      <p className="text-xs text-gray-500">
                        Rate us on a scale of 0-10 (0 = Not at all likely, 10 = Extremely likely)
                      </p>
                    </div>

                    {/* NPS Score Buttons */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {Array.from({ length: 11 }, (_, i) => (
                        <Button
                          key={i}
                          variant={formData.npsScore === i ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleNPSScoreSelect(i)}
                          className={`w-10 h-10 text-sm font-semibold transition-all ${
                            formData.npsScore === i
                              ? "bg-blue-600 hover:bg-blue-700 text-white transform scale-110"
                              : "hover:bg-blue-50 border-2"
                          }`}
                        >
                          {i}
                        </Button>
                      ))}
                    </div>

                    {/* Score Labels */}
                    <div className="flex justify-between text-xs text-gray-500 px-2">
                      <span>Not at all likely</span>
                      <span>Extremely likely</span>
                    </div>

                    {/* Category Badge */}
                    {formData.npsScore !== null && (
                      <div className="flex justify-center">
                        <Badge className={getScoreCategory(formData.npsScore).color}>
                          {getScoreCategory(formData.npsScore).label}
                        </Badge>
                      </div>
                    )}

                    {/* NPS Follow-up Question */}
                    {formData.npsScore !== null && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium text-gray-800">
                            {getNPSFollowUpQuestion()}
                          </Label>
                        </div>
                        <Textarea
                          value={formData.npsReason}
                          onChange={(e) => setFormData((prev) => ({ ...prev, npsReason: e.target.value }))}
                          placeholder="Please share your thoughts..."
                          className="min-h-[80px] text-sm border-2 focus:border-blue-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Partnership Interest */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>How likely are you to consider NewAge Global for your freight forwarding technology needs? *</Label>
                    <RadioGroup
                      value={formData.recommend}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, recommend: value }))}
                    >
                      {[
                        { id: "very-interested", label: "Very Interested - Ready to discuss immediately" },
                        { id: "interested", label: "Interested - Would like more information" },
                        { id: "evaluating", label: "Currently evaluating options" },
                        { id: "future", label: "Potential future consideration" },
                        { id: "not-interested", label: "Not interested at this time" },
                      ].map((opt) => (
                        <div key={opt.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.id} id={opt.id} />
                          <Label htmlFor={opt.id}>{opt.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Thank You Message */}
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="font-playfair text-lg font-semibold mb-2">Ready to Transform Your Operations?</h3>
                    <p className="text-muted-foreground mb-3">
                      Join 400+ customers across 30+ countries who trust NewAge Global's end-to-end freight forwarding solutions. 
                      Our cloud-based platform and expert BPO services help eliminate inefficiencies and streamline operations.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Next Steps:</strong> Our solutions team will review your responses and contact you within 24-48 hours with personalized recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {/* Navigation Buttons */}
          <CardFooter className="flex justify-between pt-8 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="h-12 px-6 bg-transparent"
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="h-12 px-6">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="h-12 px-8 bg-accent hover:bg-accent/90">
                Submit Survey
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
