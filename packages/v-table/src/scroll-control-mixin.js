/*
 * 鼠标滚动，滚动条改变
 * */

import utils from '../../src/utils/utils.js'

export default {
    methods: {
        bodyMousewheel(e) {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * (-1);

            if (body1) {
                body1.scrollTop = (body1.scrollTop - scrollHeight);
            }
            if(body2){
                body2.scrollTop = (body2.scrollTop - scrollHeight);
            }
            if(body3){
                body3.scrollTop = (body3.scrollTop - scrollHeight);
            }
        },

        // 表格内容滚动到顶部（常用与分页）
        bodyScrollTop() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            if (body1) {
                body1.scrollTop = 0;
            }
            if (body2) {
                body2.scrollTop = 0;
            }
            if(body3){
                body3.scrollTop = 0;
            }
        },

        body2Scroll(e) {

            var view2 = this.$el.querySelector('.v-table-rightview');
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');

            if (body1) {
                body1.scrollTop = body2.scrollTop;
            }

            if(view2){
                view2.querySelector('.v-table-header').scrollLeft = body2.scrollLeft;
            }
        },

        body3Scroll() {
            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');

            if (body1) {
                body1.scrollTop = body3.scrollTop;
            }
            if (body2) {
                body2.scrollTop = body3.scrollTop;
            }
        },

        body4Scroll() {
            var view2 = this.$el.querySelector('.v-table-rightview');
            var body4 = this.$el.querySelector('.v-table-empty-scroll');

            if(view2){
                view2.querySelector('.v-table-header').scrollLeft = body4.scrollLeft;
            }
        },

        rightViewFooterScroll() {

            var view2 = this.$el.querySelector('.v-table-rightview');

            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if(view2){
                view2.querySelector('.v-table-header').scrollLeft = rightViewFooter.scrollLeft;
                view2.querySelector('.v-table-body').scrollLeft = rightViewFooter.scrollLeft;
            }

        },

        // 列表中滚动条控制
        scrollControl() {

            this.unbindEvents();

            // 修复左侧固定列绑定滚动事件失效的问题
            setTimeout(x => {

                var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
                var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
                var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');
                var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');
                var body4 = this.$el.querySelector('.v-table-empty-scroll');

                body1 && utils.bind(body1, 'mousewheel', this.bodyMousewheel);
                body2 && utils.bind(body2, 'mousewheel', this.bodyMousewheel);
                body3 && utils.bind(body3, 'mousewheel', this.bodyMousewheel);
                body2 && utils.bind(body2, 'scroll', this.body2Scroll);
                rightViewFooter && utils.bind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
                body3 && utils.bind(body3, 'scroll', this.body3Scroll);
                body4 && utils.bind(body4, 'scroll', this.body4Scroll);
            })
        },

        unbindEvents() {

            var body1 = this.$el.querySelector('.v-table-leftview .v-table-body');
            var body2 = this.$el.querySelector('.v-table-rightview .v-table-body');
            var rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');
            var body3 = this.$el.querySelector('.v-table-actionview .v-table-body');
            var body4 = this.$el.querySelector('.v-table-empty-scroll');

            body1 && utils.unbind(body1, 'mousewheel', this.bodyMousewheel);
            body2 && utils.unbind(body2, 'mousewheel', this.bodyMousewheel);
            body3 && utils.unbind(body3, 'mousewheel', this.bodyMousewheel);
            body2 && utils.unbind(body2, 'scroll', this.body2Scroll);
            rightViewFooter && utils.unbind(rightViewFooter, 'scroll', this.rightViewFooterScroll);
            body3 && utils.unbind(body3, 'scroll', this.body3Scroll);
            body4 && utils.unbind(body4, 'scroll', this.body4Scroll);
        },

        // 对外暴露的方法
        scrollToTop() {

            this.bodyScrollTop();
        }
    },

    beforeDestroy() {

        this.unbindEvents();
    }
}