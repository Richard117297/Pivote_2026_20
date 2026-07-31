import { app } from "./app.js";

const configuredPort = Number(process.env.PORT);
const port = Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`PixelPets disponible en http://${host}:${port}`);
});
