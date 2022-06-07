<div id="pe-editor">
    <div class="pe-left">
        <div class="pe-head">
            <div class="pe-logo">
                <i class="fas fa-user-cog"></i>
            </div>
            <div class="pe-title">
                Pointless Editor
            </div>
        </div>
        <div class="pe-menu">
            <div class="pe-option" class:is-active={'dashboard' === activedMenu} on:click={() => selectMenu('dashboard')}>
                <span class="pe-icon">
                    <i class="fa-solid fa-gauge"></i>
                </span>
                <span class="pe-text">Dashboard</span>
            </div>
            <div class="pe-option" class:is-active={'article' === activedMenu} on:click={() => selectMenu('article')}>
                <span class="pe-icon">
                    <i class="fa-solid fa-file-pen"></i>
                </span>
                <span class="pe-text">Article</span>
            </div>
            <div class="pe-option" class:is-active={'describe' === activedMenu} on:click={() => selectMenu('describe')}>
                <span class="pe-icon">
                    <i class="fa-solid fa-book-open"></i>
                </span>
                <span class="pe-text">Describe</span>
            </div>
            <!-- <div class="pe-option" class:is-active={'theme' === activedMenu} on:click={() => selectMenu('theme')}>
                <span class="pe-icon">
                    <i class="fa-solid fa-table-columns"></i>
                </span>
                <span class="pe-text">Theme</span>
            </div>
            <div class="pe-option" class:is-active={'config' === activedMenu} on:click={() => selectMenu('config')}>
                <span class="pe-icon">
                    <i class="fa-solid fa-gear"></i>
                </span>
                <span class="pe-text">Config</span>
            </div> -->
        </div>
    </div>

    <div class="pe-middle">
        <div class="pe-container">
            {#if 'article' === activedMenu || 'describe' === activedMenu}
                {#if isEmpty(postItem)}
                    <div class="pe-panel">
                        <div class="pe-left"></div>
                        <div class="pe-right">
                            <div class="pe-button">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pe-content">
                        <div class="pe-post-list">
                            {#each postList as postItem}
                            <div class="pe-option" on:click={() => selectPost(postItem)}>
                                {#if false === postItem.params.isPublic}
                                    <div class="pe-text">🔒{postItem.title}</div>
                                {:else}
                                    <div class="pe-text">{postItem.title}</div>
                                {/if}

                                {#if 'article' === activedMenu}
                                    <div class="pe-info">
                                        <span>{postItem.params.date}</span>
                                        <span>．</span>
                                        <span>{postItem.params.url}</span>
                                    </div>
                                {:else if 'describe' === activedMenu}
                                    <div class="pe-info">
                                        <span>{postItem.params.url}</span>
                                    </div>
                                {/if}
                            </div>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="pe-panel">
                        <div class="pe-left">
                            <div class="pe-button">
                                <i class="fa-solid fa-angle-left"></i>
                            </div>
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
                {/if}
            {/if}

            <!-- {#if 'theme' === activedMenu}
            <div>Theme</div>
            {/if}

            {#if 'config' === activedMenu}
            <div>Config</div>
            {/if} -->
        </div>
    </div>

    {#if isNotEmpty(postItem)}
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
    {/if}
</div>

<script>
import ApiClient from './api'

$: activedMenu = 'dashboard'
$: postList = []
$: postItem = null

function isEmpty (variable) {
    return (undefined === variable || null === variable)
}

function isNotEmpty (variable) {
    return (undefined !== variable && null !== variable)
}

function selectMenu (target) {
    activedMenu = target
    postList = []
    postItem = null

    switch (target) {
    case 'article':
    case 'describe':
        ApiClient.getPostList({
            type: target
        }).then((payload) => {
            postList = payload[target]

            if ('article' === target) {
                postList.reverse()
            }
        })

        break;
    }
}

function selectPost (targetPostItem) {
    postItem = targetPostItem
}
</script>

<style lang="sass">

// Load Styles
@import "../styles/global"
@import "../styles/mixin"

#pe-editor
    height: 100vh
    overflow: hidden
    background-color: #fff

    > .pe-left
        display: flex
        flex-direction: column
        width: 30rem
        border-right: 1px solid #efefef
        letter-spacing: 1px

        .pe-head
            padding: 3rem
            +font-size(1.8)
            font-weight: 400

            .pe-logo
                display: inline-block
                width: 4rem
                height: 4rem
                text-align: center
                line-height: 4rem
                vertical-align: top
                // cursor: pointer

            .pe-title
                display: inline-block
                height: 4rem
                line-height: 4rem
                vertical-align: top

        .pe-menu
            padding: 2rem 0

            .pe-option
                padding: 1rem 3rem
                +font-size(1.6)
                font-weight: 300
                color: #333
                cursor: pointer

                &:hover
                    background-color: #efefef

                &.is-active
                    font-weight: 400

                .pe-icon
                    display: inline-block
                    width: 4rem
                    height: 2.5rem
                    line-height: 2.5rem
                    text-align: center
                    vertical-align: top

                .pe-text
                    height: 2.5rem
                    line-height: 2.5rem

    > .pe-middle
        flex: 1

        .pe-container
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

    > .pe-right
        padding: 3rem
        width: 30rem
        border-left: 1px solid #efefef

    // ui
    .pe-input
        display: inline-block
        padding: 0 1rem
        height: 3rem
        line-height: 3rem
        border: 1px solid #ccc
        +border-radius(3px)
        +font-size(1.4)
        font-weight: 300

    .pe-button
        display: inline-block
        width: 3rem
        height: 3rem
        text-align: center
        line-height: 3rem
        +border-radius(3px)
        background-color: #ddd
        color: #333
        cursor: pointer

        &:hover
            background-color: #ccc

    // article, describe
    .pe-post-list
        .pe-option
            overflow: hidden
            padding: 2rem
            // height: 4rem
            // line-height: 4rem
            +font-size(1.6)
            color: #333
            cursor: pointer

            &:hover
                background-color: #efefef

            .pe-text
                font-weight: 400
                +font-size(1.6)

            .pe-info
                font-weight: 300
                +font-size(1.2)
                color: #ccc

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
