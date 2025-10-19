import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Search, Calendar as CalendarIcon, User, Bookmark, Share2, Grid3x3, List, BookmarkPlus, ArrowDownAZ, Clock } from 'lucide-react';

type Category = 'All' | 'Internships' | 'Events' | 'Announcements' | 'Spotlight';
type ViewMode = 'grid' | 'list';
type SortMode = 'date' | 'alphabetical';

interface Announcement {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, 'All'>;
  publishedBy: string;
  publishedDate: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Summer Internship Program at Tech Giants',
    description: 'We are excited to announce partnerships with leading tech companies offering summer internship opportunities for undergraduate students in Computer Science, Engineering, and related fields. These positions offer competitive compensation, mentorship, and real-world project experience. Applications are now open and will close on November 30th.',
    category: 'Internships',
    publishedBy: 'Career Services',
    publishedDate: '2025-10-15'
  },
  {
    id: '2',
    title: 'Annual Homecoming Week Festivities',
    description: 'Join us for our biggest celebration of the year! Homecoming Week features a variety of events including the traditional bonfire, alumni mixer, sports tournaments, cultural performances, and the grand homecoming dance. All students, faculty, and alumni are welcome to participate in this week-long celebration of school spirit.',
    category: 'Events',
    publishedBy: 'Student Affairs',
    publishedDate: '2025-10-14'
  },
  {
    id: '3',
    title: 'Updated Campus Security Protocols',
    description: 'In response to community feedback, we have implemented enhanced security measures across campus. All buildings will now require ID card access after 8 PM, and additional security personnel will be stationed at main entrances. Please ensure your ID cards are up to date and functional.',
    category: 'Announcements',
    publishedBy: 'Campus Security',
    publishedDate: '2025-10-18'
  },
  {
    id: '4',
    title: 'Student Excellence Award Winner: Sarah Johnson',
    description: 'Congratulations to Sarah Johnson, a senior in the Biology program, for winning the prestigious Student Excellence Award. Sarah has demonstrated outstanding academic achievement, community service, and research contributions in her field. Her groundbreaking work on sustainable agriculture has been published in multiple peer-reviewed journals.',
    category: 'Spotlight',
    publishedBy: 'Office of the Dean',
    publishedDate: '2025-10-17'
  },
  {
    id: '5',
    title: 'Research Internship at National Labs',
    description: 'The Department of Physics is thrilled to offer research internship positions at renowned national laboratories across the country. Students will work alongside leading scientists on cutting-edge projects in quantum computing, particle physics, and materials science. Stipends and housing assistance are provided.',
    category: 'Internships',
    publishedBy: 'Physics Department',
    publishedDate: '2025-10-16'
  },
  {
    id: '6',
    title: 'Guest Lecture: Innovation in the Digital Age',
    description: 'We are honored to host Dr. Michael Chen, renowned tech entrepreneur and innovator, for a special guest lecture on "Innovation in the Digital Age: Building Tomorrow\'s Solutions Today." The lecture will cover emerging technologies, startup strategies, and career opportunities in tech. Refreshments will be served.',
    category: 'Events',
    publishedBy: 'Department of Technology',
    publishedDate: '2025-10-13'
  },
  {
    id: '7',
    title: 'Library Hours Extended During Exam Period',
    description: 'To support students during the upcoming examination period, the main library will extend its operating hours. Starting November 1st, the library will be open 24/7 until the end of finals week. Additional study spaces, computer labs, and printing services will be available throughout this period.',
    category: 'Announcements',
    publishedBy: 'Library Services',
    publishedDate: '2025-10-19'
  },
  {
    id: '8',
    title: 'Outstanding Faculty Member: Professor Davis',
    description: 'This month we celebrate Professor Emily Davis from the English Department for her exceptional dedication to teaching and student mentorship. Professor Davis has received the highest student evaluations for three consecutive years and has mentored over 50 students in their thesis projects. Her innovative teaching methods have transformed the department.',
    category: 'Spotlight',
    publishedBy: 'Faculty Committee',
    publishedDate: '2025-10-12'
  },
  {
    id: '9',
    title: 'International Cultural Festival',
    description: 'Experience the rich diversity of our campus community at the annual International Cultural Festival! The event will feature traditional performances, authentic cuisine from around the world, art exhibitions, and interactive cultural workshops. This is a wonderful opportunity to celebrate our global community and learn about different cultures.',
    category: 'Events',
    publishedBy: 'International Student Office',
    publishedDate: '2025-10-11'
  },
  {
    id: '10',
    title: 'Financial Aid Application Deadline Approaching',
    description: 'This is a reminder that the deadline for next semester\'s financial aid applications is approaching fast. All students seeking scholarships, grants, or loans must submit their applications by October 31st. Late applications will not be considered. Please contact the Financial Aid Office if you need assistance with the application process.',
    category: 'Announcements',
    publishedBy: 'Financial Aid Office',
    publishedDate: '2025-10-10'
  },
  {
    id: '11',
    title: 'Marketing Internship at Fortune 500 Company',
    description: 'An exciting opportunity for marketing and business students! A leading Fortune 500 company is offering paid internship positions in their marketing department. Interns will gain hands-on experience in brand management, digital marketing, market research, and campaign development. Selected candidates will receive comprehensive training and networking opportunities.',
    category: 'Internships',
    publishedBy: 'Business School',
    publishedDate: '2025-10-09'
  },
  {
    id: '12',
    title: 'Research Breakthrough: Climate Change Solutions',
    description: 'Our Environmental Science department has made a groundbreaking discovery in carbon capture technology. Led by Dr. James Wilson and his team of graduate students, the research presents a cost-effective method for reducing atmospheric CO2. The findings have been published in Nature and garnered international attention from the scientific community.',
    category: 'Spotlight',
    publishedBy: 'Research Office',
    publishedDate: '2025-10-08'
  }
];

