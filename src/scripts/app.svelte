<div id="pe-editor">
    <Router>
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
                <Link class="pe-option" to="/editor">
                    <span class="pe-icon">
                        <i class="fa-solid fa-gauge"></i>
                    </span>
                    <span class="pe-text">Dashboard</span>
                </Link>
                <Link class="pe-option" to="/editor/article">
                    <span class="pe-icon">
                        <i class="fa-solid fa-file-pen"></i>
                    </span>
                    <span class="pe-text">Article</span>
                </Link>
                <Link class="pe-option" to="/editor/describe">
                    <span class="pe-icon">
                        <i class="fa-solid fa-book-open"></i>
                    </span>
                    <span class="pe-text">Describe</span>
                </Link>
                <!-- <Link class="pe-option" to="/editor/theme">
                    <span class="pe-icon">
                        <i class="fa-solid fa-table-columns"></i>
                    </span>
                    <span class="pe-text">Theme</span>
                </Link>
                <Link class="pe-option" to="/editor/config">
                    <span class="pe-icon">
                        <i class="fa-solid fa-gear"></i>
                    </span>
                    <span class="pe-text">Config</span>
                </Link> -->
            </div>
        </div>

        <Route path="/editor/" component={DashboardPage} />
        <Route path="/editor/article">
            <PostListPage type="article" />
        </Route>
        <Route path="/editor/article/:url" let:params>
            <PostEditorPage type="article" url={params.url} />
        </Route>
        <Route path="/editor/describe">
            <PostListPage type="describe" />
        </Route>
        <Route path="/editor/describe/:url" let:params>
            <PostEditorPage type="describe" url={params.url} />
        </Route>
    </Router>
</div>

<script>
import { Router, Route, Link } from 'svelte-routing'

// Load Pages
import DashboardPage    from './pages/dashboard.svelte'
import PostListPage     from './pages/postList.svelte'
import PostEditorPage   from './pages/postEditor.svelte'

function isEmpty (variable) {
    return (undefined === variable || null === variable)
}

function isNotEmpty (variable) {
    return (undefined !== variable && null !== variable)
}

</script>

<style lang="sass">

// Load Styles
@import "../styles/global"
@import "../styles/mixin"
@import "../styles/common"

#pe-editor
    display: flex
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
                display: block
                padding: 1rem 3rem
                +font-size(1.6)
                font-weight: 300
                color: #333

                &:hover
                    background-color: #efefef

                &[aria-current="page"]
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
</style>
