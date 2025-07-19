import React from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { Star, Users, TrendingUp } from "lucide-react";

const CardsSection: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    { Icon: Star, title: t("cardTitle1"), desc: t("cardDesc1"), color: "blue" },
    {
      Icon: Users,
      title: t("cardTitle2"),
      desc: t("cardDesc2"),
      color: "green",
    },
    {
      Icon: TrendingUp,
      title: t("cardTitle3"),
      desc: t("cardDesc3"),
      color: "purple",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map(({ Icon, title, desc, color }, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`bg-${color}-100 dark:bg-${color}-900 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center`}
            >
              <Icon
                className={`h-8 w-8 text-${color}-600 dark:text-${color}-400`}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
