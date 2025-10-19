import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  CalendarIcon, 
  Clock, 
  Plus, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Star,
  Bell,
  Share2,
  Edit,
  Trash2,
  Video,
  BookOpen,
  GraduationCap,
  Briefcase,
  Heart,
  Coffee,
  Gamepad2,
  Music,
  Camera,
  Code,
  Globe,
  Zap,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Calendar,
  CalendarDays,
  Timer,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';


interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  category: string;
  location: string;
  description?: string;
  attendees?: number;
  maxAttendees?: number;
  organizer: string;
  isRecurring?: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'academic' | 'social' | 'sports' | 'career' | 'cultural' | 'workshop' | 'deadline';
  icon: React.JSX.Element;
  color: string;
  isOnline?: boolean;
  meetingLink?: string;
}

type ViewType = 'daily' | 'weekly' | 'monthly' | 'semester';

// Comprehensive sample events for the current week (January 2025)
const sampleEvents: Event[] = [
  // Monday Events
  {
    id: '1',
    title: 'Machine Learning Workshop',
    date: new Date(2025, 0, 13),
    startTime: '10:00',
    endTime: '12:00',
    category: 'Workshop',
    location: 'Computer Lab 1',
    description: 'Introduction to neural networks and deep learning with hands-on coding exercises',
    attendees: 25,
    maxAttendees: 30,
    organizer: 'Dr. Sarah Johnson',
    priority: 'high',
    type: 'workshop',
    icon: <Code className="w-4 h-4" />,
    color: 'bg-blue-500',
    isOnline: false
  },
  {
    id: '2',
    title: 'Study Group: Data Structures',
    date: new Date(2025, 0, 13),
    startTime: '14:00',
    endTime: '16:00',
    category: 'Academic',
    location: 'Library Study Room 3',
    description: 'Review session for midterm exam covering arrays, linked lists, and trees',
    attendees: 8,
    maxAttendees: 12,
    organizer: 'Alex Chen',
    priority: 'medium',
    type: 'academic',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-green-500',
    isOnline: false
  },
  {
    id: '3',
    title: 'Coffee Chat with Alumni',
    date: new Date(2025, 0, 13),
    startTime: '16:30',
    endTime: '17:30',
    category: 'Career',
    location: 'Student Lounge',
    description: 'Informal networking session with recent graduates working in tech',
    attendees: 15,
    maxAttendees: 20,
    organizer: 'Career Services',
    priority: 'medium',
    type: 'career',
    icon: <Coffee className="w-4 h-4" />,
    color: 'bg-orange-500',
    isOnline: false
  },

  // Tuesday Events
  {
    id: '4',
    title: 'Career Fair Prep Session',
    date: new Date(2025, 0, 14),
    startTime: '15:00',
    endTime: '17:00',
    category: 'Career',
    location: 'Career Services Office',
    description: 'Resume review, interview tips, and networking strategies',
    attendees: 15,
    maxAttendees: 25,
    organizer: 'Career Services Team',
    priority: 'high',
    type: 'career',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'bg-purple-500',
    isOnline: false
  },
  {
    id: '5',
    title: 'Basketball Practice',
    date: new Date(2025, 0, 14),
    startTime: '18:00',
    endTime: '20:00',
    category: 'Sports',
    location: 'Sports Complex',
    description: 'Weekly team practice for intramural basketball tournament',
    attendees: 12,
    maxAttendees: 15,
    organizer: 'Sports Club',
    priority: 'low',
    type: 'sports',
    icon: <Gamepad2 className="w-4 h-4" />,
    color: 'bg-red-500',
    isOnline: false
  },

  // Wednesday Events
  {
    id: '6',
    title: 'African Tech Innovation Panel',
    date: new Date(2025, 0, 15),
    startTime: '18:00',
    endTime: '20:00',
    category: 'Cultural',
    location: 'Auditorium Hall A',
    description: 'Panel discussion with industry leaders about tech innovation in Africa',
    attendees: 120,
    maxAttendees: 150,
    organizer: 'Tech Society',
    priority: 'high',
    type: 'cultural',
    icon: <Globe className="w-4 h-4" />,
    color: 'bg-indigo-500',
    isOnline: true,
    meetingLink: 'https://zoom.us/j/123456789'
  },
  {
    id: '7',
    title: 'Photography Club Meeting',
    date: new Date(2025, 0, 15),
    startTime: '19:30',
    endTime: '21:00',
    category: 'Social',
    location: 'Art Studio',
    description: 'Monthly photo sharing and technique discussion',
    attendees: 8,
    maxAttendees: 15,
    organizer: 'Photography Club',
    priority: 'low',
    type: 'social',
    icon: <Camera className="w-4 h-4" />,
    color: 'bg-pink-500',
    isOnline: false
  },

  // Thursday Events
  {
    id: '8',
    title: 'Basketball Tournament Finals',
    date: new Date(2025, 0, 16),
    startTime: '16:00',
    endTime: '19:00',
    category: 'Sports',
    location: 'Sports Complex',
    description: 'Intramural basketball championship finals',
    attendees: 50,
    maxAttendees: 100,
    organizer: 'Sports Department',
    priority: 'medium',
    type: 'sports',
    icon: <Gamepad2 className="w-4 h-4" />,
    color: 'bg-red-500',
    isOnline: false
  },
  {
    id: '9',
    title: 'Music Society Jam Session',
    date: new Date(2025, 0, 16),
    startTime: '20:00',
    endTime: '22:00',
    category: 'Cultural',
    location: 'Music Room',
    description: 'Open mic and collaborative music session',
    attendees: 20,
    maxAttendees: 30,
    organizer: 'Music Society',
    priority: 'low',
    type: 'cultural',
    icon: <Music className="w-4 h-4" />,
    color: 'bg-yellow-500',
    isOnline: false
  },

  // Friday Events
  {
    id: '10',
    title: 'Research Paper Deadline',
    date: new Date(2025, 0, 17),
    startTime: '23:59',
    endTime: '23:59',
    category: 'Academic',
    location: 'Online Submission',
    description: 'Final submission deadline for AI Ethics research paper',
    attendees: 0,
    maxAttendees: 0,
    organizer: 'Academic Office',
    priority: 'high',
    type: 'deadline',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-red-600',
    isOnline: true
  },
  {
    id: '11',
    title: 'Friday Social Mixer',
    date: new Date(2025, 0, 17),
    startTime: '18:00',
    endTime: '21:00',
    category: 'Social',
    location: 'Student Center',
    description: 'Weekly social event with games, food, and networking',
    attendees: 45,
    maxAttendees: 60,
    organizer: 'Student Government',
    priority: 'medium',
    type: 'social',
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-pink-500',
    isOnline: false
  },

  // Saturday Events
  {
    id: '12',
    title: 'Weekend Movie Night',
    date: new Date(2025, 0, 18),
    startTime: '19:00',
    endTime: '22:00',
    category: 'Social',
    location: 'Student Center',
    description: 'Screening of "The Social Network" with discussion',
    attendees: 30,
    maxAttendees: 50,
    organizer: 'Film Society',
    priority: 'low',
    type: 'social',
    icon: <Video className="w-4 h-4" />,
    color: 'bg-purple-500',
    isOnline: false
  },
  {
    id: '13',
    title: 'Coding Bootcamp Session',
    date: new Date(2025, 0, 18),
    startTime: '10:00',
    endTime: '16:00',
    category: 'Workshop',
    location: 'Computer Lab 2',
    description: 'Intensive coding session covering web development',
    attendees: 18,
    maxAttendees: 25,
    organizer: 'Tech Society',
    priority: 'medium',
    type: 'workshop',
    icon: <Code className="w-4 h-4" />,
    color: 'bg-blue-500',
    isOnline: false
  },

  // Sunday Events
  {
    id: '14',
    title: 'Campus Tour for New Students',
    date: new Date(2025, 0, 19),
    startTime: '14:00',
    endTime: '16:00',
    category: 'Academic',
    location: 'Main Entrance',
    description: 'Guided tour of campus facilities for new students',
    attendees: 20,
    maxAttendees: 30,
    organizer: 'Student Services',
    priority: 'medium',
    type: 'academic',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'bg-green-500',
    isOnline: false
  },
  {
    id: '15',
    title: 'Study Group: Algorithms',
    date: new Date(2025, 0, 19),
    startTime: '16:30',
    endTime: '18:30',
    category: 'Academic',
    location: 'Library Study Room 1',
    description: 'Group study session for algorithms and data structures',
    attendees: 6,
    maxAttendees: 10,
    organizer: 'Study Group Leader',
    priority: 'medium',
    type: 'academic',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-green-500',
    isOnline: false
  }
];

