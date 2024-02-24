import { resolve } from 'path';
import dotenv from 'dotenv';
import app from './App';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
