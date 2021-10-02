import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from "@angular/forms";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";

export function onMonacoLoad() {

  console.log((window as any).monaco);

  // @ts-ignore
  const uri = monaco.Uri.parse('a://b/foo.json');
  // @ts-ignore
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });

}
const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
