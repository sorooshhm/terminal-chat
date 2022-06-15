const readline = require("readline");
const net = require("net");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const client = new net.Socket({});

let name;
rl.question("Enter your name : \n", (ans) => {
  name = ans;
  client.connect({
    port: 8080,
    host: "5.200.194.65",
  });
});

rl.on("line", (msg) => {
  const data = { message: msg, name };
  readline.moveCursor(process.stdout, -msg.length, -1);
  readline.clearScreenDown(process.stdout);
  client.write(JSON.stringify(data));
});

client.on("connect", () => {
  console.log("connected to server \n");
});

client.on("data", (d) => {
  const data = JSON.parse(d.toString());
  console.log(`${data.name} : ${data.message} \n`);
});

client.on("error", (err) => {
  console.log(err);
  process.exit();
});

client.on("end", () => {
  process.exit();
});

process.on("beforeExit", () => {
  console.log("j");
  client.destroy();
});
