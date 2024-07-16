import express from 'express';
import postsRoutes from './routes/products.routes.js';
import categoryRoutes from './routes/categories.routes.js';
import collectionRoutes from './routes/Collection.routes.js';
import transaccionesRoutes from './routes/transaccion.routes.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// ! middlewares
const corsConfig = {
  origin: [
    'http://localhost:5173',
    'https://frontend-ecommercemern.onrender.com',
    'https://frontendecommercemern.netlify.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.options('', cors(corsConfig));
app.use(cors(corsConfig));
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
  })
);

// !routes
app.use(postsRoutes);
app.use(transaccionesRoutes);
app.use(categoryRoutes);
app.use(collectionRoutes);
app.use('/api', authRoutes);

export default app;
