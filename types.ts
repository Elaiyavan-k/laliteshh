import type { FC, SVGProps } from 'react';

export interface TrackingUpdate {
  status: 'Received' | 'In Transit' | 'Customs' | 'Out for Delivery' | 'Delivered' | 'Exception';
  timestamp: string;
  location: string;
  notes: string;
}

export interface Shipment {
  awb: string;
  origin: string;
  destination: string;
  updates: TrackingUpdate[];
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface Service {
  title: string;
  description: string;
  // FIX: Use imported FC and SVGProps types instead of React namespace.
  icon: FC<SVGProps<SVGSVGElement>>;
  highlights: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface QuoteDetails {
    origin: string;
    destination: string;
    shipmentType: 'air' | 'ocean' | 'road';
    length: string;
    width: string;
    height: string;
    weight: string;
    shipmentDate: string;
    email: string;
}

export interface QuoteResultData {
    estimatedPrice: number;
    transitTime: string;
    breakdown: {
        base: number;
        fuelSurcharge: number;
        handling: number;
        customs: number;
    };
}