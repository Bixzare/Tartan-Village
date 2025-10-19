import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Search, 
  ChevronRight, 
  Bus, 
  Utensils, 
  Clock, 
  GraduationCap, 
  BookOpen,
  ChevronLeft
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeaturedAnnouncement {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface TodayEvent {
  id: string;
  time: string;
  title: string;
  location?: string;
}

interface QuickLink {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
}

const featuredAnnouncements: FeaturedAnnouncement[] = [
  {
    id: '1',
    title: 'Welcome to Spring Semester 2025',
    description: 'Join us for an exciting semester filled with innovation and collaboration.',
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZXZlbnR8ZW58MXx8fHwxNzYwNzg5MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'Tech Innovation Workshop',
    description: 'Learn about the latest developments in AI and machine learning this Friday.',
    image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjA4MjQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Study Groups Forming',
    description: 'Connect with peers and enhance your learning experience.',
    image: 'https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwNzgwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    title: 'Career Fair Next Week',
    description: 'Meet top employers and explore internship opportunities.',
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZXZlbnR8ZW58MXx8fHwxNzYwNzg5MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const todayEvents: TodayEvent[] = [
  { id: '1', time: '09:00 AM', title: 'Morning Assembly', location: 'Main Hall' },
  { id: '2', time: '12:00 PM', title: 'ML Club Meeting', location: 'Lab 3' },
  { id: '3', time: '02:00 PM', title: 'Guest Lecture: AI Ethics', location: 'Auditorium' },
  { id: '4', time: '04:00 PM', title: 'Basketball Practice', location: 'Sports Complex' },
  { id: '5', time: '06:00 PM', title: 'Coding Workshop', location: 'Computer Lab' }
];

const quickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Bus Schedule',
    icon: <Bus className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  },
  {
    id: '2',
    title: 'Cafeteria Menu',
    icon: <Utensils className="w-6 h-6" />,
    color: 'bg-green-100 text-green-700 hover:bg-green-200'
  },
  {
    id: '3',
    title: 'Office Hours',
    icon: <Clock className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
  },
  {
    id: '4',
    title: 'Academics',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
  },
  {
    id: '5',
    title: 'Handbook',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-700 hover:bg-pink-200'
  }
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAnnouncements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredAnnouncements.length) % featuredAnnouncements.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="mb-4 text-[#9C0022] text-4xl font-bold">Dashboard</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0022] animate-pulse" />
            <Input
              type="text"
              placeholder="Search Tartan Village..."
              className="pl-12 pr-4 py-6 bg-white border-2 border-[#9C0022] focus:border-[#C41230] focus:ring-[#C41230] placeholder:text-gray-400 placeholder:animate-pulse"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        {/* What's New Section */}
        <section>
          <h2 className="mb-4 text-[#5B5B5B]">What's New</h2>
          
          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="min-w-full">
                    <Card className="border-2 border-gray-200 overflow-hidden">
                      <div className="relative h-64 md:h-80">
                        <ImageWithFallback
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="mb-2 text-white">{announcement.title}</h3>
                          <p className="text-white/90">{announcement.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#9C0022]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#9C0022]" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredAnnouncements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-[#9C0022] w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Today's Events Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#5B5B5B]">Today's Events</h2>
            <Button 
              variant="ghost" 
              className="text-[#9C0022] hover:text-[#C41230] hover:bg-[#9C0022]/10"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Horizontal Scrolling Events */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4">
              {todayEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="min-w-[280px] hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#9C0022]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#9C0022] text-white px-3 py-2 rounded-lg text-center min-w-[80px]">
                        <div className="text-sm font-bold">{event.time}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{event.title}</h4>
                        {event.location && (
                          <p className="text-sm text-gray-500">{event.location}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section>
          <h2 className="mb-4 text-[#5B5B5B]">Quick Links</h2>
          
          {/* Mosaic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((link) => (
              <Card
                key={link.id}
                className={`${link.color} border-2 border-transparent hover:border-current transition-all cursor-pointer hover:scale-105 duration-300`}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32">
                  <div className="mb-3">
                    {link.icon}
                  </div>
                  <h4 className="text-sm">{link.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
