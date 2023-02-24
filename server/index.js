import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

// GET /ping - Check if the API is working
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(3003, () => {
    console.log('Server listening on port 3000');
});