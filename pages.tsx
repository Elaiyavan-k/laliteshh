import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, ServiceCard, TeamMemberCard, Timeline, Input, Select, QuoteResult, Modal } from './components';
import { services, testimonials, teamMembers } from './data';
import { fetchTrackingData } from './services';
import type { Testimonial, Shipment, QuoteDetails, QuoteResultData } from './types';

export const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-32">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{backgroundImage: "url('https://picsum.photos/seed/logistics/1920/1080')"}}
         ></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Global Logistics, Simplified.</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto mb-8">Your trusted partner for seamless shipping, tracking, and supply chain management across the globe.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/quote"><Button variant="primary">Get a Quote</Button></Link>
            <Link to="/track"><Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">Track Your Shipment</Button></Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Our Core Services</h2>
          <p className="text-neutral-600 mb-12 max-w-2xl mx-auto">From air to ocean to ground, we have the right solution for your shipping needs.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.slice(0, 3).map(service => <ServiceCard key={service.title} service={service} />)}
          </div>
           <div className="mt-12">
            <Link to="/services"><Button variant="secondary">View All Services</Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
          <div className="relative max-w-3xl mx-auto h-48">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}
              >
                <blockquote className="text-xl italic text-neutral-700">"{testimonial.quote}"</blockquote>
                <p className="mt-4 font-semibold">{testimonial.author}</p>
                <p className="text-neutral-500">{testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export const ServicesPage: React.FC = () => (
  <div className="py-16 bg-neutral-100">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-primary">Our Services</h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
          We offer a comprehensive suite of logistics services designed to meet the diverse needs of your business. Explore our solutions to find the perfect fit for your supply chain.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => <ServiceCard key={service.title} service={service} />)}
      </div>
    </div>
  </div>
);


export const AboutPage: React.FC = () => (
  <>
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary">About Lalitesh's freights</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Founded on the principles of reliability, innovation, and customer-first service, Lalitesh's freights has grown into a leading global logistics provider.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg text-neutral-700">
                <h2 className="text-2xl font-bold text-secondary">Our Mission</h2>
                <p>To simplify global trade for businesses of all sizes through innovative technology, unparalleled expertise, and a relentless commitment to customer success.</p>
                <h2 className="text-2xl font-bold text-secondary mt-8">Our Vision</h2>
                <p>To be the world's most trusted and transparent logistics partner, empowering businesses to connect with the global marketplace seamlessly and efficiently.</p>
            </div>
            <div>
                <img src="https://picsum.photos/seed/about/600/400" alt="Logistics operation" className="rounded-lg shadow-xl"/>
            </div>
        </div>
      </div>
    </div>

    <div className="bg-neutral-100 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Our Leadership</h2>
          <p className="mt-4 text-lg text-neutral-600">The experienced team guiding our mission.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => <TeamMemberCard key={member.name} member={member} />)}
        </div>
      </div>
    </div>
  </>
);


