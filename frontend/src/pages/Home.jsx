import React, { useEffect, useRef, useState } from 'react'

const videos = [
  {
    id: 1,
    src: 'https://ik.imagekit.io/gdnwfpj4g/7798bd07-f4ba-441d-81f8-3d98ee7b5127_MdPdRi8eZw',
    description: 'Fresh ingredients daily — visit our partner store for exclusive discounts and combos.',
    storeUrl: '#',
  },
  {
    id: 2,
    src: 'https://ik.imagekit.io/gdnwfpj4g/1dcc626a-7dd8-42a6-b71a-e65e69e72952_Q8K9u6iI1',
    description: 'Taste the difference with handcrafted recipes and locally sourced produce.',
    storeUrl: '#',
  },
  {
    id: 3,
    src: 'https://ik.imagekit.io/gdnwfpj4g/5d316e66-cb3d-4e25-8fce-1efb64095e8e_Q9rRKA0LOj',
    description: 'Order now and get free delivery on your first purchase!',
    storeUrl: '#',
  },
]

const Home = () => {
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const videosEls = container.querySelectorAll('video')

    // Pause all videos initially
    videosEls.forEach((v) => v.pause())

    const observer = new IntersectionObserver(
      (entries) => {
        // Determine if any observed video should be playing; if so, mark header transparent
        let anyPlaying = false

        entries.forEach((entry) => {
          const video = entry.target
          if (entry.intersectionRatio >= 0.65) {
            anyPlaying = true
            video.play().catch(() => {
              /* autoplay may be blocked; ignore */
            })
          } else {
            video.pause()
            video.currentTime = 0
          }
        })

        setIsPlaying(anyPlaying)
      },
      {
        threshold: [0.25, 0.65, 0.9],
        root: container,
      }
    )

    videosEls.forEach((v) => observer.observe(v))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      setIsScrolled(container.scrollTop !== 0)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    // initialize
    onScroll()

    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative">
      <header className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-start h-14 text-white font-bold text-lg tracking-wide px-4 transition-colors duration-200 ${isPlaying ? 'bg-transparent' : 'bg-black/40 backdrop-blur-sm border-b border-white/10'}`}>
        mealio
      </header>

      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory touch-pan-y bg-black"
      >
        {videos.map((item) => (
        <section key={item.id} className="snap-start h-screen relative">
          {/* Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={item.src}
            muted
            playsInline
            loop
            preload="metadata"
          />

          {/* gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* overlay content */}
          <div className="absolute left-4 right-4 bottom-8 text-white z-10 pointer-events-auto">
            <p className="mb-3 text-sm md:text-base line-clamp-2">
              {item.description}
            </p>

            <a
              href={item.storeUrl}
              className="inline-block bg-white text-black px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90"
            >
              Visit Store
            </a>
          </div>
        </section>
      ))}
      </div>
    </div>
  )
}

export default Home
