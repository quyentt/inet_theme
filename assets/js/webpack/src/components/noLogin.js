import Membership from "./noauthenticate/membership";
import { getCookie, getDescription, logLoyalty, Trans } from "../helper";
import TabCouponShop from "./tab_coupons_shop";
import OmniCoupon from "./noauthenticate/omniPromotion";

function onClickpopup() {
  const shadow = document.getElementById("hrv-loyalty");
  const divOpen = shadow.shadowRoot.getElementById("hrv-loyalty-open");
  divOpen.classList.contains("hrv-loyalty-close-popup")
    ? (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-open-popup")
    : (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-close-popup");
}

class NoLogin {
  container = null;
  noLogin = null;
  button = null;
  data = null;
  org = null;
  locationOrigin = null;

  constructor(options) {
    this.container = options.divPopup;
    this.noLogin = document.createElement("div");
    this.container.append(this.noLogin);
    this.container.classList = "hrv-loyalty-include hrv-height-420";
    this.data = options.data;
    this.org = options.org;
    this.locationOrigin = window.location.origin;
  }

  loadingOffShopCoupon() {
    const shadow = document.getElementById("hrv-loyalty");
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-shop-loaddingoff"
    ).classList = "";
  }

  render() {
    const shadow = document.getElementById("hrv-loyalty");
    const loading = shadow.shadowRoot.getElementById(
      "hrv-loyalty-firstinit-loaddingoff"
    );
    const levels = this.data.levels;
    const discounts = this.data.discounts;

    const memberShip = new Membership({ levels });

    let memberShipHTML = "";

    if (levels.length > 0) {
      memberShipHTML = memberShip.build().getOuterHtml();
    }

    const omniCoupon = new OmniCoupon();
    let OmniHTML = omniCoupon.build().getOuterHtml();

    setTimeout(async () => {
      const divRenderShopCoupon = shadow.shadowRoot.getElementById(
        "hrv-loyalty-coupons-wrapper-shop"
      );

      const divWrapper = shadow.shadowRoot.getElementById(
        "hrv-loyalty-noLogin-wrapper-coupon-shop"
      );
      const divWrapperDisplay = shadow.shadowRoot.getElementById(
        "hrv-loyalty-noLogin-coupon-shop-display"
      );

      const apiCouponsOmni = `${this.locationOrigin}/apps/loyalty/coupon_from_shop.json`;

      const omniCoupon = await fetch(apiCouponsOmni)
        .then((response) => response.json())
        .then((response) => {
          this.loadingOffShopCoupon();
          return response.data;
        })
        .catch((error) => {
          console.error("error coupons", error);
          this.loadingOffShopCoupon();
          return [];
        });

      const omniCouponList = omniCoupon.map((input) => {
        return {
          id: input.id,
          title: getDescription(input),
          type: 1, // type = 1 là coupon bên omni
          settings: {
            is_expired: input.endDate == null ? 0 : 1,
            ended_date: input.endDate,
          },
          code: input.discountCode,
        };
      });

      const loyaltyCouponList = discounts.map((input) => {
        return { ...input, type: 0 };
      });

      const summaryList = loyaltyCouponList.concat(omniCouponList);

      if (summaryList.length > 0) {
        divWrapperDisplay.style = "display: block";

        loadMore.getElementsByTagName("p")[0].innerHTML = Trans("coupon_shop");

        const scrollToCoupon = shadow.shadowRoot.getElementById(
          "hrv-loyalty-coupons-wrapper"
        );

        loadMore.onclick = function () {
          scrollToCoupon.scrollIntoView({
            behavior: "smooth",
          });
        };

        summaryList.map((item, index) => {
          const dataItem = item;

          const tabCoupon = new TabCouponShop({
            divWrapper,
            divPopup: divRenderShopCoupon,
            dataItem,
            org: this.org,
            key: index,
            append: true,
          });

          return tabCoupon.render();
        });
      }

      if (!summaryList.length || !summaryList.length) {
        loadMore.classList =
          "hrv-loyalty-loadmore-coupons unshowloadmore-nologin";
      }
    }, 1000);

    const utm = decodeURIComponent(
      decodeURIComponent(getCookie("_haravan_utm_p"))
    );

    let utmParts = {};
    if (utm != null && utm != "") {
      const parts = utm.split("&");
      for (var i in parts) {
        const part = parts[i].split("=");
        utmParts[part[0]] = part[1];
      }
    }
    const href = encodeURIComponent(window.location.href);
    let refLink = `ref=a__hrf_rrs_un::|ui::|ac::${this.org.name}|ai::${this.org.id}|ls::loyalty_widget|lu::${href}`;
    if (utmParts["utm_source"] != undefined && utmParts["utm_source"] != "") {
      refLink += `|us::${utmParts["utm_source"]}`;
    }
    if (utmParts["utm_medium"] != undefined && utmParts["utm_medium"] != "") {
      refLink += `|um::${utmParts["utm_medium"]}`;
    }
    if (
      utmParts["utm_campaign"] != undefined &&
      utmParts["utm_campaign"] != ""
    ) {
      refLink += `|uc::${utmParts["utm_campaign"]}`;
    }

    this.noLogin.classList = "hrv-loyalty-noMember-new";
    this.noLogin.innerHTML = `
      <div class="hrv-loyalty-wrapper-new" id="scroll-hrv-loyalty-wrapper-new">
        <div class="hrv-loyalty-header">
          <div class="hrv-loyalty-style-close">
            <svg style="cursor:pointer" id="hrv-loyalty-click-close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9E9E9E"/></svg>
          </div>
        </div>
        <div class="hrv-loyalty-body-scoller">
          <div class="hrv-loyalty-noLogin-include" id="hrv-loyalty-noLogin-brand-icon">
          ${
            this.data.logo.id == 0
              ? `<div class="hrv-loyalty-header-noData">
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#haraloyalty_1)"><rect width="76" height="76" rx="38" fill="#EC5569"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4167 4.84619C12.3717 11.7441 8 21.3615 8 32C8 52.9869 25.0132 70 46 70C52.7501 70 59.0891 68.24 64.5833 65.1539C57.7305 71.8636 48.3483 76 38 76C17.0132 76 0 58.9869 0 38C0 23.7633 7.82909 11.3552 19.4167 4.84619Z" fill="#E63950"/><path d="M56.812 23.2914C52.5613 18.9029 45.6695 18.9029 41.4186 23.2914L39.0175 25.7704C38.445 26.3614 37.5166 26.3614 36.9441 25.7704L34.5814 23.331C30.3307 18.9425 23.4389 18.9425 19.188 23.331C14.9373 27.7195 14.9373 34.8347 19.188 39.2235L36.9455 57.5567C37.518 58.1478 38.4465 58.1478 39.0189 57.5567L56.8118 39.1838C61.0627 34.7951 61.0627 27.6801 56.812 23.2914Z" fill="#FFF5F5"/><path d="M24.882 39.2234C20.6313 34.8349 20.6313 27.7196 24.882 23.3309C26.2763 21.8914 27.9556 20.9272 29.7316 20.4322C26.0928 19.4178 22.0445 20.382 19.1883 23.3309C14.9376 27.7195 14.9376 34.8347 19.1883 39.2234L36.9458 57.5566C37.5183 58.1477 38.4467 58.1477 39.0192 57.5566L40.8292 55.6876L24.882 39.2234Z" fill="#DCE6EB"/></g><defs><clipPath id="clip0"><rect width="76" height="76" fill="white"/></clipPath></defs></svg>
              </div>`
              : `
              <div class="hrv-loyalty-header-noData" style="justify-content: center">
                <img
                  src=${this.data.logo.url}
                  alt="avatar"
                  style="width: 76px;height: 76px;border-Radius:0.5em"
              </div>
              `
          }
          </div>
          <div class="hrv-loyalty-title-noData">
          ${
            this.data.message_welcome == ""
              ? `<h2>${Trans("welcome_to_loyalty_program")}</h2>`
              : `<h2>${this.data.message_welcome}</h2>`
          }
          </div>

          <div style="width: 80%;margin: 0px auto; padding-bottom: 48px">
            ${
              this.data.social_channel.messenger.is_connected &&
              this.data.social_channel.messenger.is_actived
                ? `
                <div class="hrv-loyalty-button-noData" style="width: 100%;background: #2979ff;">
                <a href="//m.me/${
                  this.data.social_channel.messenger.value
                }?${refLink}" target="_blank" rel="noreferrer" aria-label="messenger">
                    ${Trans("chat_in_messenger_for_free")}
                  </a>
                </div>
                `
                : ""
            }
            ${
              this.data.social_channel.zalo.is_connected &&
              this.data.social_channel.zalo.is_actived
                ? `
                <div class="hrv-loyalty-button-noData" style="width: 100%;background: #2979ff;">
                <a href="https://zalo.me/${
                  this.data.social_channel.zalo.value
                }" target="_blank" rel="nofollow noreferrer" aria-label="zalo">
                    ${Trans("chat_in_zalo_for_free")}
                  </a>
                </div>
                `
                : ""
            }
            ${
              this.data.social_channel.hotline.is_actived &&
              this.data.social_channel.hotline.value != ""
                ? `
                <div class="hrv-loyalty-button-noData" style="width: 100%;background: #E0E0E0;">
                  <a href="tel:${
                    this.data.social_channel.hotline.value
                  }" rel="nofollow" aria-label="phone" style="color: #424242">
                     ${Trans("hotline")} ${
                    this.data.social_channel.hotline.value
                  }
                  </a>
                </div>
                `
                : ""
            }
          </div>

          ${OmniHTML}

          <div id="hrv-loyalty-noLogin-memberShip-wrapper">
            ${memberShipHTML}
          </div>


          <div id="hrv-loyalty-noLogin-wrapper-login">
            <div class="hrv-loyalty-title-noData" style="margin-top:0">
                <p style="font-size:14px;">${Trans("log_in_now_offer")}</p>
            </div>
            <div style="width: 80%;margin: 0px auto;">
                <div class="hrv-loyalty-button-noData" style="width: 100%;background: #2979ff;margin-top:0; padding: 15px 0">
                <a href="${window.location.origin + "/account/login"}">
                    ${Trans("login")}
                </a>
                </div>
            </div>
          </div>

          <div class="hrv-loyalty-footer-noData">
            <p style="font-size: 0.75em;">${Trans("dont_have_an_account")}? </p>
            <a  style="color:#2979FF;font-size: 0.75em;padding-left:3px" href="${
              window.location.origin + "/account/register"
            }"> ${Trans("create_new_account")} </a>
          </div>
          <div id="back-to-bottom">
          </div>
        </div>
      </div>
      </div>
      <div class="hrv-loyalty-loadmore-coupons unshowloadmore-nologin" id="hrv-loyalty-loadmore-nologin" style="position: absolute;bottom: 0.625em;z-index: 123123;margin-right: -50%;transform: translate(-50%, -50%);left: 50%;cursor: pointer">
      <div style="display: flex;margin: 0 auto;padding: 0.625em;background: #FFFFFF;box-shadow: 0px 4px 8px rgba(33, 33, 33, 0.1);border-radius: 1.25em;text-align: center;">
          ${svg}
          <p style="margin:0px; margin-left: 8px; color: #2979FF">${Trans(
            "login"
          )}</p>
      </div>
        </div>
      <div class="hrv-loyalty-logo" id="hrv-loyalty-fixed-logo">
        <div style="text-align: center;padding-top: 5px;background-color: #fff;border-radius:1.875em">
            <span>powered by Haravan</span>
        </div>
      </div>
      `;

    loading.classList = "";

    const getButtonClose = shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-close"
    );
    const getBackToBottom = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper"
    );
    const loadMore = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-nologin"
    );

    // init scroll
    const bottomFloating = shadow.shadowRoot.getElementById(
      "hrv-loyalty-noLogin-wrapper-login"
    );

    loadMore.onclick = function () {
      bottomFloating.scrollIntoView({
        behavior: "smooth",
      });
    };

    getButtonClose.onclick = function () {
      onClickpopup();
    };

    if (discounts.length > 1 || levels.length > 1) {
      loadMore.classList = "hrv-loyalty-loadmore-coupons showloadmore-nologin";
    }

    const includediv = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );

    function isInViewport(elementObserve) {
      let bounding = elementObserve.getBoundingClientRect();
      let getElmHeight = elementObserve.offsetHeight;

      if (
        bounding.top >= -getElmHeight / 2 + 20 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) +
            getElmHeight -
            180
      ) {
        return true;
      } else {
        // TH: Element không hiển thị trên UI
        return false;
      }
    }

    const scrollAction = () => {
      const scrollId = shadow.shadowRoot.getElementById(
        "scroll-hrv-loyalty-wrapper-new"
      );

      const mobile = window.innerWidth < 768;

      scrollId.addEventListener("scroll", function () {
        const shadow = document.getElementById("hrv-loyalty");
        const couponShopWatcher = shadow.shadowRoot.getElementById(
          "hrv-loyalty-coupons-wrapper-shop"
        );

        const membershipWatch = shadow.shadowRoot.getElementById(
          "hrv-loyalty-noLogin-memberShip-wrapper"
        );

        const loginWatch = shadow.shadowRoot.getElementById(
          "hrv-loyalty-noLogin-wrapper-login"
        );

        // Scroll khi đứng ở ưu đãi của shop
        if (isInViewport(couponShopWatcher) && levels.length > 0) {
          loadMore.getElementsByTagName("p")[0].innerHTML =
            Trans("membership_level");

          const getBackToBottom = shadow.shadowRoot.getElementById(
            "hrv-loyalty-noLogin-memberShip-wrapper"
          );

          loadMore.onclick = function () {
            getBackToBottom.scrollIntoView({
              behavior: "smooth",
            });
          };
        }

        // Scroll khi đứng ở thành viên
        if (isInViewport(membershipWatch)) {
          loadMore.getElementsByTagName("p")[0].innerHTML = Trans("login");

          const getBackToBottom = shadow.shadowRoot.getElementById(
            "hrv-loyalty-noLogin-wrapper-login"
          );

          loadMore.onclick = function () {
            getBackToBottom.scrollIntoView({
              behavior: "smooth",
            });
          };
        }

        // Scroll khi đứng ở login
        if (isInViewport(loginWatch)) {
          loadMore.classList =
            "hrv-loyalty-loadmore-coupons unshowloadmore-nologin";
        } else {
          loadMore.classList =
            "hrv-loyalty-loadmore-coupons showloadmore-nologin";
        }

        // Scroll khi ở dạng mobile
        if (mobile) {
          let elementObserve =
            shadow.shadowRoot.getElementById("back-to-bottom");
          let bounding = elementObserve.getBoundingClientRect();
          var getElmHeight = elementObserve.offsetHeight;

          if (
            bounding.top >= -getElmHeight / 2 + 20 &&
            bounding.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) +
                getElmHeight
          ) {
            loadMore.classList =
              "hrv-loyalty-loadmore-coupons unshowloadmore-nologin";
          }
        }
      });
    };

    includediv.addEventListener("mouseover", scrollAction());
    includediv.addEventListener("touchstart", scrollAction());

    logLoyalty("profile", {
      status: "no login [no login | is member | no member]",
    });
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<g id="icon_arrow-down">
<path id="icon/navigation/arrow_downward_24px" d="M13.3327 8.0013L12.3927 7.0613L8.66602 10.7813V2.66797H7.33268V10.7813L3.61268 7.05464L2.66602 8.0013L7.99935 13.3346L13.3327 8.0013Z" fill="#2979FF"/>
</g>
</svg>`;

export default NoLogin;
