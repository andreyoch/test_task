import express, { Request, Response } from 'express';
import 'dotenv/config';
const app: express.Application = express();
const port: number = parseInt(process.env.SERVER_PORT || '3000');

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
