/** @odoo-module **/

import { Dropdown } from "@web/core/dropdown/dropdown";


export class SimpleThemeDropdown extends Dropdown {

    onTogglerClick() {
        document.body.classList.toggle('toggle-sidebar');
    }

}

SimpleThemeDropdown.template =  "simple_theme.Dropdown"
