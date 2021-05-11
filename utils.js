const fs = require('fs');
var {execSync} = require("child_process");
const kind = require("kind-lang");

// Goes to /base to write a new file and type checks it
async function type_check(code) {
  var path = __dirname + "/Kind/base/playground.kind"
  try{
    var code = clear_data(code)
    process.chdir("./Kind/base");
    fs.writeFileSync(path, code);
    execSync("kind playground.kind > ./../../playground.txt");
    return format_output(fs.readFileSync("./../../playground.txt"));
  } catch (e) {
    throw e;
  }
}

// Removes "code=" from the URL
// ex: code=type%20Foo%20%7Ba%7D
const clear_data = (input) => {
  var aux = input.slice(5)
  try {
    return decodeURI(aux);
  } catch {
    return "URL decoding error"
  }
}

// Clear stuffs related to color that appears on terminal
const format_output = (output) => {
  var output = output.toString();
  return output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
}

const date_now = () => {
  return new Date().toLocaleString("pt-BT", {timeZone: "America/Sao_Paulo"})
}

// Save the log of the request
function save_log(log){
  process.chdir("./../../log/");
  try {
    fs.writeFileSync(Date.now()+".txt", log)
    console.log(date_now()+": updated log");
  } catch (e) {
    console.log(date_now()+": couldn't save log: ", e);
  }
}

module.exports = {type_check, save_log, date_now}

/*
Resources: 
http://www.blooberry.com/indexdot/html/topics/urlencoding.htm
*/