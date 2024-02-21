import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // Handle root file "index.js"
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: "index.js", namespace: 'a' };
            });

            //Handle nested file 
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                let newPath
                newPath = new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
                // console.log("--->>new path", newPath);
                return {
                    namespace: "a",
                    path: newPath.href,
                }
            })

            // Handle main file 
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                // console.log('onResole', args);
                return {
                    namespace: "a",
                    path: `https://unpkg.com/${args.path}`
                }
            });
        },
    };
};


// working copy

// import * as esbuild from 'esbuild-wasm';
// import axios from "axios";
// import localforage from 'localforage';


// const fileCache = localforage.createInstance({
//     name: 'fileCache',
// })

// export const unpkgPathPlugin = (inputCode: string) => {
//     return {
//         name: 'unpkg-path-plugin',
//         setup(build: esbuild.PluginBuild) {

//             // Handle root file "index.js"
//             build.onResolve({ filter: /(^index\.js$)/ }, () => {
//                 return { path: "index.js", namespace: 'a' };
//             });

//             //Handle nested file
//             build.onResolve({ filter: /^\.+\// }, (args: any) => {
//                 let newPath
//                 newPath = new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
//                 console.log("--->>new path", newPath.href);
//                 return {
//                     namespace: "a",
//                     path: newPath.href,
//                 }
//             })

//             // Handle main file
//             build.onResolve({ filter: /.*/ }, async (args: any) => {
//                 console.log('onResole', args);
//                 return {
//                     namespace: "a",
//                     path: `https://unpkg.com/${args.path}`
//                 }
//             });

//             build.onLoad({ filter: /.*/ }, async (args: any) => {
//                 console.log('onLoad', args);

//                 if (args.path === 'index.js') {
//                     return {
//                         loader: 'jsx',
//                         contents: inputCode,
//                     };
//                 }
//                 else {
//                     // check to see if we already fetched this file and if it is in the cache
//                     const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

//                     // return cache value, if it is not present make axios request
//                     if (cacheResult) {
//                         return cacheResult
//                     }

//                     // make the axios request and store the value in the cache
//                     let content = await axios.get(args.path)
//                     let dataObj: esbuild.OnLoadResult = {
//                         loader: 'jsx',
//                         contents: content.data,
//                         resolveDir: new URL("./", content.request.responseURL).pathname
//                     }
//                     await fileCache.setItem(args.path, dataObj)
//                     console.log("===>>cd", content);
//                     console.log("===>>new url", new URL("./", content.request.responseURL));

//                     return dataObj;
//                 }
//             });
//         },
//     };
// };