import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SERVICES, INITIAL_INDUSTRIES } from '../data/content';
import { ServiceCategory, IndustryItem } from '../types';

export interface SiteContent {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    statGsd: string;
    statRmse: string;
    statSla: string;
  };
  pillars: {
    id: string;
    title: string;
    image: string;
  }[];
  services: {
    id: string;
    name: string;
    image: string;
    targetCatId: string;
  }[];
  industries: {
    id: string;
    name: string;
    image: string;
  }[];
  partner: {
    title: string;
    subtitle: string;
    desc: string;
    track1Title: string;
    track1Sub: string;
    track1Desc: string;
    track2Title: string;
    track2Sub: string;
    track2Desc: string;
  };
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    kicker: 'Geospatial Technology & Intelligence Partner',
    title: 'Turning Aerial Data Into Intelligence That Moves Industries Forward.',
    subtitle: 'NX Aerial delivers integrated drone data processing, geospatial intelligence, AI-powered analytics, 3D mapping and custom technology solutions for complex real-world projects.',
    statGsd: '≤ 1.4 cm',
    statRmse: '± 1.8 cm',
    statSla: '< 24h',
  },
  pillars: [
    {
      id: 'operations',
      title: 'NX Drone Operations',
      image: '/assets/showcase/drone_operations_field.jpg',
    },
    {
      id: 'intelligence',
      title: 'AI & Computer Vision',
      image: '/assets/showcase/ai_computer_vision.jpg',
    },
    {
      id: 'solutions',
      title: 'NX Digital Solutions',
      image: '/assets/showcase/digital_solutions_gis.jpg',
    },
  ],
  services: [
    {
      id: 'photogrammetry-data-processing',
      name: 'Drone Data Processing',
      image: '/assets/showcase/drone_operations_field.jpg',
      targetCatId: 'photogrammetry-data-processing',
    },
    {
      id: 'gis-geospatial-intelligence',
      name: 'GIS & Survey Intelligence',
      image: '/assets/showcase/digital_solutions_gis.jpg',
      targetCatId: 'gis-geospatial-intelligence',
    },
    {
      id: '3d-modelling-digital-twin',
      name: '3D Mapping & Digital Twins',
      image: '/assets/showcase/digital_twin.jpg',
      targetCatId: '3d-modelling-digital-twin',
    },
    {
      id: 'ai-computer-vision',
      name: 'AI & Computer Vision',
      image: '/assets/showcase/ai_computer_vision.jpg',
      targetCatId: 'ai-computer-vision',
    },
    {
      id: 'inspection-monitoring',
      name: 'Inspection & Monitoring',
      image: '/assets/showcase/glance_industrial.jpg',
      targetCatId: 'inspection-monitoring',
    },
    {
      id: 'software-technology-development',
      name: 'Software & Web GIS Development',
      image: '/assets/showcase/digital_solutions_gis.jpg',
      targetCatId: 'software-technology-development',
    },
  ],
  industries: [
    { id: 'mining-minerals', name: 'Mining & Minerals', image: '/assets/industries/mining.jpg' },
    { id: 'solar-renewable-energy', name: 'Solar & Renewable Energy', image: '/assets/industries/solar.jpg' },
    { id: 'construction-real-estate', name: 'Construction & Real Estate', image: '/assets/industries/construction.jpg' },
    { id: 'roads-highways', name: 'Roads & Highways', image: '/assets/industries/highways.jpg' },
    { id: 'agriculture-forestry', name: 'Agriculture & Forestry', image: '/assets/industries/agriculture.jpg' },
    { id: 'power-utilities', name: 'Power & Utilities', image: '/assets/industries/power.jpg' },
    { id: 'smart-cities-urban-development', name: 'Smart Cities & Urban Development', image: '/assets/industries/smart_cities.jpg' },
    { id: 'water-resources', name: 'Water Resources', image: '/assets/industries/water.jpg' },
    { id: 'infrastructure-transportation', name: 'Infrastructure & Transportation', image: '/assets/industries/transport.jpg' },
    { id: 'industrial-facilities', name: 'Industrial Facilities', image: '/assets/industries/industrial.jpg' },
    { id: 'environmental-monitoring', name: 'Environmental Monitoring', image: '/assets/industries/environment.jpg' },
    { id: 'government-public-sector', name: 'Government & Public Sector', image: '/assets/industries/government.jpg' },
  ],
  partner: {
    title: 'You Bring the Project. We Engineer the Execution.',
    subtitle: 'B2B Collaboration',
    desc: 'Partner with NX Aerial for seamless white-label photogrammetry, GIS analytics, and turnkey enterprise execution.',
    track1Title: 'For Drone Survey Companies & DSPs',
    track1Sub: 'White-Label PPK Processing & 24h Delivery',
    track1Desc: 'You fly and capture the raw data. We execute high-throughput cluster photogrammetry, cut/fill volumetrics, and certified DTM reports under your white-label brand.',
    track2Title: 'For Civil, Mining & Engineering Consultants',
    track2Sub: 'Advanced LiDAR, Cadastral & Digital Twin Engineering',
    track2Desc: 'Expand your consulting capacity with high-density point cloud classification, watershed hydrological modeling, and direct CAD/GIS/BIM integration.',
  },
};

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  isCrmOpen: boolean;
  setIsCrmOpen: (val: boolean) => void;
  activeEditingSection: string | null;
  setActiveEditingSection: (section: string | null) => void;
  siteContent: SiteContent;
  updateSiteContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetToDefault: () => void;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const SESSION_KEY_AUTH = 'nx_admin_session_auth';