const categories: Category[] = ['All', 'Internships', 'Events', 'Announcements', 'Spotlight'];

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Internships: 'bg-blue-100 text-blue-800 border-blue-200',
  Events: 'bg-green-100 text-green-800 border-green-200',
  Announcements: 'bg-orange-100 text-orange-800 border-orange-200',
  Spotlight: 'bg-purple-100 text-purple-800 border-purple-200'
};

const categoryBorderColors: Record<Exclude<Category, 'All'>, string> = {
  Internships: 'border-blue-500',
  Events: 'border-green-500',
  Announcements: 'border-orange-500',
  Spotlight: 'border-purple-500'
};

const categoryButtonColors: Record<Category, string> = {
  All: 'bg-gray-100 text-[#5B5B5B] hover:bg-gray-200',
  Internships: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  Events: 'bg-green-100 text-green-800 hover:bg-green-200',
  Announcements: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  Spotlight: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
};

const categoryButtonActiveColors: Record<Category, string> = {
  All: 'bg-[#9C0022] text-white hover:bg-[#C41230]',
  Internships: 'bg-blue-600 text-white hover:bg-blue-700',
  Events: 'bg-green-600 text-white hover:bg-green-700',
  Announcements: 'bg-orange-600 text-white hover:bg-orange-700',
  Spotlight: 'bg-purple-600 text-white hover:bg-purple-700'
};

export function TartanVillage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('date');
  const [bookmarkedCount] = useState(3);

  const filteredAnnouncements = announcements
    .filter((announcement) => {
      const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
      const matchesSearch = 
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.publishedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortMode === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else {
        // Sort by date (recent first)
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="mb-2 text-[#9C0022] text-4xl font-bold">Announcements Page</h1>
          <p className="text-[#5B5B5B] mb-6">Your central hub for campus announcements and opportunities</p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0022] animate-pulse" />
            <Input
              type="text"
              placeholder="Search announcements..."
              className="pl-12 pr-4 py-6 bg-white border-2 border-[#9C0022] focus:border-[#C41230] focus:ring-[#C41230] placeholder:text-gray-400 placeholder:animate-pulse"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters and Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? categoryButtonActiveColors[category]
                      : categoryButtonColors[category]
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Toggle */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${sortMode === 'date' ? 'bg-gray-100' : ''}`}
                  onClick={() => setSortMode('date')}
                  title="Sort by date (recent first)"
                >
                  <Clock className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${sortMode === 'alphabetical' ? 'bg-gray-100' : ''}`}
                  onClick={() => setSortMode('alphabetical')}
                  title="Sort alphabetically"
                >
                  <ArrowDownAZ className="w-4 h-4" />
                </Button>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Bookmarks with Badge */}
              <Button variant="outline" size="sm" className="relative" title="View bookmarks">
                <Bookmark className="w-4 h-4" />
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#9C0022] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {bookmarkedCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No announcements found matching your criteria.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredAnnouncements.map((announcement) => (
              <Card 
                key={announcement.id} 
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:${categoryBorderColors[announcement.category]} hover:scale-105`}
              >
                <CardContent className="p-5">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge 
                      variant="outline" 
                      className={`${categoryColors[announcement.category]} border`}
                    >
                      {announcement.category}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-2">
                    {announcement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {announcement.description}
                  </p>

                  {/* Footer */}
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span className="truncate">{announcement.publishedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(announcement.publishedDate)}</span>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#9C0022] hover:bg-[#9C0022] hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle bookmark
                          }}
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#9C0022] hover:bg-[#9C0022] hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle share
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
