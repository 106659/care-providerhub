import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Find Your Perfect Provider?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 1,500+ care providers who trust Providers Hub
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-3 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-14 text-base border-0">
                  <SelectValue placeholder="What service are you looking for?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cqc">CQC Registration</SelectItem>
                  <SelectItem value="consulting">Business Consulting</SelectItem>
                  <SelectItem value="software">Care Software</SelectItem>
                  <SelectItem value="training">Training Services</SelectItem>
                  <SelectItem value="visa">Sponsor Visa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:w-64">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter your postcode"
                  className="h-14 pl-10 text-base border-0"
                />
              </div>
            </div>
            
            <Button size="lg" className="h-14 px-8 bg-secondary hover:bg-secondary/90">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/90 mb-4 text-lg">or</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white hover:bg-white/90 text-primary">
              Find Services
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
              Join as Professional
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
