<script>
    import ApiClient from './api'
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
        .bh-header

        .bh-body
            .bh-menu
                // pass
            .bh-content
                // pass
</style>

<div id="pe-editor">
    <div class="row">
        <div class="pe-header col-12"></div>
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
