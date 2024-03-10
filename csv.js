const csv = require('csv-parser');
const fs = require('fs');
const { promisify } = require('util');

const filePath = 'data.csv'; // Specify the path to your CSV file

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

async function readCSV() {
  try {
    if (await exists(filePath)) {
      const links = [];
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(csv())
        .on('data', (row) => {
          const link = row['link'];
          const description = row['description'];
          links.push({ link, description });
        });
      
      await new Promise((resolve, reject) => {
        fileStream.on('end', resolve);
        fileStream.on('error', reject);
      });
      
      console.log('CSV file successfully processed.');
      return links;
    } else {
      throw new Error('CSV file not found.');
    }
  } catch (error) {
    throw new Error(`Error processing CSV: ${error.message}`);
  }
}

module.exports = {
  readCSV
};