// Helper function to get events for a specific day
const getEventsForDay = (date: Date): Event[] => {
  return sampleEvents.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
};

// Helper function to get current week dates
const getCurrentWeekDates = (): Date[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + 1);
  
  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

// Helper function to format time
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Helper function to get time slot height
const getTimeSlotHeight = (startTime: string, endTime: string): number => {
  const start = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const end = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
  return Math.max((end - start) / 15, 1) * 4; // 4px per 15 minutes, minimum 1 slot
};

// Helper function to get time slot top position
const getTimeSlotTop = (startTime: string): number => {
  const [hours, minutes] = startTime.split(':');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return (totalMinutes / 15) * 4; // 4px per 15 minutes
};

// Time slots for the day (6 AM to 11 PM)
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, '0')}:00`;
});

// Helper function to get time-based icon
const getTimeIcon = (time: string) => {
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 6 && hour < 9) return <Sunrise className="w-4 h-4 text-orange-500" />;
  if (hour >= 9 && hour < 12) return <Sun className="w-4 h-4 text-yellow-500" />;
  if (hour >= 12 && hour < 17) return <Sun className="w-4 h-4 text-yellow-600" />;
  if (hour >= 17 && hour < 20) return <Sunset className="w-4 h-4 text-orange-600" />;
  return <Moon className="w-4 h-4 text-blue-500" />;
};

// Helper function to get day status icon
const getDayStatusIcon = (date: Date, events: Event[]) => {
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && 
                 date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
  
  if (isToday) {
    return <Activity className="w-4 h-4 text-[#9C0022]" />;
  }
  
  if (events.length === 0) {
    return <Circle className="w-4 h-4 text-gray-300" />;
  }
  
  const hasHighPriority = events.some(event => event.priority === 'high');
  if (hasHighPriority) {
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  }
  
  return <CheckCircle2 className="w-4 h-4 text-green-500" />;
};

// Helper function to get event count badge
const getEventCountBadge = (count: number) => {
  if (count === 0) return null;
  if (count === 1) return <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">1 event</Badge>;
  return <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">{count} events</Badge>;
};

export function CalendarView() {
  const [currentView, setCurrentView] = useState<ViewType>('weekly');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const weekDates = getCurrentWeekDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDateFull = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const viewTabs = [
    { id: 'daily' as ViewType, label: 'Daily' },
    { id: 'weekly' as ViewType, label: 'Weekly' },
    { id: 'monthly' as ViewType, label: 'Monthly' },
    { id: 'semester' as ViewType, label: 'Semester' }
  ];

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  const EventDetailModal = ({ event, children }: { event: Event; children?: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${event.color} text-white`}>
              {event.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.organizer}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{formatDateFull(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
            </div>
          </div>
          
          {event.description && (
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          )}

          {event.isOnline && event.meetingLink && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Online Meeting</h3>
              <a 
                href={event.meetingLink} 
                className="text-blue-600 hover:text-blue-800 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Meeting
              </a>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Bell className="w-4 h-4 mr-2" />
              Set Reminder
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
      <div>
              <h1 className="text-3xl font-bold text-[#9C0022]">Calendar</h1>
              <p className="text-gray-600 mt-1">Stay organized with your campus events</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateWeek('prev')}
                  className="hover:bg-[#9C0022]/10 hover:border-[#9C0022]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateWeek('next')}
                  className="hover:bg-[#9C0022]/10 hover:border-[#9C0022]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(0)}
                className="hover:bg-[#9C0022]/10 hover:border-[#9C0022]"
              >
                Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {viewTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentView === tab.id
                    ? 'bg-white text-[#9C0022] shadow-sm border border-[#9C0022]/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
                  </div>
                </div>
      </div>

      {/* Main Calendar Area */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {currentView === 'weekly' && (
          <div className="space-y-6">
            {/* Week Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {weekDates.map((date, index) => {
                const dayEvents = getEventsForDay(date);
                const isToday = date.getDate() === new Date().getDate() && 
                               date.getMonth() === new Date().getMonth();
                const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
                
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isToday ? 'ring-2 ring-[#9C0022] bg-[#9C0022]/5' : 'hover:border-[#9C0022]/30'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          <div className="text-sm font-medium text-gray-500">{dayName}</div>
                          {getDayStatusIcon(date, dayEvents)}
                        </div>
                        <div className={`text-2xl font-bold ${
                          isToday ? 'text-[#9C0022]' : 'text-gray-900'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <div className="text-xs text-gray-400">
                            {date.toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </div>
                        <div className="mt-2">
                          {getEventCountBadge(dayEvents.length)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {dayEvents.length > 0 ? (
                          dayEvents.slice(0, 3).map((event) => (
                            <div key={event.id}>
                              <EventDetailModal event={event}>
                                <div
                                  className={`p-2 rounded-lg text-xs cursor-pointer hover:shadow-sm transition-all duration-200 ${event.color} text-white relative`}
                                >
                                <div className="flex items-center gap-1 mb-1">
                                  {event.icon}
                                  <span className="font-medium truncate">{event.title}</span>
                                  {event.isOnline && (
                                    <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                                  )}
                                </div>
                                <div className="text-xs opacity-90">
                                  <div className="flex items-center gap-1">
                                    {getTimeIcon(event.startTime)}
                                    <Timer className="w-3 h-3" />
                                    {formatTime(event.startTime)}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate">{event.location}</span>
                                  </div>
                                  {event.attendees && event.attendees > 0 && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Users className="w-3 h-3" />
                                      <span>{event.attendees}/{event.maxAttendees}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="absolute top-1 right-1">
                                  <div className={`w-2 h-2 rounded-full ${
                                    event.priority === 'high' ? 'bg-red-400' :
                                    event.priority === 'medium' ? 'bg-yellow-400' :
                                    'bg-green-400'
                                  }`}></div>
                                </div>
                                </div>
                              </EventDetailModal>
                </div>
              ))
            ) : (
                          <div className="text-center py-4">
                            <div className="flex flex-col items-center gap-2">
                              <Calendar className="w-6 h-6 text-gray-300" />
                              <div className="text-gray-400 text-sm">No events</div>
                              <div className="text-gray-300 text-xs">Free day!</div>
                            </div>
                          </div>
                        )}
                        {dayEvents.length > 3 && (
                          <div className="text-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-[#9C0022] hover:text-[#C41230] flex items-center gap-1"
                            >
                              <TrendingUp className="w-3 h-3" />
                              +{dayEvents.length - 3} more
                            </Button>
                          </div>
                        )}
                      </div>
          </CardContent>
        </Card>
                );
              })}
      </div>

            {/* Detailed Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#9C0022]" />
                  This Week's Events
                  <Badge variant="outline" className="ml-2 text-xs">
                    {sampleEvents.length} total
                  </Badge>
          </CardTitle>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  All scheduled events for the current week
                </p>
        </CardHeader>
        <CardContent>
                <div className="space-y-4">
                  {sampleEvents
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                      <div key={event.id} className="group">
                        <EventDetailModal event={event}>
                          <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group-hover:border-[#9C0022]/30">
                            <div className={`p-3 rounded-lg ${event.color} text-white flex-shrink-0`}>
                              {event.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900 group-hover:text-[#9C0022] transition-colors">
                                    {event.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">{event.organizer}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {event.isOnline && (
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  )}
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      event.priority === 'high' ? 'border-red-200 text-red-700' :
                                      event.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                                      'border-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {event.priority}
                      </Badge>
                    </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{formatDateFull(event.date)}</span>
                                </div>
                      <div className="flex items-center gap-1">
                                  {getTimeIcon(event.startTime)}
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                                {event.attendees && event.attendees > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{event.attendees}/{event.maxAttendees}</span>
                                  </div>
                                )}
                                {event.isOnline && (
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-green-600 font-medium">Online</span>
                                  </div>
                                )}
                              </div>
                              {event.description && (
                                <p className="text-sm text-gray-600 overflow-hidden" style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}>
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </EventDetailModal>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder for other views */}
        {currentView !== 'weekly' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              The {currentView} calendar view is coming soon. For now, enjoy the comprehensive weekly view with all your campus events!
            </p>
            <Button 
              onClick={() => setCurrentView('weekly')}
              className="mt-6 bg-[#9C0022] hover:bg-[#C41230] text-white"
            >
              Switch to Weekly View
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#C41230] hover:bg-[#C41230]/90 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group"
        onClick={() => {
          // Add event functionality would go here
          console.log('Add event clicked');
        }}
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
}
