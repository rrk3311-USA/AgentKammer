/**
 * RentCast API Client
 * Documentation: https://developers.rentcast.io
 * 
 * API Key stored in RENTCAST_API_KEY environment variable
 */

const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY;
const RENTCAST_BASE_URL = 'https://api.rentcast.io/v1';

interface RentCastError {
  error: string;
  message: string;
}

interface PropertyValue {
  price?: number;
  rentEstimate?: number;
  priceRangeLow?: number;
  priceRangeHigh?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface MarketStatistics {
  city?: string;
  state?: string;
  medianPrice?: number;
  averagePrice?: number;
  medianRent?: number;
  averageRent?: number;
  totalListings?: number;
  daysOnMarket?: number;
}

/**
 * Generic fetch wrapper for RentCast API
 */
async function rentcastFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!RENTCAST_API_KEY) {
    throw new Error('RENTCAST_API_KEY environment variable is not set');
  }

  const queryString = new URLSearchParams(params).toString();
  const url = `${RENTCAST_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  console.log(`[RentCast] Fetching: ${endpoint}`, params);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': RENTCAST_API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('[RentCast] API Error:', response.status, errorData);
    throw new Error(`RentCast API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
  }

  const data = await response.json();
  console.log(`[RentCast] Success:`, data);
  return data;
}

/**
 * Get property value estimate by address
 */
export async function getPropertyValue(address: string, city: string, state: string, zipCode?: string): Promise<PropertyValue> {
  try {
    return await rentcastFetch<PropertyValue>('/avm/value', {
      address,
      city,
      state,
      ...(zipCode && { zipCode }),
    });
  } catch (error) {
    console.error('[RentCast] Error fetching property value:', error);
    throw error;
  }
}

/**
 * Get rent estimate for a property
 */
export async function getRentEstimate(address: string, city: string, state: string, zipCode?: string): Promise<PropertyValue> {
  try {
    return await rentcastFetch<PropertyValue>('/avm/rent', {
      address,
      city,
      state,
      ...(zipCode && { zipCode }),
    });
  } catch (error) {
    console.error('[RentCast] Error fetching rent estimate:', error);
    throw error;
  }
}

/**
 * Get market statistics for a city/state
 */
export async function getMarketStatistics(city: string, state: string): Promise<MarketStatistics> {
  try {
    // RentCast provides market data through their listings endpoint
    // We'll aggregate data from recent listings to get market statistics
    const listings = await rentcastFetch<any>('/listings/sale', {
      city,
      state,
      limit: '50', // Get 50 recent listings to calculate averages
      status: 'Active',
    });

    // Calculate market statistics from listings
    const prices = listings.map((l: any) => l.price).filter(Boolean);
    const daysOnMarket = listings.map((l: any) => l.daysOnMarket).filter(Boolean);

    return {
      city,
      state,
      medianPrice: calculateMedian(prices),
      averagePrice: calculateAverage(prices),
      totalListings: listings.length,
      daysOnMarket: calculateAverage(daysOnMarket),
    };
  } catch (error) {
    console.error('[RentCast] Error fetching market statistics:', error);
    throw error;
  }
}

/**
 * Get active listings for a city/state
 */
export async function getActiveListings(city: string, state: string, limit: number = 20) {
  try {
    return await rentcastFetch<any[]>('/listings/sale', {
      city,
      state,
      limit: limit.toString(),
      status: 'Active',
    });
  } catch (error) {
    console.error('[RentCast] Error fetching active listings:', error);
    throw error;
  }
}

/**
 * Get rental listings for a city/state
 */
export async function getRentalListings(city: string, state: string, limit: number = 20) {
  try {
    return await rentcastFetch<any[]>('/listings/rental', {
      city,
      state,
      limit: limit.toString(),
      status: 'Active',
    });
  } catch (error) {
    console.error('[RentCast] Error fetching rental listings:', error);
    throw error;
  }
}

// Helper functions
function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.round(numbers.reduce((sum, n) => sum + n, 0) / numbers.length);
}
