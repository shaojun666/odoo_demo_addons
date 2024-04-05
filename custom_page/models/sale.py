# -*- coding: utf-8 -*-


from odoo import api, fields, models
import random


class SaleOrder(models.Model):
    _inherit = "sale.order"

    def get_dashboard_data(self, date_start, date_end):
        print(date_start, date_end)
        x_data = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        y_data = list(range(10000))
        random.shuffle(x_data)
        return {
            'x_data': x_data,
            'y_data': random.choices(y_data, k=len(x_data)),
        }
