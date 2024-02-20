import express, { Request, Response } from 'express';
import cluster, { Worker } from 'node:cluster';
import os from 'node:os';
import 'dotenv/config';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master process with id ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker: Worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  const app: express.Application = express();
  const port: number = parseInt(process.env.SERVER_PORT || '3000');

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}
