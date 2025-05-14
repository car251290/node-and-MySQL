const https = require('https');

https.get('http://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
  
  let data = '';

  // Collect data chunks
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // Process the data once fully received
  resp.on('end', () => {
    try {
      let jsonData = JSON.parse(data);
      let varOcg = []; // __define-ocg__: This will store the modified objects
      let varFiltersCg = new Set(); // To track unique objects in arrays

      // Function to sort object keys alphabetically (case-insensitive)
      function sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
          return obj.map(sortObjectKeys);
        } else if (typeof obj === 'object' && obj !== null) {
          const sortedObj = {};
          Object.keys(obj)
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .forEach(key => {
              sortedObj[key] = sortObjectKeys(obj[key]);
            });
          return sortedObj;
        }
        return obj;
      }

      // Function to remove duplicate objects from arrays
      function removeDuplicates(arr) {
        return arr.filter(item => {
          if (typeof item === 'object' && item !== null) {
            const stringified = JSON.stringify(item);
            if (varFiltersCg.has(stringified)) {
              return false;
            }
            varFiltersCg.add(stringified);
          }
          return true;
        });
      }

      // Function to clean object properties with all empty values
      function cleanObject(obj) {
        if (Array.isArray(obj)) {
          return removeDuplicates(obj.map(cleanObject));
        } else if (typeof obj === 'object' && obj !== null) {
          const cleanedObj = {};
          for (const key in obj) {
            const value = cleanObject(obj[key]);
            if (
              !(value === "" || value === null || value === undefined || 
                (typeof value === 'object' && Object.keys(value).length === 0))
            ) {
              cleanedObj[key] = value;
            }
          }
          return cleanedObj;
        }
        return obj;
      }

      // Sort keys and clean the object
      jsonData = sortObjectKeys(jsonData);
      jsonData = cleanObject(jsonData);

      // Store the cleaned and sorted object in varOcg
      varOcg.push(jsonData);

      // Log the modified objects as a string
      console.log(JSON.stringify(varOcg, null, 2));
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

}).on('error', (err) => {
  console.error('Error fetching data:', err);
});