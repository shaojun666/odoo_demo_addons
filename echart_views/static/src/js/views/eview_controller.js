/** @odoo-module */

import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {Component, onWillStart, useState, useEffect} from "@odoo/owl";

export class EviewController extends Component {
    setup() {
        this.orm = useService("orm");

        // The controller create the model and make it reactive so whenever this.model is
        // accessed and edited then it'll cause a rerendering


        this.model = useState(
            new this.props.Model(
                this.orm,
                this.props.resModel,
                this.props.fields,
                this.props.archInfo,
                this.props.domain
            )
        );

        onWillStart(async () => {
            await this.model.load();
        });

        useEffect(
            () => {
                this.model.domain = this.props.domain
                this.model.load();
            },
            () => [this.props.domain],
        )


    };

    on_btn_click(event) {
        var $target = $(event.target);
        const current_measure = $target.data('field')
        if (this.model.current_measure != current_measure) {
            this.model.current_measure = current_measure
            this.model.load()
        }


    }

}

EviewController.template = "echart_views.View";
EviewController.components = {Layout};