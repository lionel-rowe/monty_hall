// String formatting function taken from http://stackoverflow.com/a/2648463

String.prototype.format = String.prototype.f = function() {
  var s = this,
      i = arguments.length;

  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
};
