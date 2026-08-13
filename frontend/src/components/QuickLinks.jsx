import {
  Building2,
  History,
  CalendarDays,
  Images,
  Heart,
  UserRound,
  Newspaper,
  Phone,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";


function QuickLinks() {

  const { t } = useLanguage();


  const links = [
    {
      icon: Building2,
      title: t.quickLinks.aboutTitle,
      subtitle: t.quickLinks.aboutSubtitle,
      href: "#about",
    },
    {
      icon: History,
      title: t.quickLinks.historyTitle,
      subtitle: t.quickLinks.historySubtitle,
      href: "#history",
    },
    {
      icon: CalendarDays,
      title: t.quickLinks.dasaraTitle,
      subtitle: t.quickLinks.dasaraSubtitle,
      href: "#dasara-section",
    },
    {
      icon: Images,
      title: t.quickLinks.galleryTitle,
      subtitle: t.quickLinks.gallerySubtitle,
      href: "#gallery",
    },
    {
      icon: Heart,
      title: t.quickLinks.donateTitle,
      subtitle: t.quickLinks.donateSubtitle,
      href: "#donate",
    },
    {
      icon: UserRound,
      title: t.quickLinks.deekshaTitle,
      subtitle: t.quickLinks.deekshaSubtitle,
      href: "#deeksha",
    },
    {
      icon: Newspaper,
      title: t.quickLinks.updatesTitle,
      subtitle: t.quickLinks.updatesSubtitle,
      href: "#updates",
    },
    {
      icon: Phone,
      title: t.quickLinks.contactTitle,
      subtitle: t.quickLinks.contactSubtitle,
      href: "#contact",
    },
  ];


  return (
    <section className="quick-links">
      <div className="quick-links-container">
        {links.map((link) => {
          const Icon = link.icon;


          return (
            <a
              key={link.title}
              href={link.href}
              className="quick-link"
            >
              <div className="quick-link-icon">
                <Icon size={23} strokeWidth={1.7} />
              </div>


              <div className="quick-link-content">
                <strong>{link.title}</strong>
                <span>{link.subtitle}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}


export default QuickLinks;