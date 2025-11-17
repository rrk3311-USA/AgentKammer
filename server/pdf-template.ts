import { readFileSync } from 'fs';
import { join } from 'path';

interface MarketData {
  market: 'california' | 'nyc' | 'nevada';
  title: string;
  sections: {
    overview: string;
    metrics: Array<{ label: string; value: string; description: string }>;
    yielding: Array<{ name: string; yield: string; details: string }>;
    luxury: Array<{ area: string; median: string; details: string }>;
    projections: Array<{ period: string; growth: string; details: string }>;
    insights: string[];
  };
}

export function generateMarketReportHTML(data: MarketData): string {
  const logoPath = join(process.cwd(), 'attached_assets', 'IMG_1215_1763368691145.jpeg');
  let logoBase64 = '';
  
  try {
    const logoBuffer = readFileSync(logoPath);
    logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error reading logo:', error);
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title} Market Report</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #0a1628;
      background: white;
      line-height: 1.6;
    }
    
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #0a1628 0%, #1a2638 100%);
      color: white;
      page-break-after: always;
      padding: 60px;
      text-align: center;
    }
    
    .logo {
      max-width: 300px;
      margin-bottom: 40px;
    }
    
    .cover-title {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
    
    .cover-subtitle {
      font-size: 28px;
      color: #d4af37;
      margin-bottom: 60px;
      font-weight: 300;
    }
    
    .cover-date {
      font-size: 18px;
      color: #94a3b8;
      margin-top: 40px;
    }
    
    .content-page {
      padding: 60px;
      page-break-inside: avoid;
    }
    
    .page-header {
      border-bottom: 3px solid #d4af37;
      padding-bottom: 20px;
      margin-bottom: 40px;
    }
    
    .page-title {
      font-size: 36px;
      color: #0a1628;
      margin-bottom: 10px;
    }
    
    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 24px;
      color: #0a1628;
      margin-bottom: 20px;
      border-left: 4px solid #d4af37;
      padding-left: 16px;
    }
    
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
    }
    
    .metric-label {
      font-size: 14px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    
    .metric-value {
      font-size: 28px;
      color: #0a1628;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .metric-description {
      font-size: 13px;
      color: #475569;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    
    .data-table th {
      background: #0a1628;
      color: white;
      padding: 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
    }
    
    .data-table td {
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }
    
    .data-table tr:hover {
      background: #f8fafc;
    }
    
    .highlight {
      color: #d4af37;
      font-weight: 600;
    }
    
    .insights-list {
      list-style: none;
      padding: 0;
    }
    
    .insights-list li {
      padding: 12px 0;
      padding-left: 30px;
      position: relative;
      font-size: 15px;
    }
    
    .insights-list li:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #d4af37;
      font-weight: bold;
    }
    
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #0a1628;
      color: white;
      padding: 20px 60px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-contact {
      display: flex;
      gap: 30px;
    }
    
    .footer-brand {
      color: #d4af37;
      font-weight: bold;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover-page">
    ${logoBase64 ? `<img src="${logoBase64}" alt="Agent Kammer" class="logo" />` : ''}
    <div class="cover-title">AGENT KAMMER</div>
    <div class="cover-subtitle">MARKET REPORT</div>
    <div style="font-size: 32px; margin-top: 20px;">${data.title}</div>
    <div class="cover-date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <!-- Market Overview -->
  <div class="content-page">
    <div class="page-header">
      <h1 class="page-title">${data.title} Luxury Market</h1>
    </div>
    
    <div class="section">
      <h2 class="section-title">Market Overview</h2>
      <p style="font-size: 15px; line-height: 1.8; color: #334155;">${data.sections.overview}</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Key Metrics</h2>
      <div class="metric-grid">
        ${data.sections.metrics.map(metric => `
          <div class="metric-card">
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${metric.value}</div>
            <div class="metric-description">${metric.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Yielding Markets -->
  <div class="content-page">
    <div class="section">
      <h2 class="section-title">Highest Yielding ${data.market === 'nyc' ? 'Neighborhoods' : 'Counties'}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>${data.market === 'nyc' ? 'Neighborhood' : 'County/Area'}</th>
            <th>Yield</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${data.sections.yielding.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td class="highlight">${item.yield}</td>
              <td>${item.details}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2 class="section-title">Top Luxury Markets</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Median Price</th>
            <th>Market Details</th>
          </tr>
        </thead>
        <tbody>
          ${data.sections.luxury.map(item => `
            <tr>
              <td><strong>${item.area}</strong></td>
              <td class="highlight">${item.median}</td>
              <td>${item.details}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Growth Projections & Insights -->
  <div class="content-page">
    <div class="section">
      <h2 class="section-title">Growth Projections (2025-2030)</h2>
      <div class="metric-grid">
        ${data.sections.projections.map(proj => `
          <div class="metric-card">
            <div class="metric-label">${proj.period}</div>
            <div class="metric-value">${proj.growth}</div>
            <div class="metric-description">${proj.details}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Market Insights</h2>
      <ul class="insights-list">
        ${data.sections.insights.map(insight => `<li>${insight}</li>`).join('')}
      </ul>
    </div>
  </div>

  <!-- Footer on all pages except cover -->
  <div class="footer">
    <div class="footer-brand">AGENT KAMMER</div>
    <div class="footer-contact">
      <span>📧 contact@agentkammer.com</span>
      <span>📞 (929) 642-7553</span>
      <span>🌐 agentkammer.com</span>
    </div>
  </div>
</body>
</html>
  `;
}

export const californiaMarketData: MarketData = {
  market: 'california',
  title: 'California',
  sections: {
    overview: 'California\'s luxury real estate market remains one of the most dynamic in the nation, with strong fundamentals driven by tech wealth, international investment, and limited coastal inventory. The state\'s luxury market shows resilience with sustained demand in prime locations despite economic headwinds.',
    metrics: [
      { label: 'Luxury Market Size', value: '$338B', description: 'Projected US luxury market by 2030' },
      { label: 'Average Luxury Home', value: '$3.2M', description: 'California median luxury price' },
      { label: 'YoY Growth', value: '+8.5%', description: 'Annual appreciation rate' },
      { label: 'Market Trend', value: 'Balanced', description: 'Slight seller advantage' }
    ],
    yielding: [
      { name: 'Riverside County', yield: '9.0%', details: 'Strong rental demand, growing tech sector' },
      { name: 'Santa Clara County', yield: '9.0%', details: 'Tech hub, limited inventory' },
      { name: 'San Diego County', yield: '5.2%', details: 'Coastal premium, lifestyle migration' },
      { name: 'Orange County', yield: '4.8%', details: 'Beach communities, stable growth' }
    ],
    luxury: [
      { area: 'Atherton', median: '$8.33M', details: 'Silicon Valley\'s most exclusive ZIP code' },
      { area: 'Newport Beach', median: '$5.72M', details: 'Coastal luxury, limited supply' },
      { area: 'Beverly Hills', median: '$4.95M', details: 'Entertainment industry hub' },
      { area: 'La Jolla', median: '$3.85M', details: 'San Diego\'s crown jewel' }
    ],
    projections: [
      { period: '2025-2027', growth: '+15-18%', details: 'Near-term appreciation in prime markets' },
      { period: '2027-2030', growth: '+22-28%', details: 'Long-term cumulative growth forecast' },
      { period: 'Rental Yield', growth: '5-9%', details: 'Annual rental income potential' },
      { period: 'Market Recovery', growth: 'Q2 2025', details: 'Expected inventory normalization' }
    ],
    insights: [
      'Tech wealth continues to drive demand in Bay Area luxury markets',
      'Coastal markets showing strongest price resilience and appreciation',
      'Inland Empire emerging as high-yield investment opportunity',
      'International buyers returning to California luxury market',
      'Climate concerns creating opportunities in select micro-markets',
      'Luxury inventory remains 30% below pre-pandemic levels'
    ]
  }
};

export const nycMarketData: MarketData = {
  market: 'nyc',
  title: 'New York City',
  sections: {
    overview: 'New York City\'s luxury real estate market is experiencing a renaissance, with strong demand across all boroughs. Manhattan continues to lead in ultra-luxury sales, while Brooklyn and Queens show impressive growth in the $1M+ segment. The market demonstrates resilience with robust fundamentals and international appeal.',
    metrics: [
      { label: 'Manhattan Median', value: '$1.175M', description: '+12% year-over-year' },
      { label: 'Brooklyn Median', value: '$1.1M', description: '+7.6% annual growth' },
      { label: 'Luxury Inventory', value: '4.2 months', description: 'Supply remains tight' },
      { label: 'Market Status', value: 'Balanced', description: 'Slight seller advantage' }
    ],
    yielding: [
      { name: 'TriBeCa', yield: '4.5%', details: 'Ultra-luxury, celebrity buyers' },
      { name: 'East Village', yield: '4.5%', details: 'Strong rental market, nightlife' },
      { name: 'Chelsea', yield: '4.2%', details: 'Gallery district, High Line premium' },
      { name: 'Financial District', yield: '4.0%', details: 'Waterfront, new developments' }
    ],
    luxury: [
      { area: 'Hudson Yards', median: '$5.95M', details: 'NYC\'s newest luxury neighborhood' },
      { area: 'TriBeCa', median: '$4.15M', details: 'Celebrity haven, loft living' },
      { area: 'SoHo', median: '$3.69M', details: 'Cast-iron architecture, galleries' },
      { area: 'Upper East Side', median: '$2.85M', details: 'Museum Mile, classic luxury' }
    ],
    projections: [
      { period: '2025-2027', growth: '+20-25%', details: 'Strong near-term appreciation expected' },
      { period: '2027-2030', growth: '+28-32%', details: 'Cumulative growth through 2030' },
      { period: 'Rental Yield', growth: '3.5-4.5%', details: 'Premium rental income potential' },
      { period: 'Market Peak', growth: 'Q3 2025', details: 'Expected market acceleration' }
    ],
    insights: [
      'International buyers driving luxury condo sales in Manhattan',
      'Brooklyn luxury market outpacing Manhattan growth rates',
      'New development pipeline creating opportunities in emerging neighborhoods',
      'Co-op to condo conversions accelerating in prime locations',
      'Luxury rental market showing record-high rents and occupancy',
      'Post-pandemic return to office strengthening residential demand'
    ]
  }
};

export const nevadaMarketData: MarketData = {
  market: 'nevada',
  title: 'Nevada',
  sections: {
    overview: 'Nevada\'s luxury real estate market is experiencing unprecedented growth, driven by no state income tax, major entertainment investments, and the incoming $10.3B film studio complex. Las Vegas luxury homes hit record highs while Lake Tahoe remains a premier second-home destination. Reno emerges as a tech hub with strong fundamentals.',
    metrics: [
      { label: 'Las Vegas Luxury', value: '$1.4M', description: 'Median luxury home, record high' },
      { label: 'Reno Median', value: '$542,850', description: '+9% YoY, strong seller market' },
      { label: 'Lake Tahoe Luxury', value: '$2.06M', description: 'Incline Village median' },
      { label: 'Inventory Supply', value: '1.51 months', description: 'Extremely tight market' }
    ],
    yielding: [
      { name: 'Summerlin (Las Vegas)', yield: '8.5%', details: 'Master-planned luxury, $1-3M range' },
      { name: 'Henderson', yield: '8.2%', details: 'Lake Las Vegas premium, $800K-5M' },
      { name: 'MacDonald Highlands', yield: '7.8%', details: 'Ultra-luxury estates, $2M-10M+' },
      { name: 'Reno/Sparks', yield: '7.5%', details: 'Tech migration, growing demand' }
    ],
    luxury: [
      { area: 'Lake Tahoe - Incline Village', median: '$2.06M', details: 'Nevada side, tax advantages' },
      { area: 'Lake Tahoe - West Shore', median: '$3.13M', details: 'Waterfront estates, limited supply' },
      { area: 'Las Vegas - The Ridges', median: '$2.8M', details: 'Guard-gated, mountain views' },
      { area: 'Lake Tahoe - Truckee', median: '$1.27M', details: 'Ski resort access, year-round living' }
    ],
    projections: [
      { period: 'Lake Tahoe 2025-2027', growth: '+12-15%', details: 'Limited supply driving appreciation' },
      { period: 'Lake Tahoe 2027-2030', growth: '+20-25%', details: 'Long-term luxury growth' },
      { period: 'Las Vegas Growth', growth: '+10-12%', details: 'Entertainment investments fueling demand' },
      { period: 'Reno Tech Hub', growth: '+15-18%', details: 'California migration accelerating' }
    ],
    insights: [
      '$10.3B film studio investment transforming Las Vegas luxury market',
      'No state income tax attracting high-net-worth California residents',
      'Lake Tahoe luxury inventory at historic lows, bidding wars common',
      'Major sports franchises (Raiders, Knights, Aces) elevating city profile',
      'High-speed rail to California creating new investment opportunities',
      'Reno emerging as "Silicon Valley overflow" with tech company relocations'
    ]
  }
};
