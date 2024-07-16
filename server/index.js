import { connectDB } from './db.js';
import { PORT } from './config.js';
import app from './app.js';

connectDB();
app.listen(3001);
console.log(`server is running in port`, 3001);
