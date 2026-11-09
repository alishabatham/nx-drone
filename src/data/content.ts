import { ServiceCategory, IndustryItem, ShowcaseProject } from '../types';

export const DICTIONARY = {
  en: {
    nav: {
      services: 'Services',
      industries: 'Industries',
      technology: 'Technology',
      projects: 'Projects',
      partner: 'Partner With Us',
      resources: 'Resources',
      inquiry: 'Discuss Project',
      admin: 'Admin CMS'
    },
    hero: {
      kicker: 'Complete Geospatial Technology & Intelligence Partner',
      title: 'Turning Aerial Data Into Intelligence That Moves Industries Forward',
      subtitle: 'NX Aerial delivers integrated drone data processing, geospatial intelligence, AI-powered analytics, 3D mapping and custom technology solutions for complex real-world projects.',
      ctaCapabilities: 'Explore Capabilities',
      ctaDiscuss: 'Discuss Your Project',
      ctaPartner: 'Partner With NX',
      statGsd: 'Sub-2cm GSD Resolution',
      statAccuracy: '±1.8cm Vertical RMSEz',
      statFormats: '60+ Standard Formats',
      statSla: '< 24h Processing Turnaround'
    },
    philosophy: {
      tag: 'Our Philosophy',
      title: 'Built Around Your Project. Driven by Technology.',
      subtitle: 'We transform aerial data into meaningful information, measurable insights and practical technology solutions.',
      p1_title: 'Clarity',
      p1_desc: 'Every technical service explained in unambiguous, plain language with transparent workflows.',
      p2_title: 'Trust',
      p2_desc: 'Verifiable accuracy, open methodology, and real reproducible sample deliverables.',
      p3_title: 'Precision',
      p3_desc: 'Strict geodetic controls, sub-centimeter GCP validation, and ISO-compliant QA procedures.',
      p4_title: 'Intelligence',
      p4_desc: 'Custom computer vision models, automated feature extraction, and enterprise spatial algorithms.',
      p5_title: 'Accountability',
      p5_desc: 'Rigid SLA timelines, documented custody, and assigned senior geospatial project engineers.'
    }
  },
  hi: {
    nav: {
      services: 'सेवाएं (Services)',
      industries: 'उद्योग (Industries)',
      technology: 'तकनीक (Technology)',
      projects: 'प्रोजेक्ट्स (Projects)',
      partner: 'पार्टनर बनें (Partner)',
      resources: 'रिसोर्सेज (Resources)',
      inquiry: 'प्रोजेक्ट चर्चा करें',
      admin: 'एडमिन सीएमएस'
    },
    hero: {
      kicker: 'संपूर्ण जियोस्पेशियल टेक्नोलॉजी और इंटेलिजेंस पार्टनर',
      title: 'एरियल डेटा को व्यावहारिक इंटेलिजेंस में बदलना जो उद्योगों को आगे बढ़ाता है',
      subtitle: 'NX Aerial जटिल रियल-वर्ल्ड प्रोजेक्ट्स के लिए इंटीग्रेटेड ड्रोन डेटा प्रोसेसिंग, जियोस्पेशियल इंटेलिजेंस, AI एनालिटिक्स और 3D मैपिंग समाधान प्रदान करता है।',
      ctaCapabilities: 'क्षमताएं देखें',
      ctaDiscuss: 'प्रोजेक्ट सबमिट करें',
      ctaPartner: 'पार्टनरशिप प्रोग्राम',
      statGsd: '1.4 सेमी तक GSD रेजोल्यूशन',
      statAccuracy: '±1.8 सेमी वर्टिकल एक्यूरेसी',
      statFormats: '60+ आउटपुट फॉर्मैट्स',
      statSla: '< 24 घंटे टर्नअराउंड'
    },
    philosophy: {
      tag: 'हमारा दृष्टिकोण',
      title: 'प्रोजेक्ट के अनुसार निर्मित। तकनीक द्वारा संचालित।',
      subtitle: 'हम हवाई डेटा को सार्थक जानकारी, मापने योग्य इनसाइट्स और व्यावहारिक तकनीकी समाधानों में बदलते हैं।',
      p1_title: 'स्पष्टता (Clarity)',
      p1_desc: 'प्रत्येक सेवा सरल, पारदर्शी भाषा और स्पष्ट प्रक्रिया के साथ समझाई जाती है।',
      p2_title: 'विश्वसनीयता (Trust)',
      p2_desc: 'वास्तविक नमूने, सटीक पद्धति और पूर्ण डेटा गोपनीयता।',
      p3_title: 'सटीकता (Precision)',
      p3_desc: 'उप-सेंटीमीटर GCP सत्यापन और राष्ट्रीय सर्वे मानकों का कड़ाई से पालन।',
      p4_title: 'इंटेलिजेंस (Intelligence)',
      p4_desc: 'AI कंप्यूटर विज़न, स्वचालित पहचान और एंटरप्राइज़ एनालिटिक्स।',
      p5_title: 'जवाबदेही (Accountability)',
      p5_desc: 'निश्चित डिलीवरी समयसीमा और समर्पित प्रोजेक्ट इंजीनियर।'
    }
  }
};

