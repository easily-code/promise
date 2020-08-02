function Promise(fn) {
  this.main=fn;
  this.pqueue=[];
  this.open=false;
}

Promise.prototype.then = function (s,f) {
  var me=this;
  var suc=function (data) {
    var p=s(data);
    if (p) {
      var {suc,fai}=me.pqueue.shift();
      p.main(suc,fai);
    }
  };
  var fai=function (err) {
    var p=f(err);
    if (p) {
      var {suc,fai}=me.queue.shift();
      p.main(suc,fai);
    }
  };
  if (!this.open) {
    this.open=true;

    process.nextTick(function () {
      me.main(suc,fai);
    });
    return this;
  }
  this.pqueue.push({suc,fai});
  return this;
};
module.exports=Promise;
