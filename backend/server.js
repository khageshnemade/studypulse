const express = require('express');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Path to the credentials file you downloaded from Google Developer Console
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) {
    console.error('Error loading client secret file:', err);
    return;
  }
  // Authorize the client with credentials
  authorize(JSON.parse(content), getWatchHistory);
});

// Create an OAuth2 client with the given credentials.
const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oAuth2Client, callback);
    } else {
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    }
  });
};

// Get and store a new token after prompting for user authorization
const getNewToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly'],
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later use
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          console.error('Error storing access token', err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

// Retrieve the watch history of the authenticated user
const getWatchHistory = (auth) => {
  const youtube = google.youtube({ version: 'v3', auth });

  // Making the API request to get the history of watched videos
  youtube.activities.list({
    part: 'snippet,contentDetails',
    mine: true,
    maxResults: 10,
    type: 'video',
  }, (err, res) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    const activities = res.data.items;
    if (activities.length) {
      console.log('Watch History:');
      activities.forEach((activity, index) => {
        const video = activity.contentDetails.upload;
        console.log(`${index + 1}. ${video.title} - https://www.youtube.com/watch?v=${video.videoId}`);
      });
    } else {
      console.log('No watch history found.');
    }
  });
};

// Endpoint to get watch history (front-end will call this)
app.get('/api/history', async (req, res) => {
  const youtube = google.youtube({ version: 'v3', auth });

  try {
    const response = await youtube.activities.list({
      part: 'snippet,contentDetails',
      mine: true,
      maxResults: 10,
      type: 'video',
    });

    const history = response.data.items.map((activity) => ({
      title: activity.snippet.title,
      url: `https://www.youtube.com/watch?v=${activity.contentDetails.upload.videoId}`,
      timestamp: activity.snippet.publishedAt,
    }));

    res.json({
      watchHistory: history,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watch history' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
