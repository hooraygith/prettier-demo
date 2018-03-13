/**
 * Created by ethan on 2016/9/30.
 */
import config from './config.js'
export default {
    data() {
        return {
            statistics: config.statistics
        };
    },
    methods: {
        removeLegendPercent(data) {
            Object.keys(data).forEach(key => {
                const item = data[key]
                if (item && item.pie && item.pie.legend) {
                    let legend = item.pie.legend
                    if (legend.length) {
                        item.pie.legend = legend.map(value => {
                            if (value.length && value.slice(-1) === '%') {
                                const spaceIndex = value.lastIndexOf(' ')
                                value = value.slice(0, spaceIndex)
                            }
                            return value
                        })
                        item.pie.series = item.pie.series.map(value => {
                            if (value.name.length && value.name.slice(-1) === '%') {
                                const spaceIndex = value.name.lastIndexOf(' ')
                                value.name = value.name.slice(0, spaceIndex)
                            }
                            return value
                        })
                    }
                }
            })
            return data
        },
        init(data, isInit = true) {

            // 饼图的legend的文字太长，放不下，去掉最后的百分比
            data = this.removeLegendPercent(data)

            // 饼状图
            // 工作性质 司龄 工龄 性别 学历 年龄 年代 已婚 已育 生肖 星座
            ;['work_type', 'work_age', 'service_age', 'sex', 'education', 'age', 'birthday', 'marriage', 'birth_children', 'zodiac', 'constellation'].forEach(key => {
                this.statistics[key].legend.data = data[key].pie.legend
                this.statistics[key].series[0].data = data[key].pie.series
            })

            // 柱状图
            // 部门人数top9统计 岗位人数top9统计 籍贯人数top9统计 户口所在地人数top9统计
            ;['dep', 'job', 'account', 'native'].forEach(key => {
                this.statistics[key].xAxis[0].data = data[key].bar.xAxis
                this.statistics[key].series[0].data = data[key].bar.series
            })

            // 折线图
            // 入离职率
            // ;['hire_leave_rate'].forEach(key => {
            //     this.statistics[key].xAxis[0].data = data[key].bar.xAxis
            //     this.statistics[key].series[0].data = data[key].bar.leave_rate
            //     this.statistics[key].series[1].data = data[key].bar.hire_rate
            // })

            /*绘制图表*/
            if(this.$route.name == 'employeeOverviewReport') {
                //报告老板免登录页面不使用setTimeout，子组件将无法接收到广播消息
                setTimeout(()=> {
                    this.$broadcast('onEchartsInit', isInit);
                }, 0);
            } else {
                this.$broadcast('onEchartsInit', isInit);
            }
        },
    }
};