const STORAGE_KEY_CONTENT = 'nx_site_content_v1';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start with admin & edit mode OFF on regular website visits
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [activeEditingSection, setActiveEditingSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        return { ...DEFAULT_SITE_CONTENT, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed reading custom site content:', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  // Fetch live content from MongoDB on initial mount
  useEffect(() => {
    // Clear any legacy persistent admin auth so regular site visits are clean
    localStorage.removeItem('nx_admin_auth_v1');

    const fetchRemoteContent = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setSiteContent((prev) => ({
              ...prev,
              hero: json.data.hero || prev.hero,
              pillars: json.data.pillars?.length ? json.data.pillars : prev.pillars,
              services: json.data.services?.length ? json.data.services : prev.services,
              industries: json.data.industries?.length ? json.data.industries : prev.industries,
              partner: json.data.partner || prev.partner,
            }));
            localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(json.data));
          }
        }
      } catch (err) {
        console.warn('Could not load content from MongoDB backend:', err);
      }
    };

    fetchRemoteContent();
  }, []);

  // Check URL params for ?admin=login or ?admin=true or active session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAdminParam = params.get('admin') === 'true' || params.get('admin') === 'login';
    const hasSession = sessionStorage.getItem(SESSION_KEY_AUTH) === 'true';

    if (hasAdminParam) {
      if (hasSession) {
        setIsAdmin(true);
        setIsEditMode(true);
      } else {
        setIsLoginModalOpen(true);
      }
    } else if (hasSession) {
      // Session authenticated, but edit mode off on normal link visits
      setIsAdmin(true);
      setIsEditMode(false);
    }

    // Keyboard shortcut: Ctrl + Shift + A to open Admin Login or toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isAdmin) {
          setIsEditMode((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  const login = (user: string, pass: string): boolean => {
    if ((user === 'admin' && pass === 'admin123') || (user === 'admin' && pass === 'admin')) {
      setIsAdmin(true);
      setIsEditMode(true);
      sessionStorage.setItem(SESSION_KEY_AUTH, 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
    setIsCrmOpen(false);
    setActiveEditingSection(null);
    sessionStorage.removeItem(SESSION_KEY_AUTH);
    localStorage.removeItem('nx_admin_auth_v1');
    if (window.location.search.includes('admin')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  // Sync edits to MongoDB database and localStorage
  const updateSiteContent = (updater: (prev: SiteContent) => SiteContent) => {
    setSiteContent((prev) => {
      const updated = updater(prev);
      
      // Save to localStorage immediately
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed saving site content to localStorage:', e);
      }

      // Save to MongoDB
      setSaveStatus('saving');
      fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2500);
          } else {
            setSaveStatus('error');
          }
        })
        .catch((err) => {
          console.error('Failed to persist to MongoDB:', err);
          setSaveStatus('error');
        });

      return updated;
    });
  };

  const resetToDefault = async () => {
    if (window.confirm('Reset all edited content back to default values in MongoDB?')) {
      try {
        const res = await fetch('/api/content/reset', { method: 'POST' });
        if (res.ok) {
          setSiteContent(DEFAULT_SITE_CONTENT);
          localStorage.removeItem(STORAGE_KEY_CONTENT);
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        }
      } catch (e) {
        setSiteContent(DEFAULT_SITE_CONTENT);
        localStorage.removeItem(STORAGE_KEY_CONTENT);
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditMode,
        setIsEditMode,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isCrmOpen,
        setIsCrmOpen,
        activeEditingSection,
        setActiveEditingSection,
        siteContent,
        updateSiteContent,
        resetToDefault,
        login,
        logout,
        saveStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

