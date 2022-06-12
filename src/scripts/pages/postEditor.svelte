{#if null !== postItem}
<div class="pe-page">
    <div class="pe-container">
        <div class="pe-panel">
            <div class="pe-left">
                <Link to={type}>
                    <div class="pe-button">
                        <i class="fa-solid fa-angle-left"></i>
                    </div>
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
    <div class="pe-aside">
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
</div>
{/if}

<script>
import { Link } from 'svelte-routing'
import ApiClient from '../api'

export let type
export let url

$: postItem = null

ApiClient.getPostItem({
    url: url
}).then((res) => {
    postItem = res.payload
})
</script>

<style lang="sass">

// Load Styles
@import "../../styles/mixin"
@import "../../styles/common"

.pe-page
    display: flex
    flex: 1

    > .pe-container
        flex: 1
        padding: 3rem 6rem
        // display: flex
        // background-color: #efefef

        .pe-panel
            margin-bottom: 3rem
            height: 3rem

            .pe-left,
            .pe-right
                height: 3rem
                line-height: 3rem

            .pe-left
                float: left
                text-align: left

            .pe-right
                float: right
                text-align: right

        .pe-content
            height: calc(100vh - 12rem)
            +scrollable()

    > .pe-aside
        padding: 3rem
        width: 30rem
        border-left: 1px solid #efefef

    .pe-post-raw
        position: relative

        .pe-reset
            padding: 0 1rem
            white-space: pre-wrap
            // min-height: 3rem
            line-height: 3rem
            letter-spacing: 0.2rem
            font-family: "Roboto", "Noto Sans TC", Arial, sans-serif
            +font-size(1.6)
            color: #333

        pre
            // color: transparent !important

        textarea
            position: absolute
            top: 0
            left: 0
            right: 0
            bottom: 0
            background: transparent
            overflow: hidden
            resize: none
            border: 1px solid #ccc
            +border-radius(3px)

    .pe-post-params
        .pe-param
            margin-bottom: 1rem

            .pe-key
                height: 3rem
                line-height: 3rem
                +font-size(1.6)
                font-weight: 300

            .pe-value
                display: flex
                height: 3rem
                line-height: 3rem

                .pe-input
                    flex: 1
</style>
