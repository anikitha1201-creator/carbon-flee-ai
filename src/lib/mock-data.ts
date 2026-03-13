export const VEHICLES = [
  { id: 'v-1', type: 'EV', model: 'Tesla Semi', capacity: 36000, fuelConsumption: 1.25, status: 'Active', location: 'Warehouse A', batteryLevel: 85 },
  { id: 'v-2', type: 'Diesel', model: 'Freightliner Cascadia', capacity: 40000, fuelConsumption: 35, status: 'Active', location: 'In Transit', batteryLevel: null },
  { id: 'v-3', type: 'EV', model: 'Volvo VNR Electric', capacity: 33000, fuelConsumption: 1.5, status: 'Charging', location: 'Hub B', batteryLevel: 22 },
  { id: 'v-4', type: 'Hybrid', model: 'Kenworth T680', capacity: 38000, fuelConsumption: 22, status: 'Maintenance', location: 'Service Center', batteryLevel: 45 },
  { id: 'v-5', type: 'EV', model: 'Rivian EDV', capacity: 15000, fuelConsumption: 0.8, status: 'Active', location: 'City Center', batteryLevel: 68 },
];

export const ORDERS = [
  { id: 'ord-101', customer: 'EcoShop', pickup: 'Warehouse A', dropoff: '123 Green St', weight: 500, deadline: '2024-05-24 14:00', status: 'Pending', priority: 'High' },
  { id: 'ord-102', customer: 'Global Mart', pickup: 'Warehouse A', dropoff: '456 Blue Ave', weight: 1200, deadline: '2024-05-24 16:30', status: 'Assigned', priority: 'Medium' },
  { id: 'ord-103', customer: 'Tech Store', pickup: 'Hub B', dropoff: '789 Silver Blvd', weight: 300, deadline: '2024-05-24 12:00', status: 'In Transit', priority: 'Critical' },
  { id: 'ord-104', customer: 'Bio Foods', pickup: 'Warehouse A', dropoff: '321 Organic Way', weight: 800, deadline: '2024-05-24 18:00', status: 'Pending', priority: 'Low' },
];

export const DRIVERS = [
  { id: 'dr-1', name: 'Alice Johnson', status: 'Active', assignedVehicle: 'v-1', experience: '5 years', rating: 4.9 },
  { id: 'dr-2', name: 'Bob Smith', status: 'Off-duty', assignedVehicle: null, experience: '12 years', rating: 4.7 },
  { id: 'dr-3', name: 'Charlie Davis', status: 'Active', assignedVehicle: 'v-2', experience: '3 years', rating: 4.8 },
  { id: 'dr-4', name: 'Diana Prince', status: 'Active', assignedVehicle: 'v-5', experience: '8 years', rating: 5.0 },
];

export const GRID_SCENARIOS = {
  'solar peak': { intensity: 45, renewables: 85, description: 'High solar output, low carbon intensity' },
  'coal peak': { intensity: 450, renewables: 12, description: 'High fossil fuel reliance, high carbon intensity' },
  'balanced': { intensity: 180, renewables: 45, description: 'Average grid mix' },
};