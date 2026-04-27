import { createServer } from '../src/server.mjs';

const root = process.cwd();
const app = createServer({ root });

export default app;
