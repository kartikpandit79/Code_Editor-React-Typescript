npm i localforage  to create indexed DB in browser s
npm install --save-exact @monaco-editor/react@3.7.5 --legacy-peer-deps
npm install  monaco-editor --legacy-peer-deps // type script def file
npm install  @types/prettier@2 --legacy-peer-deps
npm i prettier@2.2.1 --legacy-peer-deps
npm i bulmaswatch --legacy-peer-deps
npm install --save-exact react-resizable@3.0.4 @types/react-resizable@3.0.2 --legacy-peer-deps
npm i --save-exact @uiw/react-md-editor@2.1.1
npm install --save-exact react-redux redux @types/react-redux redux-thunk --legacy-peer-deps
npm i immer --legacy-peer-deps


import React from "react"
import ReactDOM from "react-dom"

const App = () => <div>Hello Bro</div>

ReactDOM.render(
<App/>, document.querySelector("#root")
)





import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};


  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }