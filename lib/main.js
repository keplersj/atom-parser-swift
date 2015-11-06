"use babel";

import {Grammar} from "first-mate"
import {SourceKitGrammar} from "./grammar"

export default {
  activate: () => {
    console.log("Hello from language-sourcekit!");
    console.log(Grammar);
    console.log(SourceKitGrammar);
  }
}
