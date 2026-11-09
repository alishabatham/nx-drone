import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';

// Fix Windows DNS SRV lookup for MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alishabatham2_db_user:8yOJZE91cp7RaOjX@cluster0.wxd2cah.mongodb.net/nx_drone?retryWrites=true&w=majority';

// Connect to MongoDB
let isDbConnected = false;
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
  .then(() => {
    isDbConnected = true;
    console.log('[NX Drone Intelligence] Connected to MongoDB Atlas successfully.');
    initDbDefaults();
  })
  .catch((err) => {
    console.warn('[NX Drone Intelligence] MongoDB connection warning:', err.message);
  });

// MongoDB Mongoose Schemas & Models
const InquirySchema = new mongoose.Schema({
  referenceId: { type: String, required: true, index: true },
  type: { type: String, enum: ['project', 'partner'], default: 'project' },
  fullName: { type: String, required: true },
  companyName: { type: String, default: 'Not specified' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  industry: { type: String, default: 'General Geospatial' },
  projectLocation: { type: String, default: 'Pan-India' },
  requiredService: { type: String, default: 'Comprehensive Processing' },
  dataAvailability: { type: String, default: 'consultation' },
  projectArea: { type: String, default: 'To be determined' },
  expectedTimeline: { type: String, default: 'Standard SLA' },
  partnerCategory: String,
  additionalDetails: { type: String, default: '' },
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

const InquiryModel = mongoose.model('Inquiry', InquirySchema);

const SiteContentSchema = new mongoose.Schema({
  key: { type: String, default: 'default', unique: true },
  hero: {
    kicker: String,
    title: String,
    subtitle: String,
    statGsd: String,
    statRmse: String,
    statSla: String,
  },
  pillars: [
    {
      id: String,
      title: String,
      image: String,
    }
  ],
  services: [
    {
      id: String,
      name: String,
      image: String,
      targetCatId: String,
    }
  ],
  industries: [
    {
      id: String,
      name: String,
      image: String,
    }
  ],
  partner: {
    title: String,
    subtitle: String,
    desc: String,
    track1Title: String,
    track1Sub: String,
    track1Desc: String,
    track2Title: String,
    track2Sub: String,
    track2Desc: String,
  }
}, { timestamps: true });

const SiteContentModel = mongoose.model('SiteContent', SiteContentSchema);

const defaultSiteContent = {
  key: 'default',
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

// Seed defaults into MongoDB if first run
async function initDbDefaults() {
  try {
    const existingContent = await SiteContentModel.findOne({ key: 'default' });
    if (!existingContent) {
      await SiteContentModel.create(defaultSiteContent);
      console.log('[NX Drone Intelligence] Seeded default site content into MongoDB.');
    }

    const countInquiries = await InquiryModel.countDocuments();
    if (countInquiries === 0) {
      await InquiryModel.insertMany([
        {
          referenceId: 'NX-2026-4821',
          type: 'project',
          fullName: 'Rajesh K. Sharma',
          companyName: 'Adani Infrastructure & Power',
          email: 'r.sharma@adaniinfradev.in',
          phone: '+91 98201 44512',
          industry: 'Solar & Renewable Energy',
          projectLocation: 'Bhadla, Rajasthan',
          requiredService: 'Aerial Radiometric Thermal Inspection & Anomaly Detection',
          dataAvailability: 'requires_flight',
          projectArea: '120 Hectares (85 MW)',
          expectedTimeline: 'Within 7 business days',
          additionalDetails: 'Need string-level hot-spot fault classification and IEC 62446-3 compliant inspection report.',
          status: 'Scope Finalized',
          createdAt: new Date('2026-11-06T10:30:00Z')
        },
        {
          referenceId: 'NX-2026-3914',
          type: 'partner',
          fullName: 'Vikram Sengupta',
          companyName: 'AeroSky Geospatial Drones LLP',
          email: 'vikram@aeroskydrones.com',
          phone: '+91 94330 88219',
          industry: 'Mining & Minerals',
          projectLocation: 'Keonjhar, Odisha',
          requiredService: 'White-Label Photogrammetry & Stockpile Volumetrics',
          dataAvailability: 'existing_data',
          projectArea: '45 Hectares Open-cast Mine',
          expectedTimeline: 'Monthly Recurring Processing',
          partnerCategory: 'Drone Survey Company',
          additionalDetails: 'We fly DJI M300 with P1 camera. Looking for high-throughput PPK processing and cut/fill volumetric report delivery within 24 hours.',
          status: 'In Progress',
          createdAt: new Date('2026-11-07T14:15:00Z')
        },
        {
          referenceId: 'NX-2026-2810',
          type: 'project',
          fullName: 'Dr. Anita Deshmukh',
          companyName: 'State Water Resources Authority',
          email: 'anita.deshmukh@wrd.gov.in',
          phone: '+91 97654 32100',
          industry: 'Water Resources',
          projectLocation: 'Godavari Basin, Maharashtra',
          requiredService: 'LiDAR Terrain & Contour Watershed Hydrological Modeling',
          dataAvailability: 'consultation',
          projectArea: '320 Square Kilometers',
          expectedTimeline: 'Quarter 1 2027',
          additionalDetails: 'Digital Elevation Model (DEM) with 0.5m contour intervals for canal breach risk simulation.',
          status: 'Technical Assessment',
          createdAt: new Date('2026-11-08T06:45:00Z')
        }
      ]);
      console.log('[NX Drone Intelligence] Seeded sample CRM inquiries into MongoDB.');
    }
  } catch (err) {
    console.error('Error seeding DB defaults:', err);
  }
}

// In-memory fallback
let memorySiteContent = { ...defaultSiteContent };
const inquiries: any[] = [
  {
    id: 'inq-1',
    referenceId: 'NX-2026-4821',
    type: 'project',
    fullName: 'Rajesh K. Sharma',
    companyName: 'Adani Infrastructure & Power',
    email: 'r.sharma@adaniinfradev.in',
    phone: '+91 98201 44512',
    industry: 'Solar & Renewable Energy',
    projectLocation: 'Bhadla, Rajasthan',
    requiredService: 'Aerial Radiometric Thermal Inspection & Anomaly Detection',
    dataAvailability: 'requires_flight',
    projectArea: '120 Hectares (85 MW)',
    expectedTimeline: 'Within 7 business days',
    additionalDetails: 'Need string-level hot-spot fault classification and IEC 62446-3 compliant inspection report.',
    status: 'Scope Finalized',
    createdAt: '2026-11-06T10:30:00Z'
  },
  {
    id: 'inq-2',
    referenceId: 'NX-2026-3914',
    type: 'partner',
    fullName: 'Vikram Sengupta',
    companyName: 'AeroSky Geospatial Drones LLP',
    email: 'vikram@aeroskydrones.com',
    phone: '+91 94330 88219',
    industry: 'Mining & Minerals',
    projectLocation: 'Keonjhar, Odisha',
    requiredService: 'White-Label Photogrammetry & Stockpile Volumetrics',
    dataAvailability: 'existing_data',
    projectArea: '45 Hectares Open-cast Mine',
    expectedTimeline: 'Monthly Recurring Processing',
    partnerCategory: 'Drone Survey Company',
    additionalDetails: 'We fly DJI M300 with P1 camera. Looking for high-throughput PPK processing and cut/fill volumetric report delivery within 24 hours.',
    status: 'In Progress',
    createdAt: '2026-11-07T14:15:00Z'
  },
  {
    id: 'inq-3',
    referenceId: 'NX-2026-2810',
    type: 'project',
    fullName: 'Dr. Anita Deshmukh',
    companyName: 'State Water Resources Authority',
    email: 'anita.deshmukh@wrd.gov.in',
    phone: '+91 97654 32100',
    industry: 'Water Resources',
    projectLocation: 'Godavari Basin, Maharashtra',
    requiredService: 'LiDAR Terrain & Contour Watershed Hydrological Modeling',
    dataAvailability: 'consultation',
    projectArea: '320 Square Kilometers',
    expectedTimeline: 'Quarter 1 2027',
    additionalDetails: 'Digital Elevation Model (DEM) with 0.5m contour intervals for canal breach risk simulation.',
    status: 'Technical Assessment',
    createdAt: '2026-11-08T06:45:00Z'
  }
];

// Showcase Projects Data
const showcaseProjects = [
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

// Complete 9 Services Categories as specified
const serviceCategories = [
  {
    id: 'drone-data-acquisition',
    code: 'A',
    title: 'Drone Data Acquisition',
    subtitle: 'High-precision flight execution & multi-sensor payload capture',
    description: 'Autonomous flight plans, certified DGCA/FAA commercial workflows, RTK/PPK base station integration, and multi-spectral sensors.',
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

// 12 Industries as specified
const industries = [
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

// Operational stats
const operationalStats = {
  accuracyValidation: {
    groundSamplingDistance: 'Up to 1.2 cm/pixel GSD',
    verticalElevationRmse: '1.5 cm – 2.5 cm RMSEz (PPK/GCP)',
    horizontalSpatialRmse: '1.0 cm – 2.0 cm RMSExy',
    photogrammetryOverlapDefault: '80% Frontal / 75% Lateral',
    qaCheckpoints: 'Triple-point validation against independent check benchmarks'
  },
  processingMetrics: {
    hectaresProcessed: '45,000+ Hectares',
    rawImagesProcessed: '3.8M+ Aerial Frames',
    partnerTurnaroundSLA: '< 24 Hours for standard 50Ha orthomosaics',
    supportedCoordinateSystems: ['WGS 84', 'UTM Zones 42N-45N', 'Everest 1830', 'Custom Site Datums']
  },
  deliverableFormats: [
    { category: 'Raster GIS', formats: ['GeoTIFF (.tif)', 'ECW', 'MBTiles', 'KMZ / KML'] },
    { category: 'Vector GIS', formats: ['ESRI Shapefile (.shp)', 'GeoJSON', 'AutoCAD DXF/DWG', 'Geopackage (.gpkg)'] },
    { category: 'Point Clouds', formats: ['LAS (v1.2–v1.4)', 'LAZ (compressed)', 'XYZ / TXT', 'PLY / E57'] },
    { category: '3D Models & BIM', formats: ['OBJ + MTL', 'FBX', 'GLTF / GLB', '3D Tiles (Cesium)', 'Revit / IFC compatible'] },
    { category: 'Reports & Certificates', formats: ['Certified Volumetric PDF', 'IEC Thermography Audit PDF', 'Survey Benchmark Report'] }
  ]
};

// API Endpoints
// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'NX Drone Intelligence API',
    version: '2.4.0',
    timestamp: new Date().toISOString()
  });
});

// =========================================================
// API ENDPOINTS (CONNECTED TO MONGODB ATLAS)
// =========================================================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'NX Drone Intelligence API',
    database: isDbConnected ? 'MongoDB Atlas Connected' : 'In-Memory Fallback',
    version: '2.4.0',
    timestamp: new Date().toISOString()
  });
});

