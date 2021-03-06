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

export default new App({
    target: document.getElementById('pe-root')
})
