/** @odoo-module **/

import { ActionContainer } from '@web/webclient/actions/action_container';
import { xml } from "@odoo/owl";

export class SimpleThemeActionContainer extends ActionContainer {

}

SimpleThemeActionContainer.template = xml`
    <t t-name="web.SimpleThemeActionContainer">
      <div class="o_action_manager main" id="main">
        <t t-if="info.Component" t-component="info.Component" className="'o_action'" t-props="info.componentProps" t-key="info.id"/>
      </div>
    </t>`;
