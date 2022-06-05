<div id="pe-editor" class:is-show-model={!isShowModel}>
    <div class="pe-left">
        <div class="pe-head">
            <div class="pe-icon" on:click={() => toggleModel()}>
                <i class="fas fa-user-cog"></i>
            </div>
            <div class="pe-title">
                Pointless Editor
            </div>
        </div>
        <div class="pe-menu">
            <div class="pe-option" on:click={() => selectMenu('article')}>Article</div>
            <div class="pe-option" on:click={() => selectMenu('describe')}>Describe</div>
            <div class="pe-option" on:click={() => selectMenu('theme')}>Theme</div>
            <div class="pe-option" on:click={() => selectMenu('config')}>Config</div>
        </div>
    </div>
    <div class="pe-right">
        <div class="pe-container">
            {#if 'article' === targetMenu || 'describe' === targetMenu}
            <div class="pe-list">
                {#each postList as postItem}
                <div class="pe-option" on:click={() => selectPost(postItem)}>
                    {postItem.title}
                </div>
                {/each}
            </div>
            <div class="pe-content">
                {#if null !== postItem}
                <div class="pe-post-params">
                    {#each Object.keys(postItem.params) as key}
                    <div class="pe-param">
                        <div class="pe-key">{key}</div>
                        <div class="pe-value">
                            <input type="text" value={postItem.params[key]} on:change={(event) => updatePostParam(key, event.target.value)} />
                        </div>
                    </div>
                    {/each}
                </div>
                <div class="pe-post-raw">
                    <pre>
                        <code calss="pe-reset">{postItem.raw}</code>
                    </pre>
                    <textarea calss="pe-reset" on:change={(event) => updatePostRaw(event.target.value)}>
                        {postItem.raw}
                    </textarea>
                </div>
                {/if}
            </div>
            {/if}

            {#if 'theme' === targetMenu}
            <div>Theme</div>
            {/if}

            {#if 'config' === targetMenu}
            <div>Config</div>
            {/if}
        </div>
    </div>
</div>

<script>
import ApiClient from './api'

$: isShowModel = false
$: targetMenu = ''
$: postList = []
$: postItem = null

function toggleModel () {
    isShowModel = !isShowModel
}

function selectMenu (target) {
    targetMenu = target

    switch (target) {
    case 'article':
    case 'describe':
        postList = []
        postItem = null

        ApiClient.getPostList({
            type: target
        }).then((payload) => {
            postList = payload[target]
        })

        break;
    }
}

function selectPost (targetPostItem) {
    postItem = targetPostItem
}

function updatePostParam (key, value) {
    postItem.params[key] = value
}

function updatePostRaw (raw) {
    postItem.raw = raw
}
</script>

<style lang="sass">
// Reset Bootstrap
$grid-gutter-width: 0
$fa-font-path: "../../fonts/vendor"

// Import 3rd-Party Libraries
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome"
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid"
@import "../node_modules/@fortawesome/fontawesome-free/scss/regular"
@import "../node_modules/@fortawesome/fontawesome-free/scss/brands"

#pe-editor
    position: fixed
    top: 0
    left: 0
    z-index: 9000
    display: flex
    overflow: hidden
    width: 4rem
    height: 4rem
    background-color: #fff

    &.is-show-model
        right: 0
        bottom: 0
        width: inherit
        height: inherit

    .pe-left
        display: flex
        flex-direction: column
        width: 20rem

        .pe-head
            .pe-icon
                display: inline-block
                width: 4rem
                height: 4rem
                text-align: center
                line-height: 4rem
                vertical-align: top
                cursor: pointer

            .pe-title
                display: inline-block
                height: 4rem
                line-height: 4rem
                font-size: 1.6rem
                vertical-align: top

        .pe-menu
            background-color: #ddd

            .pe-option
                padding: 0 1rem
                height: 4rem
                line-height: 4rem
                font-size: 1.6rem
                cursor: pointer

    .pe-right
        flex: 1

        .pe-container
            display: flex
            background-color: #eee

        .pe-list
            width: 20rem
            height: 100vh
            overflow-y: auto

            .pe-option
                overflow: hidden
                padding: 0 1rem
                height: 4rem
                line-height: 4rem
                font-size: 1.6rem
                cursor: pointer

        .pe-content
            flex: 1
            height: 100vh
            overflow-y: auto

            .pe-post-params
                .pe-param
                    display: flex

                    .pe-key
                        width: 10rem
                        height: 4rem
                        line-height: 4rem

                    .pe-value
                        flex: 1
                        height: 4rem
                        line-height: 4rem

            .pe-post-raw
                position: relative

                .pe-reset
                    font-size: 1.4rem

                pre
                    code
                        // color: transparent

                textarea
                    position: absolute
                    top: 0
                    left: 0
                    right: 0
                    bottom: 0
                    background: transparent
</style>
