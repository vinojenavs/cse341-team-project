// src/models/ticket-classes.js
import ticketClass from './schemas/ticket-classes.js';

export async function getAllTicketClasses() {
  return ticketClass.find({}).sort({ pricePerKm: 1 }).lean();
}

export async function getTicketClassesForDay(day) {
  return ticketClass.find({ availableDays: day }).sort({ pricePerKm: 1 }).lean();
}
