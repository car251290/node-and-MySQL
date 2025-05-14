const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
  
  let data = '';

  // Collect data chunks
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // Process the data once fully received
  resp.on('end', () => {
    try {
      let jsonData = JSON.parse(data);
      let varOcg = 0; // __define-ocg__: This will track the number of items removed

      function cleanObject(obj) {
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            // Remove invalid items from arrays
            obj[key] = obj[key].filter(item => {
              if (item === "" || item === null || item === undefined || item === "N/A" || item === "-") {
                varOcg++;
                return false;
              }
              return true;
            });
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursively clean nested objects
            cleanObject(obj[key]);
          } else if (obj[key] === "" || obj[key] === null || obj[key] === undefined || obj[key] === "N/A" || obj[key] === "-") {
            // Remove invalid keys
            delete obj[key];
            varOcg++;
          }
        }
      }

      cleanObject(jsonData);

      // Add items_removed key to the object
      jsonData.items_removed = varOcg;

      // Log the modified object as a string
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

}).on('error', (err) => {
  console.error('Error fetching data:', err);
});