export const INITIAL_SERVICES: ServiceCategory[] = [
  {
    id: 'drone-data-acquisition',
    code: 'A',
    title: 'Drone Data Acquisition',
    subtitle: 'High-precision flight execution & multi-sensor payload capture',
    description: 'Autonomous flight plans, certified commercial workflows, RTK/PPK base station integration, and multi-spectral sensors.',
    servicesCount: 9,
    items: [
      { name: 'Aerial Data Acquisition', description: 'End-to-end mission planning and flight execution across diverse topographies.' },
      { name: 'RGB Image Capture', description: 'Ultra-high resolution photogrammetric imagery with 45MP+ calibrated sensors.' },
      { name: 'Thermal Data Acquisition', description: 'Radiometric infrared scanning for solar, industrial plants, and utility assets.' },
      { name: 'LiDAR Data Acquisition', description: 'Multi-return laser scanning capable of penetrating dense vegetation canopy.' },
      { name: 'Multispectral Data Capture', description: 'Narrow-band spectral imaging (RedEdge, NIR, Green, Red) for plant health analytics.' },
      { name: 'RTK / PPK Survey Support', description: 'Real-Time Kinematic & Post-Processed Kinematic ground control positioning.' },
      { name: 'Aerial Video Capture', description: 'Cinematic 4K inspection reels and site progress video documentation.' },
      { name: 'Corridor Data Acquisition', description: 'Linear infrastructure scanning for highways, railways, pipelines, and canals.' },
      { name: 'Repeated / Periodic Data Capture', description: 'Time-series spatial monitoring for construction progress and quarry excavation.' }
    ]
  },
  {
    id: 'photogrammetry-data-processing',
    code: 'B',
    title: 'Photogrammetry & Data Processing',
    subtitle: 'From raw aerial frames to calibrated geospatial datasets',
    description: 'Cluster-accelerated photogrammetric reconstruction, bundle block adjustment, radiometric balancing, and seamline-free orthorectification.',
    servicesCount: 10,
    items: [
      { name: 'Image Alignment & Feature Matching', description: 'Scale-invariant feature transform (SIFT) matching with lens distortion calibration.' },
      { name: 'Image Stitching & Blending', description: 'Seamless orthorectified image stitching with dynamic seamline optimization.' },
      { name: 'Orthomosaic Generation', description: 'True-orthophoto synthesis eliminating building lean and parallax distortion.' },
      { name: 'DSM / DTM / DEM Generation', description: 'Surface, terrain, and elevation models with automated non-ground object filtering.' },
      { name: 'Dense Point Cloud Reconstruction', description: 'Million-point 3D spatial reconstructions with true RGB colorization.' },
      { name: '3D Mesh Reconstruction', description: 'High-polygon triangulated surface meshes from multi-angle oblique frames.' },
      { name: 'Textured 3D Models', description: 'Photorealistic architectural models with high-resolution UV texture maps.' },
      { name: 'Geo-referencing & GCP Matching', description: 'Precision anchoring to national geodetic datums using Ground Control Points.' },
      { name: 'Data Cleaning & Artefact Removal', description: 'Noise filtering, shadow mitigation, and cloud reflection removal.' },
      { name: 'Coordinate Transformation', description: 'Projection conversions (UTM, WGS84, State Plane, Custom Mine Datums).' }
    ]
  },
  {
    id: 'gis-geospatial-intelligence',
    code: 'C',
    title: 'GIS & Geospatial Intelligence',
    subtitle: 'Spatial analytics, multi-layer cartography & location intelligence',
    description: 'Transforming processed aerial raster into actionable vector GIS intelligence, zoning overlays, and decision support databases.',
    servicesCount: 10,
    items: [
      { name: 'GIS Mapping & Layering', description: 'Thematic multi-tier spatial maps for planning, governance, and asset tracking.' },
      { name: 'Spatial Analysis & Buffering', description: 'Proximity modeling, slope gradient calculation, and view-shed visibility studies.' },
      { name: 'Land Use / Land Cover (LULC)', description: 'Supervised classification of natural and built environments over time.' },
      { name: 'Terrain & Hydrology Analysis', description: 'Flow direction, catchment delineation, and flood inundation risk simulation.' },
      { name: 'Contour Mapping', description: 'Sub-meter interval topographic contour vector generation (.SHP / .DXF).' },
      { name: 'Cadastral & Boundary Mapping', description: 'Revenue map digitization, superimposition, and encroachment detection.' },
      { name: 'Spatial Change Detection', description: 'Automated temporal subtraction to reveal unauthorized construction or excavation.' },
      { name: 'Network & Route Analysis', description: 'Least-cost corridor routing for transmission lines, pipelines, and access haul roads.' },
      { name: 'Geospatial Database Development', description: 'Enterprise PostGIS, Geopackage, and spatial SQL database design.' },
      { name: 'Web GIS Application Deployment', description: 'Interactive browser-based mapping interfaces with secure multi-tenant access.' }
    ]
  },
  {
    id: 'survey-measurement',
    code: 'D',
    title: 'Survey & Measurement',
    subtitle: 'Engineering-grade geometric accuracy & volumetric verification',
    description: 'Millimeter-grade engineering surveys, boundary re-establishment, stockpile calculations, and earthwork cut/fill quantities.',
    servicesCount: 9,
    items: [
      { name: 'Engineering Land Survey Support', description: 'Geodetic survey verification conforming to national highway and municipal standards.' },
      { name: 'Topographic Mapping', description: 'Spot elevations, breaklines, and terrain relief mapping for civil engineering.' },
      { name: 'Cadastral Mapping Support', description: 'Boundary monumentation, land acquisition surveys, and parcel reconciliation.' },
      { name: 'Stockpile Volume Measurement', description: '3D volume calculation against toe datum surfaces with high safety and repeatability.' },
      { name: 'Cut & Fill Volumetric Analysis', description: 'Design versus as-built earthwork comparisons for mass haul balance.' },
      { name: 'Earthwork Measurement & Billing', description: 'Contractor progress verification and earthmoving milestone certification.' },
      { name: 'Construction Site Mapping', description: 'As-built site conditions, foundation checks, and civil utility coordination.' },
      { name: 'Road Corridor Survey', description: 'Right-of-way mapping, slope profiling, and pavement degradation surveys.' },
      { name: 'Mining Area Survey & Bench Profiling', description: 'Quarry face stability monitoring, pit limit surveys, and statutory DGMS mapping.' }
    ]
  },
  {
    id: 'ai-computer-vision',
    code: 'E',
    title: 'AI & Computer Vision',
    subtitle: 'Automated feature extraction, object detection & deep learning',
    description: 'Proprietary computer vision pipelines for automatic asset localization, infrastructure defect detection, and automated feature counting.',
    servicesCount: 10,
    items: [
      { name: 'Automated Object Detection', description: 'YOLO-based detection of vehicles, equipment, trees, manholes, and utility poles.' },
      { name: 'Object Classification', description: 'Multi-class identification of asset conditions and material states.' },
      { name: 'Building Footprint Extraction', description: 'Automated roof boundary vectorization with height attribution from DSM.' },
      { name: 'Road & Pavement Detection', description: 'Pavement boundary tracing, centerline extraction, and pothole detection.' },
      { name: 'Vegetation & Tree Canopy Analysis', description: 'Individual tree crown counting, height estimation, and species segregation.' },
      { name: 'Structural Defect Detection', description: 'AI crack detection on concrete dams, cooling towers, and bridge piers.' },
      { name: 'Thermal Anomaly Detection', description: 'Automated hotspot identification on solar PV modules and high-voltage transmission.' },
      { name: 'Automated Change Detection', description: 'Deep learning pixel & feature level variance tracking between survey epochs.' },
      { name: 'Semantic Image Segmentation', description: 'Pixel-level segmentation into water, soil, asphalt, metal, and vegetation.' },
      { name: 'Automated Spatial Data Extraction', description: 'Converting unorganized aerial raster directly into structured GeoJSON attribute tables.' }
    ]
  },
  {
    id: '3d-modelling-digital-twin',
    code: 'F',
    title: '3D Modelling & Digital Twin',
    subtitle: 'Spatial replicas for simulation, operations & asset lifecycle',
    description: 'Transforming physical job sites, plants, and buildings into interactive, measured 3D digital replicas integrated with BIM systems.',
    servicesCount: 8,
    items: [
      { name: '3D Terrain Modelling', description: 'High-resolution triangular irregular networks (TIN) and digital surface models.' },
      { name: 'Building & Plant Reconstruction', description: 'Parametric LOD2/LOD3 architectural models with accurate textures.' },
      { name: 'Point Cloud Modelling & Classification', description: 'Cleaned, noise-free point clouds colorized by elevation, intensity, or RGB.' },
      { name: 'Digital Elevation Models (DEM)', description: 'Hydrologically conditioned elevation matrices for civil engineering workflows.' },
      { name: '3D Asset Visualization', description: 'Interactive web-based 3D viewers powered by WebGL, Three.js, and Cesium.' },
      { name: 'Digital Twin Platforms', description: 'Live IoT sensor binding to 3D spatial models for real-time facility monitoring.' },
      { name: '3D Site Progress Monitoring', description: '4D timeline comparisons tracking actual site progress against 3D BIM design.' },
      { name: 'BIM / GIS Integration', description: 'Bridging Revit/IFC building models with regional geographic coordinate systems.' }
    ]
  },
  {
    id: 'inspection-monitoring',
    code: 'G',
    title: 'Inspection & Monitoring',
    subtitle: 'Sub-millimeter asset inspection & critical infrastructure audits',
    description: 'Safe, standoff aerial inspection of hazardous, tall, or energized infrastructure without putting personnel in harm’s way.',
    servicesCount: 9,
    items: [
      { name: 'Solar Panel Inspection', description: 'Thermal radiometric and high-res RGB inspection complying with IEC standards.' },
      { name: 'Powerline & Conductor Inspection', description: 'Corona detection, insulator flashover check, and vegetation clearance buffer.' },
      { name: 'Telecom & Transmission Tower Inspection', description: 'Rust identification, structural bolt loosening, and antenna tilt/azimuth audit.' },
      { name: 'Industrial Roof Inspection', description: 'Water ponding, membrane punctures, rust spots, and structural sag analysis.' },
      { name: 'Bridge & Viaduct Inspection', description: 'Underside deck inspection, pier cracks, expansion joint wear, and scour analysis.' },
      { name: 'Road & Highway Pavement Inspection', description: 'Pavement Condition Index (PCI) calculation, rutting, and distress classification.' },
      { name: 'Railway Corridor Inspection', description: 'Track alignment, ballast condition, track clearance, and vegetation encroachment.' },
      { name: 'Industrial Asset Inspection', description: 'Flare stacks, storage tanks, smokestacks, and pipeline right-of-way monitoring.' },
      { name: 'Construction Progress Monitoring', description: 'Periodic high-resolution flythroughs, volume verification, and executive reporting.' }
    ]
  },
  {
    id: 'agriculture-environmental-intelligence',
    code: 'H',
    title: 'Agriculture & Environmental Intelligence',
    subtitle: 'Multispectral vegetation indices, forestry & environmental risk',
    description: 'Actionable crop vigor analytics, variable rate fertilizer maps, forest carbon estimations, and watershed conservation planning.',
    servicesCount: 8,
    items: [
      { name: 'Crop Health Monitoring', description: 'Calibrated reflectance indices for early disease, pest, and nutrient stress diagnosis.' },
      { name: 'Vegetation Index Analysis', description: 'Normalized Difference Vegetation Index (NDVI), NDRE, and MSAVI calculation.' },
      { name: 'NDVI / NDRE Zonal Mapping', description: 'Prescription prescription prescription zone maps for precision farming equipment.' },
      { name: 'Plantation & Orchard Monitoring', description: 'Tree-by-tree inventory, canopy diameter measurement, and missing tree audits.' },
      { name: 'Forestry Mapping & Canopy Density', description: 'Crown density modeling, illegal logging detection, and biomass estimation.' },
      { name: 'Environmental Change Monitoring', description: 'Coastal erosion, wetland shrinkage, and deforestation tracking over years.' },
      { name: 'Water Body & Reservoir Mapping', description: 'Surface water area measurement, siltation monitoring, and algae bloom tracking.' },
      { name: 'Land Degradation & Soil Analysis', description: 'Soil moisture patterns, gully erosion mapping, and land reclamation tracking.' }
    ]
  },
  {
    id: 'software-technology-development',
    code: 'I',
    title: 'Software & Technology Development',
    subtitle: 'Custom WebGIS, project portals, automation APIs & data engines',
    description: 'Custom full-stack software development for enterprises needing proprietary geospatial portals, automated pipelines, and cloud dashboards.',
    servicesCount: 10,
    items: [
      { name: 'Custom GIS Software Development', description: 'Bespoke web and desktop spatial tools built on open standards and modern frameworks.' },
      { name: 'Drone Project Management Portals', description: 'Cloud portals for flight logs, raw upload, team review, and client deliverable download.' },
      { name: 'Geospatial Web Applications', description: 'React, Leaflet, Mapbox, and CesiumJS custom web applications with role permissions.' },
      { name: 'Interactive Mapping Dashboards', description: 'Executive KPI dashboards combining real-time business telemetry with map layers.' },
      { name: 'AI Analytics Platforms', description: 'Cloud inference engines that auto-process aerial datasets with trained CV models.' },
      { name: 'Spatial Data Visualization', description: 'High-performance WebGL rendering of millions of points and gigapixel rasters.' },
      { name: 'REST & GraphQL API Development', description: 'Spatial endpoints for integration into ERP, SAP, Oracle, and enterprise databases.' },
      { name: 'Enterprise GIS Integrations', description: 'Seamless sync between drone deliverables and existing ArcGIS Enterprise / QGIS setups.' },
      { name: 'Automated Report Systems', description: 'Instant PDF/CAD deliverable generation upon photogrammetric processing completion.' },
      { name: 'Custom Digital Twin Applications', description: 'Interactive industrial twin software with sensor integration and scenario simulations.' }
    ]
  }
];

