import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: "ElevenLabs API key not configured." }, { status: 500 })
    }

    // Voice ID for a calm, professional male voice (e.g., "Marcus" or similar)
    const VOICE_ID = "21m00Tcm4TlvDq8ikWAM" // Rachel (professional) or replace with another

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate audio from ElevenLabs")
    }

    const audioBlob = await response.blob()
    return new Response(audioBlob, {
      headers: { "Content-Type": "audio/mpeg" },
    })
  } catch (error: any) {
    console.error("[v0] TTS Error:", error.message)
    return NextResponse.json({ error: "Failed to generate audio." }, { status: 500 })
  }
}
