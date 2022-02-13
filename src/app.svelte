<script>
    import ApiClient from './api'

    let isShowModel = false
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
            display: none
            border: 1px solid #333
            border-radius: 5px
            background-color: #fff

            &.isShow
                display: block

            .bh-header

            .bh-body
                .bh-menu
                    // pass
                .bh-content
                    // pass
</style>

<div id="pe-editor">
    <div class="pe-label" on:click={()=> isShowModel = !isShowModel}>
        <i class="fas fa-user-cog"></i>
    </div>
    <div class="pe-model" class:isShow={isShowModel}>
        <div class="row">
            <div class="pe-header col-12">

            </div>
            <div class="pe-body col-12">
                <div class="pe-menu col-3">
                    <div>Post</div>
                    <div>Theme</div>
                    <div>Config</div>
                </div>
                <div class="pe-content col-9">

                </div>
            </div>
        </div>
    </div>
</div>
