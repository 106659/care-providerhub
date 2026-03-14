import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ctaCareProviders from "@/assets/cta-care-providers.jpg";

const benefits = [
  "Find CQC registration specialists",
  "Connect with business consultants",
  "Discover compliance experts",
  "Access training providers",
  "Source essential supplies",
];

export const ForCareProviders = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={ctaCareProviders}
              alt="Care providers team"
              className="rounded-xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Starting or Growing Your Care Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need in one place
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <p className="text-foreground text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Find Services Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
