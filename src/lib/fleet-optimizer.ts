/**
 * @fileOverview Optimization engine to assign vehicles based on carbon impact and capacity.
 */
import { EMISSION_FACTORS } from './carbon-engine';

export interface Vehicle {
  id: string;
  type: 'electric' | 'diesel' | 'hybrid';
  capacity: number;
  status: string;
  driverName?: string;
}

export interface Order {
  id: string;
  weight: number;
  distance: number;
}

export interface OptimizationResult {
  orderId: string;
  assignedVehicle: Vehicle;
  driver: string;
  estimatedCO2: number;
  distance: number;
  score: number;
}

export function optimizeFleetOrders(
  order: Order,
  vehicles: Vehicle[],
  gridCarbonIntensity: number
): OptimizationResult | null {
  // 1. Filter by capacity and availability
  const eligibleVehicles = vehicles.filter(v => v.capacity >= order.weight && v.status === 'Active');

  if (eligibleVehicles.length === 0) return null;

  // 2. Calculate score: 1 - (gridIntensity * vehicleFactor)
  const scoredVehicles = eligibleVehicles.map(v => {
    const vehicleFactor = EMISSION_FACTORS[v.type];
    // Scale grid intensity for scoring purposes
    const score = 1 - (gridCarbonIntensity * vehicleFactor);
    return { vehicle: v, score };
  });

  // 3. Select best
  const best = scoredVehicles.sort((a, b) => b.score - a.score)[0];

  return {
    orderId: order.id,
    assignedVehicle: best.vehicle,
    driver: best.vehicle.driverName || 'Unassigned',
    estimatedCO2: Number((order.distance * EMISSION_FACTORS[best.vehicle.type]).toFixed(2)),
    distance: order.distance,
    score: best.score
  };
}
