import { server } from "./server";

const port = 3001;

server.listen(port, () => {
  return console.log(`Express server is listening on ${port}`);
});
