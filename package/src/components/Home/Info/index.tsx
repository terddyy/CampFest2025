import React from 'react';
import { Icon } from '@iconify/react';

const Info = () => {
  return (
    <section id="info-section" className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Event Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Icon icon="carbon:calendar" className="w-6 h-6 mr-3 text-teal-500" />
                <span className="text-lg font-medium">Nov 8-9, 2025</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Icon icon="carbon:location" className="w-6 h-6 mr-3 text-teal-500" />
                <span className="text-lg font-medium">Kamp Charlie-Nae</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Icon icon="carbon:ticket" className="w-6 h-6 mr-3 text-teal-500" />
                <span className="text-lg font-medium">Ticket</span>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Ticket Prices:</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-base">Adults / 13 years old and above:</span>
                <span className="font-semibold ml-2">₱1,200</span>
              </li>
              <li className="flex items-center">
                <span className="text-base">Children (5-12 years old):</span>
                <span className="font-semibold ml-2">₱600</span>
              </li>
              <li className="flex items-center">
                <span className="text-base">Below 5 years old:</span>
                <span className="font-semibold ml-2">Free</span>
              </li>
            </ul>
          </div>

          {/* Ticket Perks */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ticket Perks</h3>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Each ticket comes with:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-base">Raffle Entry</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-base">Event Shirt (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-base">Event Mug (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-base">Event Cap (per rig)</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-base">Event Sticker</span>
              </li>
              <li className="flex items-center">
                <Icon icon="carbon:checkmark" className="w-5 h-5 mr-2 text-green-500" />
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
