import {createServer} from 'genkit';

// TODO: Update port for production.
const port = 4000;

const server = createServer();
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Increase timeout to accommodate long-running flow invocations in dev environments.
server.timeout = 5 * 60 * 1000; // 5 minutes.
