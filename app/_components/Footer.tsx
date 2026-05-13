import { MapPin, Globe, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1 rounded-md">
                <Image src="/logo.svg" alt="logo" width={24} height={24} />
              </div>
              <span className="text-2xl font-bold text-white">Tripma</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              AI-powered trip planning for the modern traveler. Discover, plan, and experience the world effortlessly.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-slate-800">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-slate-800">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
              <li><Link href="/trips" className="hover:text-primary transition-colors">My Trips</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Tripma. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            <span>Made with ❤️ for travelers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
