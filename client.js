const fetch = require("node-fetch");

async function main() {
  const response = await fetch("http://localhost:3000/todos?user_id=2");
  const data = await response.json();
  console.log(data);
}
main();

// write your code here
