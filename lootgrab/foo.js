tdl.provide('lootgrab.foo');

tdl.require('tdl.log');

function BaseClass(name) {
  this.name = name;
}

BaseClass.prototype.dump = function() {
  this.print();
};

BaseClass.prototype.print = function() {
  tdl.log("name:", this.name);
};

function SubClass(name, value) {
  // call BaseClass constuctor
  BaseClass.call(this, name);
  this.value = value;
}

tdl.base.inherit(SubClass, BaseClass);

SubClass.prototype.print = function() {
  // call BaseClass dump
  BaseClass.prototype.print.call(this);

  tdl.log("value:", this.value);
};


// example
// tdl.require('lootgrab.foo');
//
// a = new BaseClass("abc");
// b = new SubClass("def", 123);
// a.dump();
// b.dump();