export const TrackPage: React.FC = () => {
    const [awbInput, setAwbInput] = useState('');
    const [shipments, setShipments] = useState<Shipment[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const hasSearched = useRef(false);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!awbInput.trim()) {
            setError('Please enter at least one AWB number.');
            return;
        }
        hasSearched.current = true;
        setIsLoading(true);
        setError('');
        setShipments(null);

        const data = await fetchTrackingData(awbInput);
        if (data) {
            setShipments(data);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">Track Your Shipment</h1>
                    <p className="text-neutral-600 mb-6">Enter your Air Waybill (AWB) number(s) below. For multiple shipments, separate numbers with a comma.</p>
                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={awbInput}
                            onChange={(e) => setAwbInput(e.target.value)}
                            placeholder="e.g., LA123456789, LA987654321"
                            className="flex-grow w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? 'Tracking...' : 'Track'}
                        </Button>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                <div className="mt-12">
                    {isLoading && <div className="text-center text-neutral-600">Loading tracking information...</div>}
                    
                    {shipments && shipments.length > 0 && (
                        <div className="space-y-12">
                            {shipments.map(shipment => (
                                <div key={shipment.awb} className="bg-white p-8 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-bold text-secondary">AWB: {shipment.awb}</h2>
                                    <div className="flex justify-between text-neutral-600 mt-2 mb-6 border-b pb-4">
                                        <span><strong>From:</strong> {shipment.origin}</span>
                                        <span><strong>To:</strong> {shipment.destination}</span>
                                    </div>
                                    <Timeline shipment={shipment} />
                                </div>
                            ))}
                        </div>
                    )}

                    {hasSearched.current && !isLoading && shipments?.length === 0 && (
                        <div className="text-center bg-white p-8 rounded-lg shadow-md text-neutral-600">
                           <h3 className="text-xl font-semibold">No shipments found.</h3>
                           <p>Please check your AWB number(s) and try again.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export const QuotePage: React.FC = () => {
    const [formData, setFormData] = useState<QuoteDetails>({
        origin: '', destination: '', shipmentType: 'air', length: '',
        width: '', height: '', weight: '', shipmentDate: '', email: ''
    });
    const [errors, setErrors] = useState<Partial<Record<keyof QuoteDetails, string>>>({});
    const [quoteResult, setQuoteResult] = useState<QuoteResultData | null>(null);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof QuoteDetails, string>> = {};
        if (!formData.origin) newErrors.origin = 'Origin is required';
        if (!formData.destination) newErrors.destination = 'Destination is required';
        if (parseFloat(formData.weight) <= 0 || !formData.weight) newErrors.weight = 'Valid weight is required';
        if (parseFloat(formData.length) <= 0 || !formData.length) newErrors.length = 'Valid length is required';
        if (parseFloat(formData.width) <= 0 || !formData.width) newErrors.width = 'Valid width is required';
        if (parseFloat(formData.height) <= 0 || !formData.height) newErrors.height = 'Valid height is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        
        // --- Mock Cost Calculation Logic ---
        // This is a deterministic formula for estimation.
        // base rate + (weight * surcharge) + (volume * multiplier) + fuel + handling
        const weight = parseFloat(formData.weight);
        const volume = (parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / 5000; // Volumetric weight factor for air
        const chargeableWeight = Math.max(weight, volume);
        
        const serviceMultipliers = { air: 1.5, ocean: 0.5, road: 0.8 };
        const baseRate = 50;
        const handling = 75;
        const customs = 120;
        
        const calculatedBase = baseRate + (chargeableWeight * 5 * serviceMultipliers[formData.shipmentType]);
        const fuelSurcharge = calculatedBase * 0.18; // 18% fuel surcharge

        const total = calculatedBase + fuelSurcharge + handling + customs;
        
        const transitTimes = { air: '3-5 days', ocean: '25-30 days', road: '7-10 days'};

        setQuoteResult({
            estimatedPrice: total,
            transitTime: transitTimes[formData.shipmentType],
            breakdown: {
                base: calculatedBase,
                fuelSurcharge: fuelSurcharge,
                handling: handling,
                customs: customs,
            }
        });
    };
    
    const handleFinalQuote = () => {
        // In a real app, this would POST to an API. Here we simulate it.
        localStorage.setItem('savedQuoteLead', JSON.stringify(formData));
        alert(`Thank you! A representative will contact you at ${formData.email} with a final quote. Your lead has been saved.`);
    };

    if (quoteResult) {
        return (
            <div className="bg-neutral-100 py-16">
                <div className="container mx-auto px-6 max-w-2xl">
                    <QuoteResult result={quoteResult} onBack={() => setQuoteResult(null)} onFinalQuote={handleFinalQuote}/>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-100 py-16">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-primary mb-2">Instant Quote</h1>
                    <p className="text-neutral-600 mb-6">Fill in the details below to get an estimated shipping cost.</p>
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Origin (City, Country)" id="origin" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} error={errors.origin}/>
                            <Input label="Destination (City, Country)" id="destination" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} error={errors.destination}/>
                        </div>
                        <Select label="Shipment Type" id="shipmentType" value={formData.shipmentType} onChange={e => setFormData({...formData, shipmentType: e.target.value as QuoteDetails['shipmentType']})}>
                            <option value="air">Air Freight</option>
                            <option value="ocean">Ocean Freight</option>
                            <option value="road">Road Freight</option>
                        </Select>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Dimensions (cm)</label>
                            <div className="grid grid-cols-3 gap-4 mt-1">
                                <Input label="" id="length" type="number" placeholder="L" value={formData.length} onChange={e => setFormData({...formData, length: e.target.value})} error={errors.length} />
                                <Input label="" id="width" type="number" placeholder="W" value={formData.width} onChange={e => setFormData({...formData, width: e.target.value})} error={errors.width} />
                                <Input label="" id="height" type="number" placeholder="H" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} error={errors.height} />
                            </div>
                        </div>
                         <Input label="Weight (kg)" id="weight" type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} error={errors.weight}/>
                         <Input label="Email for Quote" id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} error={errors.email}/>
                         <div>
                            <Button type="submit" className="w-full">Calculate Estimate</Button>
                         </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: ''});
    const [errors, setErrors] = useState<Partial<typeof formState>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validate = () => {
        const newErrors: Partial<typeof formState> = {};
        if (!formState.name) newErrors.name = 'Name is required';
        if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'A valid email is required';
        if (!formState.subject) newErrors.subject = 'Subject is required';
        if (!formState.message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            localStorage.setItem('contactMessage', JSON.stringify(formState));
            setFormState({ name: '', email: '', subject: '', message: ''});
            setIsModalOpen(true);
        }
    };

    return (
        <>
        <div className="bg-white py-16">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-primary">Get In Touch</h1>
                    <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
                        Have a question or need a custom solution? Our team is here to help.
                    </p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 gap-12">
                    <div className="bg-neutral-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-secondary mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input label="Full Name" id="name" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} error={errors.name} />
                            <Input label="Email Address" id="email" type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} error={errors.email} />
                            <Input label="Subject" id="subject" value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})} error={errors.subject} />
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700">Message</label>
                                <textarea id="message" rows={4} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-neutral-300 focus:ring-primary focus:border-primary'}`}></textarea>
                                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </div>
                     <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-secondary">Contact Information</h3>
                            <p className="mt-2 text-neutral-600">123 Shipping Lane, Port City, 12345</p>
                            <p className="mt-2 text-neutral-600">contact@laliteshsfreights.com</p>
                            <p className="text-neutral-600">(123) 456-7890</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-secondary">Office Hours</h3>
                            <p className="mt-2 text-neutral-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                            <p className="text-neutral-600">Saturday & Sunday: Closed</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-secondary">Location</h3>
                            <div className="mt-2 h-64 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500">
                                {/* Google Maps Embed Placeholder */}
                                <p>Google Maps embed will be placed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Message Sent!">
            <p className="text-sm text-gray-500">
                Thank you for contacting us! We have received your message and will get back to you shortly.
            </p>
            <div className="mt-4">
                <Button onClick={() => setIsModalOpen(false)} className="w-full">Close</Button>
            </div>
        </Modal>
        </>
    );
};