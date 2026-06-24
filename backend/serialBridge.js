import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import axios from "axios";

const COM_PORT = "COM5";
const API_URL = "http://localhost:5000/api/attendance/check-in";

console.log(`Connecting to ESP32 on port ${COM_PORT}...`);

const port = new SerialPort({
    path: COM_PORT,
    baudRate: 115200,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

port.on("open", () => {
    console.log("Hardware connected successfully. Ready to read cards...");
});

parser.on("data", async (data) => {
    const rfidTag = data.trim().toLowerCase();

    if (!rfidTag || rfidTag === "system_ready" || rfidTag.includes("scanned")) {
        return;
    }

    console.log(`\nCard read: ${rfidTag}`);

    try {
        const response = await axios.post(API_URL, { rfidTag });

        if (response.status === 200) {
            const name = response.data.data.firstName || "Emp";
            const status = response.data.data.status || "Done";

            const successMsg = `SUCCESS,${name},${status}\n`;
            port.write(successMsg);
            console.log(`Access granted: Sent ${successMsg.trim()} to ESP32`);
        }
    } catch (error) {
        port.write("DENIED\n");

        if (error.response) {
            console.log(`Access denied: ${error.response.data.message}`);
        } else {
            console.log(`Server error: ${error.message}`);
        }
    }
});

port.on("error", (err) => {
    console.error("Serial port error: ", err.message);
});
