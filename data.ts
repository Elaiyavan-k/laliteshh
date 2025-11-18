import type { Shipment, Testimonial, Service, TeamMember } from './types';
import { PlaneIcon, ShipIcon, TruckIcon, WarehouseIcon, ShieldCheckIcon, PackageCheckIcon } from './components';

export const mockTrackingData: Shipment[] = [
  {
    awb: 'SW123456789',
    origin: 'Shanghai, China',
    destination: 'New York, USA',
    updates: [
      { status: 'Delivered', timestamp: '2023-10-26T14:00:00Z', location: 'New York, NY', notes: 'Signed for by consignee.' },
      { status: 'Out for Delivery', timestamp: '2023-10-26T08:30:00Z', location: 'New York, NY', notes: 'On final delivery vehicle.' },
      { status: 'Customs', timestamp: '2023-10-25T17:00:00Z', location: 'JFK Airport, NY', notes: 'Customs clearance complete.' },
      { status: 'In Transit', timestamp: '2023-10-24T10:00:00Z', location: 'Incheon, South Korea', notes: 'Departed from transit hub.' },
      { status: 'Received', timestamp: '2023-10-22T15:45:00Z', location: 'Shanghai, China', notes: 'Shipment picked up from shipper.' },
    ],
  },
  {
    awb: 'SW987654321',
    origin: 'Hamburg, Germany',
    destination: 'Los Angeles, USA',
    updates: [
      { status: 'In Transit', timestamp: '2023-10-25T11:00:00Z', location: 'Pacific Ocean', notes: 'Vessel en route.' },
      { status: 'Received', timestamp: '2023-10-20T09:00:00Z', location: 'Hamburg, Germany', notes: 'Container loaded onto vessel.' },
    ],
  },
    {
    awb: 'SW555555555',
    origin: 'Toronto, Canada',
    destination: 'Miami, USA',
    updates: [
      { status: 'Exception', timestamp: '2023-10-27T10:15:00Z', location: 'Atlanta, GA', notes: 'Weather delay. Rescheduled for next business day.' },
      { status: 'In Transit', timestamp: '2023-10-26T18:00:00Z', location: 'Charlotte, NC', notes: 'Departed sorting facility.' },
      { status: 'Received', timestamp: '2023-10-25T13:00:00Z', location: 'Toronto, Canada', notes: 'Shipment received at origin facility.' },
    ],
  }
];

export const testimonials: Testimonial[] = [
  { quote: "SwiftShip transformed our supply chain. Their reliability and communication are second to none. Truly a partner in our success.", author: "Jane Doe", company: "Global Imports Inc." },
  { quote: "The tracking portal is a game-changer. Real-time visibility has allowed us to better manage inventory and customer expectations.", author: "John Smith", company: "Tech Gadgets Co." },
  { quote: "Navigating customs used to be our biggest headache. SwiftShip's expert team makes it seamless every single time.", author: "Carlos Rodriguez", company: "Artisan Goods Exporters" }
];

export const services: Service[] = [
    { title: "Air Freight", description: "Fast and reliable air cargo solutions for your time-sensitive shipments.", icon: PlaneIcon, highlights: ["Global network coverage", "Express & deferred options", "Door-to-door service", "Secure handling for high-value goods"] },
    { title: "Ocean Freight", description: "Cost-effective sea shipping for large-volume and bulk cargo.", icon: ShipIcon, highlights: ["Full Container Load (FCL)", "Less-than-Container Load (LCL)", "Refrigerated cargo options", "Real-time vessel tracking"] },
    { title: "Road Freight", description: "Flexible and efficient ground transportation across domestic and cross-border routes.", icon: TruckIcon, highlights: ["Full Truckload (FTL)", "Less-than-Truckload (LTL)", "Specialized equipment (flatbeds, vans)", "Last-mile delivery services"] },
    { title: "Warehousing", description: "Secure storage and distribution services to optimize your supply chain.", icon: WarehouseIcon, highlights: ["Short & long-term storage", "Inventory management systems", "Pick & pack fulfillment", "Cross-docking services"] },
    { title: "Customs Clearance", description: "Expert handling of all customs brokerage and compliance requirements.", icon: ShieldCheckIcon, highlights: ["Import/Export documentation", "Tariff classification", "Duty & tax calculation", "Regulatory compliance consulting"] },
    { title: "Insurance", description: "Comprehensive cargo insurance to protect your shipments against unforeseen events.", icon: PackageCheckIcon, highlights: ["All-risk coverage", "Simple claims process", "Competitive premium rates", "Peace of mind for every shipment"] },
];

export const teamMembers: TeamMember[] = [
    { name: "Eleanor Vance", role: "CEO & Founder", bio: "With over 20 years in logistics, Eleanor founded SwiftShip with a vision to create a customer-centric, technology-driven shipping company.", imageUrl: "https://picsum.photos/id/1027/400/400" },
    { name: "Marcus Thorne", role: "Head of Operations", bio: "Marcus orchestrates the complex dance of global logistics, ensuring every shipment moves efficiently from origin to destination.", imageUrl: "https://picsum.photos/id/1005/400/400" },
    { name: "Isabella Rossi", role: "Director of Global Trade", bio: "Isabella is our in-house expert on international trade compliance, navigating the intricacies of customs and regulations with ease.", imageUrl: "https://picsum.photos/id/1025/400/400" },
    { name: "Chen Wei", role: "Chief Technology Officer", bio: "Wei leads our tech innovation, building the powerful yet intuitive tools that give our clients unparalleled control and visibility.", imageUrl: "https://picsum.photos/id/1011/400/400" },
];