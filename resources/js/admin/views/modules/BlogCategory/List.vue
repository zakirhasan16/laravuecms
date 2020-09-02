<template>
    <div>
        <base-page-heading :title="module.title">
            <template #extra>
                <b-button variant="success" class="mr-1 mb-3" :to="{name: `${module.route_key}-create`}">
                    <i class="fa fa-fw fa-plus mr-1"></i> Yeni {{ module.key }}
                </b-button>
            </template>
        </base-page-heading>
        <div class="content">
            <base-block ref="itemsBlock">
                <template v-if="items.length">
                    <b-table-simple responsive striped table-class="table-vcenter">
                        <b-thead>
                            <b-tr>
                                <b-th>Başlık</b-th>
                                <b-th class="text-center" style="min-width: 110px; width: 110px;">#</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr v-for="(item, index) in items" :key="item.id">
                                <b-td class="font-size-sm">
                                    {{item.title}}
                                </b-td>
                                <b-td class="text-center">
                                    <b-button v-b-tooltip.hover title="Düzenle" variant="alt-primary" size="sm" :to="{name:`${module.route_key}-edit`, params: {id: item.id}}">
                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                    </b-button>
                                    <b-button v-b-tooltip.hover title="Sil" @click="removeItem(item.id)" size="sm" variant="alt-danger">
                                        <i class="fa fa-fw fa-times"></i>
                                    </b-button>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </template>
                <template v-else>
                    <b-alert variant="info" show>Kayıt Bulunamadı</b-alert>
                </template>
            </base-block>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        module: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        removeItem(id) {
            let item = this.items.find(item => item.id === id);
            if(confirm(`${item.title} Başlıklı Sayfayı Silmek Üzeresiniz. Emin Misiniz ?`)) {
                this.request.delete(`admin/${this.module.route_key}/${id}`)
                    .then(res => {
                        let i = this.items.findIndex(item => item.id === id);
                        this.items.splice(i, 1);
                    })
            }
        }
    },
    mounted() {
        this.$refs.itemsBlock.stateLoading();
        this.request.get(`admin/${this.module.route_key}`)
            .then(res => {
                this.items = res.data.data;
                this.$refs.itemsBlock.stateNormal();
            })
    }
}
</script>

<style scoped>

</style>
