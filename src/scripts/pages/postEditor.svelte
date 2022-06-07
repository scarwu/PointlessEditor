<div class="pe-middle">
    <div class="pe-container">
        <div class="pe-panel">
            <div class="pe-left">
                <Link class="pe-button" to={`/editor/${target}`}>
                    <i class="fa-solid fa-angle-left"></i>
                </Link>
            </div>
            <div class="pe-right">
                <div class="pe-button">
                    <i class="fa-solid fa-floppy-disk"></i>
                </div>
            </div>
        </div>
        <div class="pe-content">
            <div class="pe-post-raw">
                <pre class="pe-reset">{postItem.raw}</pre>
                <textarea class="pe-reset" bind:value={postItem.raw}></textarea>
            </div>
        </div>
    </div>
</div>
<div class="pe-right">
    <div class="pe-post-params">
        {#each Object.keys(postItem.params) as key}
            <div class="pe-param">
                <div class="pe-key">{key}</div>
                <div class="pe-value">
                    <input class="pe-input" type="text" bind:value={postItem.params[key]} />
                </div>
            </div>
        {/each}
    </div>
</div>

<script>
import { Link } from 'svelte-routing'
import ApiClient from '../api'

// Props
export let target
export let url

$: postItem = null

ApiClient.getPostItem(url, {
    type: target
}).then((payload) => {
    postItem = payload
})
</script>

<style lang="sass">

// Load Styles
@import "../../styles/mixin"
@import "../../styles/common"

.pe-post-raw
    position: relative

    .pe-reset
        white-space: pre-wrap
        line-height: 2.8rem
        letter-spacing: 0.2rem
        font-family: "Roboto", "Noto Sans TC", Arial, sans-serif
        +font-size(1.6)
        color: #333

    pre
        color: transparent !important

    textarea
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        padding: 0
        background: transparent
        border: none
        overflow: hidden
        resize: none

.pe-post-params
    .pe-param
        margin-bottom: 1rem

        .pe-key
            height: 3rem
            line-height: 3rem
            +font-size(1.6)
            font-weight: 300

        .pe-value
            height: 3rem
            line-height: 3rem

            .pe-input
                width: 100%
</style>
