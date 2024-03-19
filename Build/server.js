
// ENV Config
import dotenv from "dotenv"
dotenv.config()

// Core import
import express from "express";

// middleware imports
import bodyParser from "body-parser";
import multer from "multer";
import { Duplex } from "stream";
import path from "path";

// Database imports
import connectToDatabase from "./database.js";
import getDownloadLink from "./drive.js";

// App instances
const app = express();
const PORT = process.env.PORT

// Function to convert a buffer to stream
function bufferToStream(myBuffer) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}

// Multer configured
const upload = multer({ storage: multer.memoryStorage() });

// Middle ware configured
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "dist")));

// Handles Authentication
app.post("/login", async (req, res) => {
  // Check if the Login request has required fields
  if (!(req.body.id && req.body.password)) {
    return res.status(204).send({ authorized: false });
  }

  // Get the required fields
  const { id, password } = req.body;

  //Database
  let { db } = await connectToDatabase();


  // Filter based on the ID
  if (id.startsWith("TEACH")) {
    let context = await db.collection("Teachers").findOne({ username: id });

    if (context.password === password) {
      return res.status(200).send({
        authorized: true,
        role: "Teacher",
        user: context.name,
        id: id,
      });
    }
    return res.status(403).send({ authorized: false });
  } else if (id.startsWith("STUD")) {
    let context = await db.collection("Students").findOne({ username: id });

    if (password === context.password) {
      return res.status(200).send({
        authorized: true,
        role: "Student",
        user: context.name,
        id: id,
      });
    }
    return res.status(403).send({ authorized: false });
  } else {
    return res.status(200).send({ authorized: false });
  }
});

// Endpoint for fetching Data
app.post("/fetch", async (req, res) => {
  // Get the required fields
  let { id } = req.body;

  // Get the dataBase
  let { db } = await connectToDatabase();

  // initialize TimeTable
  let timeTable = [];

  // Validate the field
  if (id.startsWith("TEACH")) {
    // Create empty Slots
    timeTable = Array.from({ length: 8 }, () => Array(7).fill("-"));

    // Fetch Data
    let { batches } = await db.collection("Teachers").findOne({ username: id });

    // Fill the slot with appropriate data for student and teacher
    for (let batch of batches) {
      let { routine } = await db
        .collection("Batches")
        .findOne({ batch: batch });

      for (let row = 0; row < routine.length; row++) {
        for (let col = 0; col < routine[row].length; col++) {
          if (routine[row][col] === id) {
            timeTable[row][col] = batch;
          }
        }
      }
    }

    // return a response with the data
    return res.status(200).send({ data: timeTable });
  } else if (id.startsWith("STUD")) {
    // Fetch the students batch and Fees
    let { batch, fees } = await db
      .collection("Students")
      .findOne({ username: id });
    let context = await db.collection("Batches").findOne({ batch: batch });

    // filter
    let routine = context.routine;
    let teachers = context.teachers;

    // Construct Time table
    timeTable = routine.map((row) => {
      return row.map((col) => {
        if (col.length > 1) {
          return [teachers[col]["subject"], teachers[col]["name"]];
        }
        return col;
      });
    });

    let notesData = {};

    // Convert the ids of teacher to their subejct
    Object.keys(context.notes).forEach((val) => {
      let newKey = teachers[val]["subject"];
      notesData[newKey] = context.notes[val];
    });

    return res
      .status(200)
      .send({ data: timeTable, notesData: notesData, feesData: fees });
  }

  res.sendStatus(401);
});

// Endpoint for Updating Data
app.put("/update", async (req, res) => {
  // Required Fields
  let { batch, newRow, col, oldRow, id } = req.body;

  // Fetch the current routine
  let { db } = await connectToDatabase();
  let { routine } = await db.collection("Batches").findOne({ batch: batch });

  // check if the slot is empty
  if (routine[newRow][col] === "-") {
    // Update the Slot
    routine[newRow][col] = id;
    routine[oldRow][col] = "-";

    // Check if the update was succesfull
    let result = await db
      .collection("Batches")
      .updateOne({ batch: batch }, { $set: { routine: routine } });

    // Return response accordingly
    if (result.acknowledged) return res.sendStatus(200);
    return res.sendStatus(500);
  }

  // return a client error
  return res.sendStatus(400);
});

// Uplaod Endpoint
app.post("/upload", upload.array("notes"), async (req, res) => {
  // Retrive required fields
  const { files } = req;
  const { batch, id } = req.body;

  // Send the client status
  res.sendStatus(200);

  // Construct the Data
  const data = await Promise.all(
    files.map(async (file) => {
      const extension = file.originalname.endsWith(".pdf") ? ".pdf" : ".png";
      const link = await getDownloadLink(
        bufferToStream(file.buffer),
        extension === ".pdf" ? "application/pdf" : "image/png",
        file.originalname
      );

      return {
        topic: file.originalname,
        link: link,
      };
    })
  );

  // Connect to the database and manipulate it
  const { db } = await connectToDatabase();

  let context = await db.collection("Batches").findOne({ batch: batch });

  let oldNotes = context.notes[id] || [];

  let newNotes = [...oldNotes, ...data];

  await db.collection("Batches").updateOne(
    { batch: batch },
    {
      $set: {
        [`notes.${id}`]: newNotes,
      },
    }
  );
});

// Serve Html and assest for the rest
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
