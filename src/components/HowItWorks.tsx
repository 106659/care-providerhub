import { Search, MessageSquare, Mail } from "lucide-react";
const steps = [{
  number: "1",
  icon: Search,
  title: "Search & Discover",
  description: "Enter your service need and postcode. Browse verified, CQC-compliant providers."
}, {
  number: "2",
  icon: MessageSquare,
  title: "Answer Quick Questions",
  description: "Tell us about your specific needs. Get matched with perfect providers."
}, {
  number: "3",
  icon: Mail,
  title: "Register with Email",
  description: "Quick email verification. Connect directly with providers."
}];
export const HowItWorks = () => {
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to find your perfect provider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" style={{
          width: 'calc(100% - 200px)',
          left: '100px'
        }} />
          
          {steps.map((step, index) => {
          const Icon = step.icon;
          return <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-6 relative z-10 shadow-lg">
                  <Icon className="h-12 w-12 text-primary-foreground" />
                </div>
                
                
                
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>;
        })}
        </div>
      </div>
    </section>;
};