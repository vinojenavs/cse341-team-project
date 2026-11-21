// src/models/schemas/ticket-classes.js
import mongoose from 'mongoose';

const ticketClassSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerKm: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    // Lowercase day names, for example "monday". Used by /api/ticket-classes?day=...
    availableDays: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// The third argument is the real collection name. The seed script creates
// "ticketClasses", but Mongoose would otherwise look for "ticketclasses".
const ticketClass = mongoose.model('TicketClass', ticketClassSchema, 'ticketClasses');

export default ticketClass;
