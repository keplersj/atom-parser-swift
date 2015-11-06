"use babel"

import {Grammar} from "first-mate"
import {BufferedProcess} from "atom"

export class SwiftSourceKitGrammar extends Grammar {
  constructor(registry) {
    super(registry, {
      name: "Swift (SourceKit)",
      scopeName: "source.swift",
      fileTypes: ["swift"]
    })
  }

  tokenizeLine(line, ruleStack) {
    console.log("tokenizing swift file");
    let toReturn = {}
    new BufferedProcess({
      command: "sourcekitten",
      args: ["syntax", "--text", line],
      stdout: (output) => {
        console.log(output);
        output = JSON.parse(output)
        console.log(output);
        toReturn = {
          line: line,
          tags: output,
          ruleStack: ruleStack
        }
        console.log(toReturn);
      }
    })
    return toReturn
  }
}
