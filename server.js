import { execa } from "execa";
import open from "open";

const devProcess = execa("npm", ["run", "dev:next"], { stdio: "inherit" });

devProcess.catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});

setTimeout(async () => {
  await open("http://localhost:3000");
}, 2000);
