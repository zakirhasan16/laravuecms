<template>
    <div>
        <base-background image="/img/photos/photo3@2x.jpg" inner-class="bg-primary-dark-op">
            <div class="content content-narrow content-full">
                <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
                    <div class="flex-sm-fill">
                        <h1 class="font-w600 text-white mb-0">Dashboard</h1>
                        <h2 class="h4 font-w400 text-white-75 mb-0">Hoş Geldiniz, <strong>{{$auth.user().name}}</strong>.</h2>
                    </div>
                </div>
            </div>
        </base-background>

        <div class="content content-narrow">

        </div>
    </div>
</template>

<script>
export default {

}
</script>
