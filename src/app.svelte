<script>
import ApiClient from './api'

$: isShowModel = false
$: targetMenu = ''
$: postList = []

function toggleModel () {
    isShowModel = !isShowModel
}

function selectMenu (target) {
    targetMenu = target

    switch (target) {
    case 'article':
    case 'describe':
        postList = []

        ApiClient.getPostList({
            type: target
        }).then((payload) => {
            postList = payload[target]
        })

        break;
    }
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
    display: flex

    position: fixed
    top: 0
    left: 0
    z-index: 9000
    overflow: hidden
    width: 5rem
    height: 5rem
    background-color: #fff

    &.is-show-model
        right: 0
        bottom: 0
        width: inherit
        height: inherit

    .pe-left
        display: flex
        flex-direction: column

        width: 25rem

        .pe-head
            .pe-icon
                display: inline-block
                width: 5rem
                height: 5rem
                text-align: center
                line-height: 5rem
                vertical-align: top
                cursor: pointer

            .pe-title
                display: inline-block
                height: 5rem
                line-height: 5rem
                font-size: 1.6rem
                vertical-align: top

        .pe-menu
            background-color: #ddd

            .pe-option
                padding: 0 1rem
                height: 4rem
                line-height: 4rem
                cursor: pointer

    .pe-right
        flex: 1

        .pe-content
            background-color: #eee
</style>

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
        <div class="pe-content">
            {#if 'article' === targetMenu}
                {#each postList as postItem}
                <div>{postItem.title}</div>
                {/each}
            {/if}
            {#if 'describe' === targetMenu}
                {#each postList as postItem}
                <div>{postItem.title}</div>
                {/each}
            <div>Theme</div>
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