export const INITIAL_INDUSTRIES: IndustryItem[] = [
  {
    id: 'mining-minerals',
    name: 'Mining & Minerals',
    summary: 'Stockpile volumetric audits, pit limit monitoring, haul road gradient analysis, and DGMS compliant digital mapping.',
    challenge: 'Manual survey exposes personnel to hazardous quarry faces while providing slow, infrequent volume estimates with large estimation errors.',
    solution: 'Autonomous drone surveys producing high-density DTMs and automated cut-and-fill volumetrics within 24 hours at sub-centimeter repeatability.',
    deliverables: ['Stockpile Volume Certificate', 'Bench Stability Profiling', 'Pit Vector Boundary (.DXF)', 'High-Density Point Cloud (.LAS)'],
    metrics: '±1.2% Volumetric Repeatability · 95% Survey Time Reduction'
  },
  {
    id: 'solar-renewable-energy',
    name: 'Solar & Renewable Energy',
    summary: 'IEC-standard radiometric thermography, hotspot classification, string fault localization, and greenfield solar site layout modeling.',
    challenge: 'Large-scale PV farms (50MW to 500MW+) cannot be economically or thoroughly inspected with ground handheld cameras.',
    solution: 'High-throughput dual-sensor drone flights paired with AI computer vision that pinpoints defective bypass diodes, cell cracks, and PID hotspots.',
    deliverables: ['Radiometric Thermal Orthomosaic', 'String Anomaly Table with Lat/Long', 'Degradation Severity Report', 'Pre-Construction Topography'],
    metrics: '3.5%–6% Energy Yield Recovery · 250 Hectares Inspected Per Day'
  },
  {
    id: 'construction-real-estate',
    name: 'Construction & Real Estate',
    summary: 'As-built site progress tracking, 4D BIM design-vs-actual verification, foundation checks, and marketing visual twins.',
    challenge: 'Schedule overruns and disputes between general contractors and subcontractors due to lack of transparent, verifiable site progress documentation.',
    solution: 'Weekly drone progress flights generating millimeter-accurate orthophotos, surface profiles, and CAD overlays for dispute-free milestone verification.',
    deliverables: ['Weekly Milestone Orthomosaics', 'Earthwork Cut/Fill Reports', 'BIM Alignment Models', 'Interactive Web Site Tour'],
    metrics: 'Zero Disputed Earthwork Claims · 100% Verifiable Photographic Record'
  },
  {
    id: 'roads-highways',
    name: 'Roads & Highways',
    summary: 'Corridor topographic alignment surveys, right-of-way encroachment monitoring, pavement distress surveys, and bridge inspections.',
    challenge: 'Traditional total station corridor leveling requires highway lane closures, poses traffic hazards, and takes weeks to complete.',
    solution: 'Long-range corridor mapping with dual LiDAR and RGB cameras providing continuous point clouds and cross-sections at 20m intervals.',
    deliverables: ['Cross-Sections & Longitudinal Profiles', 'Bare-Earth DTM (0.5m grid)', 'Pavement Distress Map', 'Cadastral Right-of-Way Layer'],
    metrics: 'IRC:SP:19-2020 Compliant · 20km Surveyed Per Day'
  },
  {
    id: 'agriculture-forestry',
    name: 'Agriculture & Forestry',
    summary: 'Crop health diagnostics, NDVI vegetation stress mapping, orchard tree inventory, and forest canopy density estimation.',
    challenge: 'Field scouting detects crop stress and disease only after visible foliar damage occurs, reducing harvest yield and wasting inputs.',
    solution: 'Calibrated multispectral imaging that reveals chlorosis, moisture stress, and nitrogen deficiencies 10–14 days before visible symptoms appear.',
    deliverables: ['NDVI / NDRE Crop Stress Maps', 'Variable-Rate Nitrogen Application prescription', 'Tree Crown Count Vector', 'Canopy Height Model'],
    metrics: '15% Fertilizer Cost Reduction · Early Pest & Disease Detection'
  },
  {
    id: 'power-utilities',
    name: 'Power & Utilities',
    summary: 'Transmission line corridor clearances, tower structural integrity audits, insulator flashover detection, and substation thermography.',
    challenge: 'Tower climbing inspections are hazardous and cannot detect invisible thermal overload in energized conductors.',
    solution: 'Safe standoff aerial flights with 30x optical zoom and thermal sensors detecting overheating components and vegetation encroachment buffers.',
    deliverables: ['Tower Defect Audit Sheets', 'Vegetation Clearance Hazard Map', 'Thermal Overheating Report', 'Asset GIS Geodatabase'],
    metrics: 'Zero Lineworker Climbing Risks · Sub-Centimeter Defect Resolution'
  },
  {
    id: 'smart-cities-urban-development',
    name: 'Smart Cities & Urban Development',
    summary: 'High-resolution true-orthophoto basemaps, LOD2/LOD3 3D building models, property tax assessment, and utility planning.',
    challenge: 'Municipal authorities rely on outdated satellite imagery with severe building lean and inadequate resolution for parcel-level governance.',
    solution: 'Oblique photogrammetry and true-orthomosaic generation producing lean-free basemaps and interactive 3D digital twins for urban planning.',
    deliverables: ['True-Orthomosaic (no building tilt)', '3D City Mesh (OGC 3D Tiles)', 'Building Footprints Vector Layer', 'Public WebGIS Portal'],
    metrics: '1.5 cm/pixel Resolution · 100% Tax Cadastre Reconciliation'
  },
  {
    id: 'water-resources',
    name: 'Water Resources',
    summary: 'Watershed hydrological modeling, canal embankment stability, reservoir siltation studies, and flood inundation risk mapping.',
    challenge: 'Climate changes and seasonal siltation reduce dam capacity without timely volumetric data for water allocation planning.',
    solution: 'Bathymetric integration with aerial LiDAR and photogrammetry to map river basins, water spread areas, and storage capacity curves.',
    deliverables: ['Catchment Elevation Model (DEM)', 'Reservoir Elevation-Capacity Table', 'Flood Inundation Simulation', 'Embankment Health Audit'],
    metrics: 'Accurate Storage Capacity Modeling · 0.5m Floodplain Contours'
  },
  {
    id: 'infrastructure-transportation',
    name: 'Infrastructure & Transportation',
    summary: 'Airport runway pavement mapping, railway track alignment monitoring, port terminal container yard planning, and viaduct audits.',
    challenge: 'Critical transportation hubs operate 24/7 and cannot tolerate extended survey shutdowns or operational interruptions.',
    solution: 'Rapid rapid-response drone surveys during short operational windows, producing high-fidelity CAD/GIS assets with zero track or runway disruption.',
    deliverables: ['Runway Slope & Texture Map', 'Railway Track Gauge Clearance Model', 'Port Yard Digital Elevation Matrix', 'Asset Condition Index'],
    metrics: 'Zero Disruption to Active Logistics · Rapid Night/Dawn Flight Protocols'
  },
  {
    id: 'industrial-facilities',
    name: 'Industrial Facilities',
    summary: 'Refinery flare stack inspections, chemical plant 3D laser twins, storage tank settlement audits, and pipeline right-of-way monitoring.',
    challenge: 'Routine flare stack and high-temperature vessel inspections historically required plant shutdowns costing upwards of $100,000/day.',
    solution: 'Close-range industrial drone inspection while facilities remain fully operational, with millimeter visual crack inspection and radiometric heat mapping.',
    deliverables: ['Live Flare Stack Video & Photo Report', 'Storage Tank Deformation Model', 'Plant 3D Point Cloud (.E57 / .LAS)', 'Confined Space Inspection'],
    metrics: 'Eliminates Costly Unplanned Plant Shutdowns · Sub-Millimeter Visual Detail'
  },
  {
    id: 'environmental-monitoring',
    name: 'Environmental Monitoring',
    summary: 'Mine rehabilitation tracking, coastal erosion monitoring, landfill volumetric capacity auditing, and wetland habitat conservation.',
    challenge: 'Large sensitive ecosystems are fragile or inaccessible by foot, making continuous environmental impact assessment difficult.',
    solution: 'Non-invasive aerial monitoring providing high-resolution multi-temporal maps of vegetation recovery, landfill compaction, and shoreline movement.',
    deliverables: ['Landfill Remaining Airspace Report', 'Vegetation Regrowth Index', 'Shoreline Retreat Vector Overlay', 'Environmental Compliance Dossier'],
    metrics: 'Statutory Compliance Ready · Non-Invasive Standoff Observation'
  },
  {
    id: 'government-public-sector',
    name: 'Government & Public Sector',
    summary: 'National mapping missions, SVAMITVA village property card surveys, disaster damage assessment, and defense base terrain modeling.',
    challenge: 'Government procurement requires strict adherence to geodetic standards, data confidentiality, sovereign data custody, and clear audit trails.',
    solution: 'Secure end-to-end data processing pipelines hosted in local Indian infrastructure with documented SOPs, ISO compliance, and verified benchmarks.',
    deliverables: ['Survey-Grade Cadastral Maps', 'Disaster Damage Assessment GIS', 'Sovereign Offline Geo-Database', 'Comprehensive Technical Dossier'],
    metrics: 'Fully DGCA/Survey of India Compliant · 100% In-Country Sovereign Data Custody'
  }
];

