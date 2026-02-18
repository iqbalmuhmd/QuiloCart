import { config } from "@/config/env";
import connectDB from "@/config/db.js";

import app from "@/app";

const PORT = config.port;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
