import React from 'react';
import { Icon } from '@iconify/react';

const Info = () => {
  return (
    <section id="info-section" className="bg-zinc-900 py-20 lg:py-[120px]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8 text-white">Event Information</h2>
        <div className="bg-black p-6 rounded-xl shadow-lg border border-gray-800 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">About CampFest 2025</h3>
          <p className="text-gray-300 mb-3">
            CampFest 2025 is the ultimate gathering for campers, overlanders, and outdoor enthusiasts! This event brings together a community that shares the same passion for adventure, outdoor living, and exploration. Expect a weekend filled with camping, fun activities, product showcases, live demos, and great bonding moments with fellow adventurers.
          </p>
          <p className="text-gray-300">
            Whether you’re into overlanding, moto camping, car camping, or love spending time in the outdoors, CampFest 2025 is the place to be. With the support of our amazing sponsors and partners, we’re excited to create an unforgettable experience where everyone feels welcome, from solo campers to families with kids.
          </p>
          <p className="text-gray-300 mt-3">
            Come join us and let’s celebrate the spirit of camping and adventure together!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Event Details */}
          <div className="bg-black p-6 rounded-xl shadow-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-6">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Icon icon="carbon:calendar" className="w-6 h-6 mr-3 text-teal-400" />
                <span className="text-lg font-medium">Nov 8-9, 2025</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Icon icon="carbon:location" className="w-6 h-6 mr-3 text-teal-400" />
                <span className="text-lg font-medium">Kamp Charlie-Nae</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Icon icon="carbon:ticket" className="w-6 h-6 mr-3 text-teal-400" />
                <span className="text-lg font-medium">Ticket</span>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-white mt-8 mb-4">Ticket Prices:</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between items-center">
                <span className="text-base">Adults / 13 years old and above:</span>
                <span className="font-semibold ml-2 text-white">₱1,200</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-base">Children (5-12 years old):</span>
                <span className="font-semibold ml-2 text-white">₱600</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-base">Below 5 years old:</span>
                <span className="font-semibold ml-2 text-white">Free</span>
              </li>
            </ul>
            <div className="mt-8 text-center">
              <a href="/tickets" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-300">
                Buy Tickets
              </a>
            </div>
          </div>

          {/* Ticket Perks */}
          <div className="bg-black p-6 rounded-xl shadow-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-6">Ticket Perks</h3>
            <h4 className="text-xl font-semibold text-white mb-4">Each ticket comes with:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Raffle Entry</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Event Shirt (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Event Mug (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Event Cap (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Event Sticker</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-base">Bluetti Sticker</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
