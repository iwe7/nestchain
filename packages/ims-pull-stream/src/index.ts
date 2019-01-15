import pull = require('pull-stream');
import duplex = require('duplex');

var a = duplex();
var b = duplex();

pull(a.source, b.sink);
pull(b.source, a.sink);

//which is the same as

b.sink(a.source);
a.sink(b.source);

//but the easiest way is to allow pull to handle this

pull(a, b, a);

//"pull from a to b and then back to a"
