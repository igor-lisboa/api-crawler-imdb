import express from 'express';
const app = express();

app.get(`/`, async (req, res) => {
    return res.json({ itIsWorking: "uhul" });
});

app.listen(3000, () => {
    console.log(`The application is listening on port 3000!`);
});