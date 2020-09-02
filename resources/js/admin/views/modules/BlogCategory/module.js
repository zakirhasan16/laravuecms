const module = {
    title: 'Blog Kategorileri',
    key: 'Kategori',
    route_key: 'blog-category',

    form_fields: [
        {
            row: true,
            items: [
                {col:6, name:'title', label: 'Başlık'},
                {col:6, name:'url', label: 'SEO URL'}
            ]
        },
    ]
}

export default module
