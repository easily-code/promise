function Promise(f) {
  this.f=f;
  this.q=[];
  this.s=0;
}
Promise.prototype.then = function (s,f) {
  var suc=function (data) {
    var p=s(data);
    var {s,f}=this.queue.shift();
    p&&p.f(f);
  };
  var fai=function (err) {
    var p=f(err);
    var {s,f}=this.queue.shift();
    p&&p.f(f);
  };
  if (this.s) {
    this.q.push({suc,fai});
    return;
  }
  this.s++;
  process.nextTick(function () {
    this.fn(suc,fai);
  })
  return this;
};
Module.exports=Promise;
