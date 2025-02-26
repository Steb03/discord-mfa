import AuthModal from "@/components/auth-modal"
import ParticlesBackground from "@/components/particles-background"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#1a0f2e] to-[#2b3595] relative overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <AuthModal />
      </div>
    </main>
  )
}

