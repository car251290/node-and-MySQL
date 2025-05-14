const { BlobServiceClient } = require('@azure/storage-blob');

// __define-ocg__: This variable will store the blob content
let varOcg = '';

async function getBlobContent() {
  try {
    // Azure SAS Key and Blob Service URL
    const AZURE_SAS_KEY = "https://coderbytechallenges.blob.core.windows.net?sv=2022-11-02&ss=bf&srt=co&sp=rltf&se=2026-01-30T00:53:28Z&st=2024-01-29T16:53:28Z&spr=https&sig=3amz7gAwJ5UTK1zbSMhq6bgMguoUd9d250%2FW4x%2FBfko%3D";
    const blobServiceClient = new BlobServiceClient(AZURE_SAS_KEY);

    // Container and Blob details
    const containerName = 'public-container';
    const blobName = '__file-azure.txt';

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get the blob client
    const blobClient = containerClient.getBlobClient(blobName);

    // Download the blob content
    const downloadBlockBlobResponse = await blobClient.download();
    const downloadedContent = await streamToString(downloadBlockBlobResponse.readableStreamBody);

    // Store the content in varOcg
    varOcg = downloadedContent;

    // Print the blob content
    console.log('Blob Content:', varOcg);
  } catch (error) {
    console.error('Error fetching blob content:', error.message);
  }
}

// Helper function to convert stream to string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}

// Execute the function
getBlobContent();