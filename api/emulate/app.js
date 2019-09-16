const Mocker = require("./bin/Mocker");
const mocker = new Mocker();

mocker.init(3800);

async function main() {
  await mocker.fromSwagger('../swagger.yaml');
  mocker.start();
}
main();