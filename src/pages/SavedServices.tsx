import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/DashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Clock,
  X,
  ExternalLink,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SavedServices() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recent');

  // Database queries will populate this array; currently empty
  const [savedServices, setSavedServices] = useState([]);

  const removeSavedService = (serviceId: number) => {
    setSavedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const sortedServices = [...savedServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.provider.rating - a.provider.rating;
      case 'recent':
      default:
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
    }
  });

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
              <h1 className="text-3xl font-bold mb-2">Saved Services</h1>
              <p className="text-gray-600">
                Your favorite healthcare service providers ({savedServices.length} saved)
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Saved</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Saved Services Grid */}
        {savedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => removeSavedService(service.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      <Heart className="h-3 w-3 mr-1 fill-red-500 text-red-500" />
                      Saved
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <img src={service.provider.avatar} alt={service.provider.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{service.provider.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{service.provider.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({service.provider.reviews})
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.provider.level}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.deliveryTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {service.provider.badge}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">From £{service.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Saved {new Date(service.savedDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/seller/${service.provider.id}`}>
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
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Saved Services</h3>
              <p className="text-gray-500 mb-4">
                You haven't saved any services yet. Browse services and save your favorites for easy access later.
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
