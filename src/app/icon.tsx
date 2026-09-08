import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0714 0%, #1c1030 100%)",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 23,
            fontWeight: 800,
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#f4cf6b",
            textShadow: "0 0 4px rgba(244,207,107,0.85)",
          }}
        >
          X
        </div>
      </div>
    ),
    { ...size }
  )
}
