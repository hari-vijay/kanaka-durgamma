import {
  BookOpen,
  ArrowRight,
  Clock3,
  ArrowDown,
} from "lucide-react";


import { useTemple } from "../context/TempleContext";
import { useLanguage } from "../context/LanguageContext";


function TempleHistory() {
  const { templeInfo, loading } = useTemple();

  const { t } = useLanguage();


  const templeHistory =
    templeInfo?.history ||
    t.history.descriptionDefault;


  const milestones = [
    {
      year: t.history.milestones.beginning.year,
      title: t.history.milestones.beginning.title,
      description: templeHistory,
    },
    {
      year: t.history.milestones.tradition.year,
      title: t.history.milestones.tradition.title,
      description:
        t.history.milestones.tradition.description,
    },
    {
      year: t.history.milestones.development.year,
      title: t.history.milestones.development.title,
      description:
        t.history.milestones.development.description,
    },
    {
      year: t.history.milestones.today.year,
      title: t.history.milestones.today.title,
      description:
        t.history.milestones.today.description,
    },
  ];


  return (
    <section className="temple-history" id="history">


      <div className="temple-history-container">


        {/* Header */}


        <div className="section-heading history-heading">


          <div className="section-eyebrow">
            <BookOpen size={15} />
            {t.history.eyebrow}
          </div>


          <h2>
            {t.history.headingBefore}
            <span> {t.history.headingHighlight}</span>
          </h2>


          <p>
            {loading
              ? t.history.loading
              : templeHistory}
          </p>


        </div>


        {/* Timeline */}


        <div className="history-timeline">


          <div className="history-line" />


          {milestones.map((item, index) => (
            <div
              className={`history-item ${
                index % 2 === 0
                  ? "history-item-left"
                  : "history-item-right"
              }`}
              key={item.title}
            >


              <div className="history-marker">
                <Clock3 size={15} />
              </div>


              <div className="history-card">


                <span className="history-year">
                  {item.year}
                </span>


                <h3>
                  {item.title}
                </h3>


                <p>
                  {item.description}
                </p>


              </div>


            </div>
          ))}


        </div>


        {/* CTA */}


        <div className="history-cta">


          <div>


            <span>
              {t.history.ctaEyebrow}
            </span>


            <strong>
              {t.history.ctaTitle}
            </strong>


          </div>


          <a
            href="#pillars"
            className="history-cta-link"
          >
            {t.history.ctaLink}
            <ArrowDown size={16} />
          </a>


        </div>


      </div>


    </section>
  );
}


export default TempleHistory;