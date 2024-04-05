# -*- coding: utf-8 -*-
{
    "name": "Custom Page",
    "summary": "Custom Page",
    "author": "shaojun",
    "website": "https://odooiot.com",
    "category": "Tools",
    "version": "17.0.0.1",
    "depends": ["base", "web", "sale_management"],
    "data": [
        # "views/assets.xml",
        "views/views.xml",
    ],
    'assets': {
        'web.assets_backend': [
            'custom_page/static/libs/echarts/echarts.min.js',
            'custom_page/static/src/js/chart_page.js',
            'custom_page/static/src/xml/chart_page.xml',
        ],

    },
    'bootstrap': True,
}
