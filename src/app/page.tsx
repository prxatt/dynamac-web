import { Hero } from "@/components/sections/Hero";
import { PurchaseSection } from "@/components/sections/PurchaseSection";
import { TabsSection } from "@/components/sections/TabsSection";

export default function HomePage() {
  return (
    <div className="home">
      <Hero />
      <TabsSection />
      <PurchaseSection />
    </div>
  );
}
