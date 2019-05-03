function inversion(mot){
  var res="";
  while (res.length < mot.length){
    res+= mot[mot.length-res.length];
  }
  return res;
}

console.log(inversion("vache"));