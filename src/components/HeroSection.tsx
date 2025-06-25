"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, Users, ChevronDown } from "lucide-react";

// Sample destinations for the dropdown
const destinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "London, UK",
  "Dubai, UAE",
  "Sydney, Australia"
];

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeField, setActiveField] = useState<"destination" | "checkin" | "checkout" | "guests" | null>(null);
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: { adults: 2, children: 0, rooms: 1 }
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatGuestText = () => {
    const { adults, children, rooms } = formData.guests;
    const guestCount = adults + children;
    const guestText = guestCount === 1 ? "guest" : "guests";
    const roomText = rooms === 1 ? "room" : "rooms";
    return `${guestCount} ${guestText} • ${rooms} ${roomText}`;
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 h-screen w-full -mt-12">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/images/image1.jpeg"
            alt="Luxury oceanfront villa with terrace"
            fill
            className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-[8s] ease-out"
            priority
            quality={95}
          />
          {/* Advanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-32 right-16 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: "1s" }} />

      {/* Main Content Container */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Hero Text */}
        <div className="text-center mb-6 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Perfect Stay
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-light max-w-xl mx-auto leading-relaxed">
              Discover extraordinary places to stay, from luxury villas to unique experiences around the world
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-white/80 text-xs sm:text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Verified Properties</span>
            </div>
            <div className="flex items-center space-x-1">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center space-x-1">
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl" />
          <div className="relative p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3">
              {/* Destination Field */}
              <div className="relative group">
                <div
                  className={`relative transition-all duration-300 ${
                    activeField === "destination" ? "transform scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm group-hover:bg-white/20 transition-all duration-300" />
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-lg min-h-[60px] sm:min-h-[70px]">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Where
                        </label>
                        <input
                          type="text"
                          placeholder="Search destinations"
                          value={formData.destination}
                          onChange={(e) =>
                            setFormData({ ...formData, destination: e.target.value })
                          }
                          onFocus={() => setActiveField("destination")}
                          onBlur={() =>
                            setTimeout(() => setActiveField(null), 200)
                          }
                          className="w-full bg-transparent text-gray-800 placeholder-gray-500 text-sm sm:text-base font-medium focus:outline-none"
                        />
                      </div>
                    </div>
                    {activeField === "destination" && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                        {destinations.map((dest, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setFormData({ ...formData, destination: dest });
                              setActiveField(null);
                            }}
                            className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 text-sm sm:text-base text-gray-700 transition-colors duration-150"
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative group">
                <div
                  className={`relative transition-all duration-300 ${
                    activeField === "checkin" ? "transform scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm group-hover:bg-white/20 transition-all duration-300" />
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-lg min-h-[60px] sm:min-h-[70px]">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Check In
                        </label>
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) =>
                            setFormData({ ...formData, checkIn: e.target.value })
                          }
                          onFocus={() => setActiveField("checkin")}
                          onBlur={() => setActiveField(null)}
                          className="w-full bg-transparent text-gray-800 text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
                          placeholder="Select check-in date"
                          title="Check-in date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-out Date */}
              <div className="relative group">
                <div
                  className={`relative transition-all duration-300 ${
                    activeField === "checkout" ? "transform scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm group-hover:bg-white/20 transition-all duration-300" />
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-lg min-h-[60px] sm:min-h-[70px]">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Check Out
                        </label>
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) =>
                            setFormData({ ...formData, checkOut: e.target.value })
                          }
                          onFocus={() => setActiveField("checkout")}
                          onBlur={() => setActiveField(null)}
                          className="w-full bg-transparent text-gray-800 text-sm sm:text-base font-medium focus:outline-none cursor-pointer"
                          placeholder="Select check-out date"
                          title="Check-out date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guests Field */}
              <div className="relative group">
                <div
                  className={`relative transition-all duration-300 ${
                    activeField === "guests" ? "transform scale-105" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm group-hover:bg-white/20 transition-all duration-300" />
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-lg min-h-[60px] sm:min-h-[70px]">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                          Guests
                        </label>
                        <button
                          onClick={() =>
                            setActiveField(
                              activeField === "guests" ? null : "guests"
                            )
                          }
                          className="w-full text-left text-gray-800 text-sm sm:text-base font-medium focus:outline-none flex items-center justify-between"
                        >
                          <span>{formatGuestText()}</span>
                          <ChevronDown
                            className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${
                              activeField === "guests" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {activeField === "guests" && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 sm:p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-medium text-gray-700">
                              Adults
                            </span>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      adults: Math.max(
                                        1,
                                        formData.guests.adults - 1
                                      )
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-6 sm:w-8 text-center font-medium">
                                {formData.guests.adults}
                              </span>
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      adults: formData.guests.adults + 1
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-medium text-gray-700">
                              Children
                            </span>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      children: Math.max(
                                        0,
                                        formData.guests.children - 1
                                      )
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-6 sm:w-8 text-center font-medium">
                                {formData.guests.children}
                              </span>
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      children: formData.guests.children + 1
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-medium text-gray-700">
                              Rooms
                            </span>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      rooms: Math.max(
                                        1,
                                        formData.guests.rooms - 1
                                      )
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-6 sm:w-8 text-center font-medium">
                                {formData.guests.rooms}
                              </span>
                              <button
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    guests: {
                                      ...formData.guests,
                                      rooms: formData.guests.rooms + 1
                                    }
                                  })
                                }
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:w-1 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;