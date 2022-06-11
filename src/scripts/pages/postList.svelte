<div class="pe-middle">
    <div class="pe-container">
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
                    <Link class="pe-option" to={`/editor/${type}/${postItem.params.url}`}>
                        {#if false === postItem.params.isPublic}
                            <div class="pe-text">🔒{postItem.title}</div>
                        {:else}
                            <div class="pe-text">{postItem.title}</div>
                        {/if}

                        {#if 'article' === type}
                            <div class="pe-info">
                                <span>{postItem.params.date}</span>
                                <span>．</span>
                                <span>{postItem.params.url}</span>
                            </div>
                        {:else if 'describe' === type}
                            <div class="pe-info">
                                <span>{postItem.params.url}</span>
                            </div>
                        {/if}
                    </Link>
                {/each}
            </div>
        </div>
    </div>
</div>

<script>
import { Link } from 'svelte-routing'
import ApiClient from '../api'

// Props
export let type

$: postList = []

ApiClient.getPostList({
    type: type
}).then((res) => {
    postList = res.payload

    if ('article' === type) {
        postList.reverse()
    }
})
</script>

<style lang="sass">

// Load Styles
@import "../../styles/mixin"
@import "../../styles/common"

.pe-post-list
    .pe-option
        display: block
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

</style>
