import { Shield, PoundSterling, Target, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "CQC-Compliant Network",
    description: "Every provider verified for regulatory compliance",
  },
  {
    icon: PoundSterling,
    title: "Transparent Pricing",
    description: "Compare quotes from multiple providers instantly",
  },
  {
    icon: Target,
    title: "Expert Matching",
    description: "Smart matching based on your specific care needs",
  },
  {
    icon: Star,
    title: "Trusted Reviews",
    description: "Real reviews from care providers in your position",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Care Providers Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
