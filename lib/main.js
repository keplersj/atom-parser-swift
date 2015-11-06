"use babel";

import {SwiftSourceKitGrammar} from "./grammar"

export default {
  activate: () => {
    console.log(new SwiftSourceKitGrammar(atom.grammars));
    atom.grammars.addGrammar(new SwiftSourceKitGrammar(atom.grammars))
  }
}
