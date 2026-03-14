import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SellerDashboardHeader } from '../components/SellerDashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Briefcase,
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ProjectSearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const specialty = searchParams.get('specialty') || '';

  const [sortBy, setSortBy] = useState('relevance');

  // Mock project data - in real app this would come from API
  const projects = [
    {
      id: 1,
      title: 'CQC Registration for New Care Home',
      description: 'We need complete CQC registration assistance for our new 50-bed residential care home. Looking for experienced consultants who can handle the entire registration process.',
      budget: 2500,
      budgetType: 'fixed',
      location: 'London, UK',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      specialty: 'CQC Registration',
      client: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ',
        rating: 4.8,
        reviews: 23,
        verified: true
      },
      proposals: 12,
      status: 'open',
      urgency: 'high',
      skills: ['CQC Registration', 'Healthcare Compliance', 'Regulatory Documentation']
    },
    {
      id: 2,
      title: 'Healthcare Compliance Audit Services',
      description: 'Comprehensive compliance audit needed for our nursing home chain. Must have experience with CQC standards and healthcare regulations.',
      budget: 1800,
      budgetType: 'fixed',
      location: 'Manchester, UK',
      postedDate: '2024-01-12',
      deadline: '2024-02-10',
      specialty: 'Healthcare Compliance Audit',
      client: {
        name: 'David Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidC',
        rating: 4.6,
        reviews: 18,
        verified: true
      },
      proposals: 8,
      status: 'open',
      urgency: 'medium',
      skills: ['Healthcare Compliance Audit', 'CQC Standards', 'Risk Assessment']
    },
    {
      id: 3,
      title: 'Care Home Licensing Application',
      description: 'Assistance needed with care home licensing application for a new residential facility. Complete package including all documentation and regulatory submissions.',
      budget: 3200,
      budgetType: 'fixed',
      location: 'Birmingham, UK',
      postedDate: '2024-01-10',
      deadline: '2024-02-20',
      specialty: 'Care Home Licensing',
      client: {
        name: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaW',
        rating: 4.9,
        reviews: 31,
        verified: true
      },
      proposals: 15,
      status: 'open',
      urgency: 'high',
      skills: ['Care Home Licensing', 'Regulatory Documentation', 'Licensing Support']
    },
    {
      id: 4,
      title: 'Nursing Home Registration Support',
      description: 'Expert assistance required for nursing home registration process. Need someone with proven track record in healthcare regulatory compliance.',
      budget: 2800,
      budgetType: 'fixed',
      location: 'Leeds, UK',
      postedDate: '2024-01-08',
      deadline: '2024-02-08',
      specialty: 'Nursing Home Registration',
      client: {
        name: 'Michael Roberts',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelR2',
        rating: 4.7,
        reviews: 27,
        verified: true
      },
      proposals: 9,
      status: 'open',
      urgency: 'medium',
      skills: ['Nursing Home Registration', 'CQC Registration', 'Healthcare Regulation']
    },
    {
      id: 5,
      title: 'Medical Compliance Services Package',
      description: 'Ongoing medical compliance services needed for our healthcare facility. Includes regular audits, documentation review, and compliance training.',
      budget: 4500,
      budgetType: 'monthly',
      location: 'Liverpool, UK',
      postedDate: '2024-01-05',
      deadline: '2024-03-05',
      specialty: 'Medical Compliance Services',
      client: {
        name: 'Lisa Anderson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LisaA2',
        rating: 4.8,
        reviews: 34,
        verified: true
      },
      proposals: 6,
      status: 'open',
      urgency: 'low',
      skills: ['Medical Compliance Services', 'Regulatory Audits', 'Compliance Training']
    },
    {
      id: 6,
      title: 'CQC Inspection Preparation Training',
      description: 'Need expert to conduct CQC inspection preparation training for our care home staff. Comprehensive training program covering all aspects of inspection readiness.',
      budget: 1500,
      budgetType: 'fixed',
      location: 'Sheffield, UK',
      postedDate: '2024-01-03',
      deadline: '2024-02-03',
      specialty: 'CQC Inspection Preparation',
      client: {
        name: 'James Harrison',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamesH2',
        rating: 4.5,
        reviews: 19,
        verified: true
      },
      proposals: 11,
      status: 'open',
      urgency: 'medium',
      skills: ['CQC Inspection Preparation', 'Mock Inspections', 'Compliance Training']
    },
    {
      id: 7,
      title: 'Healthcare Setup Consulting',
      description: 'Complete consulting services needed for setting up a new healthcare facility. From regulatory compliance to operational planning.',
      budget: 5000,
      budgetType: 'fixed',
      location: 'Newcastle, UK',
      postedDate: '2024-01-01',
      deadline: '2024-03-01',
      specialty: 'Healthcare Setup Consulting',
      client: {
        name: 'Rachel Adams',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RachelA2',
        rating: 4.9,
        reviews: 42,
        verified: true
      },
      proposals: 7,
      status: 'open',
      urgency: 'high',
      skills: ['Healthcare Setup Consulting', 'Facility Planning', 'Regulatory Compliance']
    },
    {
      id: 8,
      title: 'Regulatory Documentation Support',
      description: 'Ongoing regulatory documentation support needed for our care home. Includes policy development, procedure manuals, and compliance reports.',
      budget: 2200,
      budgetType: 'monthly',
      location: 'Oxford, UK',
      postedDate: '2023-12-28',
      deadline: '2024-02-28',
      specialty: 'Regulatory Documentation',
      client: {
        name: 'Kevin Murphy',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KevinM',
        rating: 4.6,
        reviews: 25,
        verified: true
      },
      proposals: 13,
      status: 'open',
      urgency: 'medium',
      skills: ['Regulatory Documentation', 'Policy Development', 'Compliance Reporting']
    }
  ];

  // Filter projects by search criteria
  const filteredProjects = projects.filter(project => {
    const queryMatch = !query || (
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );

    const locationMatch = !location || project.location.toLowerCase().includes(location.toLowerCase());
    const specialtyMatch = !specialty || specialty === 'All Specialties' || project.specialty === specialty;

    return queryMatch && locationMatch && specialtyMatch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'budget-high':
        return b.budget - a.budget;
      case 'budget-low':
        return a.budget - b.budget;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerDashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full overflow-hidden">
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

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {query ? `Projects matching "${query}"` : 'Available Projects'}
                {specialty && specialty !== 'All Specialties' && <span className="text-gray-600"> in {specialty}</span>}
                {location && <span className="text-gray-600"> • {location}</span>}
              </h1>
              <p className="text-gray-600 mt-2">
                {sortedProjects.length} projects available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                  <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  <SelectItem value="deadline">Deadline Soon</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {sortedProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          £{project.budget.toLocaleString()}
                          {project.budgetType === 'monthly' && <span className="text-sm font-normal">/mo</span>}
                        </div>
                        <div className="text-xs text-gray-500">{project.budgetType}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted: {new Date(project.postedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{project.specialty}</Badge>
                      {project.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <img src={project.client.avatar} alt={project.client.name} />
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{project.client.name}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {project.client.rating} ({project.client.reviews} reviews)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 flex-shrink-0">
                      <span>{project.proposals} proposals</span>
                      <Badge variant={
                        project.urgency === 'high' ? 'destructive' :
                        project.urgency === 'medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {project.urgency} priority
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Button variant="outline" size="sm" className="w-full h-10">
                      View Details
                    </Button>
                    <Button size="sm" className="w-full h-10">
                      Submit Proposal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {sortedProjects.length >= 20 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Briefcase className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new projects.
            </p>
            <Button className="mt-4" onClick={() => navigate(-1)}>
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