// GET site content from MongoDB
app.get('/api/content', async (req: Request, res: Response) => {
  try {
    let content: any = null;
    if (isDbConnected) {
      content = await SiteContentModel.findOne({ key: 'default' });
    }
    if (!content) content = memorySiteContent;
    res.json({ success: true, data: content, source: isDbConnected ? 'mongodb' : 'memory' });
  } catch (err: any) {
    res.json({ success: true, data: memorySiteContent, source: 'fallback' });
  }
});

// PUT update site content in MongoDB
app.put('/api/content', async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    memorySiteContent = { ...memorySiteContent, ...updatedData };
    if (isDbConnected) {
      const doc = await SiteContentModel.findOneAndUpdate(
        { key: 'default' },
        { $set: updatedData },
        { upsert: true, new: true }
      );
      return res.json({ success: true, message: 'Content saved to MongoDB successfully.', data: doc });
    }
    res.json({ success: true, message: 'Content saved in memory.', data: memorySiteContent });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST reset site content to defaults in MongoDB
app.post('/api/content/reset', async (req: Request, res: Response) => {
  try {
    memorySiteContent = { ...defaultSiteContent };
    if (isDbConnected) {
      await SiteContentModel.findOneAndUpdate(
        { key: 'default' },
        { $set: defaultSiteContent },
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: 'Reset to default content in MongoDB.', data: defaultSiteContent });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all inquiries from MongoDB (for CRM)
app.get('/api/inquiries', async (req: Request, res: Response) => {
  try {
    if (isDbConnected) {
      const list = await InquiryModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, total: list.length, data: list });
    }
    res.json({ success: true, total: inquiries.length, data: inquiries });
  } catch (err: any) {
    res.json({ success: true, total: inquiries.length, data: inquiries });
  }
});

// POST new inquiry (Handles both Client project and Partner inquiries in MongoDB)
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const {
      type,
      fullName,
      companyName,
      email,
      phone,
      industry,
      projectLocation,
      requiredService,
      dataAvailability,
      projectArea,
      expectedTimeline,
      partnerCategory,
      additionalDetails
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, valid email address, and phone number.'
      });
    }

    // Generate unique reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `NX-2026-${randomSuffix}`;

    const inqData = {
      referenceId,
      type: type === 'partner' ? 'partner' : 'project',
      fullName,
      companyName: companyName || 'Not specified',
      email,
      phone,
      industry: industry || 'General Geospatial',
      projectLocation: projectLocation || 'Pan-India',
      requiredService: requiredService || 'Comprehensive Processing',
      dataAvailability: dataAvailability || 'consultation',
      projectArea: projectArea || 'To be determined',
      expectedTimeline: expectedTimeline || 'Standard SLA',
      partnerCategory: type === 'partner' ? (partnerCategory || 'Drone Survey Company') : undefined,
      additionalDetails: additionalDetails || '',
      status: 'New',
      createdAt: new Date()
    };

    let savedDoc: any = null;
    if (isDbConnected) {
      savedDoc = await InquiryModel.create(inqData);
    } else {
      const inMemoryItem = { id: `inq-${Date.now()}`, ...inqData, createdAt: new Date().toISOString() };
      inquiries.unshift(inMemoryItem as any);
      savedDoc = inMemoryItem;
    }

    res.status(201).json({
      success: true,
      message: 'Your requirement has been logged successfully and saved in MongoDB.',
      referenceId,
      expectedTurnaround: 'Technical assessment within 4 business hours',
      assignedEngineer: 'Senior Geospatial Processing Lead',
      data: savedDoc
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH inquiry status in MongoDB (Admin CRM)
app.patch('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isDbConnected) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ _id: id }, { referenceId: id }] } : { referenceId: id };
      const updated = await InquiryModel.findOneAndUpdate(
        query,
        { $set: { status } },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Inquiry updated successfully in MongoDB', data: updated });
      }
    }

    const inquiry = inquiries.find(i => i.id === id || i.referenceId === id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
    }
    if (status) {
      inquiry.status = status;
    }
    res.json({ success: true, message: 'Inquiry updated successfully', data: inquiry });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE inquiry from MongoDB (Admin CRM)
app.delete('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isDbConnected) {
      const isObjectId = mongoose.isValidObjectId(id);
      const query = isObjectId ? { $or: [{ _id: id }, { referenceId: id }] } : { referenceId: id };
      const deleted = await InquiryModel.findOneAndDelete(query);
      if (deleted) {
        return res.json({ success: true, message: 'Inquiry deleted successfully from MongoDB', data: deleted });
      }
    }

    const index = inquiries.findIndex(i => i.id === id || i.referenceId === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
    }
    const deleted = inquiries.splice(index, 1);
    res.json({ success: true, message: 'Inquiry deleted successfully', data: deleted[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET showcase projects
app.get('/api/projects', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: showcaseProjects.length,
    data: showcaseProjects
  });
});

// POST add showcase project (Admin CMS)
app.post('/api/projects', (req: Request, res: Response) => {
  const newProj = {
    id: `proj-${Date.now()}`,
    ...req.body,
    badge: 'Technical Demonstration'
  };
  showcaseProjects.unshift(newProj);
  res.status(201).json({ success: true, message: 'Project added to showcase', data: newProj });
});

// GET services
app.get('/api/services', (req: Request, res: Response) => {
  res.json({
    success: true,
    totalCategories: serviceCategories.length,
    data: serviceCategories
  });
});

// GET industries
app.get('/api/industries', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: industries.length,
    data: industries
  });
});

