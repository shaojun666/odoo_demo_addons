/** @odoo-module */

import {registry} from "@web/core/registry";
import {EviewController} from "./eview_controller";
import {EviewArchParser} from "./eview_arch_parser";
import {EviewModel} from "./eview_model"
import {EviewRenderer} from "./eview_renderer";

export const eviewView = {
    type: "eview",
    display_name: "Eview",
    icon: "fa fa-picture-o", // the icon that will be displayed in the Layout panel
    multiRecord: true,
    Controller: EviewController,
    ArchParser: EviewArchParser,
    Model: EviewModel,
    Renderer: EviewRenderer,
    buttonTemplate: "echart_views.buttons",
    searchMenuTypes: ["filter", "favorite"],

    props: (genericProps, view) => {
        const {ArchParser} = view;
        const {arch, relatedModels, resModel} = genericProps;
        const archInfo = new ArchParser().parse(arch, relatedModels, resModel);

        return {
            ...genericProps,
            Model: view.Model,
            Renderer: view.Renderer,
            buttonTemplate: view.buttonTemplate,
            archInfo,
        };
    },


};
registry.category("views").add("eview", eviewView);