/** @odoo-module **/

import {onWillRender, useState} from "@odoo/owl";
import {formatDateTime, formatDate, areDatesEqual} from "@web/core/l10n/dates";
import {useDateTimePicker} from "@web/core/datetime/datetime_hook";
import {DateTimeField, dateTimeField} from "@web/views/fields/datetime/datetime_field";
import {registry} from "@web/core/registry";
import {localization} from "@web/core/l10n/localization";
import {_t} from "@web/core/l10n/translation";


class MyDateTimeField extends DateTimeField {

    setup() {
        this.format = localization.dateTimeFormat.replace(":ss", "").replace("ss秒", "")

        if (this.props.record.data[this.props.name]) {
            const value = this.props.record.data[this.props.name];
            const d = new Date(value.ts);
            d.setSeconds(0);
            value.ts = d.getTime();
            value.c.second = 0;
            this.props.record.update({ [this.props.name]: value });
        }

        const getPickerProps = () => {

            const value = this.getRecordValue();
            /** @type {DateTimePickerProps} */
            const pickerProps = {
                value,
                type: this.field.type,
                range: this.isRange(value),
            };
            if (this.props.maxDate) {
                pickerProps.maxDate = this.parseLimitDate(this.props.maxDate);
            }
            if (this.props.minDate) {
                pickerProps.minDate = this.parseLimitDate(this.props.minDate);
            }
            if (!isNaN(this.props.rounding)) {
                pickerProps.rounding = this.props.rounding;
            }
            return pickerProps;
        };

        const dateTimePicker = useDateTimePicker({
            target: "root",
            get pickerProps() {
                return getPickerProps();
            },
            onChange: () => {
                this.state.range = this.isRange(this.state.value);
            },
            onApply: () => {
                const toUpdate = {};
                if (Array.isArray(this.state.value)) {
                    // Value is already a range
                    [toUpdate[this.startDateField], toUpdate[this.endDateField]] = this.state.value;
                } else {
                    toUpdate[this.props.name] = this.state.value;
                }
                // Remove values that did not change
                for (const fieldName in toUpdate) {
                    if (areDatesEqual(toUpdate[fieldName], this.props.record.data[fieldName])) {
                        delete toUpdate[fieldName];
                    }
                }
                if (Object.keys(toUpdate).length) {
                    this.props.record.update(toUpdate);
                }
            },
            format: this.format
        });
        // Subscribes to changes made on the picker state
        this.state = useState(dateTimePicker.state);
        this.openPicker = dateTimePicker.open;

        onWillRender(() => this.triggerIsDirty());
    }


    getFormattedValue(valueIndex) {
        const value = this.values[valueIndex];

        return value
            ? this.field.type === "date"
                ? formatDate(value)
                : formatDateTime(value, {format: this.format})
            : "";
    }

}

export const myDateTimeField = {
    ...dateTimeField,
    component: MyDateTimeField
};


registry.category("fields").add("no_seconds_datetime", myDateTimeField);