import { Router } from 'express';
import { getFlights, getFlightById, getTotalBalance } from '../controllers/flightsController';

const router = Router();

router.get('/', getFlights);

router.get('/:id', getFlightById);

router.get('/total/balance', getTotalBalance);

export default router;