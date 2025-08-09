import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f"
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
