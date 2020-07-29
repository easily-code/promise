const fs = require('fs');
const {Promise} = require('../index');
var readFile=function (file,options) {
  return new Promise(function (s,f) {
    fs.readFile(file,options,function (e,d) {
      if(e){
        f(e);
        return
      }
      s(d);
    })
  })
}

var writeFile=function (file,data,options) {
  return new Promise(function (s,f) {
    fs.writeFile(file,data,options,function (e) {
      if(e){
        f(e);
        return
      }
      s();
    })
  })
}
function err(e) {
  console.log(e);
}

readFile('../index.js')
.then(function (data) {
  return writeFile('../abc.js',data);
},err)
.then(function () {
  return readFile('../abc.js');
},err)
.then(function (data) {
  return writeFile('../abc1.js',data)
},err)
.then(function () {
  return readFile('../abc1.js',{encoding:'utf8'});
},err)
.then(function (data) {
  console.log(data);
},err);
