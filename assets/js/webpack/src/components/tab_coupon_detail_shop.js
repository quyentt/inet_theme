import {
    clickBack,
    getLocale,
    Trans,
    getTime,
    getSession,
    setSession,
    filledCodeToInputOmni,
} from "../helper";

function applyCoupon(code) {
    filledCodeToInputOmni(code);
}

function clickCopy(data) {
    const coupon_key = "hrl_anonymous_coupons";
    const coupon_selected = "hrl_anonymous_discount_selected";
    const shadow = document.getElementById("hrv-loyalty");
    let divCopy = shadow.shadowRoot.getElementById(
        "hrv-loyalty-value-code-coppy"
    );
    let divCopyContent = shadow.shadowRoot.getElementById(
        "hrv-loyalty-hidden-checkout"
    );
    divCopy.innerHTML = data.code;
    divCopy.select();

    try {
        document.execCommand("copy") ? "successfully" : "unsuccessfully";
        // console.log("text coppied " + t)
        divCopyContent.classList.add("hrv-loyalty-hidden-checkout-success");

        const btnContent = shadow.shadowRoot.getElementById(
            "hrv-loyalty-value-code-paste"
        );
        const svgIcon = shadow.shadowRoot.getElementById(
            "hrv-loyalty-detail-icon-copy"
        );

        svgIcon.setAttribute("fill", "#51ce82");
        btnContent.innerHTML = `${Trans("copy_promotion_code_success")}`;
        const couponSaved = getSession(coupon_key);

        setSession(coupon_selected, data.id);
        applyCoupon(couponSaved[data.id]);
    } catch (t) {
        // console.log("Unable to copy text")
        divCopyContent.classList.remove("hrv-loyalty-hidden-checkout-success");
    }
    divCopy.innerHTML = "";
}

class TabCouponDetailShop {
    container = null;
    data = null;
    backScreenElm = null;
    callbackfn = null;

    constructor(options) {
        this.container = options.divDetail;
        this.data = options.data;
        this.style = document.createElement("style");
        this.backScreenElm = options.backScreenElm;
        this.callbackfn = options.callbackfn;
    }

    renderStyle() {
        return getLocale() == "vi"
            ? `.hrv-loyalty-code-click-coupons::before{content:"Mã khuyến mãi của bạn";
      background-color:#fff;
      position:absolute;
      top:-7px;
      padding:0 0.625em;
      position:absolute;
      font-family:"Roboto", sans-serif;
      font-style:normal;
      font-weight:400;
      font-size:0.8125em;
      line-height:1em;
      text-align:center;
      color:#757575;left:50%;margin-right:-50%;transform:translate(-50%,-10%)}`
            : `.hrv-loyalty-code-click-coupons::before{content:"Your promo code";
        background-color:#fff;
        position:absolute;
        top:-7px;
        padding:0 0.625em;
        position:absolute;
        font-family:"Roboto", sans-serif;
        font-style:normal;
        font-weight:400;
        font-size:0.8125em;
        line-height:1em;
        text-align:center;
        color:#757575;left:50%;margin-right:-50%;transform:translate(-50%,-10%)}`;
    }

    renderError() {
        const shadow = document.getElementById("hrv-loyalty");
        shadow.shadowRoot.getElementById(
            "hrv-loyalty-click-coupons-loaddingoff"
        ).classList = "";

        const occurErrorTemplate = `<div class="hrv-loyalty-coupons-click-item">
          <p>Opps! Đã xảy ra lỗi</p>
    </div>`;

        this.container.innerHTML = occurErrorTemplate;
        this.style.innerHTML = this.renderStyle();
        this.container.append(this.style);
    }

