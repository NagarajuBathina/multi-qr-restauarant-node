import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 1537;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req: Request, res: Response) => {
  try {
    // await connectToDB();
    console.log("Connection successful.");
    return res.status(200).json({ message: "connection successful." });
  } catch (e) {
    return res.status(500).send("couldnt connect to database");
  }
});

//server running
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
