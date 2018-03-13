<template>
<div :class="s.info">
    <div :class="s.card">
        <div :class="s.compony_name">
            <h3>{{model.fullname || userData.emp_info.company_name}}</h3>
        </div>
        <div :class="s.items">
            <div :class="s.item">
                <span :class="s.left">纳税人识别号</span>
                <span :class="s.right">{{model.tax_no || '--'}}</span>
            </div>
            <div :class="s.item">
                <span :class="s.left">开户银行</span>
                <span :class="s.right">{{model.bank || '--'}}</span>
            </div>
            <div :class="s.item">
                <span :class="s.left">银行账号</span>
                <span :class="s.right">{{model.account || '--'}}</span>
            </div>
            <div :class="s.item">
                <span :class="s.left">电话号码</span>
                <span :class="s.right">{{model.telephone || '--'}}</span>
            </div>
            <div :class="s.item">
                <span :class="s.left">公司地址</span>
                <span :class="s.right">{{model.address || '--'}}</span>
            </div>
        </div>
        <hr :class="s.line">
        <div :class="s.qrcode" v-if="model.fullname">
            <img :src="'data:image/gif;base64,' + model.qrcode">
            <p>开发票时出示</p>
        </div>
        <no-data v-if="modelResolved && !model.fullname" title="" top="1rem">
        <div style="color: #80848f">
            <p>HR完善企业信息后即可显示开票二维码</p>
            <p>商家扫一扫，轻松开发票</p>
        </div>
        </no-data>
    </div>
</div>
</template>
<script>
import { mapState } from "vuex"
import noData from "components/no-data.vue"
export default {
    components: { noData },
    data() {
        return {
            model: {},
            modelResolved: false
        }
    },
    computed: {
      ...mapState("user", ["userData"])
    },
    async created() {
        Vue.$Store.dispatch("user/getUserProfile");
        this.model = await Vue.$Api.getComponyFapiao();
        this.modelResolved = true
    }
}
</script>
<style module="s">
body {
    background: $color-background;
}
.info {
    padding: 10px 15px 0;
    .card {
        padding: 0 25px 30px 25px;
        background: #fff;
        border-top: 3px solid $color-primary;
    }
}
.compony_name {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    background: url(./images/mark.png) center no-repeat;
    background-size: 2.12rem 1.22rem;
    h3 {
        font-weight: normal;
        font-size: 19px;
    }
}
.items {
    .item {
        display: flex;
        justify-content: space-between;
        min-height: 40px;
    }
    .left {
        width: 2rem;
        flex-shrink: 0;
        color: $color-sub;
    }
    .right {
        text-align: right;
        word-break: break-all;
    }
}
.line {
    border-top: 1px dashed #ccc;
    border-bottom: 0;
    margin-top: 20px;
    margin-bottom: 20px;
}
.qrcode {
    text-align: center;
    color: $color-sub;
    img {
        width: 3.6rem;
    }
}
</style>
