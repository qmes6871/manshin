import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import IntroSection from '@/components/home/IntroSection';
import ServicePreview from '@/components/home/ServicePreview';
import GallerySection from '@/components/home/GallerySection';
import RecommendSection from '@/components/home/RecommendSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <IntroSection />
      <ServicePreview />
      <GallerySection />
      <RecommendSection />
      <CTASection />
    </>
  );
}
