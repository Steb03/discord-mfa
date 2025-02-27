"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Background from "@/components/background"

interface VerificationCode {
  id: string
  code: string
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [codes, setCodes] = useState<VerificationCode[]>([])

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/codes`)
        if (response.ok) {
          const data = await response.json()
          setCodes(data)
        } else {
          console.error("Failed to fetch codes")
        }
      } catch (error) {
        console.error("Failed to fetch codes:", error)
      }
    }

    fetchCodes()
  }, [])

  return (
    <Background>
      <div className="bg-[#2b2d31] rounded-md shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-white mb-4">Verification Codes</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map((code) => (
              <TableRow key={code.id}>
                <TableCell>{code.code}</TableCell>
                <TableCell>{code.status}</TableCell>
                <TableCell>{new Date(code.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Background>
  )
}

