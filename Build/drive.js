// Env variables imports
import dotenv from "dotenv";
dotenv.config();

// Neccessary imports
import { google } from "googleapis";
import path from "path";

// Initializes the authentication
const auth = new google.auth.GoogleAuth({
  KeyFile: path.join(process.cwd(), "creds.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Initializes the Drive instance
const drive = google.drive({
  version: "v3",
  auth: auth,
});

// Uploads the file and returns the Download link
async function getDownloadLink(file, type, fileName) {
  // The folder id to store content
  const folderId = process.env.FOLDERID;

  // Uplaod the file To Drive
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType: type,
    },
    media: {
      mimeType: type,
      body: file,
    },
  });

  // Change the permission of the file to be available to anyone
  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: {
      type: "anyone",
      role: "reader",
    },
  });

  // Create the downlaoad link
  let result = await drive.files.get({
    fileId: response.data.id,
    fields: "webContentLink",
  });

  // return the downlaod link
  return result.data.webContentLink;
}

export default getDownloadLink;
