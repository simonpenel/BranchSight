// --------------------------------------------------------------------
// Fonction de calcul de la position  d'un noeud a partir des longueurs
// de branch_length
// --------------------------------------------------------------------
function phylo(n) {
  var dist = 0.0;
  if (n && n.data.branch_length != null) {
    var p = n.parent;
    if (logBranchLength) {
      dist = Math.log(parseFloat(n.data.branch_length)+1.1) + phylo(p);
    } else {
      dist = parseFloat(n.data.branch_length) + phylo(p);
    }
    return dist;
  }
  return dist;
}
// Fonction de calcul de la longueur max d'un arbre
// ------------------------------------------------
function getmaxlength(treeRoot,max) {
  treeRoot.each(function (d) {
    var phylodist = phylo(d);
    if (phylodist > max) {
      max = phylodist;
    }
  });
  return max;
}
// Fonction pour utiliser les longueurs de branches lors de l'affichage
// d'un arbre
// --------------------------------------------------------------------
function phylogeny(treeRoot,offset) {
  treeRoot.each(function (d) {
    var phylodist = phylo(d);
    d.x = phylodist*offset;
  });
}

// Fonction ajoute nb sequences et especes
// ---------------------------------------
function  addNumberSeqSpec(treeRoot) {
  treeRoot.eachAfter(function (d) {
    var specs = [];
    if (!d.children) {
      d.data.nbseq =  {nbSeq : 1};
    }
    else {
      var nbseq = 0;
      var fils = d.children;
      fils.forEach(function (d){
        nbseq = nbseq + d.data.nbseq.nbSeq;
      })
      d.data.nbseq =  {nbSeq :nbseq};
    }
  });
}
// Fonction qui collapse les noeuds d'une certaine profondeur
// ----------------------------------------------------------
function expandTree(treeRoot) {
  treeRoot.each(function (d) {
    if (d.data.nodeinfo) {
      if (d.data.nodeinfo.status === "collapsed") {
        if (d.data._clade) {
          d.data.clade = d.data._clade;
          d.data._clade = null;
          d.data.nodeinfo = {status : "extended"};
        }
      }
    }
  });
}