// src/controllers/ticket-classes.js
import {
  getAllTicketClasses as findAllTicketClasses,
  getTicketClassesForDay as findTicketClassesForDay,
} from '../models/ticket-classes.js';

const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export async function getAllTicketClasses(req, res) {
  try {
    const ticketClasses = await findAllTicketClasses();

    return res.status(200).json(ticketClasses);
  } catch (error) {
    console.error('Error fetching ticket classes:', error);

    return res.status(500).json({
      error: 'Failed to fetch ticket classes',
    });
  }
}

export async function getTicketClassesForDay(req, res) {
  try {
    // Only a known day name is allowed. Anything else (a typo, a repeated
    // parameter, or an object such as ?day[$ne]=x) is rejected before it
    // reaches the database.
    const day = typeof req.query.day === 'string' ? req.query.day.trim().toLowerCase() : '';

    if (!validDays.includes(day)) {
      return res.status(400).json({
        error: `day must be one of: ${validDays.join(', ')}`,
      });
    }

    const ticketClasses = await findTicketClassesForDay(day);

    return res.status(200).json(ticketClasses);
  } catch (error) {
    console.error('Error fetching ticket classes for day:', error);

    return res.status(500).json({
      error: 'Failed to fetch ticket classes for the day',
    });
  }
}
