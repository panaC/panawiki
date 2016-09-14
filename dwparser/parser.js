
var parser = {};

parser.text = "";

parser.dwfile = function (text) {
  parser.text = text;
}

function decodeObj(a, b, c, d) {
  return {type = a, numLigne = b, content = c, child = d};
}

parser.jsonOutput = function () {

  //1 Split
  var arraySplit = parser.text.Split('\r\n');

  var temp = {};
  var arrayOut = [];
  //
  arraySplit.forEach(function (val, numLigne) {
    //recherche d'une balise dans val si il y en a pas alors texte simple
    temp = searchBalise(val); //temp.balise et temp.content et temp.textRestant

    arrayOut.push(decodeObj(temp.balise, numLigne+1, temp.content, ))
  })

}

module.exports = parser;
