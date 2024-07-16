// import fs from "node:fs";
import fs from "node:fs/promises";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const func = async ()=> {
    const filePath = "./files/file.txt";
    // const buffer = await fs.readFile(filePath);
    // const text = buffer.toString();
    // console.log(text);
    // const text = await fs.readFile(filePath, "utf-8");
    // console.log(text);
    // const {encoding} = await DetectFileEncodingAndLanguage(filePath);
    // const text = await fs.readFile(filePath, encoding);
    // console.log(text);
    // await fs.appendFile(filePath, "\nPHP the best");
    // await fs.writeFile(filePath, "Mojo forever");
    // await fs.appendFile("./files/file2.txt", "\nPHP the best");
    // await fs.writeFile("./files/file3.txt", "Mojo forever");
    // await fs.unlink("./files/file3.txt");
}

func()

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })