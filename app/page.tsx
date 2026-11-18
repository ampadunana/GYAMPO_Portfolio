import fs from "node:fs"
import path from "node:path"
import Portfolio from "@/components/portfolio"

const imageDirectory = path.join(process.cwd(), "public", "images")
const images = fs
  .readdirSync(imageDirectory)
  .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .slice(0, 49)
  .map((name) => `/images/${encodeURIComponent(name)}`)

export default function Home() {
  return <Portfolio images={images} />
}
