import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    // Here you would typically send the code to your Railway backend
    // For this example, we'll just simulate a successful verification

    // Simulated API call to Railway
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}

