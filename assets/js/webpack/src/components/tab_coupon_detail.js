import { getDate, clickBack, getLocale, Trans } from "../helper";

function clickCopy(code) {
    const shadow = document.getElementById("hrv-loyalty");
    let divCopy = shadow.shadowRoot.getElementById(
        "hrv-loyalty-value-code-coppy"
    );
    divCopy.innerHTML = code;
    divCopy.select();
    try {
        document.execCommand("copy") ? "successfully" : "unsuccessfully";
        // console.log("text coppied " + t)
    } catch (t) {
        // console.log("Unable to copy text")
    }
    divCopy.innerHTML = "";
}

class TabCouponDetail {
    container = null;
    data = null;
    backScreenElm = null;

    constructor(options) {
        this.container = options.divDetail;
        this.data = options.data;
        this.style = document.createElement("style");
        this.backScreenElm = options.backScreenElm;
    }

    render() {
        const { data, backScreenElm } = this;
        const shadow = document.getElementById("hrv-loyalty");
        shadow.shadowRoot.getElementById(
            "hrv-loyalty-click-coupons-loaddingoff"
        ).classList = "";
        const time = getDate(data.ended_at); // e
        const content = data.discount.content; // f
        const image = `<img src="${data.image_url}" />`; // i
        const type = data.discount.type;
        const TYPE_POOL = 3; //Ưu đãi dạng Pool
        const noContent = `<div class="hrv-loyalty-coupons-click-item">
                      <div id="hrv-loyalty-coupons-click-header" class="hrv-loyalty-coupons-click-header" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2979FF"/></svg>
                          <p>${Trans("back")}</p>
                        </div>
                          <div>
                            <div class="hrv-loyalty-image-click-coupons">${
                                null != data.image_url
                                    ? image
                                    : '<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" rx="8" fill="white"/><path d="M44 13C39.667 13 37.211 16.595 36 19.18C34.789 16.595 32.333 13 28 13C25.243 13 23 15.243 23 18C23 20.757 25.243 23 28 23H36H44C46.757 23 49 20.757 49 18C49 15.243 46.757 13 44 13ZM28 21C26.346 21 25 19.654 25 18C25 16.346 26.346 15 28 15C31.745 15 33.786 18.924 34.603 21H28ZM44 21H37.394C38.206 18.925 40.24 15 44 15C45.654 15 47 16.346 47 18C47 19.654 45.654 21 44 21Z" fill="#D1B43D"/><path d="M55 27H17V57C17 58.105 17.895 59 19 59H53C54.105 59 55 58.105 55 57V27Z" fill="#C94F49"/><path d="M57 21H15C13.895 21 13 21.895 13 23V29C13 30.105 13.895 31 15 31H57C58.105 31 59 30.105 59 29V23C59 21.895 58.105 21 57 21Z" fill="#E86C60"/><path d="M41 21H31V31H41V21Z" fill="#EFD358"/><path d="M41 31H31V59H41V31Z" fill="#D1B43D"/></svg>'
                            }
                            </div>
                          <div class="hrv-loyalty-title-click-coupons">
                            <h2>${data.title}</h2>
                            <p>${time}</p>
                          </div>
                          <div class="hrv-loyalty-code-click-coupons">
                            <p id="" >${data.code}</p>
                              <textarea  id="hrv-loyalty-value-code-coppy">
                              </textarea>
                          </div>
                          
                          <div id="hrv-loyalty-hidden-checkout"></div>
                        </div>
                      </div>`;
        const buttonBack = `
    <div class="hrv-loyalty-coupons-click-item">
      <div id="hrv-loyalty-coupons-click-header" class="hrv-loyalty-coupons-click-header"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2979FF"/></svg>
         <p>${Trans("back")}</p>
        </div>
        <div class="hrv-loyalty-srcoll-click-coupons">
          <div class="hrv-loyalty-image-click-coupons">${
              null != data.image_url
                  ? image
                  : '<svg width="76" height="76" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="54" height="54" fill="#EEEEEE"/><rect x="10" y="17" width="34" height="20" rx="3" stroke="white" stroke-width="2"/><path d="M30 31L38 23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="23" r="2" stroke="white" stroke-width="2"/><circle cx="38" cy="31" r="2" stroke="white" stroke-width="2"/><path d="M15 21H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 25H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 29H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 33H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 17V18M23 22V23M23 27V28M23 32V33" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          }
          </div>
          <div class="hrv-loyalty-title-click-coupons">
            <h2>${data.title}</h2> <p>${time}</p>
          </div>
          <div class="hrv-loyalty-code-click-coupons">
            <p id="" >${data.code}</p>
            <textarea  id="hrv-loyalty-value-code-coppy"></textarea>
          </div>
          <div id="hrv-loyalty-hidden-checkout" class="hrv-loyalty-coppy-click-coupons">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0.5H2.25C1.7 0.5 1.25 0.95 1.25 1.5V8.5H2.25V1.5H8.25V0.5ZM7.75 2.5H4.25C3.7 2.5 3.255 2.95 3.255 3.5L3.25 10.5C3.25 11.05 3.695 11.5 4.245 11.5H9.75C10.3 11.5 10.75 11.05 10.75 10.5V5.5L7.75 2.5ZM4.25 3.5V10.5H9.75V6H7.25V3.5H4.25Z" fill="#2979FF"/></svg>
            <p id="hrv-loyalty-value-code-paste">${Trans(
                "copy_promotion_code"
            )}</p>
          </div>
          <div class="hrv-loyalty-info-click-coupons">
            <h2>${Trans("coupon_details")}</h2>${data.discount.content}
          </div>
      </div>
    </div>`;
        const typePool = `
    <div class="hrv-loyalty-coupons-click-item">
      <div id="hrv-loyalty-coupons-click-header" class="hrv-loyalty-coupons-click-header"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2979FF"/></svg>
        <p>${Trans("back")}</p>
      </div>
      <div class="hrv-loyalty-srcoll-click-coupons"><div class="hrv-loyalty-image-click-coupons">${
          null != data.image_url
              ? image
              : '<svg width="76" height="76" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="54" height="54" fill="#EEEEEE"/><rect x="10" y="17" width="34" height="20" rx="3" stroke="white" stroke-width="2"/><path d="M30 31L38 23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="23" r="2" stroke="white" stroke-width="2"/><circle cx="38" cy="31" r="2" stroke="white" stroke-width="2"/><path d="M15 21H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 25H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 29H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 33H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 17V18M23 22V23M23 27V28M23 32V33" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n\t</svg>'
      }</div>
      <div class="hrv-loyalty-title-click-coupons">
        <h2>${data.title}</h2>
      </div>
      <div class="hrv-loyalty-info-click-coupons">
        <h2>${Trans("coupon_details")}</h2>${data.discount.content}
        </div>
      </div>
    </div>`;
        type == TYPE_POOL
            ? (this.container.innerHTML = typePool)
            : content == null
            ? (this.container.innerHTML = noContent)
            : (this.container.innerHTML = buttonBack);

        const buttonClickBack = shadow.shadowRoot.getElementById(
            "hrv-loyalty-coupons-click-header"
        );
        const buttonClickCoppy = shadow.shadowRoot.getElementById(
            "hrv-loyalty-hidden-checkout"
        );
        buttonClickCoppy.onclick = function () {
            clickCopy(data.code);
        };
        buttonClickBack.onclick = function () {
            clickBack(backScreenElm);
        };

        this.style.innerHTML =
            getLocale() == "vi"
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

        this.container.append(this.style);
    }
}

/**
 * Copy remove
 *  <div id="hrv-loyalty-hidden-checkout" class="hrv-loyalty-coppy-click-coupons">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 0.5H2.25C1.7 0.5 1.25 0.95 1.25 1.5V8.5H2.25V1.5H8.25V0.5ZM7.75 2.5H4.25C3.7 2.5 3.255 2.95 3.255 3.5L3.25 10.5C3.25 11.05 3.695 11.5 4.245 11.5H9.75C10.3 11.5 10.75 11.05 10.75 10.5V5.5L7.75 2.5ZM4.25 3.5V10.5H9.75V6H7.25V3.5H4.25Z" fill="#2979FF"/></svg>
                            <p id="hrv-loyalty-value-code-paste">${Trans(
                                "copy_promotion_code"
                            )}</p>
                          </div>
 */

export default TabCouponDetail;
