const {readFile,writeFile} = require('../lib/fspromise');

function err(e) {
  console.log(e);
}

var p=readFile('../index.js',{encoding:'utf8'})
.then(function (data) {
  console.log("1",data);
  return writeFile('./abc.js',data);
},err)
.then(function () {
  return readFile('./abc.js',{encoding:'utf8'});
},err)
.then(function (data) {
  console.log("2",data);
  return writeFile('./abc1.js',data)
},err)
.then(function () {
  return readFile('./abc1.js',{encoding:'utf8'});
},err)
.then(function (data) {
  console.log("3",data);
  return writeFile('./abc2.js',data)
},err)
.then(function () {
  return readFile('./abc2.js',{encoding:'utf8'});
},err)
.then(function (data) {
  console.log("4",data);
},err);
