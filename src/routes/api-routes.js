// src/routes/api-routes.js
import { Router } from 'express';
import { getAllTicketClasses, getTicketClassesForDay } from '../controllers/ticket-classes.js';

const router = Router();

/**
 * @openapi
 * /api/ticket-classes:
 *   get:
 *     summary: Get ticket classes, optionally only those available on one day
 *     tags:
 *       - Ticket Classes
 *     parameters:
 *       - in: query
 *         name: day
 *         required: false
 *         schema:
 *           type: string
 *           enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *         description: When given, only ticket classes available on this day are returned.
 *     responses:
 *       200:
 *         description: A list of ticket classes (standard, premium, first), cheapest first
 *         content:
 *           application/json:
 *             example:
 *               - class: first
 *                 name: First Class
 *                 pricePerKm: 250
 *                 amenities: [Private compartment, Multi-course meal]
 *                 description: Ultimate luxury with private seating and full dining service
 *                 availableDays: [friday, saturday, sunday]
 *       400:
 *         description: The day value is not a valid day name
 *       500:
 *         description: Failed to fetch ticket classes
 */
router.get('/ticket-classes', (req, res) => {
  if (req.query.day !== undefined) {
    return getTicketClassesForDay(req, res);
  }

  return getAllTicketClasses(req, res);
});

export default router;
