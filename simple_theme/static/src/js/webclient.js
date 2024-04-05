/** @odoo-module */

import { patch } from '@web/core/utils/patch';
import { WebClient } from "@web/webclient/webclient";
import { SimpleThemeActionContainer } from './action_container'

patch(WebClient, {
    template: "simple_theme.WebClient",
    components: {
        ...WebClient.components,
        SimpleThemeActionContainer
    },
});
