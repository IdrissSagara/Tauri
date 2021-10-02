import { Component } from '@angular/core';
import {DiffEditorModel, NgxEditorModel} from "ngx-monaco-editor";
import {readDir, readTextFile} from "@tauri-apps/api/fs";

interface Node {
  name: string;
  path: string;
  children?: Array<Node>;
  haveChildren: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  onInit(editor: { getPosition: () => any; }) {
    let line = editor.getPosition();
    console.log(line);
  }
  listPath: Array<Node>

  constructor() {


    var pathTop = "C:\\Users\\didim\\Documents\\INTECH\\ProgrammationFonctionnelle\\test1\\cjohansen-no\\infrastructure";
    this.listPath = this.populateNode(pathTop);
    console.log(this.listPath);

  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  populateNode(directory: string): any {

    var childrens: Array<Node> = new Array<Node>();
    readDir(directory).then(d => {
      d.forEach(c => {
        if (c.children) {
          childrens.push({ name: c.name!!, path: c.path, haveChildren: true })
        } else {
          childrens.push({ name: c.name!!, path: c.path, haveChildren: false })
        }

      })
    });
    return childrens;
  }

  options = {
    theme: 'vs-dark'
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json',
    //uri: monaco.Uri.parse('a://b/foo.json')
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };


  openFile(node: Node) {

    if (!node.haveChildren) {
      readTextFile(node.path).then(d => {

        this.code = d;
      });


    } else if (node.children == null || node.children == undefined) {
      readDir(node.path).then(d => {
        node.children = new Array<Node>();
        d.forEach(c => {
          if (c.children) {
            node.children?.push({ name: c.name!!, path: c.path, haveChildren: true })
          } else {
            node.children?.push({ name: c.name!!, path: c.path, haveChildren: false })
          }

        })
      });

    } else  {
      node.children = undefined;
      console.log(node);
    }

  }
}
