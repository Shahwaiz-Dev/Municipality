'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for the dropdown menu
const dropdownVariants = {
  initial: { opacity: 0, scale: 0.98, y: -5 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.98, y: -5, transition: { duration: 0.15 } },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  // Dropdown close timer
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Menu definition
  const menu = {
    en: [
      { name: "Home", href: "/" },
      {
        name: "Municipality", href: "/municipality", dropdown: [
          {
            name: "Mayor's Message", href: "/municipality/mayors-message", dropdown: [
              { name: "Mayor CV", href: "/municipality/mayors-message/cv" },
            ]
          },
          { name: "Municipal Council", href: "/municipality/council" },
          { name: "Municipal Committees", href: "/municipality/committees" },
          { name: "Old Municipal Councils", href: "/municipality/old-councils" },
          {
            name: "Tour in Agios Athanasios", href: "/municipality/tour", dropdown: [
              { name: "Town Hall", href: "/municipality/tour/town-hall" },
              { name: "Municipal Library", href: "/municipality/tour/library" },
              { name: "Folklore Museum", href: "/municipality/tour/folklore-museum" },
              { name: "Event Hall", href: "/municipality/tour/event-hall" },
              { name: "Cultural Center", href: "/municipality/tour/cultural-center" },
              { name: "Municipal Youth Center", href: "/municipality/tour/youth-center" },
              { name: "Schools", href: "/municipality/tour/schools" },
              { name: "Parks", href: "/municipality/tour/parks" },
              { name: "Municipal Sports Fields", href: "/municipality/tour/sports-fields" },
              { name: "Churches", href: "/municipality/tour/churches" },
            ]
          },
          { name: "Newsletter", href: "/municipality/newsletter" },
        ]
      },
      {
        name: "Agios Athanasios", href: "/agios-athanasios", dropdown: [
          { name: "History", href: "/agios-athanasios/history" },
          {
            name: "Roads / Postal Codes", href: "/agios-athanasios/roads-postal-codes", dropdown: [
              { name: "Parish of St. Athanasios", href: "/agios-athanasios/roads-postal-codes/parish-athanasios" },
              { name: "Parish of St. Stylianos", href: "/agios-athanasios/roads-postal-codes/parish-stylianos" },
              { name: "Parish of St. George Fragoudis", href: "/agios-athanasios/roads-postal-codes/parish-george-fragoudis" },
              { name: "Parish Apostolou Louca", href: "/agios-athanasios/roads-postal-codes/parish-apostolou-louca" },
            ]
          },
          { name: "Industrial Area", href: "/agios-athanasios/industrial-area" },
          { name: "Twinned Cities", href: "/agios-athanasios/twinned-cities" },
        ]
      },
      {
        name: "Municipal Services", href: "/municipal-services", dropdown: [
          { name: "Citizen's Service Bureau", href: "/municipal-services/citizens-service-bureau" },
          { name: "Secretariat", href: "/municipal-services/secretariat" },
          { name: "Technical Department", href: "/municipal-services/technical-department" },
          { name: "Finance Department", href: "/municipal-services/finance-department" },
          {
            name: "Health Department", href: "/municipal-services/health-department", dropdown: [
              { name: "Useful Forms & Advice", href: "/municipal-services/health-department/forms-advice" },
              { name: "Recycle", href: "/municipal-services/health-department/recycle" },
              { name: "Environment", href: "/municipal-services/health-department/environment" },
            ]
          },
          { name: "Cultural Department", href: "/municipal-services/cultural-department" },
        ]
      },
      {
        name: "Citizen's Service", href: "/citizens-service", dropdown: [
          { name: "Submitting Suggestions / Complaints", href: "/citizens-service/suggestions-complaints" },
          { name: "Electronic Municipality", href: "/citizens-service/electronic-municipality" },
          { name: "Forms and Advice", href: "/citizens-service/forms-advice" },
          { name: "Waste Management", href: "/citizens-service/waste-management" },
          { name: "Neighborhood Police Officer", href: "/citizens-service/neighborhood-police" },
          { name: "Neighborhood Observer", href: "/citizens-service/neighborhood-observer" },
          { name: "Electoral Rights", href: "/citizens-service/electoral-rights" },
          { name: "Local Governors of Agios Athanasios", href: "/citizens-service/local-governors" },
          { name: "Publication Plan", href: "/citizens-service/publication-plan" },
          { name: "Connections", href: "/citizens-service/connections" },
          { name: "Useful Telephones", href: "/citizens-service/useful-telephones" },
        ]
      },
      {
        name: "Social Services", href: "/social-services", dropdown: [
          { name: "Open School", href: "/social-services/open-school" },
          {
            name: "Community Volunteer Council", href: "/social-services/ske", dropdown: [
              { name: "Center for the Protection and Employment of Children", href: "/social-services/ske/children-center" },
              { name: "Child Care Station", href: "/social-services/ske/child-care" },
              { name: "Adult Employment Center", href: "/social-services/ske/adult-center" },
              { name: "Social Shop", href: "/social-services/ske/social-shop" },
            ]
          },
          { name: "Youth City Council", href: "/social-services/youth-council" },
          { name: "Odysseus Counselling Station", href: "/social-services/odysseus-counselling" },
        ]
      },
      {
        name: "Cultural", href: "/cultural", dropdown: [
          { name: "Municipal Choir", href: "/cultural/choir" },
        ]
      },
      {
        name: "Civil Marriages", href: "/civil-marriages", dropdown: [
          { name: "Performing Civil Marriages", href: "/civil-marriages/performing" },
          { name: "General Information", href: "/civil-marriages/info" },
          { name: "Required Documents", href: "/civil-marriages/documents" },
          { name: "Fotos – Gallery", href: "/civil-marriages/gallery" },
        ]
      },
      {
        name: "European", href: "/european", dropdown: [
          {
            name: "EU and European Programs", href: "/european/eu-programs", dropdown: [
              { name: "Child Care Centre", href: "/european/eu-programs/child-care-centre" },
              { name: "Children's Corner", href: "/european/eu-programs/childrens-corner" },
              {
                name: "MuNet", href: "/european/eu-programs/munet", dropdown: [
                  { name: "News – Events – MuNet", href: "/european/eu-programs/munet/news" },
                ]
              },
              {
                name: "CREAMED", href: "/european/eu-programs/creamed", dropdown: [
                  { name: "Objectives of the project", href: "/european/eu-programs/creamed/objectives" },
                  { name: "Results", href: "/european/eu-programs/creamed/results" },
                  { name: "News – Events – CREAMED", href: "/european/eu-programs/creamed/news" },
                  { name: "Program MED", href: "/european/eu-programs/creamed/med" },
                  { name: "Project Partners", href: "/european/eu-programs/creamed/partners" },
                ]
              },
              {
                name: "PATCH", href: "/european/eu-programs/patch", dropdown: [
                  { name: "Patch Guidelines", href: "/european/eu-programs/patch/guidelines" },
                  { name: "News – Events – PATCH", href: "/european/eu-programs/patch/news" },
                ]
              },
              { name: "Snapshots from The Borders", href: "/european/eu-programs/snapshots" },
            ]
          },
          {
            name: "We Share", href: "/european/we-share", dropdown: [
              { name: "Partners", href: "/european/we-share/partners" },
              { name: "Project results", href: "/european/we-share/results" },
            ]
          },
          {
            name: "Valorg", href: "/european/valorg", dropdown: [
              { name: "Information – Forms", href: "/european/valorg/info" },
            ]
          },
          { name: "Don't Waste our Future", href: "/european/dont-waste" },
          { name: "Youchange", href: "/european/youchange" },
        ]
      },
      { name: "News", href: "/news" },
      { name: "Events", href: "/events" },
      { name: "Contact", href: "/contact" },
    ],
    el: [
      { name: "Αρχική", href: "/" },
      {
        name: "Δήμος", href: "/municipality", dropdown: [
          {
            name: "Πρόεδρος", href: "/municipality/mayors-message", dropdown: [
              { name: "Βιογραφικό", href: "/municipality/mayors-message/cv" },
            ]
          },
          { name: "Περιφερειακό Συμβούλιο", href: "/municipality/council" },
          { name: "Περιφερειακά Επιτροπή", href: "/municipality/committees" },
          { name: "Παλαιό Περιφερειακό Συμβούλιο", href: "/municipality/old-councils" },
          {
            name: "Περιπατητικό στο Αγίου Αθανασίου", href: "/municipality/tour", dropdown: [
              { name: "Γραφείο Δήμου", href: "/municipality/tour/town-hall" },
              { name: "Βιβλιοθήκη Δήμου", href: "/municipality/tour/library" },
              { name: "Ιστορικό Μουσείο", href: "/municipality/tour/folklore-museum" },
              { name: "Χώρος Εκδηλώσεων", href: "/municipality/tour/event-hall" },
              { name: "Πολιτιστικό Κέντρο", href: "/municipality/tour/cultural-center" },
              { name: "Πολιτιστικό Κέντρο Νέων", href: "/municipality/tour/youth-center" },
              { name: "Σχολεία", href: "/municipality/tour/schools" },
              { name: "Πάρκα", href: "/municipality/tour/parks" },
              { name: "Αθλητικά Πεδία Δήμου", href: "/municipality/tour/sports-fields" },
              { name: "Καθεδρικά", href: "/municipality/tour/churches" },
            ]
          },
          { name: "Εφημερίδα Δήμου", href: "/municipality/newsletter" },
        ]
      },
      {
        name: "Αγίου Αθανασίου", href: "/agios-athanasios", dropdown: [
          { name: "Ιστορία", href: "/agios-athanasios/history" },
          {
            name: "Οδικές / Κωδικοί Δόμων", href: "/agios-athanasios/roads-postal-codes", dropdown: [
              { name: "Parish of St. Athanasios", href: "/agios-athanasios/roads-postal-codes/parish-athanasios" },
              { name: "Parish of St. Stylianos", href: "/agios-athanasios/roads-postal-codes/parish-stylianos" },
              { name: "Parish of St. George Fragoudis", href: "/agios-athanasios/roads-postal-codes/parish-george-fragoudis" },
              { name: "Parish Apostolou Louca", href: "/agios-athanasios/roads-postal-codes/parish-apostolou-louca" },
            ]
          },
          { name: "Industrial Area", href: "/agios-athanasios/industrial-area" },
          { name: "Twinned Cities", href: "/agios-athanasios/twinned-cities" },
        ]
      },
      {
        name: "Υπηρεσίες Δήμου", href: "/municipal-services", dropdown: [
          { name: "Γραφείο Υπηρεσιών Πολίτη", href: "/municipal-services/citizens-service-bureau" },
          { name: "Γραφείο", href: "/municipal-services/secretariat" },
          { name: "Τεχνικό Τμήμα", href: "/municipal-services/technical-department" },
          { name: "Τμήμα Οικονομικών", href: "/municipal-services/finance-department" },
          {
            name: "Υπηρεσία Υγείας", href: "/municipal-services/health-department", dropdown: [
              { name: "Χρήσιμα Φύλλα & Συμβουλές", href: "/municipal-services/health-department/forms-advice" },
              { name: "Περίσσεια", href: "/municipal-services/health-department/recycle" },
              { name: "Περιβάλλον", href: "/municipal-services/health-department/environment" },
            ]
          },
          { name: "Τμήμα Πολιτισμού", href: "/municipal-services/cultural-department" },
        ]
      },
      {
        name: "Υπηρεσίες Πολίτη", href: "/citizens-service", dropdown: [
          { name: "Υποβολή Συνημμένων / Διαβίωσης", href: "/citizens-service/suggestions-complaints" },
          { name: "Ηλεκτρονικό Δήμο", href: "/citizens-service/electronic-municipality" },
          { name: "Φύλλα & Συμβουλές", href: "/citizens-service/forms-advice" },
          { name: "Καθαρισμός", href: "/citizens-service/waste-management" },
          { name: "Πολεοδομικός Επιταγμένος", href: "/citizens-service/neighborhood-police" },
          { name: "Πολεοδομικός Παρατηρητής", href: "/citizens-service/neighborhood-observer" },
          { name: "Δικαιώματα Εκλογής", href: "/citizens-service/electoral-rights" },
          { name: "Τοπικοί Γενικοί του Αγίου Αθανασίου", href: "/citizens-service/local-governors" },
          { name: "Πρόγραμμα Δημοσίευσης", href: "/citizens-service/publication-plan" },
          { name: "Συνδέσεις", href: "/citizens-service/connections" },
          { name: "Χρήσιμα Τηλέφωνα", href: "/citizens-service/useful-telephones" },
        ]
      },
      {
        name: "Κοινωνικές Υπηρεσίες", href: "/social-services", dropdown: [
          { name: "Ανοικτό Σχολείο", href: "/social-services/open-school" },
          {
            name: "Κοινωνικό Εθελοντικό Συμβούλιο", href: "/social-services/ske", dropdown: [
              { name: "Κέντρο Εξυπηρέτησης & Εργασίας Παιδιών", href: "/social-services/ske/children-center" },
              { name: "Σταθμός Καθαριότητας", href: "/social-services/ske/child-care" },
              { name: "Κέντρο Εργασίας Ενηλίκων", href: "/social-services/ske/adult-center" },
              { name: "Κοινωνικό Κατάστημα", href: "/social-services/ske/social-shop" },
            ]
          },
          { name: "Πολιτικός Σύμβουλος Νέων", href: "/social-services/youth-council" },
          { name: "Σταθμός Ενημέρωσης Odysseus", href: "/social-services/odysseus-counselling" },
        ]
      },
      {
        name: "Πολιτισμός", href: "/cultural", dropdown: [
          { name: "Κορυφαίο Χορός", href: "/cultural/choir" },
        ]
      },
      {
        name: "Νομικές Εκκλησίες", href: "/civil-marriages", dropdown: [
          { name: "Πραγματοποίηση Νομικών Εκκλησιών", href: "/civil-marriages/performing" },
          { name: "Γενική Πληροφόρηση", href: "/civil-marriages/info" },
          { name: "Απαιτούμενα Έγγραφα", href: "/civil-marriages/documents" },
          { name: "Φωτογραφίες – Γκαλερί", href: "/civil-marriages/gallery" },
        ]
      },
      {
        name: "Ευρωπαϊκά", href: "/european", dropdown: [
          {
            name: "Ευρωπαϊκά & Ευρωπαϊκά Προγράμματα", href: "/european/eu-programs", dropdown: [
              { name: "Κέντρο Εξυπηρέτησης Παιδιών", href: "/european/eu-programs/child-care-centre" },
              { name: "Παιδικό Σταθμό", href: "/european/eu-programs/childrens-corner" },
              {
                name: "MuNet", href: "/european/eu-programs/munet", dropdown: [
                  { name: "Νέα – Εκδηλώσεις – MuNet", href: "/european/eu-programs/munet/news" },
                ]
              },
              {
                name: "CREAMED", href: "/european/eu-programs/creamed", dropdown: [
                  { name: "Στόχοι του έργου", href: "/european/eu-programs/creamed/objectives" },
                  { name: "Αποτελέσματα", href: "/european/eu-programs/creamed/results" },
                  { name: "Νέα – Εκδηλώσεις – CREAMED", href: "/european/eu-programs/creamed/news" },
                  { name: "Πρόγραμμα MED", href: "/european/eu-programs/creamed/med" },
                  { name: "Συνεργάτες έργου", href: "/european/eu-programs/creamed/partners" },
                ]
              },
              {
                name: "PATCH", href: "/european/eu-programs/patch", dropdown: [
                  { name: "Οδηγίες PATCH", href: "/european/eu-programs/patch/guidelines" },
                  { name: "Νέα – Εκδηλώσεις – PATCH", href: "/european/eu-programs/patch/news" },
                ]
              },
              { name: "Στιγμές από τα Σύνορα", href: "/european/eu-programs/snapshots" },
            ]
          },
          {
            name: "Κοινοποιούμε", href: "/european/we-share", dropdown: [
              { name: "Συνεργάτες", href: "/european/we-share/partners" },
              { name: "Αποτελέσματα έργου", href: "/european/we-share/results" },
            ]
          },
          {
            name: "Valorg", href: "/european/valorg", dropdown: [
              { name: "Πληροφορίες – Φύλλα", href: "/european/valorg/info" },
            ]
          },
          { name: "Μην ξεχνάμε το Μέλλον", href: "/european/dont-waste" },
          { name: "Youchange", href: "/european/youchange" },
        ]
      },
      { name: "Νέα", href: "/news" },
      { name: "Εκδηλώσεις", href: "/events" },
      { name: "Επικοινωνία", href: "/contact" },
    ],
  };

  useEffect(() => {
    setHasMounted(true);
    const savedLanguage = localStorage.getItem('language');
    setCurrentLanguage(savedLanguage || 'en');
  }, []);

  if (!hasMounted || !currentLanguage) return null;

  const isActive = (href: string, dropdown?: unknown[]): boolean => {
    if (pathname.startsWith(href) && href !== "/") return true;
    if (href === pathname) return true;
    if (dropdown) {
      return dropdown.some((item: unknown) => isActive((item as any).href, (item as any).dropdown));
    }
    return false;
  };

  const getDropdownPosition = (index: number, total: number) => {
    // Adjust logic for more balanced positioning or ensure it's always visible
    // For simplicity, let's keep it right-aligned for last few items, otherwise left.
    // A more advanced solution might involve calculating available space.
    if (total <= 5) { // If total items are few, always align left for better visibility
      return "left-0";
    }
    return index >= total - 2 ? "right-0" : "left-0";
  };

  const renderMenu = (items: unknown[], depth = 0, isSubNav = false) => (
    <ul className={
      depth === 0
        ? isSubNav
          ? "flex items-center flex-nowrap space-x-2 text-xs md:text-sm font-medium"
          : "flex items-center space-x-3"
        : isSubNav
          ? "absolute bg-bg-dark text-text-dark shadow-lg rounded z-50 min-w-[200px] overflow-visible"
          : "absolute bg-bg-light text-text-light shadow-lg rounded z-50 min-w-[200px] overflow-visible"
    }>
      {items.map((item, idx) => {
        const itemKey = `${depth}-${(item as any).href}`;
        return (
          <li
            key={(item as any).name}
            className="relative group"
            onMouseEnter={() => {
              if ((item as any).dropdown) {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setOpenDropdown(itemKey);
              }
            }}
            onMouseLeave={() => {
              if ((item as any).dropdown) {
                closeTimer.current = setTimeout(() => {
                  setOpenDropdown(null);
                }, 150);
              }
            }}
          >
            <Link
              href={(item as any).href}
              onClick={(e) => {
                if ((item as any).dropdown && !isSubNav) {
                  e.preventDefault();
                }
              }}
              className={
                depth === 0
                  ? `flex items-center md:px-2 px-1 py-1.5 font-medium ${isSubNav ? 'text-xs md:text-sm' : 'text-sm md:text-base'} tracking-wide uppercase transition-colors rounded whitespace-nowrap ` +
                    (isActive((item as any).href, (item as any).dropdown)
                      ? "text-accent underline underline-offset-4 bg-primary"
                      : "text-text-light hover:text-text-dark hover:bg-primary")
                  : `flex items-center w-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded ` +
                    (isActive((item as any).href, (item as any).dropdown)
                      ? "bg-primary text-accent"
                      : "hover:bg-primary/10 text-text-light hover:text-text-dark")
              }
            >
              {(item as any).name}
              {(item as any).dropdown && (
                <span className={depth === 0 ? "ml-1 text-xs" : "ml-auto text-xs"}>
                  {depth === 0 ? "▼" : "▶"}
                </span>
              )}
            </Link>
            <AnimatePresence>
              {(item as any).dropdown && openDropdown === itemKey && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`${
                    depth === 0
                      ? `absolute top-full z-50 pt-2 ${getDropdownPosition(idx, items.length)}`
                      : "absolute top-0 left-full z-50"
                  } ${isSubNav ? 'bg-surface text-text-dark' : 'bg-bg-dark text-text-light'} border border-border`}
                  style={{
                    minWidth: 200,
                    ...(depth > 0 ? { paddingLeft: 24, backgroundClip: 'padding-box' } : {})
                  }}
                  onMouseEnter={() => {
                    if (closeTimer.current) clearTimeout(closeTimer.current);
                  }}
                  onMouseLeave={() => {
                    closeTimer.current = setTimeout(() => {
                      setOpenDropdown(null);
                    }, 150);
                  }}
                >
                  {renderMenu((item as any).dropdown, depth + 1, isSubNav && depth === 0)}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );

  const renderMobileMenu = (items: unknown[], parentKey = "") => (
    <ul className="pl-2">
      {items.map((item) => {
        const key = parentKey + (item as any).name;
        const isOpen = openMobileMenus.includes(key);
        return (
          <li key={key} className="mb-1">
            <div className="flex items-center justify-between">
              <Link
                href={(item as any).href}
                className={`block py-1.5 font-medium text-sm tracking-wide uppercase rounded ${isActive((item as any).href, (item as any).dropdown) ? "text-accent underline underline-offset-4 bg-primary" : "text-text-light hover:text-text-dark hover:bg-primary"}`}
                onClick={() => {
                  // On mobile, if it's a dropdown, just toggle it. Otherwise, close the menu.
                  if (!(item as any).dropdown) {
                    setIsMenuOpen(false);
                  }
                }}
              >
                {(item as any).name}
              </Link>
              {(item as any).dropdown && (
                <button
                  aria-label={isOpen ? `Collapse ${(item as any).name}` : `Expand ${(item as any).name}`}
                  onClick={() => {
                    setOpenMobileMenus((prev) =>
                      isOpen ? prev.filter((k) => k !== key) : [...prev, key]
                    );
                  }}
                  className="ml-2 p-2 text-xs text-text-light focus:outline-none"
                >
                  {isOpen ? "▲" : "▼"}
                </button>
              )}
            </div>
            {(item as any).dropdown && isOpen && (
              <div className="pl-4 border-l border-primary">
                {renderMobileMenu((item as any).dropdown, key)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const menuArr = menu[currentLanguage as keyof typeof menu];
  const topNavNames = ["Home", "News", "Events", "Contact", "Αρχική", "Νέα", "Εκδηλώσεις", "Επικοινωνία"];
  const topNavItems = menuArr.filter((item) => topNavNames.includes(item.name));
  const subNavItems = menuArr.filter((item) => !topNavNames.includes(item.name));

  return (
    <>
      <header className="bg-primary text-text-light shadow-sm border-b border-border w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center relative z-20">
                <Image
                  src="/logo.png"
                  alt="Agios Athanasios Municipality Logo"
                  width={160}
                  height={160}
                  className="w-[160px] h-[160px] object-contain rounded-none -my-8"
                  priority
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 relative">
              {renderMenu(topNavItems)}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const newLanguage = currentLanguage === "en" ? "el" : "en";
                  setCurrentLanguage(newLanguage);
                  localStorage.setItem("language", newLanguage);
                }}
                className="text-text-light hover:text-accent text-sm font-medium uppercase tracking-wider border border-text-light/20 rounded-md px-3 py-1 transition-colors hover:bg-primary/80"
              >
                {currentLanguage === "en" ? "EN | EL" : "EL | EN"}
              </button>
              <Link
                href="/admin"
                className="bg-surface hover:bg-accent text-text-dark px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Admin
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-light hover:text-accent"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block bg-secondary border-t border-border w-full">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            {/* Subheader nav: remove horizontal scrollbar, allow wrapping */}
            <nav className="flex flex-wrap items-center space-x-2 py-2 relative overflow-visible">
              {renderMenu(subNavList, 0, true)}
            </nav>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-primary text-text-light overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {renderMobileMenu(menu[currentLanguage as keyof typeof menu])}
                <div className="px-3 py-2">
                  <button
                    onClick={() => {
                      const newLanguage = currentLanguage === "en" ? "el" : "en";
                      setCurrentLanguage(newLanguage);
                      localStorage.setItem("language", newLanguage);
                      setIsMenuOpen(false);
                    }}
                    className="text-text-light hover:text-accent text-sm font-medium uppercase tracking-wider border border-text-light/20 rounded-md px-3 py-1 transition-colors hover:bg-primary/80"
                  >
                    {currentLanguage === "en" ? "EN | EL" : "EL | EN"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}