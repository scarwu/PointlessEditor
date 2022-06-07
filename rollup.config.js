import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from "@rollup/plugin-json"
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import shell from 'rollup-plugin-shell'
import svelte from 'rollup-plugin-svelte'
import { sass } from 'svelte-preprocess-sass'
import css from 'rollup-plugin-css-porter'

const mode = process.env.MODE || 'development'

export default {
    input: 'src/scripts/editor.js',
    output: {
        sourcemap: 'development' === mode,
        format: 'iife',
        name: 'app',
        file: 'development' === mode
            ? 'temp/assets/scripts/editor.min.js'
            : 'dist/assets/scripts/editor.min.js'
    },
    plugins: [
        svelte({
            compilerOptions: {
                dev: 'development' === mode
            },
            preprocess: {
                style: sass({
                    sourceMap: 'development' === mode
                })
            }
        }),
        resolve({
            browser: true
        }),
        commonjs(),
        json(),
        copy({
            targets: [
                {
                    src: 'src/views/*',
                    dest: 'temp/views'
                },
                {
                    src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*.{otf,eot,svg,ttf,woff,woff2}',
                    dest: 'temp/assets/fonts/vendor'
                }
            ],
            hook: 'buildStart'
        }),

        ...('development' === mode ? [
            shell({
                commands: [
                    'rm -rf temp'
                ],
                hook: 'buildStart'
            }),
            css({
                raw: 'temp/assets/styles/editor.min.css',
                minified: false
            }),

            // Livereload
            process.env.ROLLUP_WATCH && livereload('temp')
        ] : [
            shell({
                commands: [
                    'rm -rf dist'
                ],
                hook: 'buildStart'
            }),
            css({
                raw: false,
                minified:'dist/assets/styles/editor.min.css'
            }),

            // Minify JS
            terser()
        ])
    ],
    watch: {
        clearScreen: false
    }
}
