import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #ffe082, #4cd6ff)",
          borderRadius: 12,
          color: "#08111f",
          display: "flex",
          fontSize: 15,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.24em",
          width: "100%",
        }}
      >
        CW
      </div>
    ),
    size,
  );
}
