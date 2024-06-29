const { spawn } = require('child_process');

class Modal {
    static async modalfun(body) {
        console.log("Received request with body:", body);

        // Extract features from the request body
        const featuresList = body.features;

        return new Promise((resolve, reject) => {
            // Spawn a new Python process
            const pythonProcess = spawn('python', ['model.py', JSON.stringify({ features: featuresList })]);

            let stdoutData = '';

            // Listen for stdout data from the Python process
            pythonProcess.stdout.on('data', (data) => {
                stdoutData += data.toString();
            });

            // When the Python process exits
            pythonProcess.on('close', (code) => {
                console.log(stdoutData); // Move this line here
                if (code === 0) {
                    // If the Python process exits successfully, parse the output JSON
                    const results = JSON.parse(stdoutData);
                    resolve(results);
                } else {
                    // If there was an error, reject the promise with an error message
                    console.error("Error occurred while making predictions.");
                    reject('Error occurred while making predictions.');
                }
            });
        });
    }
}

module.exports = Modal;
