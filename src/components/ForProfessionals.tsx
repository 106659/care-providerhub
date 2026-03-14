import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ctaProfessionals from "@/assets/cta-professionals.jpg";

const benefits = [
  "Reach 1,500+ active care providers",
  "Showcase your expertise",
  "Generate quality leads daily",
  "Build your industry reputation",
  "Flexible membership options",
];

export const ForProfessionals = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join as a Professional Provider
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Grow your business with qualified leads
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
              Join as a Professional
            </Button>
          </div>

          {/* Image */}
          <div>
            <img
              src={ctaProfessionals}
              alt="Professional consultant"
              className="rounded-xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
