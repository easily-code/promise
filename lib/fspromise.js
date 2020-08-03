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
module.exports={readFile,writeFile};
