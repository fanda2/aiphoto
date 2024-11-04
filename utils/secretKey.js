//简单的字符串加密解密算法

const strA=['A','B','C','D','E','F','G','H','I'];//九位字母组成的数组
//字符串进行加密 
function compileStr(code){  
  //code.charCodeAt(0)第一位字母对应的编码
  return code;
}
  
  //字符串进行解密
  function uncompileStr(code){
  // code=unescape(code);
  // var c=String.fromCharCode(code.charCodeAt(0)-code.length);
  // for(var i=1;i<code.length;i++)
  // {
  // c+=String.fromCharCode(code.charCodeAt(i)-code.charCodeAt(i-1));
  // }
  return code; 
}

module.exports = {
  toCode: compileStr,
  fromCode:uncompileStr
}  