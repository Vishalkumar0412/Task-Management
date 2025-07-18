
const express = require('express');

const cors = require('cors');
const router = require('./routes');
const app = express();
const PORT = 3000;
const DATA_FILE = './tasks.json';

app.use(cors());
app.use(express.json());


app.use('/api/v1',router)


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
