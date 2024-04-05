# -*- coding: utf-8 -*-
from odoo import fields, models

class Game(models.Model):
    _name = 'echart_views.game'
    _description = 'Games'

    name = fields.Char(string='游戏名', required=True)
    downloads = fields.Integer(string='下载量', default=0)
    platform = fields.Char(string='平台')


class ActWindowView(models.Model):
    _inherit = 'ir.actions.act_window.view'

    view_mode = fields.Selection(selection_add=[('eview', 'echart views')], ondelete={'eview': 'cascade'})


class View(models.Model):
    _inherit = 'ir.ui.view'

    type = fields.Selection(selection_add=[('eview', 'echart views')], ondelete={'eview': 'cascade'})