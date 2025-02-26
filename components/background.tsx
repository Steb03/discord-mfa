import type React from "react"
import ParticlesBackground from "./particles-background"

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-[url('/bg3.png')] bg-cover bg-center">
      {/* Image in the top-left corner */}
      <div className="absolute top-10 left-10 p-4">
        <img src="/logo.svg" alt="Top Left Image" className="w-32 h-auto" />
      </div>

      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </main>
  )
}
