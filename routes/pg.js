
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  //res.send('respond with a resource ' + req.params.name);

  //algo
  //
  //recherche le nom de la page sur la db
  //   Si il la trouve pas
  //      affichage : cette page n'existe pas / et un lien vers sa création
  //   Sinon
  //      recuperation du Markdown ( ou DW )
  //      et affichage dans la page par passage en parametre jade

  //code
  req.db.find({title: req.params.name}, function(err, docs){
    if(docs[0]){
      res.render('pg', { title: docs[0].title,
                            content: req.md.toHTML(docs[0].content) });
    } else {
      res.render('pg', { title: "Cette page n'éxiste pas",
                            content: "Voulez vous la créer ?" });
    }
    console.log(req.md.toHTML(docs[0].content));
  });

  //FINAL

});

module.exports = router;
