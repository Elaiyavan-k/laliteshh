import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { Service, TeamMember, QuoteResultData, TrackingUpdate, Shipment } from './types';

// ====== Icons ======
export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
export const PlaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
);
export const ShipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
);
export const TruckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375m15.75 9V14.25M3.375 14.25v-1.875a3.375 3.375 0 013.375-3.375h1.5a1.125 1.125 0 001.125-1.125v-1.5a3.375 3.375 0 013.375-3.375h4.5a3.375 3.375 0 013.375 3.375v1.5a1.125 1.125 0 001.125 1.125h1.5a3.375 3.375 0 013.375 3.375v1.875m-17.25-9h1.5m-1.5 0h-1.5m1.5 0v-1.5m0 1.5v1.5m0-1.5h1.5m-1.5 0h-1.5" /></svg>
);
export const WarehouseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
);
export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
);
export const PackageCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12.75a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0012 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253m18.148-4.506A11.953 11.953 0 0112 15c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12" /></svg>
);
export const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M12 15V3.75m0 0l-3.75 3.75M12 3.75l3.75 3.75" /></svg>
);
export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375M9 12h6.375M9 17.25h6.375" /></svg>
);

const statusStyles: Record<TrackingUpdate['status'], { icon: React.FC<React.SVGProps<SVGSVGElement>>, color: string }> = {
  'Delivered': { icon: PackageCheckIcon, color: 'text-green-500' },
  'Out for Delivery': { icon: TruckIcon, color: 'text-blue-500' },
  'In Transit': { icon: PlaneIcon, color: 'text-sky-500' },
  'Customs': { icon: ShieldCheckIcon, color: 'text-yellow-500' },
  'Received': { icon: PackageIcon, color: 'text-gray-500' },
  'Exception': { icon: XIcon, color: 'text-red-500' },
};


// ====== Layout Components ======

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-white hover:bg-secondary'}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-neutral-300 hover:bg-secondary hover:text-white'}`;

  return (
    <header className="bg-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl flex items-center gap-2">
              <GlobeIcon className="h-8 w-8 text-accent"/>
              <span>SwiftShip</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/services" className={navLinkClass}>Services</NavLink>
              <NavLink to="/track" className={navLinkClass}>Track</NavLink>
              <NavLink to="/quote" className={navLinkClass}>Get a Quote</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-neutral-200 hover:text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/services" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink to="/track" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Track</NavLink>
            <NavLink to="/quote" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Get a Quote</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-neutral-800 text-neutral-300">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Solutions</h3>
          <ul className="mt-4 space-y-4">
            <li><Link to="/services" className="text-base text-neutral-300 hover:text-white">Air Freight</Link></li>
            <li><Link to="/services" className="text-base text-neutral-300 hover:text-white">Ocean Freight</Link></li>
            <li><Link to="/services" className="text-base text-neutral-300 hover:text-white">Road Freight</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Tools</h3>
          <ul className="mt-4 space-y-4">
            <li><Link to="/track" className="text-base text-neutral-300 hover:text-white">Track Shipment</Link></li>
            <li><Link to="/quote" className="text-base text-neutral-300 hover:text-white">Get a Quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Company</h3>
          <ul className="mt-4 space-y-4">
            <li><Link to="/about" className="text-base text-neutral-300 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-base text-neutral-300 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Contact</h3>
          <ul className="mt-4 space-y-2">
            <li>123 Shipping Lane, Port City, 12345</li>
            <li>(123) 456-7890</li>
            <li>contact@swiftship.com</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-neutral-700 pt-8 text-center">
        <p className="text-base text-neutral-400">&copy; {new Date().getFullYear()} SwiftShip Logistics. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// ====== UI Components ======

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary' | 'secondary'}> = ({children, className, variant = 'primary', ...props}) => {
    const baseClasses = "px-6 py-3 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105";
    const variantClasses = variant === 'primary' 
        ? "bg-accent text-primary hover:bg-yellow-400 focus:ring-accent" 
        : "bg-primary text-white hover:bg-secondary focus:ring-primary";
    return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>{children}</button>
}

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string; error?: string}> = ({label, id, error, ...props}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700">{label}</label>
        <div className="mt-1">
            <input id={id} className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-neutral-300 focus:ring-primary focus:border-primary'}`} {...props}/>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {label: string; error?: string, children: React.ReactNode}> = ({label, id, error, children, ...props}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700">{label}</label>
        <div className="mt-1">
            <select id={id} className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-neutral-300 focus:ring-primary focus:border-primary'}`} {...props}>
                {children}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    </div>
);

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <service.icon className="h-6 w-6" aria-hidden="true" />
            </div>
        </div>
        <div className="mt-4 flex-grow">
            <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
            <p className="mt-2 text-base text-neutral-600">{service.description}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-200">
             <ul className="space-y-2">
                {service.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span className="text-sm text-neutral-600">{highlight}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="text-center bg-white p-6 rounded-lg shadow-md">
    <img className="mx-auto h-32 w-32 rounded-full object-cover" src={member.imageUrl} alt={member.name} />
    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-neutral-900">{member.name}</h3>
    <p className="text-sm leading-6 text-primary">{member.role}</p>
    <p className="mt-2 text-sm text-neutral-600">{member.bio}</p>
  </div>
);

