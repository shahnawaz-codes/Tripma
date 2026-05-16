import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const DESTINATIONS = [
  {
    name: 'Kyoto',
    area: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Amalfi Coast',
    area: 'Italy',
    image: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Banff National Park',
    area: 'Canada',
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Santorini',
    area: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop',
  },
];

function PopularDestinations() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Popular Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the most loved places by our community. Where will your next adventure take you?
            </p>
          </div>
          <button className="text-primary font-medium hover:underline whitespace-nowrap hidden md:block">
            View All Destinations
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((destination, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <div className="aspect-[4/5] w-full relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white text-2xl font-bold mb-1">{destination.name}</h3>
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{destination.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="text-primary font-medium hover:underline mt-8 w-full text-center md:hidden">
          View All Destinations
        </button>
      </div>
    </div>
  );
}

export default PopularDestinations;
