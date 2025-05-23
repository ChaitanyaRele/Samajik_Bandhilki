import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, Users, Target, Eye, Award, Calendar, MapPin } from "lucide-react"

export default function AboutPage() {
  // Sample contributors data - you can replace with actual data
  const contributors = [
    {
      name: "Bhakti Rele",
      role: "Founder",
      image: "/bukki.jpg?height=150&width=150",
      description: "Leading the organization with dedication and compassion for over 10 years.",
    },
    {
      name: "Chandrahas Chonkar",
      role: "Vice President",
      image: "/CC.jpg?height=150&width=150",
      description: "Supporting community initiatives and managing organizational operations.",
    },
    {
      name: "Shilpa / Rakesh Kelaskar",
      role: "Member",
      image: "/placeholder.svg?height=150&width=150",
      description: "Coordinating community outreach programs and volunteer activities.",
    },
    {
      name: "Shilpa / Anil Thakur",
      role: "Member",
      image: "/placeholder.svg?height=150&width=150",
      description: "Managing planning of programs.",
    },
    {
      name: "Deepak Ghatpande",
      role: "Member",
      image: "/DP.jpg?height=150&width=150",
      description: "Managing planning of programs.",
    },
    {
      name: "Shri. Sharad Naik",
      role: "Member",
      image: "/placeholder.svg?height=150&width=150",
      description: "Contributing member.",
    },
    {
      name: "Sunil Yadav",
      role: "Member",
      image: "/placeholder.svg?height=150&width=150",
      description: "Contributing member.",
    },
  ]

  const achievements = [
    {
      icon: Users,
      number: "150+",
      label: "Children Helped",
      description: "परिवारों की सहायता",
    },
    {
      icon: Calendar,
      number: "10+",
      label: "Events Organized",
      description: "आयोजित कार्यक्रम",
    },
    {
      icon: Award,
      number: "10+",
      label: "Years of Service",
      description: "सेवा के वर्ष",
    },
    {
      icon: Heart,
      number: "20+",
      label: "Active Volunteers",
      description: "सक्रिय स्वयंसेवक",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-400 rounded-full transform -translate-x-32 -translate-y-32"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tl from-green-400 to-blue-400 rounded-full transform translate-x-48 translate-y-48"></div>
      </div>

      {/* Header with Indian-inspired design */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-serif">सामाजिक बांधिलकी</h1>
                <p className="text-orange-100 text-sm">Samajik Bandhilki</p>
              </div>
            </Link>
            <nav className="flex flex-wrap gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/activities">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Activities
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" className="text-black border-white/30 hover:bg-white/20">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {/* Hero section */}
        <section className="py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
            हमारे बारे में
          </h1>
          <h2 className="text-3xl font-bold mb-6 text-green-700 font-serif">About Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            समुदाय की सेवा में समर्पित | Dedicated to serving our community with love, compassion, and unwavering commitment
          </p>
        </section>

        {/* Organization Banner Section */}
        <section className="py-8 mb-12">
          <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-r from-orange-100 via-red-50 to-green-100 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for organization banner - replace with actual banner */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
              <img
                src="/मुलांच्या हास्यासाठी, शिक्षणासाठी आणि स्वप्नांच्या नव्या उड्डाणांसाठी (2) (1) (1).png?height=600&width=1200"
                alt="Samajik Bandhilki Organization Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="py-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-2xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-700 font-serif">हमारा मिशन</CardTitle>
                <p className="text-orange-600">Our Mission</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 leading-relaxed">
                  To serve the underprivileged adivasi communities and special needs organisations in Mumbai and surrounding districts by providing essential
                  resources, education, healthcare support, and creating opportunities for sustainable development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-2xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 font-serif">हमारा विजन</CardTitle>
                <p className="text-green-600">Our Vision</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-700 leading-relaxed">
                  To create a society where every individual has access to basic necessities, education, and
                  opportunities to lead a dignified life, fostering unity and compassion in our community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-700 font-serif">हमारे मूल्य</CardTitle>
                <p className="text-purple-600">Our Values</p>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-gray-700 space-y-2">
                  <li>• सेवा (Seva) - Selfless Service</li>
                  <li>• करुणा (Karuna) - Compassion</li>
                  <li>• एकता (Ekta) - Unity</li>
                  <li>• ज्ञान (Gyan) - Knowledge</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Organization Section */}
        <section className="py-12 mb-12">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif mb-4">
                संगठन के बारे में | About Our Organization
              </CardTitle>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong>सामाजिक बांधिलकी (Samajik Bandhilki)</strong> is a charitable organization founded with the
                  noble mission of serving the underdeveloped adivasi communities and special needs organisations in Mumbai, and surrounding districts. Established with the
                  belief that "वसुधैव कुटुम्बकम्" (The World is One Family), we work tirelessly to bridge the gap between the
                  privileged and underprivileged sections of society.
                </p>

                <p>
                  Our organization focuses on various aspects of community development including education, healthcare,
                  skill development, and providing essential resources to those in need. We believe in the power of
                  collective action and community participation to bring about positive change.
                </p>

                <p>
                  Since our inception, we have been committed to transparency, accountability, and ensuring that every
                  contribution reaches those who need it most. Our work is guided by the principles of seva (selfless
                  service), karuna (compassion), and the belief that every small act of kindness can make a significant
                  difference.
                </p>

                <p>
                  We invite you to join us in our mission to create a more equitable and compassionate society.
                  Together, we can build a community where everyone has the opportunity to thrive and contribute to the
                  greater good.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Achievements Section */}
        <section className="py-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif mb-4">
              हमारी उपलब्धियाँ | Our Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow text-center"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-orange-600 mb-2">{achievement.number}</h3>
                  <p className="text-lg font-semibold text-gray-800 mb-1">{achievement.label}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contributors Section */}
        <section className="py-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif mb-4">
              हमारे योगदानकर्ता | Our Contributors
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet the dedicated individuals who make our mission possible through their tireless efforts and commitment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contributors.map((contributor, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:scale-105 transition-transform">
                      <img
                        src={contributor.image || "/placeholder.svg"}
                        alt={contributor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{contributor.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{contributor.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{contributor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white">
            <CardContent className="py-16">
              <h2 className="text-4xl font-bold mb-6 font-serif">हमसे जुड़ें | Join Our Mission</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Be a part of our journey to create positive change in the community. Every contribution, big or small,
                makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/activities">
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                    View Our Work
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/20 px-8 py-6 text-lg font-semibold"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer with Indian-inspired design */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif">समाजिक बांधिलकी</h3>
                  <p className="text-sm opacity-80">Samajik Bandhilki</p>
                </div>
              </div>
              <p className="text-gray-300 mb-2">गिरगाँव, मुंबई</p>
              <p className="text-gray-300">Girgaon, Mumbai</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-orange-400 font-serif">हमारे मूल्य | Our Values</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• सेवा (Seva) - Selfless Service</li>
                <li>• करुणा (Karuna) - Compassion</li>
                <li>• एकता (Ekta) - Unity</li>
                <li>• ज्ञान (Gyan) - Knowledge</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400 font-serif">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-orange-400 transition-colors">
                    होम पेज | Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-orange-400 transition-colors">
                    हमारे बारे में | About Us
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="hover:text-orange-400 transition-colors">
                    गतिविधियाँ | Activities
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-orange-400 transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} समाजिक बांधिलकी | Samajik Bandhilki. सभी अधिकार सुरक्षित | All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">वसुधैव कुटुम्बकम् | The World is One Family</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
