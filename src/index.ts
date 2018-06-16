const binary = require("node-pre-gyp");
const path = require("path");
const binding_path = binary.find(path.resolve(path.join(__dirname, "../package.json")));
const cypher = require(binding_path);
import * as ast from "./ast";

export interface IParsePosition {
  line: number;
  column: number;
  offset: number;
}

export interface IParseError {
  position: IParsePosition;
  message: string;
  context: string;
  contextOffset: number;
}

export type parseResultDirective = ast.IStatement|ast.ICommand;
export interface IParseResult {
  ast: string;
  errors: IParseError[];
  directives: parseResultDirective[];
  roots: ast.IAstNode[];
  nnodes: number;
}

export interface IParseParameters {
  query: string;
  width?: number;
  dumpAst?: boolean;
  colorize?: boolean;
}

export const parse = (query: string | IParseParameters) => new Promise<IParseResult>((resolve, reject) =>
  cypher.parse(query, function(succeeded: Boolean, result: IParseResult) {
    if (succeeded) {
      resolve(result);
    } else {
      reject(result);
    }
  })
);