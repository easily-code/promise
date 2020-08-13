function Promise(fn) {
  this.main=fn;
  this.tasks=[];
  this.started=false;
}

Promise.prototype.then = function (s,f) {
  var me=this;
  var suc=function (data) {
    var p=s(data);
    if (p&&(p instanceof Promise)) {
      var {suc,fai}=me.tasks.shift();
      p.main(suc,fai);
    }
  };
  var fai=function (err) {
    var p=f(err);
    if (p&&(p instanceof Promise)) {
      var {suc,fai}=me.tasks.shift();
      p.main(suc,fai);
    }
  };
  if (!this.started) {
    this.started=true;
    process.nextTick(function () {
      me.main(suc,fai);
    });
    return this;
  }
  this.tasks.push({suc,fai});
  return this;
};
module.exports=Promise;
