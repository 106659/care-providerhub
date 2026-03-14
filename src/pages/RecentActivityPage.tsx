import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/DashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Avatar } from '../components/ui/avatar';
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Eye,
  MessageSquare,
  Star,
  Heart,
  Package,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  date: string;
  icon: any;
  color: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status?: string;
}

export default function RecentActivityPage() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extended activity data
  const allActivities: Activity[] = [
    {
      id: 1,
      type: 'search',
      title: 'Searched for "CQC Registration"',
      description: 'Found 12 matching services',
      time: '2 hours ago',
      date: '2024-01-20',
      icon: Eye,
      color: 'text-blue-600',
      category: 'Search',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from Sarah Mitchell',
      description: 'Regarding your CQC registration project',
      time: '3 hours ago',
      date: '2024-01-20',
      icon: MessageSquare,
      color: 'text-green-600',
      category: 'Communication',
      priority: 'high'
    },
    {
      id: 3,
      type: 'review',
      title: 'Left a review',
      description: '5-star review for David Thompson\'s compliance audit',
      time: '1 day ago',
      date: '2024-01-19',
      icon: Star,
      color: 'text-yellow-500',
      category: 'Feedback',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'save',
      title: 'Saved a service',
      description: 'Healthcare Licensing Specialist by Emma Wilson',
      time: '2 days ago',
      date: '2024-01-18',
      icon: Heart,
      color: 'text-red-600',
      category: 'Favorites',
      priority: 'low'
    },
    {
      id: 5,
      type: 'project',
      title: 'Project completed',
      description: 'Care Home License Application finished successfully',
      time: '3 days ago',
      date: '2024-01-17',
      icon: CheckCircle,
      color: 'text-green-600',
      category: 'Projects',
      priority: 'high',
      status: 'completed'
    },
    {
      id: 6,
      type: 'project',
      title: 'New project started',
      description: 'CQC Inspection Preparation with James Parker',
      time: '4 days ago',
      date: '2024-01-16',
      icon: Plus,
      color: 'text-blue-600',
      category: 'Projects',
      priority: 'high',
      status: 'active'
    },
    {
      id: 7,
      type: 'payment',
      title: 'Payment processed',
      description: '£850 paid for Healthcare Compliance Audit',
      time: '5 days ago',
      date: '2024-01-15',
      icon: TrendingUp,
      color: 'text-green-600',
      category: 'Payments',
      priority: 'high'
    },
    {
      id: 8,
      type: 'alert',
      title: 'Deadline approaching',
      description: 'CQC application deadline in 3 days',
      time: '6 days ago',
      date: '2024-01-14',
      icon: AlertCircle,
      color: 'text-orange-600',
      category: 'Alerts',
      priority: 'high'
    },
    {
      id: 9,
      type: 'search',
      title: 'Searched for "Healthcare Training"',
      description: 'Found 8 matching services',
      time: '1 week ago',
      date: '2024-01-13',
      icon: Eye,
      color: 'text-blue-600',
      category: 'Search',
      priority: 'medium'
    },
    {
      id: 10,
      type: 'message',
      title: 'Message from Michael Chen',
      description: 'Follow-up on Regulatory Documentation Review',
      time: '1 week ago',
      date: '2024-01-13',
      icon: MessageSquare,
      color: 'text-green-600',
      category: 'Communication',
      priority: 'medium'
    },
    {
      id: 11,
      type: 'save',
      title: 'Saved a service',
      description: 'IT Solutions Provider by Rachel Green',
      time: '8 days ago',
      date: '2024-01-12',
      icon: Heart,
      color: 'text-red-600',
      category: 'Favorites',
      priority: 'low'
    },
    {
      id: 12,
      type: 'review',
      title: 'Updated review',
      description: 'Revised review for Lisa Johnson\'s CQC Fast Track service',
      time: '9 days ago',
      date: '2024-01-11',
      icon: Star,
      color: 'text-yellow-500',
      category: 'Feedback',
      priority: 'low'
    },
    {
      id: 13,
      type: 'project',
      title: 'Project milestone reached',
      description: 'Initial consultation completed for Care Home Setup',
      time: '10 days ago',
      date: '2024-01-10',
      icon: CheckCircle,
      color: 'text-green-600',
      category: 'Projects',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: 14,
      type: 'payment',
      title: 'Refund processed',
      description: '£450 refund for cancelled consultation',
      time: '11 days ago',
      date: '2024-01-09',
      icon: TrendingUp,
      color: 'text-green-600',
      category: 'Payments',
      priority: 'medium'
    },
    {
      id: 15,
      type: 'alert',
      title: 'New service available',
      description: 'Healthcare Software Implementation service now available',
      time: '12 days ago',
      date: '2024-01-08',
      icon: AlertCircle,
      color: 'text-blue-600',
      category: 'Alerts',
      priority: 'low'
    }
  ];

  // Filter activities based on current filters
  const filteredActivities = allActivities.filter(activity => {
    if (filterType !== 'all' && activity.category.toLowerCase() !== filterType.toLowerCase()) {
      return false;
    }

    if (filterDate !== 'all') {
      const activityDate = new Date(activity.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 3600 * 24));

      if (filterDate === 'today' && daysDiff !== 0) return false;
      if (filterDate === 'week' && daysDiff > 7) return false;
      if (filterDate === 'month' && daysDiff > 30) return false;
    }

    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Projects': return 'bg-blue-100 text-blue-800';
      case 'Communication': return 'bg-green-100 text-green-800';
      case 'Payments': return 'bg-purple-100 text-purple-800';
      case 'Search': return 'bg-gray-100 text-gray-800';
      case 'Feedback': return 'bg-yellow-100 text-yellow-800';
      case 'Favorites': return 'bg-red-100 text-red-800';
      case 'Alerts': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white text-xs">Completed</Badge>;
      case 'active':
        return <Badge className="bg-blue-500 text-white text-xs">Active</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500 text-white text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold">Recent Activity</h1>
            </div>
            <p className="text-gray-600">
              Track all your interactions, project updates, and platform activity in one place.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {filteredActivities.length} activities • Last updated 2 hours ago
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="search">Search</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date}>
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {new Date(date).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
                <div className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {activities.length} activities
                </div>
              </div>

              <div className="space-y-3">
                {activities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <Card key={activity.id} className={`border-l-4 ${getPriorityColor(activity.priority)} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-sm">{activity.title}</h3>
                                  {getStatusBadge(activity.status)}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className={`text-xs ${getCategoryColor(activity.category)}`}>
                                    {activity.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{activity.time}</span>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredActivities.length >= 15 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Activities
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterType('all');
                setFilterDate('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
