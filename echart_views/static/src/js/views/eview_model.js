/** @odoo-module */

import {KeepLast} from "@web/core/utils/concurrency";

export class EviewModel {
    constructor(orm, resModel, fields, archInfo, domain) {
        this.orm = orm;

        const {displayNameField, current_measure, measures, measure_vals} = archInfo;
        this.resModel = resModel;
        this.fields = fields;
        this.domain = domain;
        this.archInfo = archInfo;
        this.displayNameField = displayNameField;
        this.measure_vals = measure_vals
        this.current_measure = current_measure;
        this.measures = measures;
        this.keepLast = new KeepLast();
    }


    async load() {
        var self = this;
        const seriesLegend = []
        if (this.fields[this.current_measure].type === 'integer') {

            const {records} = await this.keepLast.add(
                this.orm.webSearchRead(this.resModel, this.domain, {
                    specification: {
                        [this.current_measure]: {},
                        [this.displayNameField]: {},

                    },
                })
            );
            const seriesData = records.map(object => {
                return {
                    value: object[self.current_measure],
                    name: object[self.displayNameField],
                }
            });


            seriesData.forEach((d) => seriesLegend.push(d["name"]));

            this.seriesData = seriesData
            this.seriesLegend = seriesLegend

        } else {

            const {records} = await this.keepLast.add(
                this.orm.webSearchRead(this.resModel, this.domain, {
                    specification: {
                        [this.current_measure]: {},

                    },
                })
            );
            var record_obj = {}
            records.forEach((record) => {
                const key = record[this.current_measure];
                if (record_obj[key]) {
                    record_obj[key] = record_obj[key] + 1
                } else {
                    record_obj[key] = 1
                }
            });
            const seriesData = Object.keys(record_obj)
            seriesData.forEach((key) => {
                seriesData.push({value: record_obj[key], name: key})
            })

            this.seriesData = seriesData
            this.seriesLegend = seriesLegend
        }

    }
}