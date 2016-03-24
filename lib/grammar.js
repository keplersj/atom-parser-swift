"use babel"

import {Grammar} from "first-mate"
import {BufferedProcess} from "atom"

export class SwiftSourceKitGrammar extends Grammar {
  constructor(registry) {
    super(registry, {
      name: "Swift (SourceKit)",
      scopeName: "source.lang.swift",
      fileTypes: ["swift"]
    })
    this.registry = registry
  }

  tokenizeLine(line, ruleStack = []) {
    let tags = []
    let tokens = []
    new BufferedProcess({
      command: "sourcekitten",
      args: ["syntax", "--text", line],
      stdout: (shell) => {
        output = JSON.parse(shell)
        for (result of output) {
          let text = line.slice(result["offset"], result["offset"] + result["length"])
          tags.push(this.registry.startIdForScope(result["type"]))
          tags.push(result["length"])
          tags.push(this.registry.endIdForScope(result["type"]))
          tokens.push({value: text, scopes: [result["type"]]})
        }
      }
    })
    console.log({line, tags, tokens, ruleStack});
    return {line, tags, tokens, ruleStack}
  }
}
