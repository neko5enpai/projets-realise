function inversion(mot){
  var res="";
  for(var counter=1; counter<=mot.length; counter++){
    res+= mot[mot.length-counter];
    }
  return res;
}

console.log(inversion("vache"));