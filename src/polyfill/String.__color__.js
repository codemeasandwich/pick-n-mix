const  _tableO = {
        ResetN : 0, BrightN : 1,  DimN : 2, UnderscoreN :4,  BlinkN : 5,  ReverseN : 7,  HiddenN : 8,
        FgBlackN : 30,  FgRedN : 31,  FgGreenN : 32,  FgYellowN : 33, FgBlueN : 34,  FgMagentaN : 35,  FgCyanN : 36,  FgWhiteN : 37,
        BgBlackN : 40,  BgRedN : 41,  BgGreenN : 42,  BgYellowN : 43, BgBlueN : 44,  BgMagentaN : 45,  BgCyanN : 46,  BgWhiteN : 47
}

const extesionNames = [];

for(let propName in _tableO){

  const colorNameS = propName.slice(0, -1)+"S";

  String.prototype.__defineGetter__(colorNameS, function() {
        return (this.toString()) ? `\x1b[${_tableO[propName]}m${this.toString()}\x1b[${_tableO.ResetN}m` : ``;
  });

  extesionNames.push(`"".${colorNameS}`[colorNameS]);
}

module.exports = extesionNames
