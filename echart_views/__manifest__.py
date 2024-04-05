# -*- coding: utf-8 -*-
{
    "name": "Custom View",
    "summary": "Custom View",
    "author": "shaojun",
    "website": "https://odooiot.com",
    "category": "Tools",
    "version": "17.0.0.1",
    "depends": ["base", "web"],
    "data": [
        "views/views.xml",
        "security/ir.model.access.csv"
    ],
    'assets': {
        'web.assets_backend': [
            'echart_views/static/src/js/views/eview_arch_parser.js',
            'echart_views/static/src/js/views/eview_controller.js',
            'echart_views/static/src/js/views/eview_model.js',
            'echart_views/static/src/js/views/eview_renderer.js',
            'echart_views/static/src/js/views/eview_view.js',
            'echart_views/static/src/js/views/eview_controller.xml',
            'echart_views/static/src/js/views/eview_renderer.xml',
            'echart_views/static/libs/echarts/echarts.min.js',

        ],
    },
    'bootstrap': True,
}
