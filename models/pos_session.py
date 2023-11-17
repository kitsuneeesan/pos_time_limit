from odoo import models

class PosSessionInherit(models.Model):
    _inherit = 'pos.session'
    
    def close_all_active_session(self):
        active_session_ids = self.search([('state', '=', 'opened')])
        for session in active_session_ids:
            draft_orders = session.order_ids.filtered(lambda order: order.state == 'draft')
            if draft_orders:
                continue
            session.action_pos_session_closing_control()