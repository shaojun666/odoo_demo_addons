# -*- coding: utf-8 -*-
{
    "name": "Simple Theme",
    "summary": "Simple Theme",
    "author": "shaojun",
    "website": "https://odooiot.com",
    "category": "Tools",
    'description': """
        使用Nice Admin style
    """,
    "version": "17.0.0.1",
    "depends": ["base", "web"],
    'assets': {
        'web.assets_backend': [
            'simple_theme/static/src/js/libs/nice_admin/style.css',
            'simple_theme/static/src/js/navbar.js',
            'simple_theme/static/src/js/navbar.xml',
            'simple_theme/static/src/js/webclient.js',
            'simple_theme/static/src/js/webclient.xml',
            'simple_theme/static/src/js/dropdown_item.js',
            'simple_theme/static/src/js/dropdown_item.xml',
            'simple_theme/static/src/js/dropdown.js',
            'simple_theme/static/src/js/dropdown.xml',
            'simple_theme/static/src/js/action_container.js',

        ],
    },
    'bootstrap': True,
}
