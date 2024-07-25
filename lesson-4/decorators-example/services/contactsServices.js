import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.resolve("db", "contacts.json");

export const getAllContacts = async()=> {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
}