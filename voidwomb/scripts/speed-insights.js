// scripts/speed-insights.js
const { injectSpeedInsights } = require('@vercel/speed-insights');
const path = require('path');

(async () => {
  try {
    const configPath = path.resolve(__dirname, '../.speed-insights.json');
    const config = require(configPath);

    for (const strategy of config.strategies) {
      const data = await injectSpeedInsights({
        url: config.url,
        strategy,
      });
      console.log(`Speed Insights Data for ${strategy}:`, data);
    }
  } catch (error) {
    console.error('Error running Speed Insights:', error);
    process.exit(1);
  }
})();
