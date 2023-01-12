const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const scheduled = require('./schedule/refreshToken');

const app = express();

app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

const port = process.env.PORT || 3000;

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

// const whiteList = ['http://localhost:8080', 'https://my-app.com'];
// const options = {
//   origen: (origen, callback) => {
//     if (whiteList.includes(origen) || !origen) {
//       callback(null, true);
//     } else {
//       callback(new Error('Acceso no permitido'));
//     }
//   },
// };

// app.use(cors(options));
app.use(cors());
require('./utils/auth');
app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Soy una nueva ruta!!!');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

scheduled.initScheduledJobs();

app.listen(port, () => {
  console.log(`Listen at port ${port}...`);
});
