"use client"

import { useEffect, useState } from "react"
import { CheckCircle, ExternalLink } from "lucide-react"
import Background from "@/components/background"

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5)
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      // Open Discord in a new tab
      window.open("https://discord.com", "_blank")

      // Attempt to close the window by simulating Cmd+W or Ctrl+W
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
      const event = new KeyboardEvent("keydown", {
        key: "w",
        code: "KeyW",
        which: 87,
        keyCode: 87,
        bubbles: true,
        cancelable: true,
        metaKey: isMac,
        ctrlKey: !isMac,
      })
      document.dispatchEvent(event)

      // Set redirected state in case the window doesn't close
      setRedirected(true)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <Background>
      <div className="bg-[#2b2d31] rounded-md shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-white mb-2">Verification Successful</h1>
        {!redirected ? (
          <p className="text-gray-400">Opening Discord in {countdown} seconds...</p>
        ) : (
          <div className="text-gray-400">
            <p>Discord has been opened in a new tab.</p>
            <p className="mt-2">If this window didn't close automatically, you can close it manually.</p>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#949cf7] hover:underline flex items-center justify-center mt-4"
            >
              Open Discord again <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </Background>
  )
}
