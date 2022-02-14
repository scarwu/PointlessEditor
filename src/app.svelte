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
@import "../node_modules/bootstrap/scss/bootstrap"
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome"
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid"
@import "../node_modules/@fortawesome/fontawesome-free/scss/regular"
@import "../node_modules/@fortawesome/fontawesome-free/scss/brands"

#pe-editor
    .pe-label
        position: fixed
        top: 0
        left: 0
        display: block
        width: 50px
        height: 50px
        text-align: center
        line-height: 50px
        cursor: pointer

    .pe-model
        position: fixed
        top: 10%
        left: 10%
        right: 10%
        bottom: 10%
        border: 1px solid #333
        border-radius: 5px
        background-color: #fff

        .pe-header

        .pe-body
            .pe-menu
                background-color: #ddd

                .pe-option
                    padding: 0 10px
                    height: 40px
                    line-height: 40px
                    cursor: pointer

            .pe-content
                background-color: #eee
</style>

<div id="pe-editor">
    <div class="pe-label" on:click={() => toggleModel()}>
        <i class="fas fa-user-cog"></i>
    </div>

    {#if isShowModel}
    <div class="pe-model">
        <div class="row">
            <div class="pe-header col-12">

            </div>
            <div class="pe-body col-12 row">
                <div class="pe-menu col-3">
                    <div class="pe-option" on:click={() => selectMenu('article')}>Article</div>
                    <div class="pe-option" on:click={() => selectMenu('describe')}>Describe</div>
                    <div class="pe-option" on:click={() => selectMenu('theme')}>Theme</div>
                    <div class="pe-option" on:click={() => selectMenu('config')}>Config</div>
                </div>
                <div class="pe-content col-9">
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
    </div>
    {/if}
</div>
