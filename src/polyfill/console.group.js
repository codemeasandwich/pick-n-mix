
//=====================================================
//======================================= Console group
//=====================================================

if( ! ('group' in console)){

  const logF = console.log;
  let levelsS = '';
  console.group = function(GroupNameS) {

        if ('string' !== typeof GroupNameS) {
          //throw new InvalidArgumentError("First argument to console.group must be a String",arguments);
          throw new Error("First argument to console.group must be a String");
        }

    logF(levelsS+'┌'+GroupNameS.BrightS);

    console.log = (...argsA) => {

      if (levelsS) {

//++++++++++++++++++++++++++++++++++++++++++++ args[0]
//++++++++++++++++++++++++++++++++++++++++++++++++++++

        // e.g. console.log()
        if ( undefined === argsA[0]) {
          argsA[0] = '';
        } else if ("object" === typeof argsA[0]) {
          argsA[0] = JSON.stringify(argsA[0]);
        }
        argsA[0] = levelsS +' ' + argsA[0].replace(/\r\n|\r|\n/g,"\n\r"+levelsS);

//++++++++++++++++++++++++++++++++++++++++++++ args[1]
//++++++++++++++++++++++++++++++++++++++++++++++++++++

        if (undefined !== argsA[1]) {
            if ("object" === typeof argsA[1]) {
               argsA[1] = JSON.stringify(argsA[1]);
            } else {
               argsA[1] = `${ args[1] }`;
            }
            argsA[1] = argsA[1].replace(/\r\n|\r|\n/g,"\n\r"+levelsS);
        } // END args[1]

      } // END if (levels)

//+++++++++++++++++++++++++++++++++ SEND to console !!
//++++++++++++++++++++++++++++++++++++++++++++++++++++

      logF.apply(console,argsA);

    } // END console.log
    levelsS += '|';
  }; // END console.group

//=====================================================
//==================================== Console groupEnd
//=====================================================

  console.groupEnd = () => {
    levelsS = levelsS.slice(0, -1);
    logF(levelsS+'└');
  } // END console.groupEnd

}

module.exports = ["console.group", "console.groupEnd"]
