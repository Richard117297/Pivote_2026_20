import { app } from "./app.js";

const configuredPort = Number(process.env.PORT);
const port = Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3000;

app.listen(port, () => {
  console.log(`PixelPets API disponible en http://localhost:${port}/api`);
});
