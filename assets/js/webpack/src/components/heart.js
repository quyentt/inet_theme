import CantFetch503 from "./cantFetch503";
import NoLogin from "./noLogin";
import HistoryPage, { HistoryPageState } from "./history_page";
import TabRewards from "./tab_rewards";
import TabCouponBuyer from "./tab_coupons_buyer";
import TabCouponShop from "./tab_coupons_shop";
import { appliedCoupon, getDescription } from "../helper";
import NoCouponRender from "./noCoupon";

const PACKAGE_SCALE = 99;
const PACKAGE_PLUS = 100;
const PACKAGE_LITE_PLUS = 4;

const svgHeartIcon = `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><circle cx="40" cy="40" r="30" fill="white"/></g><g clip-path="url(#haraloyalty_3)"><rect x="21" y="21" width="38" height="38" rx="19" fill="#EC5569"/><path fill-rule="evenodd" clip-rule="evenodd" d="M30.7084 23.4231C27.1859 26.872 25 31.6808 25 37C25 47.4934 33.5066 56 44 56C47.3751 56 50.5446 55.12 53.2916 53.5769C49.8652 56.9318 45.1741 59 40 59C29.5066 59 21 50.4934 21 40C21 32.8817 24.9145 26.6776 30.7084 23.4231Z" fill="#E63950"/><path d="M49.406 32.6457C47.2806 30.4514 43.8348 30.4514 41.7093 32.6457L40.5088 33.8852C40.2225 34.1807 39.7583 34.1807 39.4721 33.8852L38.2907 32.6655C36.1653 30.4712 32.7195 30.4712 30.594 32.6655C28.4687 34.8598 28.4687 38.4174 30.594 40.6117L39.4728 49.7784C39.759 50.0739 40.2232 50.0739 40.5095 49.7784L49.4059 40.5919C51.5314 38.3976 51.5313 34.84 49.406 32.6457Z" fill="#FFF5F5"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<path d="M33.4409 40.6117C31.3155 38.4175 31.3155 34.8599 33.4409 32.6655C34.138 31.9458 34.9777 31.4636 35.8657 31.2162C34.0463 30.7089 32.0221 31.191 30.594 32.6655C28.4687 34.8598 28.4687 38.4174 30.594 40.6117L39.4728 49.7784C39.759 50.0739 40.2232 50.0739 40.5095 49.7784L41.4145 48.8439L33.4409 40.6117Z" fill="#DCE6EB"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<filter id="filter0_d" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feOffset/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feGaussianBlur stdDeviation="5"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</filter>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<clipPath id="clip100">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<rect width="38" height="38" fill="white" transform="translate(21 21)"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\n`;

class Heart {
  container = null;
  heartContainer = null;
  button = null;
  locationOrigin = window.location.origin;
  orgId = 0;
  orgName = "";
  profile = null;
  firstInit = false;
  language = "vi";
  containerProfile = null;

  constructor(options) {
    this.container = options.container;
    this.heartContainer = document.createElement("div");
    this.heartContainer.classList = "hrv-loyalty-popup";
    this.container.append(this.heartContainer);
    this.language = options.language;
  }

  onClickpopup() {
    appliedCoupon();
    const shadow = document.getElementById("hrv-loyalty");
    const divOpen = shadow.shadowRoot.getElementById("hrv-loyalty-open");
    const divPopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper"
    );

