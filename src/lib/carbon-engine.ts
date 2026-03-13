/**
 * @fileOverview Core module for calculating carbon emissions based on PPT specification.
 */

export const EMISSION_FACTORS = {
  diesel: 0.25,
  electric: 0.02,
  hybrid: 0.12,
};

export interface CarbonResult {
  distance: number;
  vehicleType: keyof typeof EMISSION_FACTORS;
  co2Emission: number;
}

export function calculateCarbonEmission(distanceKm: number, vehicleType: keyof typeof EMISSION_FACTORS): CarbonResult {
  const factor = EMISSION_FACTORS[vehicleType] || 0.25;
  const co2Emission = Number((distanceKm * factor).toFixed(2));
  return {
    distance: distanceKm,
    vehicleType,
    co2Emission,
  };
}

export function calculateFuelCost(distanceKm: number, vehicleType: keyof typeof EMISSION_FACTORS): number {
  const rates = {
    diesel: 12,
    electric: 3,
    hybrid: 7,
  };
  return distanceKm * (rates[vehicleType] || 12);
}
