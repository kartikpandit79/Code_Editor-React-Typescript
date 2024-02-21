import esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
    name: 'fileCache',
})


export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: "jsx",
                    contents: inputCode
                }
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {

                // check to see if we already fetched this file and if it is in the cache
                const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

                // // return cache value, if it is not present make axios request
                if (cacheResult) {
                    return cacheResult
                }

            });

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                // make the axios request and store the value in the cache
                let content = await axios.get(args.path)
                const cssData = content.data
                    .replace(/\n/g, "")
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")

                const contents = `const style = document.createElement('style');
                        style.innerText = '${cssData}' 
                        document.head.appendChild(style);`

                let dataObj: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: contents,
                    resolveDir: new URL("./", content.request.responseURL).pathname
                }
                await fileCache.setItem(args.path, dataObj)

                return dataObj;
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {

                // make the axios request and store the value in the cache
                let content = await axios.get(args.path)
                let dataObj: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: content.data,
                    resolveDir: new URL("./", content.request.responseURL).pathname
                }
                await fileCache.setItem(args.path, dataObj)

                return dataObj;

            });
        }

    }
}