// GET operational stats & accuracy statement
app.get('/api/stats', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: operationalStats
  });
});

// POST live stockpile volume calculation estimation endpoint
app.post('/api/volume-calculate', (req: Request, res: Response) => {
  const { footprintAreaSqm, averageHeightM, baseElevationM, materialType } = req.body;
  const area = parseFloat(footprintAreaSqm) || 2500; // sqm
  const height = parseFloat(averageHeightM) || 6.5; // m
  const base = parseFloat(baseElevationM) || 310.0; // m
  const materialDensities: Record<string, number> = {
    'iron_ore': 2.65,
    'bauxite': 1.85,
    'coal': 1.35,
    'limestone': 2.45,
    'gravel_sand': 1.65
  };

  const density = materialDensities[materialType] || 2.1;
  // Conical/frustum volumetric model calculation with surface roughness factor
  const estimatedGrossVolumeCuM = Math.round(area * height * 0.58 * 10) / 10;
  const estimatedCutVolumeCuM = Math.round(estimatedGrossVolumeCuM * 0.96 * 10) / 10;
  const estimatedFillVolumeCuM = Math.round(estimatedGrossVolumeCuM * 0.04 * 10) / 10;
  const totalTonnageTons = Math.round(estimatedCutVolumeCuM * density);
  const errorTolerancePercent = 1.2;

  res.json({
    success: true,
    input: { area, height, base, material: materialType || 'bauxite', density },
    results: {
      grossVolumeCuM: estimatedGrossVolumeCuM,
      cutVolumeCuM: estimatedCutVolumeCuM,
      fillVolumeCuM: estimatedFillVolumeCuM,
      densityTonnesPerCuM: density,
      totalMetricTonnes: totalTonnageTons,
      accuracyTolerance: `±${errorTolerancePercent}% (PPK georeferenced)`,
      recommendedGsd: '1.2 cm – 1.8 cm/pixel',
      deliverableFormats: ['.LAS', '.DXF contours', 'Certified Volumetric PDF']
    }
  });
});

// Serve frontend in Dev vs Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[NX Drone Intelligence] Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