export const Timeline: React.FC<{shipment: Shipment}> = ({ shipment }) => (
  <div className="flow-root">
    <ul className="-mb-8">
      {shipment.updates.map((update, updateIdx) => {
          const StatusIcon = statusStyles[update.status].icon;
          const iconColor = statusStyles[update.status].color;

        return (
        <li key={update.timestamp}>
          <div className="relative pb-8">
            {updateIdx !== shipment.updates.length - 1 ? (
              <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-neutral-200" aria-hidden="true" />
            ) : null}
            <div className="relative flex space-x-3">
              <div>
                <span className={`h-8 w-8 rounded-full bg-white flex items-center justify-center ring-8 ring-white ${iconColor}`}>
                  <StatusIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-900">{update.status}</span> in {update.location}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{update.notes}</p>
                </div>
                <div className="whitespace-nowrap text-right text-sm text-neutral-500">
                  <time dateTime={update.timestamp}>{new Date(update.timestamp).toLocaleString()}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      )})}
    </ul>
  </div>
);

export const QuoteResult: React.FC<{ result: QuoteResultData; onBack: () => void; onFinalQuote: () => void }> = ({ result, onBack, onFinalQuote }) => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-primary mb-4">Your Estimated Quote</h2>
            <div className="text-center bg-primary/10 p-6 rounded-lg my-6">
                <p className="text-lg text-neutral-600">Estimated Price</p>
                <p className="text-5xl font-extrabold text-primary my-2">{formatCurrency(result.estimatedPrice)}</p>
                <p className="text-md text-neutral-500">Estimated Transit Time: {result.transitTime}</p>
            </div>
            <div className="space-y-2 text-neutral-700">
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">Cost Breakdown</h3>
                <div className="flex justify-between"><p>Base Rate:</p> <p>{formatCurrency(result.breakdown.base)}</p></div>
                <div className="flex justify-between"><p>Fuel Surcharge:</p> <p>{formatCurrency(result.breakdown.fuelSurcharge)}</p></div>
                <div className="flex justify-between"><p>Handling Fee:</p> <p>{formatCurrency(result.breakdown.handling)}</p></div>
                <div className="flex justify-between"><p>Customs Fee:</p> <p>{formatCurrency(result.breakdown.customs)}</p></div>
            </div>
            <p className="text-xs text-neutral-500 mt-6">*This is an estimate. Final price may vary based on final verification and market conditions.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={onBack} variant="secondary" className="w-full sm:w-auto">Get a New Quote</Button>
                <Button onClick={onFinalQuote} variant="primary" className="w-full sm:w-auto">Request Final Quote</Button>
            </div>
        </div>
    );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};