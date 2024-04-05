/** @odoo-module */

import {patch} from '@web/core/utils/patch';
import {NavBar} from "@web/webclient/navbar/navbar";
import {SimpleThemeDropdownItem} from './dropdown_item'
import {SimpleThemeDropdown} from './dropdown'

patch(NavBar, {
    template: "simple_theme.NavBar",
    components: {
        ...NavBar.components,
        SimpleThemeDropdownItem,
        SimpleThemeDropdown
    },
});

patch(NavBar.prototype, {

    getApps() {
        const apps = this.menuService.getApps();
        const newApps = apps.map(function (item) {
            if (item.webIconData) {
                const prefix = item.webIconData.startsWith('P') ? 'data:image/svg+xml;base64,' : 'data:image/png;base64,';
                const webIconData = item.webIconData.startsWith('data:image') ? item.webIconData : prefix + item.webIconData.replace(/\s/g, '');
                item['webIconData'] = webIconData;
            }else {
                item['webIconData'] = '';
            }

            return item;

        })
        return newApps
    },

    onToggleSidebarBtnClick(event) {

        document.body.classList.toggle('toggle-sidebar')

    },


});


