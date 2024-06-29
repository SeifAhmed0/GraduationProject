const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/predict', (req, res) => {
    console.log("Received request with body:", req.body);

    const features = req.body.features;

    // Spawn a new Python process
    const pythonProcess = spawn('python', ['model.py', JSON.stringify({ features: features })]);

    let stdoutData = '';

    // Listen for stdout data from the Python process
    pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });

    // When the Python process exits
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                // If the Python process exits successfully, parse the output JSON
                const results = JSON.parse(stdoutData);
                res.send(results);
            } catch (error) {
                // Handle JSON parsing error
                console.error("Error parsing response JSON:", error);
                res.status(500).send('Error parsing response JSON.');
            }
        } else {
            // If there was an error, send an error response
            console.error("Error occurred while making predictions.");
            res.status(500).send('Error occurred while making predictions.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
