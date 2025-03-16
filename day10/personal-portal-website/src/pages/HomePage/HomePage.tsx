import type React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import StatsSection from "../../components/StatsSection/StatsSection";
import NewsletterSection from "../../components/NewsletterSection/NewsletterSection";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <ProjectsSection />
      <FeaturesSection />
      <StatsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
