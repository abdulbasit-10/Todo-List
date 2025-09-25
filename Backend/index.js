// // index.js
// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const UserRoutes = require('./routes/user_routes');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;

// // middleware to parse JSON body
// app.use(express.json());

// app.use(cors())
// // API routes
// app.use('/api/v0/todo', UserRoutes);

// // connect DB first, then start server
// const start = async () => {
//   try {
//     await connectDB();
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
//   } catch (err) {
//     console.error('Failed to start server because DB connection failed.', err);
//     process.exit(1);
//   }
// };

// start();


// index.js
// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const UserRoutes = require('./routes/user_routes');
// const cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger'); // <-- new

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors());

// // Mount docs only in non-production (safer)
// if (process.env.NODE_ENV !== 'production') {
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   console.log('Swagger docs available at /docs');
// }

// // API routes
// app.use('/api/v0/todo', UserRoutes);

// // connect DB first, then start server
// const start = async () => {
//   try {
//     await connectDB();
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
//   } catch (err) {
//     console.error('Failed to start server because DB connection failed.', err);
//     process.exit(1);
//   }
// };

// start();


// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/user_routes');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // make sure ./swagger.js exists

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// health check (handy for uptime checks)
app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// mount docs only when not in production
if (process.env.NODE_ENV !== 'production') {
  // optional: protect docs with basic auth when DOCS_USER & DOCS_PASS are provided
  if (process.env.DOCS_USER && process.env.DOCS_PASS) {
    try {
      // install this only if you actually want basic auth: npm i express-basic-auth
      // Using a try/catch lets the app continue if the package isn't installed.
      const basicAuth = require('express-basic-auth');
      app.use(
        '/docs',
        basicAuth({
          users: { [process.env.DOCS_USER]: process.env.DOCS_PASS },
          challenge: true
        }),
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
      );
      console.log('Swagger docs protected with Basic Auth at /docs');
    } catch (e) {
      console.warn(
        'express-basic-auth not installed — mounting /docs without auth. To enable, run: npm i express-basic-auth'
      );
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
  } else {
    // no DOCS_USER supplied — mount without auth (still only outside production)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at /docs');
  }
} else {
  console.log('NODE_ENV=production -> Swagger docs are disabled by default.');
}

// API routes
app.use('/api/v0/todo', UserRoutes);

// connect DB first, then start server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server because DB connection failed.', err);
    process.exit(1);
  }
};

start();
