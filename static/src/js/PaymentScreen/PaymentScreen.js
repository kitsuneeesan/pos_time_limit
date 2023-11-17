odoo.define('pos_time_limit.PaymentScreen', function(require) {

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const field_utils = require('web.field_utils');

    const PosLimitPaymentScreen = PaymentScreen => class extends PaymentScreen {
        async _isOrderValid(isForceValidate) {
            if (isForceValidate){
                return true;
            }
            var today = new Date();
            var current_time = today.getHours()+":"+today.getMinutes();
            var hour_from = field_utils.format.float_time(this.env.pos.config.hour_from);
            var hour_to = field_utils.format.float_time(this.env.pos.config.hour_to);

            if(current_time >= hour_from && current_time <= hour_to){
                return await super._isOrderValid(isForceValidate);
            } else {
                this.showPopup('ErrorPopup', {
                    title: this.env._t('Invalid Time'),
                    body: this.env._t(
                        'You can only order from '+hour_from+' to '+hour_to+ ' Please try again in selected time.'
                    ),
                });
                return false;
            }
        }
    };

    Registries.Component.extend(PaymentScreen, PosLimitPaymentScreen);

    return PaymentScreen;
});
