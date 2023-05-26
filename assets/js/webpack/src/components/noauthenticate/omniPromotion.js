import { Trans } from "../../helper";

class OmniCoupon {
    element = null;

    constructor(options) {
        this.element = document.createElement("div");
        this.element.setAttribute(
            "id",
            "hrv-loyalty-noLogin-wrapper-coupon-shop"
        );
    }

    buildHtml() {
        return `
        <div id="hrv-loyalty-noLogin-coupon-shop-display" style="display: none">
        <div class="hrv-loyalty-noLogin-coupon-shop">
        <div id="hrv-loyalty-coupons-wrapper" style="
        border-top: 1px solid #EFEFEF";
        >
            <div id="hrv-loyalty-coupons-shop" style="position: relative; min-height: 200px; padding-top: 32px">
            <h3 style="
            font-size: 16px;
            line-height: 18.75px;
            margin-bottom: 11px;
            text-align: center;
            color: #212121;">
                ${Trans("coupon_shop")}
            </h3>

            <p style="
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            color: #757575;
            ">
                ${Trans("pasted_code_applied")}
            </p>

            <div id="hrv-loyalty-coupons-wrapper-shop" 
            style="display: flex!important;
                flex-wrap: wrap!important; 
                justify-content: space-between;">
            </div>
            <div class="hrv-loyalty-loading" id="hrv-loyalty-coupons-shop-loaddingoff">
            </div>
            </div>
        </div>
    </div>
        </div>
            
        `;
    }

    build() {
        this.element.innerHTML = this.buildHtml();
        return this;
    }

    getOuterHtml() {
        return this.element.outerHTML;
    }

    getInnerHtml() {
        return this.element.innerHTML;
    }

    getElement() {
        return this.element;
    }
}

export default OmniCoupon;
