import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexPath = path.join(__dirname, '../dist/index.html')
let html = fs.readFileSync(indexPath, 'utf8')
// Odstranit script aplikace – brána ho přidá po odemčení
html = html.replace(/<script[^>]*src="\/assets\/[^"]*"[^>]*><\/script>\n?/g, '')
fs.writeFileSync(indexPath, html)
console.log('Removed app script from index.html (gate will load it after unlock)')
