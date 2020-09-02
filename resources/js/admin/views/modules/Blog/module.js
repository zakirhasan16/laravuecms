import Category from "./components/Category";

const module = {
    title: 'Blog',
    key: 'Blog',
    route_key: 'blog',

    form_fields: [
        {
            name: 'category_id',
            component: Category,
            label: 'Kategori',
        },
        {
            row: true,
            items: [
                {col:6, name:'title', label: 'Başlık'},
                {col:6, name:'url', label: 'SEO URL'}
            ]
        },
        {
            name: 'content',
            component: 'ejs-richtexteditor',
            label: 'Detay'
        },
        {
            name: 'image',
            type: 'file',
            label: 'Görsel'
        }
    ],
}

export default module
