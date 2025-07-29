"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [ParticlesComponent, setParticlesComponent] = useState(null)

  useEffect(() => {
    // Mark component as mounted to avoid hydration mismatch
    setMounted(true)
    
    // Safely import dependencies only on client-side
    const loadParticlesLibrary = async () => {
      try {
        // Dynamic imports to avoid SSR issues
        const particlesJS = await import("react-tsparticles")
        const { loadSlim } = await import("tsparticles-slim")
        
        // Store the Particles component for later use
        setParticlesComponent(() => particlesJS.default)
        
        // Pre-initialize the engine
        const engine = particlesJS.tsParticles
        if (engine) {
          await loadSlim(engine)
        }
      } catch (err) {
        console.error("Particles initialization failed:", err)
      }
    }
    
    loadParticlesLibrary()
    
    // Clean up function
    return () => {
      try {
        // Attempt to destroy particles instance on unmount
        const tsParticles = window.tsParticles
        if (tsParticles && tsParticles.domItem) {
          tsParticles.domItem(0)?.destroy()
        }
      } catch (error) {
        // Silent cleanup error
      }
    }
  }, [])
  
  // Don't render anything on server or before component is ready
  if (!mounted || !ParticlesComponent) return null

  return (
    <ParticlesComponent
      id="tsparticles"
      className="absolute inset-0 z-30"
      init={async (engine) => {
        try {
          const { loadSlim } = await import("tsparticles-slim")
          await loadSlim(engine)
        } catch (error) {
          console.error("Particles initialization error:", error)
        }
      }}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
        background: {
          color: "transparent",
        },
      }}
    />
  )
} 