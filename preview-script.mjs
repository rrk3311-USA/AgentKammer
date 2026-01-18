import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;

async function generatePreviews() {
  console.log('🚀 Starting preview generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Desktop viewport
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });

    // Create previews directory
    const previewsDir = join(process.cwd(), 'previews');
    mkdirSync(previewsDir, { recursive: true });

    // Preview 1: Homepage
    console.log('📸 Capturing homepage...');
    try {
      await page.goto(`${BASE_URL}/`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      await page.waitForTimeout(3000); // Wait for animations
      
      await page.screenshot({
        path: join(previewsDir, 'preview-1-homepage.png'),
        fullPage: false,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      console.log('✅ Preview 1 saved: preview-1-homepage.png');
    } catch (error) {
      console.error('❌ Error capturing homepage:', error.message);
    }

    // Preview 2: Real Estate or another main page
    console.log('📸 Capturing Real Estate page...');
    try {
      await page.goto(`${BASE_URL}/real-estate`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      await page.waitForTimeout(3000);
      
      await page.screenshot({
        path: join(previewsDir, 'preview-2-real-estate.png'),
        fullPage: false,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      console.log('✅ Preview 2 saved: preview-2-real-estate.png');
    } catch (error) {
      console.error('❌ Error capturing Real Estate page:', error.message);
    }

    console.log(`\n✨ Preview images saved to: ${previewsDir}/`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePreviews();
