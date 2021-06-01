import express from 'express';
import dotenv from 'dotenv';

// load dotenv variables
dotenv.config();

const app = express();

const port: string = process.env.PORT || `3000`;

app.get(`/`, async (req, res) => {
    return res.json({ itIsWorking: "uhul" });
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});