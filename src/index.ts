import "./env.js";
import app from "./app.js";

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
