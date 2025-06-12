"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import PropertyCard from "../components/Cards";
import { trendingData } from "../constants/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

function TrendingNow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(7);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.ceil(trendingData.length / cardsPerView);

  // Adjust cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 768) setCardsPerView(2);
      else if (width < 1024) setCardsPerView(3);
      else if (width < 1280) setCardsPerView(5);
      else setCardsPerView(7);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Update scroll button states with debouncing
  const updateScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 5); // Small threshold for better UX
      setCanScrollRight(scrollLeft < maxScrollLeft - 5);

      // Calculate current page more accurately
      const scrollProgress = scrollLeft / maxScrollLeft;
      const newPage = Math.round(scrollProgress * (totalPages - 1));
      setCurrentPage(Math.max(0, Math.min(newPage, totalPages - 1)));
    }
  }, [totalPages]);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(updateScrollButtons, 10);
  }, [updateScrollButtons]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      updateScrollButtons();
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll, updateScrollButtons]);

  // Improved velocity calculation
  const calculateVelocity = useCallback(
    (x: number, timestamp: number) => {
      if (typeof lastX === "number" && typeof lastTime === "number") {
        const deltaX = lastX - x;
        const deltaTime = timestamp - lastTime;
        if (deltaTime > 0) {
          const newVelocity = (deltaX / deltaTime) * 16; // Normalize to 60fps
          setVelocity(newVelocity * 0.8); // Smooth the velocity
        }
      }
      setLastX(x);
      setLastTime(timestamp);
    },
    [lastX, lastTime]
  );

  // Improved momentum with bounds checking
  const applyMomentum = useCallback(() => {
    if (!scrollRef.current || isDragging) return;

    if (Math.abs(velocity) < 0.5) {
      setVelocity(0);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    const newScrollLeft = scrollLeft + velocity;

    // Bounce effect at boundaries
    if (newScrollLeft < 0) {
      scrollRef.current.scrollLeft = 0;
      setVelocity(0);
      return;
    } else if (newScrollLeft > maxScrollLeft) {
      scrollRef.current.scrollLeft = maxScrollLeft;
      setVelocity(0);
      return;
    }

    scrollRef.current.scrollLeft = newScrollLeft;
    setVelocity(velocity * 0.92); // Smoother decay
    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  }, [velocity, isDragging]);

  // Handle drag start for mouse
  const handleMouseDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (scrollRef.current) {
        e.preventDefault();
        setIsDragging(true);
        const x = e.pageX;
        const containerRect = scrollRef.current.getBoundingClientRect();
        setStartX(x - containerRect.left);
        setScrollLeftStart(scrollRef.current.scrollLeft);
        setLastX(x);
        setLastTime(e.timeStamp || Date.now());
        setVelocity(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        scrollRef.current.style.cursor = "grabbing";
        scrollRef.current.style.scrollBehavior = "auto";
      }
    },
    []
  );

  // Handle drag start for touch
  const handleTouchDragStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (scrollRef.current) {
        e.preventDefault();
        setIsDragging(true);
        const x = e.touches[0].pageX;
        const containerRect = scrollRef.current.getBoundingClientRect();
        setStartX(x - containerRect.left);
        setScrollLeftStart(scrollRef.current.scrollLeft);
        setLastX(x);
        setLastTime(e.timeStamp || Date.now());
        setVelocity(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        scrollRef.current.style.cursor = "grabbing";
        scrollRef.current.style.scrollBehavior = "auto";
      }
    },
    []
  );

  // Handle drag move for mouse
  const handleMouseDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;

      e.preventDefault();
      const x = e.pageX;
      const containerRect = scrollRef.current.getBoundingClientRect();
      const currentX = x - containerRect.left;
      const walk = (currentX - startX) * 1.5;

      scrollRef.current.scrollLeft = scrollLeftStart - walk;
      calculateVelocity(x, e.timeStamp || Date.now());
    },
    [isDragging, startX, scrollLeftStart, calculateVelocity]
  );

  // Handle drag move for touch
  const handleTouchDragMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !scrollRef.current) return;

      e.preventDefault();
      const x = e.touches[0].pageX;
      const containerRect = scrollRef.current.getBoundingClientRect();
      const currentX = x - containerRect.left;
      const walk = (currentX - startX) * 1.5;

      scrollRef.current.scrollLeft = scrollLeftStart - walk;
      calculateVelocity(x, e.timeStamp || Date.now());
    },
    [isDragging, startX, scrollLeftStart, calculateVelocity]
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setVelocity((prevVelocity) =>
      Math.abs(prevVelocity) > 0.5 ? prevVelocity : 0
    );
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.scrollBehavior = "smooth";
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  }, [applyMomentum]);

  // Global event listeners for mouse and touch events (to handle dragging outside container)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleTouchDragMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleDragEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleTouchDragMove);
        document.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [isDragging, handleMouseDragMove, handleTouchDragMove, handleDragEnd]);

  // Improved button scroll with better page calculation
  const scroll = useCallback(
    (direction: string) => {
      if (scrollRef.current && !isDragging) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        const scrollAmount = clientWidth * 0.8; // Scroll 80% of visible width

        let newScrollLeft;
        if (direction === "left") {
          newScrollLeft = Math.max(
            0,
            scrollRef.current.scrollLeft - scrollAmount
          );
        } else {
          newScrollLeft = Math.min(
            maxScrollLeft,
            scrollRef.current.scrollLeft + scrollAmount
          );
        }

        scrollRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    },
    [isDragging]
  );

  // Scroll to specific page with improved calculation
  const scrollToPage = useCallback(
    (pageIndex: React.SetStateAction<number>) => {
      if (scrollRef.current && !isDragging) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        // Ensure pageIndex is a number
        const pageNumber =
          typeof pageIndex === "number" ? pageIndex : currentPage;
        const targetScrollLeft =
          (pageNumber / (totalPages - 1)) * maxScrollLeft;

        scrollRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
        setCurrentPage(pageIndex);
      }
    },
    [isDragging, totalPages, currentPage]
  );

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mx-auto sm:px-6 py-4 w-[85%]">
      <h2 className="text-2xl font-bold text-gray-900 mb-10">Trending Now</h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto -space-x-0.5 pb-4 scrollbar-hide select-none [touch-action:pan-x]
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          ${!isDragging ? "scroll-smooth" : ""}`}
          onMouseDown={handleMouseDragStart}
          onTouchStart={handleTouchDragStart}
        >
          {trendingData.map((property, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <PropertyCard
                propertyImage={property.propertyImage}
                userProfileImage={property.userProfileImage}
                location={property.location}
                bedrooms={property.bedrooms}
                dates={property.dates}
                price={property.price}
              />
            </div>
          ))}
        </div>

        {/* Left Scroll Button */}
        <button
          className={`absolute left-0 bottom-44 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 z-10 ${
            canScrollLeft && !isDragging
              ? "hover:bg-white hover:shadow-xl hover:scale-105 opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft || isDragging}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Right Scroll Button */}
        <button
          className={`absolute right-0 bottom-44 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 z-10 ${
            canScrollRight && !isDragging
              ? "hover:bg-white hover:shadow-xl hover:scale-105 opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight || isDragging}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all duration-300 hover:scale-110 ${
                index === currentPage
                  ? "bg-gray-700 w-8 h-2"
                  : "bg-gray-300 hover:bg-gray-500 w-2 h-2"
              }`}
              onClick={() => scrollToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default TrendingNow;
