'use strict'
/**
 * Application Bootstrap
 *
 * @package     PointlessEditor
 * @author      Scar Wu
 * @copyright   Copyright (c) Scar Wu (http://scar.tw)
 * @link        https://github.com/scarwu/PointlessEditor
 */

import App from './app.svelte'

// Create Mount Point
let div = document.createElement('div')

div.id = 'pe-root'

document.body.appendChild(div)

const app = new App({
    target: document.getElementById('pe-root')
})

export default app
