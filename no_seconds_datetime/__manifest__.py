# -*- coding: utf-8 -*-
{
    "name": "No Seconds Datetime",
    "summary": "No Seconds Datetime",
    "author": "shaojun",
    "website": "https://odooiot.com",
    "category": "Tools",
    'description': """
        Usage:
            <field name="my_datetime_field" widget="no_seconds_datetime" />
    """,
    "version": "17.0.0.1",
    "depends": ["base", "web"],
    'assets': {
        'web.assets_backend': [
            'no_seconds_datetime/static/src/js/no_seconds_datetime.js',

        ],
    },
    'bootstrap': True,
}
