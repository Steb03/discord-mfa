"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0f2e] to-[#2b3595] flex items-center justify-center">
      <div className="bg-[#2b2d31] rounded-md shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-white mb-2">Verification Successful</h1>
        <p className="text-gray-400">This window will close automatically...</p>
      </div>
    </div>
  )
}

