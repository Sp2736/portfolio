const fs = require('fs');
const path = require('path');

const spotifyDir = path.join(__dirname, '../public/spotify');
const playlists = [
  'lonely-nights',
  'enough-mentality',
  'hot-songs',
  'grandeur',
  'hardin-tessa',
  'rain-forest',
  'night-rain'
];

const richData = {};

playlists.forEach(playlist => {
  const csvPath = path.join(spotifyDir, `${playlist}.csv`);
  if (fs.existsSync(csvPath)) {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    // Skip header line
    const tracks = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Basic CSV parsing for the first few columns: Track URI, Track Name, Album Name, Artist Name(s)
      // Since some fields might have quotes, we need a regex or simple split.
      // Easiest is to use regex matching quoted strings or unquoted.
      const match = line.match(/(?:^|,)(?:"([^"]*)"|([^,]*))/g);
      if (match && match.length >= 4) {
        const getVal = (idx) => {
          let val = match[idx];
          if (val.startsWith(',')) val = val.substring(1);
          if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
          return val;
        };
        
        const uri = getVal(0);
        const name = getVal(1);
        const artist = getVal(3);
        
        const id = uri.replace('spotify:track:', '');
        if (id) {
          tracks.push({ id, name, artist });
        }
      }
    }
    richData[playlist] = tracks;
  }
});

fs.writeFileSync(path.join(spotifyDir, 'playlists-rich.json'), JSON.stringify(richData, null, 2));
console.log('Successfully generated playlists-rich.json');
