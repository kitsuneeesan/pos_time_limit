from odoo import api, fields, models

class PosConfigInherit(models.Model):
    _inherit = 'pos.config'

    hour_from = fields.Float('Start Time', default=9.0)
    hour_to = fields.Float('End Time', default=21.0)

    @api.onchange('hour_from', 'hour_to')
    def _onchange_hours(self):
        # avoid negative or after midnight
        self.hour_from = min(self.hour_from, 23.99)
        self.hour_from = max(self.hour_from, 0.0)
        self.hour_to = min(self.hour_to, 23.99)
        self.hour_to = max(self.hour_to, 0.0)

        # avoid wrong order
        self.hour_to = max(self.hour_to, self.hour_from)