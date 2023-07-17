const { spawn } = require('child_process');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const xlsx = require('xlsx');
async function handleUpload(req, res) {
  try {
    // Check if a file was sent in the request
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No file was uploaded.' });
    }
    // Get the path to the Python script
    const pythonPath = path.join(__dirname, 'python_scripts', 'convert.py');

    const python = spawn('conda', ['run', '-n', 'base', '/Users/amraly/anaconda3/bin/python', pythonPath, req.file.buffer.toString('base64')]);
  
    let output = '';
    python.stdout.on('data', (data) => {
      output += data.toString();
      console.log(output);
    });

    // Handle the end of the Python script output
    python.stdout.on('end', () => {
      res.status(StatusCodes.OK).json({ message: 'File uploaded and processed successfully!' });
    });

    python.stderr.on('data', (data) => {
      console.error(data.toString());
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while processing the file.' });
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while uploading or processing the file.' });
  }
}

module.exports = handleUpload;