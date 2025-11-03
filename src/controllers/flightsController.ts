import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const dataPath = path.join(__dirname, '..', 'data', 'flightHistory.json');

function readData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const json = JSON.parse(raw);
  return json.flights;
}

export function getFlights(req: Request, res: Response) {
  try {
    const flights = readData();
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '12', 10);

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      const summary = flights.map(f => ({
        id: f.id,
        aircraft: f.aircraft.name,
        airline: f.aircraft.airline,
        registration: f.aircraft.registration,
        route: `${f.flightData.route.from} → ${f.flightData.route.to}`,
        balance: f.flightData.balance,
        date: f.flightData.date
      }));
      return res.json({ total: flights.length, data: summary });
    }

    const start = (page - 1) * limit;
    const paged = flights.slice(start, start + limit).map(f => ({
      id: f.id,
      aircraft: f.aircraft.name,
      airline: f.aircraft.airline,
      registration: f.aircraft.registration,
      route: `${f.flightData.route.from} → ${f.flightData.route.to}`,
      balance: f.flightData.balance,
      date: f.flightData.date
    }));

    res.json({
      page,
      limit,
      total: flights.length,
      data: paged
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao ler dados' });
  }
}

export function getFlightById(req: Request, res: Response) {
  try {
    const flights = readData();
    const id = req.params.id;
    const flight = flights.find((f: any) => f.id === id);
    if (!flight) {
      return res.status(404).json({ message: 'Voo não encontrado' });
    }
    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao ler dados' });
  }
}

export function getTotalBalance(req: Request, res: Response) {
  try {
    const flights = readData();
    const total = flights.reduce((acc: number, f: any) => acc + Number(f.flightData.balance), 0);
    res.json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao calcular saldo total' });
  }
}