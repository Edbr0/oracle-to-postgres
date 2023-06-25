<script lang="ts">
import { defineComponent, ref } from 'vue'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart
]);

export default defineComponent({
    components: { VChart },
    provide: {
        ['THEME_KEY']: 'light',
    },
    setup() {

        const lineOptions = ref({
            title: {
                text: 'Dados Mensais',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['hoje', 'ontem'],
                left: 'right',
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    color: '#DFE0EB',
                    name: 'hoje',
                    type: 'line',
                    smooth: true,
                    stack: 'Total',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0.25,
                                    color: '#DFE0EB'
                                },
                                {
                                    offset: 1,
                                    color: '#fff'
                                }
                            ]
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311]
                },
                {
                    color: '#FEDF61',
                    name: 'ontem',
                    type: 'line',
                    smooth: true,
                    stack: 'Total',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0.25,
                                    color: '#FEDF61'
                                },
                                {
                                    offset: 1,
                                    color: '#fff'
                                }
                            ]
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678]
                }
            ]
        })

        return {
            lineOptions
        }
    },
})
</script>

<template>
    <div flex-1 overflow-hidden h-full>
        <v-chart :option="lineOptions" class="w-full h-full" />
    </div>
</template>

<style scoped>
.echarts {
  width: 80%;
  height: 100%;
}
</style>