export const INITIAL_PROJECTS: ShowcaseProject[] = [
  {
    id: 'proj-1',
    title: 'Open-Pit Bauxite Stockpile Volumetric Audit',
    industry: 'Mining & Minerals',
    problem: 'Manual total-station survey took 4 days per monthly audit with high safety risk near steep 35-degree pit walls and ±18% volumetric estimation variance.',
    dataInput: 'DJI Matrice 300 RTK, Zenmuse P1, 8 GCPs via Trimble R12, 1,420 Raw RGB Images at 1.4 cm/pixel GSD.',
    technologyUsed: ['WebODM', 'CloudCompare', 'QGIS', 'Python GDAL', 'PDAL'],
    workPerformed: 'Sub-centimeter PPK image alignment, dense point cloud generation (86M points), DTM surface interpolation, and comparative cut-and-fill calculation against historic design datum.',
    finalDeliverables: [
      '3D Textured Mesh (.OBJ / .FBX)',
      'High-Density Classified Point Cloud (.LAS, ASPRS class 2/6)',
      'Volumetric Certificate with Cut/Fill Breakdown (PDF)',
      '0.25m Contour Vector Shapefile (.SHP, .DXF)',
      '0.02m Resolution Orthomosaic (.GeoTIFF)'
    ],
    verifiedResults: 'Volumetric measurement accuracy verified at ±1.2% variance against weighbridge haulage tallies. Survey turnaround compressed from 96 hours to 4 hours.',
    accuracyGsd: '1.4 cm/px',
    rmseVertical: '1.8 cm RMSEz',
    areaCovered: '68 Hectares',
    badge: 'Technical Demonstration'
  },
  {
    id: 'proj-2',
    title: 'Utility-Scale 85MW Solar PV Thermographic Anomaly Audit',
    industry: 'Solar & Renewable Energy',
    problem: 'Ground handheld thermography for 240,000 PV modules was economically unfeasible, leaving severe bypass diode failures and PID degradation undetected.',
    dataInput: 'FLIR Vue Pro R (640x512 Radiometric Thermal) + 48MP RGB sensor, dual gimbal, RTK geotagging.',
    technologyUsed: ['YOLOv8 Custom Thermal Vision', 'QGIS Spatial Anomaly Engine', 'PostGIS', 'WebGIS Dashboard'],
    workPerformed: 'Autonomous automated flight at 45m AGL with 80% thermal overlap. Computer vision AI model pipeline detected and localized delta-T anomalies (>15°C hotspot variance).',
    finalDeliverables: [
      'Geo-referenced Radiometric Thermal Orthomosaic',
      'String-Level Anomaly CAD Layer (.DXF with GPS Table)',
      'IEC 62446-3 Severity Classification Audit Report',
      'Interactive WebGIS Defect Map with Hotspot Geo-Coordinates'
    ],
    verifiedResults: 'Identified 342 critical module anomalies (28 string-level diode burnouts), recovering an estimated 3.8% lost plant generation capacity (approx. $48,000/yr).',
    accuracyGsd: '4.2 cm/px Thermal',
    rmseVertical: '±0.5°C Radiometric Delta',
    areaCovered: '142 Hectares',
    badge: 'Technical Demonstration'
  },
  {
    id: 'proj-3',
    title: '4-Lane Greenfield Expressway Corridor Topographic Mapping',
    industry: 'Roads & Highways',
    problem: 'Challenging terrain with steep forested slopes hindered conventional total station leveling across a 24-kilometer alignment.',
    dataInput: 'LiDAR Riegl miniVUX-3UAV + Sony A6000, 150 pulses/sqm, dual-frequency GNSS base station.',
    technologyUsed: ['TerraScan', 'PDAL', 'ArcGIS Pro', 'Global Mapper', 'AutoCAD Civil 3D'],
    workPerformed: 'LiDAR trajectory calibration, ground surface classification penetrating dense canopy, generation of bare-earth DTM, cross-section profiles at 20m chainage intervals.',
    finalDeliverables: [
      'Bare-Earth Digital Terrain Model (DTM, 0.5m grid)',
      'Cross-Section & Longitudinal Profiles (.DWG / .DXF)',
      'Detailed Cadastral Right-of-Way Overlay (.SHP)',
      'Classified LiDAR Point Cloud (.LAZ)'
    ],
    verifiedResults: 'Vertical elevation accuracy checked against 24 independent field benchmarks yielded RMSEz of 2.1 cm, fully compliant with IRC:SP:19-2020 national highway specifications.',
    accuracyGsd: '2.0 cm/px LiDAR DEM',
    rmseVertical: '2.1 cm RMSEz',
    areaCovered: '24 km Corridor (360 Ha)',
    badge: 'Technical Demonstration'
  },
  {
    id: 'proj-4',
    title: 'Smart City Industrial Park High-Fidelity 3D Digital Twin',
    industry: 'Smart Cities & Urban Development',
    problem: 'Municipal master planning and underground utility retrofitting lacked an accurate, unified 3D spatial coordinate model of existing structures.',
    dataInput: 'Oblique photogrammetry (5-lens camera array) + Terrestrial Mobile Laser Scanner integration.',
    technologyUsed: ['CesiumJS', 'Three.js', 'Blender', 'GDAL 3D Tiles', 'PostgreSQL / PostGIS'],
    workPerformed: 'Multi-view 3D mesh triangulation, texture baking, LOD (Level of Detail 1-3) generation, vector parcel boundary integration, and web-based 3D spatial viewer.',
    finalDeliverables: [
      'OGC 3D Tiles Format for Web Streaming',
      'LOD3 Textured 3D Mesh (.GLTF / .OBJ)',
      'High-Resolution True-Orthophoto (no building lean)',
      'Interactive WebGIS Digital Twin Platform with Measurement Tools'
    ],
    verifiedResults: 'Sub-centimeter structural registration enabled virtual clash detection for new utility pipelines without a single physical exploratory excavation.',
    accuracyGsd: '1.2 cm/px True-Ortho',
    rmseVertical: '1.5 cm RMSExyz',
    areaCovered: '82 Hectares',
    badge: 'Technical Demonstration'
  }
];

