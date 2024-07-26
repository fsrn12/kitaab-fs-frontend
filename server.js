import app from "./app.js";

process.on("uncaughtException", (err) => {
  console.error(`uncaughtException: Shutting Down...
  ${err.name}: ${err.message}
  `);
  process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.info(`server running at port:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection: Shutting Down...
    ${err.name}: ${err.message}
    `);
  server.close(() => {
    process.exit(1);
  });
});
