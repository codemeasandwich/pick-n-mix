'use strict';

//=====================================================
//====== !!! THIS IS USED ON SERVER & CLIENT !!! ======
//=====================================================

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! HERE BE DRAGONS
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let modules

  if(global.process) { // NodeJs !!!

    const loader = {open:require}

    const path = loader.open('path')
    const fs = loader.open('fs')
    const paths = [];

    modules = (fileName)=> loader.open(fileName)
    modules.keys = ()=>paths;

    for (let fileName of fs.readdirSync(__dirname))
    {    paths.push("./"+fileName)  }
  } else {
    // webpack magic
      modules = require.context("./", false, /\.js$/);
  }

  module.exports = modules.keys().filter( path => "./index.js" !== path
                                && ! path.startsWith("./_")
                                && ! path.endsWith(".test.js")
                                && ! path.endsWith(".js.map"))
                .map( path => module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path) );

  module.exports.list = ()=>{
    return module.exports.reduce((listOfpolyfills,polyfillName)=>listOfpolyfills.concat(polyfillName),[])
  }
