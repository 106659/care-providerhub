import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Found our CQC registration consultant through Providers Hub. Professional, knowledgeable, and we were registered in just 14 weeks. Couldn't have done it without them!",
    name: "Emma Thompson",
    role: "Director",
    organization: "New Beginnings Care Home",
    service: "CQC Registration",
    rating: 5,
  },
  {
    quote: "The care management software we discovered has transformed how we operate. Staff scheduling, MAR charts, everything in one place. Game changer!",
    name: "David Patel",
    role: "Operations Manager",
    organization: "HomeFirst Care Services",
    service: "Care Software",
    rating: 5,
  },
  {
    quote: "Excellent training provider for our entire team. All staff now fully compliant and confident. Worth every penny.",
    name: "Lisa Williams",
    role: "Care Coordinator",
    organization: "Meadowview Residential",
    service: "Training",
    rating: 5,
  },
  {
    quote: "The sponsor visa consultant made the process so straightforward. We've now successfully recruited 5 international care workers.",
    name: "James Morrison",
    role: "HR Director",
    organization: "CarePlus Group",
    service: "Visa Services",
    rating: 5,
  },
  {
    quote: "Found our accountant who specializes in care homes. They understand the sector and saved us thousands on our taxes.",
    name: "Priya Shah",
    role: "Owner",
    organization: "Golden Years Care",
    service: "Accounting",
    rating: 5,
  },
  {
    quote: "Health & Safety consultant helped us achieve CQC 'Good' rating. Their audit was thorough and action plan was clear.",
    name: "Robert Taylor",
    role: "Manager",
    organization: "Willow Lodge",
    service: "Consulting",
    rating: 5,
  },
];

export const WrittenTestimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-2">
                  {testimonial.organization}
                </p>

                <Badge variant="secondary" className="text-xs">
                  {testimonial.service}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
