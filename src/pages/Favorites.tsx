import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/DashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Clock,
  X,
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock favorites data - services that users have favorited
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Healthcare Compliance Audit Services',
      provider: {
        id: 'david-thompson',
        name: 'David Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        rating: 4.9,
        reviews: 67,
        level: 'Level 2',
        badge: 'Top Rated',
        isOnline: true
      },
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      price: 850,
      deliveryTime: '5 days',
      location: 'Manchester, UK',
      favoritedDate: '2024-01-18',
      category: 'Healthcare Compliance',
      tags: ['CQC', 'Audit', 'Regulatory'],
      description: 'Comprehensive compliance audit services with detailed reporting and actionable recommendations.',
      isActive: true,
      responseTime: '< 2 hours'
    },
    {
      id: 2,
      title: 'Care Home Setup & Licensing',
      provider: {
        id: 'emma-wilson',
        name: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        rating: 5.0,
        reviews: 52,
        level: 'Level 1',
        badge: 'Rising Star',
        isOnline: false
      },
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
      price: 2200,
      deliveryTime: '7 days',
      location: 'Birmingham, UK',
      favoritedDate: '2024-01-16',
      category: 'Care Home Setup',
      tags: ['Licensing', 'Setup', 'CQC'],
      description: 'Complete care home setup and licensing support from planning to regulatory approval.',
      isActive: true,
      responseTime: '< 4 hours'
    },
    {
      id: 3,
      title: 'Medical Staff Recruitment & Compliance',
      provider: {
        id: 'lisa-johnson',
        name: 'Lisa Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        rating: 4.8,
        reviews: 34,
        level: 'Level 1',
        badge: 'Verified',
        isOnline: true
      },
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      price: 1200,
      deliveryTime: '3 days',
      location: 'Sheffield, UK',
      favoritedDate: '2024-01-14',
      category: 'Staff Recruitment',
      tags: ['Recruitment', 'Compliance', 'Medical Staff'],
      description: 'Professional recruitment services with full compliance verification and background checks.',
      isActive: true,
      responseTime: '< 1 hour'
    },
    {
      id: 4,
      title: 'Healthcare IT Solutions & Software',
      provider: {
        id: 'rachel-green',
        name: 'Rachel Green',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
        rating: 5.0,
        reviews: 89,
        level: 'Level 3',
        badge: 'Pro Seller',
        isOnline: true
      },
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
      price: 3500,
      deliveryTime: '10 days',
      location: 'London, UK',
      favoritedDate: '2024-01-12',
      category: 'IT Solutions',
      tags: ['Software', 'IT', 'Healthcare Systems'],
      description: 'Custom healthcare software solutions and IT infrastructure setup.',
      isActive: true,
      responseTime: '< 3 hours'
    },
    {
      id: 5,
      title: 'Regulatory Documentation Services',
      provider: {
        id: 'michael-chen',
        name: 'Michael Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        rating: 4.8,
        reviews: 28,
        level: 'Level 1',
        badge: 'Verified',
        isOnline: false
      },
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      price: 650,
      deliveryTime: '2 days',
      location: 'Leeds, UK',
      favoritedDate: '2024-01-10',
      category: 'Documentation',
      tags: ['Regulatory', 'Documentation', 'CQC'],
      description: 'Professional regulatory documentation preparation and compliance review.',
      isActive: true,
      responseTime: '< 6 hours'
    },
    {
      id: 6,
      title: 'Healthcare Training & Certification',
      provider: {
        id: 'james-parker',
        name: 'James Parker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        rating: 4.9,
        reviews: 71,
        level: 'Level 2',
        badge: 'Top Rated',
        isOnline: true
      },
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      price: 1800,
      deliveryTime: '4 days',
      location: 'Liverpool, UK',
      favoritedDate: '2024-01-08',
      category: 'Training',
      tags: ['Training', 'Certification', 'CQC'],
      description: 'Comprehensive healthcare training programs and certification courses.',
      isActive: false,
      responseTime: 'Offline'
    }
  ]);

  const removeFavorite = (serviceId: number) => {
    setFavorites(prev => prev.filter(service => service.id !== serviceId));
  };

  const filteredFavorites = favorites.filter(favorite => {
    if (searchQuery) {
      return favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             favorite.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             favorite.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
             favorite.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.provider.rating - a.provider.rating;
      case 'recent':
      default:
        return new Date(b.favoritedDate).getTime() - new Date(a.favoritedDate).getTime();
    }
  });

  const activeFavorites = sortedFavorites.filter(fav => fav.isActive);
  const offlineFavorites = sortedFavorites.filter(fav => !fav.isActive);

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

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                <h1 className="text-3xl font-bold">My Favorites</h1>
              </div>
              <p className="text-gray-600">
                Your saved healthcare service providers ({sortedFavorites.length} favorites)
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Favorites</p>
                  <p className="text-2xl font-bold">{favorites.length}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Providers</p>
                  <p className="text-2xl font-bold text-green-600">{activeFavorites.length}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold flex items-center">
                    {(sortedFavorites.reduce((sum, fav) => sum + fav.provider.rating, 0) / sortedFavorites.length).toFixed(1)}
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 ml-1" />
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length > 0 ? (
          <div className="space-y-8">
            {/* Active Providers */}
            {activeFavorites.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold">Active Providers ({activeFavorites.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeFavorites.map((favorite) => (
                    <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                      <div className="aspect-video relative">
                        <img
                          src={favorite.image}
                          alt={favorite.title}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white">
                            <Heart className="h-3 w-3 mr-1 fill-white" />
                            Favorited
                          </Badge>
                        </div>
                        {favorite.provider.isOnline && (
                          <div className="absolute bottom-2 right-2">
                            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                              Online
                            </div>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <img src={favorite.provider.avatar} alt={favorite.provider.name} />
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{favorite.provider.name}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs ml-1">{favorite.provider.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">
                                  ({favorite.provider.reviews})
                                </span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {favorite.provider.level}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-medium text-sm mb-2 line-clamp-2">
                          {favorite.title}
                        </h3>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {favorite.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {favorite.location}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {favorite.responseTime}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {favorite.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {favorite.provider.badge}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">From £{favorite.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">
                              Added {new Date(favorite.favoritedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button asChild size="sm" className="flex-1">
                            <Link to={`/seller/${favorite.provider.id}`}>
                              View Profile
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Providers */}
            {offlineFavorites.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="h-5 w-5 rounded-full bg-gray-300 mr-2"></div>
                  <h2 className="text-xl font-semibold">Offline Providers ({offlineFavorites.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                  {offlineFavorites.map((favorite) => (
                    <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative">
                        <img
                          src={favorite.image}
                          alt={favorite.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-gray-500 text-white">
                            <Heart className="h-3 w-3 mr-1" />
                            Favorited
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-medium">
                            Currently Offline
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="h-8 w-8">
                            <img src={favorite.provider.avatar} alt={favorite.provider.name} />
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{favorite.provider.name}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs ml-1">{favorite.provider.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">
                                  ({favorite.provider.reviews})
                                </span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {favorite.provider.level}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-medium text-sm mb-2 line-clamp-2">
                          {favorite.title}
                        </h3>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {favorite.provider.badge}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">From £{favorite.price.toLocaleString()}</div>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full" disabled>
                          Provider Offline
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
              <p className="text-gray-500 mb-4">
                Start exploring healthcare services and save your favorites for quick access.
              </p>
              <Button onClick={() => navigate('/home')}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}
