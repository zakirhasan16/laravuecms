<template>
    <base-layout :layout-classes="layoutClasses">
        <template #sidebar>
            <div class="content-header bg-white-5">
                <router-link to="/admin" class="font-w600 text-dual">
                    <i class="fa fa-user text-primary"></i><span class="font-w700 font-size-h5 ml-1 smini-hide">E-KursMerkezi</span>
                </router-link>
                <div>
                    <base-layout-modifier size="sm" variant="dual" action="sidebarClose" class="d-lg-none ml-2">
                        <i class="fa fa-times"></i>
                    </base-layout-modifier>
                </div>
            </div>
            <div class="content-side content-side-full">
                <base-navigation
                    :nodes="sideNavigationItems"
                />
            </div>
        </template>
        <template #header>
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <base-layout-modifier action="sidebarToggle" size="sm" variant="dual" class="mr-2 d-lg-none">
                        <i class="fa fa-fw fa-bars"></i>
                    </base-layout-modifier>


                    <base-layout-modifier action="sidebarMiniToggle" size="sm" variant="dual"
                                          class="mr-2 d-none d-lg-inline-block">
                        <i class="fa fa-fw fa-ellipsis-v"></i>
                    </base-layout-modifier>
                </div>

                <div class="d-flex align-items-center">
                    <b-dropdown size="sm" variant="dual" class="d-inline-block ml-2" menu-class="p-0 border-0 font-size-sm"
                                right no-caret>
                        <template #button-content>
                            <img class="rounded" src="/img/avatars/avatar0.jpg" alt="" style="width: 18px;">
                            <span class="d-none d-sm-inline-block ml-1">{{$auth.user().name}}</span>
                            <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
                        </template>
                        <li>
                            <div class="p-3 text-center bg-primary">
                                <img class="img-avatar img-avatar48 img-avatar-thumb" src="/img/avatars/avatar0.jpg">
                            </div>
                            <div class="p-2">
                                <router-link class="dropdown-item d-flex align-items-center justify-content-between"
                                             :to="{name: 'ChangePassword'}">
                                    <span>Şifre Değiştir</span>
                                </router-link>
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:;" @click="$auth.logout()">
                                    <span>Çıkış Yap</span>
                                    <i class="si si-logout ml-1"></i>
                                </a>
                            </div>
                        </li>
                    </b-dropdown>
                </div>
            </div>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from '../Base'

    export default {
        name: 'LayoutBackend',
        components: {
            BaseLayout
        },
        data() {
            return {
                // Override and set custom CSS classes to the container of each base layout element
                layoutClasses: {
                    sideOverlay: '',
                    sidebar: '',
                    header: '',
                    footer: ''
                },
                sideNavigationItems: [
                    {
                        name: 'Dashboard',
                        to: { name: 'Dashboard' },
                        icon: 'si si-speedometer'
                    },
                    {
                        name: 'Blog Kategorileri',
                        to: { name: 'blog-category-index' },
                        icon: 'fa fa-bars'
                    },
                    {
                        name: 'Blog',
                        to: { name: 'blog-index' },
                        icon: 'fa fa-star'
                    }
                ]
            }
        },
        created() {
            // Set default elements for this layout
            this.$store.commit('setLayout', {
                header: true,
                sidebar: true,
                sideOverlay: true,
                footer: false
            })

            // Set various template options
            this.$store.commit('headerStyle', {mode: 'light'})
            this.$store.commit('mainContent', {mode: 'full'})
        }
    }
</script>