    const includediv = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );

    divOpen.classList.contains("hrv-loyalty-close-popup")
      ? (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-open-popup")
      : (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-close-popup");
    if (!this.firstInit) {
      this.firstInit = true;
      let packageClass = "";
      if (this.profile !== null) {
        this.fetchCoupons();
        if (
          [PACKAGE_SCALE, PACKAGE_LITE_PLUS, PACKAGE_PLUS].includes(
            this.profile.data.package_type
          )
        ) {
          this.fetchHistory();
          this.fetchPromotion();
        } else {
          packageClass = "hrv-loyalty-without-membership";
          divOpen.classList.add("hrv-loyalty-without-membership");
          this.loaddingOffPromotion();
        }
      } else {
        this.fetchConfigNoLogin();
      }
    }

    function renderButtonScroll() {
      const shadow = document.getElementById("hrv-loyalty");

      const divinclude = shadow.shadowRoot.getElementById(
        "hrv-loyalty-loadmore-coupons"
      );
      const divHistory = shadow.shadowRoot.getElementById(
        "hrv-loyalty-loadmore-history"
      );
      const divReward = shadow.shadowRoot.getElementById(
        "hrv-loyalty-loadmore-reward"
      );

      if (
        shadow.shadowRoot.contains(
          shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-coupons")
        )
      ) {
        divReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
        divHistory.classList = "hrv-loyalty-loadmore-history unshowloadmore";

        divinclude.classList = "hrv-loyalty-loadmore-coupons showloadmore";
      }
    }

    function noRenderButtonScroll() {
      const shadow = document.getElementById("hrv-loyalty");

      if (
        shadow.shadowRoot.contains(
          shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-coupons")
        )
      ) {
        const divinclude = shadow.shadowRoot.getElementById(
          "hrv-loyalty-loadmore-coupons"
        );

        divinclude.classList = "hrv-loyalty-loadmore-coupons unshowloadmore";
      }
    }

    function isInViewport(elementObserve) {
      let bounding = elementObserve.getBoundingClientRect();
      var getElmHeight = elementObserve.offsetHeight;
      var getElmWidth = elementObserve.offsetWidth;

      if (
        bounding.top >= -getElmHeight &&
        bounding.left >= -getElmWidth &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth) +
            getElmWidth &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) +
            getElmHeight
      ) {
        // TH: Element hiển thị trên UI
        noRenderButtonScroll();
      } else {
        // TH: Element không hiển thị trên UI
        renderButtonScroll();
      }
    }

    if (
      divPopup != null &&
      divPopup.classList != null &&
      divPopup.classList.contains("active")
    ) {
      const scrollAction = () => {
        const scrollId = shadow.shadowRoot.getElementById(
          "hrv-loyalty-tab-content-id"
        );

        scrollId.addEventListener("scroll", function () {
          const shadow = document.getElementById("hrv-loyalty");
          const elmObserver = shadow.shadowRoot.getElementById(
            "hrv-loyalty-coupons-wrapper-shop"
          );

          isInViewport(elmObserver);
        });
      };

      includediv.addEventListener("mouseover", scrollAction());
      includediv.addEventListener("touchstart", scrollAction());
    }

    const loadMore = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-coupons"
    );

    const scrollToShopCouponView = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-shop"
    );

    if (loadMore != null) {
      loadMore.onclick = function () {
        scrollToShopCouponView.scrollIntoView({
          behavior: "smooth",
        });
      };
    }
  }

  render() {
    this.onClickpopup = this.onClickpopup.bind(this);
    this.button = document.createElement("button");
    this.button.style = "cursor: pointer";
    this.button.type = "button";
    this.button.setAttribute("data-toggle", "modal");
    this.button.setAttribute("data-target", "#exampleModal11");
    this.button.classList = "button-popup-loyalty";
    this.button.id = "button-popup-loyalty-1";
    this.button.onclick = this.onClickpopup;
    this.button.innerHTML = `${svgHeartIcon}`;
    this.heartContainer.append(this.button);
  }

  setOrgId(value) {
    this.orgId = value;
  }

  setOrgName(value) {
    this.orgName = value;
  }

  setProfile(profile) {
    this.profile = profile;
  }

  setContainerProfile(containerProfile) {
    this.containerProfile = containerProfile;
  }

  getContainerProfile() {
    return this.containerProfile;
  }

  fetchCoupons() {
    const apiCouponsBuyer = `${this.locationOrigin}/apps/loyalty/coupons.json?org_id=${this.orgId}&limit=100&page=1&language=${this.language}`;
    const apiCouponsShop = `${this.locationOrigin}/apps/loyalty/webfloating.json`;
    const apiCouponsOmni = `${this.locationOrigin}/apps/loyalty/coupon_from_shop.json`;

    const shadow = document.getElementById("hrv-loyalty");

    const divRenderBuyerCoupon = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-buyer"
    );

    const divRenderAllCoupon = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper"
    );

    const divRenderShopCoupon = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper-shop"
    );

    const shopCouponView = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-shop"
    );

    const divInclude = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );

    const divWrapper = shadow.shadowRoot.getElementById(
      "hrv-loyalty-tab-content-id"
    );

    const org = this.orgId;

    // Lấy danh sách ưu đãi dành cho Buyer
    const getCouponsBuyer = fetch(apiCouponsBuyer)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("error coupons", error);
      });

    // Lấy danh sách ưu đãi của loyalty
    const getCouponsOmni = fetch(apiCouponsOmni)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("error coupons", error);
      });

    // Lấy danh sách ưu đãi của Omni
    const getCouponsLoyalty = fetch(apiCouponsShop)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const cantFetch503 = new CantFetch503({ divInclude });
        cantFetch503.render();
        console.error("error coupons", error);
      });

    Promise.all([getCouponsOmni, getCouponsLoyalty, getCouponsBuyer])
      .then((response) => {
        const omniCouponList = response[0].data.map((input) => {
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

        const loyaltyCouponList = response[1].data.discounts.map((input) => {
          return { ...input, type: 0 };
        });

        const buyerCouponList = response[2].data.data;

        const summaryList = omniCouponList.concat(loyaltyCouponList);

        if (!summaryList.length && !buyerCouponList.length) {
          const divinclude = shadow.shadowRoot.getElementById(
            "hrv-loyalty-loadmore-coupons"
          );

          divinclude.style = "display: none";

          const tabCoupon = new NoCouponRender({
            divPopup: divRenderAllCoupon,
          });

          return tabCoupon.render();
        }

        if (buyerCouponList.length > 0) {
          divRenderBuyerCoupon.style = "display: block";

          buyerCouponList.map((item, key) => {
            const dataItem = item;
            const tabCoupon = new TabCouponBuyer({
              divPopup: divRenderBuyerCoupon,
              dataItem,
              org,
              append: true,
            });
            tabCoupon.render();
          });
        }

        if (summaryList.length > 0) {
          shopCouponView.style = "display: block";

          summaryList.map((item, index) => {
            const dataItem = item;
            const tabCoupon = new TabCouponShop({
              divPopup: divRenderShopCoupon,
              dataItem,
              org,
              key: index,
              divWrapper,
            });
            tabCoupon.render();
          });
        }

        this.loadingOffBuyer();
        this.loadingOffShop();
      })
      .catch((error) => {
        const cantFetch503 = new CantFetch503({ divInclude });
        cantFetch503.render();
        this.loadingOffShop();
        console.error("error coupons", error);
      });
  }

  // Loading cho buyer
  loadingOffBuyer() {
    const shadow = document.getElementById("hrv-loyalty");
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-buyer-loaddingoff"
    ).classList = "";
  }

  // Loading cho Shop
  loadingOffShop() {
    const shadow = document.getElementById("hrv-loyalty");
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-shop-loaddingoff"
    ).classList = "";
  }

  fetchHistory() {
    const shadow = document.getElementById("hrv-loyalty");
    const container = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper"
    );
    HistoryPageState.language = this.language;
    const historyPage = new HistoryPage({ container });
    historyPage.fetchData();
  }

  fetchPromotion() {
    const { containerProfile } = this;
    const apiReward = `${this.locationOrigin}/apps/loyalty/rewards.json?org_id=${this.orgId}&limit=4&page=1&language=${this.language}`;
    const shadow = document.getElementById("hrv-loyalty");
    const divPopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-wrapper"
    );
    const divInclude = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    const org = this.orgId;
    const meJson = this.profile;

    fetch(apiReward)
      .then((response) => response.json())
      .then((response) => {
        const data = response.data.data;
        const total = response.data.total;
        const current = response.data.current_page;

        if (data.length > 0 && meJson.data.status !== this.STATUS_DISABLE) {
          data.map((item, key) => {
            const tabReward = new TabRewards({
              item,
              divPopup,
              meJson,
              org,
              total,
              current,
              containerProfile,
            });
            tabReward.render();
          });
        } else {
          const tabReward = new TabRewards({
            item: {},
            divPopup,
            meJson,
            org,
            total,
            current,
            containerProfile,
          });
          tabReward.renderNoReward();
        }
        this.loaddingOffPromotion();
      })
      .catch((error) => {
        const cantFetch503 = new CantFetch503({ divInclude });
        cantFetch503.render();
        console.error("Error reward: ", error);
        this.loaddingOffPromotion();
      });
  }

  loaddingOffPromotion() {
    const shadow = document.getElementById("hrv-loyalty");
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-promotion-loaddingoff"
    ).classList = "";
  }

  fetchConfigNoLogin() {
    const shadow = document.getElementById("hrv-loyalty");
    const divPopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    const org = {
      id: this.orgId,
      name: this.orgName,
    };
    const localStorage = window.localStorage;
    const cacheKey = "loy_floating";
    let floatingSetting = localStorage.getItem(cacheKey);
    let loadFromServer = true;
    if (floatingSetting != undefined && floatingSetting != null) {
      floatingSetting = JSON.parse(floatingSetting);
      const now = new Date();
      const thresholdTimeInSeconds = 180000; // 3 minutes
      if (
        floatingSetting.id > 0 &&
        now.getTime() - floatingSetting.time < thresholdTimeInSeconds
      ) {
        loadFromServer = false;
        const noLogin = new NoLogin({
          divPopup,
          data: floatingSetting,
          org,
        });
        noLogin.render();
      }
    }
    if (loadFromServer) {
      fetch(`${this.locationOrigin}/apps/loyalty/webfloating.json`)
        .then((response) => response.json())
        .then((response) => {
          const data = {
            ...response.data,
            time: new Date().getTime(),
          };
          localStorage.setItem(cacheKey, JSON.stringify(data));
          const noLogin = new NoLogin({ divPopup, data, org });
          noLogin.render();
        })
        .catch((error) => {
          console.log(error, "Lỗi");
        });
    }
  }
}

export default Heart;
