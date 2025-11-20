import { dbReady } from "../BD/conexionDB.js";

(async () => {
  await dbReady;
  console.log("🟢 BD lista (Modo desarrollo)");
})();