require("dotenv").config();
const app = require("./src/app");
const connectDB=require("./src/Database/db");

const PORT = process.env.PORT || 3000;

connectDB();

const startServer = async () => {
   
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    };

    startServer();
