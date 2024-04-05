/** @odoo-module */

import {Field} from "@web/views/fields/field";
import {visitXML} from "@web/core/utils/xml";


export class EviewArchParser {
    parseFieldNode(node, models, modelName) {
        return Field.parseFieldNode(node, models, modelName, "list");
    }


    parse(xmlDoc, models, modelName) {
        const treeAttr = {};

        var displayNameField
        var current_measure
        const measures = []
        const measure_vals = {}

        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                const fieldInfo = this.parseFieldNode(node, models, modelName);
                if (node.getAttribute('type') && node.getAttribute('type') === 'name') {
                    displayNameField = fieldInfo.name
                } else if (node.getAttribute('type') && node.getAttribute('type') === 'measure') {
                    if (!current_measure) {
                        current_measure = fieldInfo.name
                    }
                    measures.push(fieldInfo.name)
                    measure_vals[fieldInfo.name] = fieldInfo.string
                }

            } else if (["eview", "list"].includes(node.tagName)) {
                const chart = node.getAttribute("chart");
                treeAttr.chart = chart
            }
        });


        return {
            displayNameField,
            current_measure,
            measures,
            measure_vals,
            ...treeAttr,
        };
    }
}