    render() {
        const { data, backScreenElm, callbackfn } = this;
        const shadow = document.getElementById("hrv-loyalty");
        shadow.shadowRoot.getElementById(
            "hrv-loyalty-click-coupons-loaddingoff"
        ).classList = "";
        const image = `<img src="${data.image_url}" />`; // i

        const detailCouponHTML = `
    <div class="hrv-loyalty-coupons-click-item">
      <div id="hrv-loyalty-coupons-click-header" class="hrv-loyalty-coupons-click-header"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2979FF"/></svg>
         <p>${Trans("back")}</p>
        </div>
        <div class="hrv-loyalty-srcoll-click-coupons">
          <div class="hrv-loyalty-image-click-coupons">
          ${
              null != data.image_url
                  ? image
                  : '<svg width="76" height="76" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="54" height="54" fill="#EEEEEE"/><rect x="10" y="17" width="34" height="20" rx="3" stroke="white" stroke-width="2"/><path d="M30 31L38 23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="23" r="2" stroke="white" stroke-width="2"/><circle cx="38" cy="31" r="2" stroke="white" stroke-width="2"/><path d="M15 21H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 25H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 29H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 33H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 17V18M23 22V23M23 27V28M23 32V33" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          }

          </div>

          <div class="hrv-loyalty-title-click-coupons">
            <h2>${data.title}</h2>
            <p>${getTime(data)}</p>
          </div>

          <div class="hrv-loyalty-code-click-coupons">
            <p id="">${data.code}</p>
            <textarea id="hrv-loyalty-value-code-coppy"></textarea>
          </div>

          <div id="hrv-loyalty-hidden-checkout" class="hrv-loyalty-coppy-click-coupons">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0.5H2.25C1.7 0.5 1.25 0.95 1.25 1.5V8.5H2.25V1.5H8.25V0.5ZM7.75 2.5H4.25C3.7 2.5 3.255 2.95 3.255 3.5L3.25 10.5C3.25 11.05 3.695 11.5 4.245 11.5H9.75C10.3 11.5 10.75 11.05 10.75 10.5V5.5L7.75 2.5ZM4.25 3.5V10.5H9.75V6H7.25V3.5H4.25Z" fill="#2979FF" id="hrv-loyalty-detail-icon-copy"/></svg>
            <p id="hrv-loyalty-value-code-paste">${Trans(
                "copy_promotion_code"
            )}</p>
          </div>

          <div class="hrv-loyalty-info-click-coupons">
          </div>
      </div>
    </div>`;

        this.container.innerHTML = detailCouponHTML;
        this.style.innerHTML = this.renderStyle();
        this.container.append(this.style);

        function checkSelectedCoupon() {
            const coupon_selected = "hrl_anonymous_discount_selected";
            // Check data.id có trùng với selected dưới local
            const selectedCouponSession = getSession(coupon_selected);
            if (
                selectedCouponSession != null &&
                selectedCouponSession != undefined &&
                selectedCouponSession != ""
            ) {
                if (selectedCouponSession == data.id) {
                    const divCopyContent = shadow.shadowRoot.getElementById(
                        "hrv-loyalty-hidden-checkout"
                    );
                    const btnContent = shadow.shadowRoot.getElementById(
                        "hrv-loyalty-value-code-paste"
                    );
                    const svgIcon = shadow.shadowRoot.getElementById(
                        "hrv-loyalty-detail-icon-copy"
                    );
                    svgIcon.setAttribute("fill", "#51ce82");
                    btnContent.innerHTML = `${Trans(
                        "copy_promotion_code_success"
                    )}`;
                    divCopyContent.classList.add(
                        "hrv-loyalty-hidden-checkout-success"
                    );
                }
            }
        }

        checkSelectedCoupon();

        const buttonClickBack = shadow.shadowRoot.getElementById(
            "hrv-loyalty-coupons-click-header"
        );
        const buttonClickCoppy = shadow.shadowRoot.getElementById(
            "hrv-loyalty-hidden-checkout"
        );

        // ACTIONS - COPY
        buttonClickCoppy.onclick = function () {
            // Remove status của coupon buyer
            const idCouponBuyer = "hrv-loyalty-coupons-buyer";
            const listCouponBuyer =
                shadow.shadowRoot.getElementById(idCouponBuyer);

            if (listCouponBuyer !== null) {
                const activeItem =
                    listCouponBuyer.querySelector(".active-coupon");
                console.log("activeItem", activeItem);
                if (activeItem !== null) {
                    activeItem.classList.remove("active-coupon");
                    activeItem
                        .querySelector("#hrv-loyalty-checkbox-icon")
                        .setAttribute("fill", "#DADADA");
                    activeItem
                        .querySelector("#hrv-loyalty-checkbox-icon")
                        .setAttribute(
                            "d",
                            "M7.00065 0.332031C3.32065 0.332031 0.333984 3.3187 0.333984 6.9987C0.333984 10.6787 3.32065 13.6654 7.00065 13.6654C10.6807 13.6654 13.6673 10.6787 13.6673 6.9987C13.6673 3.3187 10.6807 0.332031 7.00065 0.332031ZM7.00065 12.332C4.06065 12.332 1.66732 9.9387 1.66732 6.9987C1.66732 4.0587 4.06065 1.66536 7.00065 1.66536C9.94065 1.66536 12.334 4.0587 12.334 6.9987C12.334 9.9387 9.94065 12.332 7.00065 12.332ZM5.66732 8.44536L10.0607 4.05203L11.0007 4.9987L5.66732 10.332L3.00065 7.66536L3.94065 6.72536L5.66732 8.44536Z"
                        );

                    activeItem.setAttribute(
                        "style",
                        `background-image: url(\"${svgCouponDefault}\");border-radius:8px;background-repeat: no-repeat;`
                    );
                }
            }

            clickCopy(data);
        };

        // ACTIONS - GO BACK
        buttonClickBack.onclick = function () {
            clickBack(backScreenElm);
            callbackfn();
        };
    }
}

export default TabCouponDetailShop;

const svgCouponDefault =
    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='380' height='96' viewBox='0 0 380 96' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58173 96 8.00001 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H372C376.418 96 380 92.4183 380 88V8C380 3.58172 376.418 0 372 0H102Z' fill='%23F5F5F5'/%3e%3c/svg%3e";
