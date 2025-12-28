import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🔹 FETCH VIDEOS FROM BACKEND
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await fetch("/api/v1/food", {
          credentials: "include",
        });

        const data = await res.json();

        const items = Array.isArray(data.foodItems) ? data.foodItems : [];

        const mappedVideos = items.map((item) => ({
          id: item._id,
          name: item.name,
          src: item.video,
          description: item.description,
          storeUrl: `/partner/${item.foodPartner._id}`,
          foodPartner: item.foodPartner.name,
        }));

        setVideos(mappedVideos);
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };

    fetchFoodItems();
  }, []);

  // 🔹 INTERSECTION OBSERVER
  useEffect(() => {
    if (!videos.length) return;

    const container = containerRef.current;
    if (!container) return;

    const videosEls = container.querySelectorAll("video");
    videosEls.forEach((v) => v.pause());

    const observer = new IntersectionObserver(
      (entries) => {
        let anyPlaying = false;

        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.intersectionRatio >= 0.65) {
            anyPlaying = true;
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });

        setIsPlaying(anyPlaying);
      },
      {
        threshold: [0.25, 0.65, 0.9],
        root: container,
      }
    );

    videosEls.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  // 🔹 INITIAL SCROLL STATE
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setIsScrolled(container.scrollTop !== 0);
  }, []);

  return (
    <div className="relative">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 flex items-center h-14 px-4 text-white font-bold text-lg tracking-wide transition-colors duration-200 ${
          isPlaying && !isScrolled
            ? "bg-transparent"
            : "bg-black/40 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        mealio
      </header>

      {/* FEED */}
      <div
        ref={containerRef}
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop !== 0)}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      >
        {videos.map((item) => (
          <section key={item.id} className="snap-start h-screen relative">
            {/* VIDEO */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={item.src}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* OVERLAY */}
            <div className="absolute left-4 right-4 bottom-8 z-10 text-white pointer-events-auto space-y-1">
              
              {/* Partner row */}
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">
                  @{item.foodPartner}
                </span>

                <a
                  href={item.storeUrl}
                  className="border border-white text-white text-xs px-3 py-1 rounded-full font-medium hover:bg-white hover:text-black transition"
                >
                  Visit Store
                </a>
              </div>

              {/* Dish name */}
              <p className="text-base font-bold leading-tight">
                {item.name}
              </p>

              {/* Description */}
              <p className="text-sm text-white/90 line-clamp-2">
                {item.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
