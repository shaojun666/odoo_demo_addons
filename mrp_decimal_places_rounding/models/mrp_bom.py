from odoo import fields, models
import math


def round_up(n, decimals=0):
    multiplier = 10 ** decimals
    return math.ceil(n * multiplier) / multiplier


def round_down(n, decimals=0):
    multiplier = 10 ** decimals
    return math.floor(n * multiplier) / multiplier


class MrpBom(models.Model):
    _inherit = 'mrp.bom'

    def explode(self, product, quantity, picking_type=False):
        boms_done, lines_done = super(MrpBom, self).explode(product=product, quantity=quantity,
                                                            picking_type=picking_type)

        for bom_line, line_data in lines_done:
            decimal_places_rounding = bom_line.decimal_places_rounding
            line_data['qty'] = round_up(line_data['qty'], decimal_places_rounding)
        return boms_done, lines_done


class MrpBomLine(models.Model):
    _inherit = 'mrp.bom.line'

    decimal_places_rounding = fields.Integer(string='decimal places rounding', default=2)
