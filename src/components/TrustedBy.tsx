import { Shield, Users, MapPin } from "lucide-react";

export const TrustedBy = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Trusted by over 1,500 care providers across the UK
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-8 w-8 text-accent" />
            <span className="font-semibold text-foreground">CQC Compliant Verified</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-8 w-8 text-accent" />
            <span className="font-semibold text-foreground">1,500+ Providers</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-8 w-8 text-accent" />
            <span className="font-semibold text-foreground">UK-Wide Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
};
