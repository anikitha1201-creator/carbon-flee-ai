export const VEHICLES = [
  { id: 'v-1', type: 'EV', model: 'Tesla Semi', capacity: 36000, fuelConsumption: 1.25, status: 'Active', location: 'Warehouse A', batteryLevel: 85 },
  { id: 'v-2', type: 'Diesel', model: 'Freightliner Cascadia', capacity: 40000, fuelConsumption: 35, status: 'Active', location: 'In Transit', batteryLevel: null },
  { id: 'v-3', type: 'EV', model: 'Volvo VNR Electric', capacity: 33000, fuelConsumption: 1.5, status: 'Charging', location: 'Hub B', batteryLevel: 22 },
  { id: 'v-4', type: 'Hybrid', model: 'Kenworth T680', capacity: 38000, fuelConsumption: 22, status: 'Active', location: 'Service Center', batteryLevel: 45 },
  { id: 'v-5', type: 'EV', model: 'Rivian EDV', capacity: 15000, fuelConsumption: 0.8, status: 'Active', location: 'City Center', batteryLevel: 68 },
];

export const ORDERS = [
  { id: 'ord-101', customer: 'EcoShop', pickup: 'Whitefield', dropoff: 'Koramangala', weight: 500, deadline: '2024-05-24 14:00', status: 'Pending', priority: 'High', distance: 14.2 },
  { id: 'ord-102', customer: 'Global Mart', pickup: 'Electronic City', dropoff: 'MG Road', weight: 1200, deadline: '2024-05-24 16:30', status: 'Assigned', priority: 'Medium', distance: 18.5 },
  { id: 'ord-103', customer: 'Tech Store', pickup: 'Silk Board', dropoff: 'Hebbal', weight: 300, deadline: '2024-05-24 12:00', status: 'In Transit', priority: 'Critical', distance: 22.1 },
  { id: 'ord-104', customer: 'Bio Foods', pickup: 'Whitefield', dropoff: 'Indiranagar', weight: 800, deadline: '2024-05-24 18:00', status: 'Pending', priority: 'Low', distance: 8.4 },
];

export const DRIVERS = [
  { id: 'dr-1', name: 'Alice Johnson', status: 'Active', assignedVehicle: 'v-1', experience: '5 years', rating: 4.9, activeRouteId: 'ord-101' },
  { id: 'dr-2', name: 'Bob Smith', status: 'Off-duty', assignedVehicle: null, experience: '12 years', rating: 4.7, activeRouteId: null },
  { id: 'dr-3', name: 'Charlie Davis', status: 'Active', assignedVehicle: 'v-2', experience: '3 years', rating: 4.8, activeRouteId: 'ord-102' },
  { id: 'dr-4', name: 'Diana Prince', status: 'Active', assignedVehicle: 'v-5', experience: '8 years', rating: 5.0, activeRouteId: 'ord-104' },
];

export const COORDINATES = {
  'Whitefield': [12.9698, 77.7499],
  'Koramangala': [12.9352, 77.6245],
  'Electronic City': [12.8452, 77.6632],
  'MG Road': [12.9738, 77.6119],
  'Silk Board': [12.9175, 77.6233],
  'Hebbal': [13.0354, 77.5970],
  'Indiranagar': [12.9784, 77.6408],
};

export const CHARGING_STATIONS = [
  { name: 'Whitefield Charging Hub', coords: [12.9710, 77.7510], speed: '150kW', available: 4 },
  { name: 'Electronic City Station', coords: [12.8460, 77.6650], speed: '100kW', available: 2 },
  { name: 'Indiranagar EV Hub', coords: [12.9790, 77.6420], speed: '50kW', available: 1 },
];

export const GRID_SCENARIOS = {
  'solar peak': { intensity: 45, renewables: 85, description: 'High solar output, low carbon intensity' },
  'coal peak': { intensity: 450, renewables: 12, description: 'High fossil fuel reliance, high carbon intensity' },
  'balanced': { intensity: 180, renewables: 45, description: 'Average grid mix' },
};