export const TECH_STACK = [
  {
    category: 'Geospatial Processing',
    tools: ['QGIS', 'ArcGIS Pro', 'WebODM', 'OpenDroneMap', 'GDAL', 'CloudCompare', 'PDAL']
  },
  {
    category: 'AI & Computer Vision',
    tools: ['Python', 'OpenCV', 'YOLOv8/v11', 'PyTorch', 'TensorFlow', 'Rasterio']
  },
  {
    category: 'Geospatial Data Infrastructure',
    tools: ['PostgreSQL', 'PostGIS', 'GeoServer', 'GeoTIFF / COG', 'Cloud Optimized Point Clouds (COPC)']
  },
  {
    category: '3D & Visualization',
    tools: ['CesiumJS', 'Three.js', 'Blender', 'WebGL', 'OGC 3D Tiles', 'Potree Point Viewer']
  },
  {
    category: 'Application Engineering',
    tools: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST / GeoJSON APIs']
  }
];

export const TRUST_LAYERS = [
  { layer: 'Identity', detail: 'Legally registered enterprise, verified headquarters, transparent leadership, and direct engineering contact channels.' },
  { layer: 'Capability', detail: 'Full-stack survey hardware knowledge, in-house high-throughput photogrammetry cluster, and specialized GIS/AI developers.' },
  { layer: 'Evidence', detail: 'Open-access sample datasets, reproducible GSD benchmarks, and real software output previews.' },
  { layer: 'Process', detail: 'Rigid 6-stage engineering workflow from flight telemetry checks to final QA deliverable validation.' },
  { layer: 'Quality Validation', detail: 'Independent Ground Control Points (GCP) and checkpoint RMSE statistics reported on every deliverable.' },
  { layer: 'Data Security', detail: 'Air-gapped local processing options, encrypted storage, and strict non-disclosure compliance.' },
  { layer: 'Accountability', detail: 'Dedicated senior project owner, contractual SLAs, milestone sign-offs, and post-delivery revision guarantee.' },
  { layer: 'Transparency', detail: 'Crystal-clear deliverable specifications, coordinate systems, and explicit statement of technical tolerances.' }
];
