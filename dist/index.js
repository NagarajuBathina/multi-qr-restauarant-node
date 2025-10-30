"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 1537;
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/", async (req, res) => {
    try {
        // await connectToDB();
        console.log("Connection successful.");
        return res.status(200).json({ message: "connection successful." });
    }
    catch (e) {
        return res.status(500).send("couldnt connect to database");
    }
});
//server running
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
