/** @odoo-module **/

import { patch } from '@web/core/utils/patch';
import { DropdownItem } from "@web/core/dropdown/dropdown_item";


export class SimpleThemeDropdownItem extends DropdownItem {

}

SimpleThemeDropdownItem.template =  "simple_theme.SimpleThemeDropdownItem"
SimpleThemeDropdownItem.props =  {
    ...DropdownItem.props,
    webIconData: {
        type: String,
        optional: true,
    },
}