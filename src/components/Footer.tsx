"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-neki-charcoal text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-heading text-2xl font-bold text-neki-orange mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-neki-orange rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm" />
              NEKI
            </h3>
            <p className="text-white/60 text-sm max-w-xs">
              Humanity, Delivered. Making social good as easy and transparent as modern commerce.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neki-yellow">Platform</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Explore Missions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mission Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transparency Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neki-yellow">Get Involved</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Join as Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Start Contributing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Organization Onboarding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Institutions & CSR</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neki-yellow">Connect</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>© {new Date().getFullYear()} NEKI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}