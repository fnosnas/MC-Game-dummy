const mineflayer = require('mineflayer');

const HOST = process.env.MC_HOST || 'perceptive-teal-cow.craftserve.pl';
const PORT = parseInt(process.env.MC_PORT || '25565');
const USERNAME = process.env.MC_USERNAME || 'Steve_AFK';

const RECONNECT_DELAY = 15000;

function createBot() {
  console.log(`[Bot] Connecting to ${HOST}:${PORT} as ${USERNAME}...`);

  let bot;
  try {
    bot = mineflayer.createBot({
      host: HOST,
      port: PORT,
      username: USERNAME,
      version: '1.21.1',
      auth: 'offline',
      keepAlive: true,
      checkTimeoutInterval: 30000,
    });
  } catch (e) {
    console.error('[Bot] Failed to create bot:', e.message);
    setTimeout(createBot, RECONNECT_DELAY);
    return;
  }

  bot.on('login', () => {
    console.log('[Bot] Logged in! Server should now show 1 player online.');
  });

  bot.on('spawn', () => {
    console.log('[Bot] Spawned in world.');
    startActivity(bot);
  });

  bot.on('kicked', (reason) => {
    console.log('[Bot] Kicked:', reason);
    setTimeout(createBot, RECONNECT_DELAY);
  });

  bot.on('error', (err) => {
    console.error('[Bot] Error:', err.message);
    setTimeout(createBot, RECONNECT_DELAY);
  });

  bot.on('end', (reason) => {
    console.log('[Bot] Disconnected:', reason);
    setTimeout(createBot, RECONNECT_DELAY);
  });
}

function startActivity(bot) {
  const actions = [
    () => {
      bot.look(Math.random() * Math.PI * 2, 0, false);
      console.log('[Bot] Looking around...');
    },
    () => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      console.log('[Bot] Jumped.');
    },
    () => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000 + Math.random() * 1000);
      console.log('[Bot] Walked forward.');
    },
    () => {
      bot.setControlState('sneak', true);
      setTimeout(() => bot.setControlState('sneak', false), 800);
      console.log('[Bot] Sneaked.');
    },
    () => {
      console.log('[Bot] AFK...');
    },
  ];

  function doRandomAction() {
    if (!bot || !bot.entity) return;
    const action = actions[Math.floor(Math.random() * actions.length)];
    try { action(); } catch (e) { console.log('[Bot] Action error:', e.message); }
    setTimeout(doRandomAction, 30000 + Math.random() * 60000);
  }

  doRandomAction();
}

createBot();
