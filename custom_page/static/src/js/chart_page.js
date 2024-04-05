/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useRef, useEffect, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class CustomCharPage extends Component {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.chart_bar = useRef("chart-bar");

        this.echart_option = useState({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: []
            }]
        });

        useEffect(
            () => {
                var myChart = echarts.init(this.chart_bar.el);
                myChart.setOption(this.echart_option, true);
            },
            () => [this.echart_option.series.data || this.echart_option.xAxis.data],
        )

        onWillStart(async () => {
            this._load_chart_data()
        });



    }

    _load_chart_data() {

        const d = new Date();
        const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

        return this.orm.call(
            'sale.order',
            'get_dashboard_data',
            [[]],
            {
                date_start: firstDay.toISOString().replace("T", " ").substring(0, 19),
                date_end: lastDay.toISOString().replace("T", " ").substring(0, 19),
            }
        ).then((result) => {

            this.echart_option.xAxis.data = result['x_data'];
            this.echart_option.series[0].data = result['y_data'];

        })
    }

    on_btn_click() {
        this._load_chart_data();

    }
}

CustomCharPage.template = "custom_page.chart_page";

// remember the tag name we put in the first step
registry.category("actions").add("custom_page.chart_page", CustomCharPage);
