/** @odoo-module */

import {Component, useRef, useEffect} from "@odoo/owl";

export class EviewRenderer extends Component {

    setup() {
        super.setup(...arguments);
        this.echart_option = {
            title: {
                text: '',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: 10,
                data: [],
            },
            series: [
                {
                    name: "",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: "30",
                                fontWeight: "bold",
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [],
                },
            ],
        };
        this.chart_bar = useRef("chart-bar");

        useEffect(
            () => {
                var title = this.props.model.current_measure && this.props.model.measure_vals[this.props.model.current_measure] || ''
                this.echart_option.title.text = title
                this.echart_option.series[0].name = title
                this.echart_option.legend.data = this.props.model.seriesLegend
                this.echart_option.series[0].data = this.props.model.seriesData
                var myChart = echarts.init(this.chart_bar.el);
                myChart.setOption(this.echart_option, true);
            },
            () => [this.props.model.seriesData || this.props.seriesLegend],
        )


    }


}

EviewRenderer.template = "echart_views.Renderer";