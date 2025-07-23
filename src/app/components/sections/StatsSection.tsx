import { useLanguage } from "@/app/lib/LanguageContext";
import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startCount = 0;
    const endCount = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startCount + (endCount - startCount) * easeOutQuart
      );
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-center group">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 transform group-hover:scale-105 transition-transform duration-300">
        {prefix}
        {count}
        {suffix}
      </div>
    </div>
  );
};

interface Stat {
  number: number;
  suffix?: string;
  label: string;
}

const StatsSection: React.FC = () => {
  const { t } = useLanguage();

  const stats: Stat[] = [
    {
      number: 500,
      suffix: "+",
      label: t("stats.ProfessionalsSupported"),
    },
    {
      number: 85,
      suffix: "%",
      label: t("stats.BlueCardSuccessRate"),
    },
    {
      number: 15,
      suffix: "",
      label: t("stats.EuropeanPartnerCountries"),
    },
    {
      number: 95,
      suffix: "%",
      label: t("stats.CustomerSatisfaction"),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-300 dark:from-blue-700 dark:to-blue-500 py-16 md:py-20 relative overflow-hidden mb-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("stats.title")}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t("stats.description")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group transform ">
              {/* Animated Counter */}
              <AnimatedCounter
                end={stat.number}
                suffix={stat.suffix}
                duration={2000 + index * 200}
              />

              {/* Label */}
              <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium mt-2 leading-relaxed">
                {stat.label}
              </p>

              {/* Decorative line */}
              <div className="w-16 h-1 bg-white/30 mx-auto mt-4 rounded-full group-hover:bg-white/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
