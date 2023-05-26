import { formatNumber, Trans } from "../helper";

let referrals = {
  status: "",
  name_coupons: "",
  meJson: "",
};

const PACKAGE_SCALE = 99;
const PACKAGE_LITE_PLUS = 4;
const PACKAGE_PLUS = 100;

function changeTabReward() {
  // hide load more
  const shadow = document.getElementById("hrv-loyalty");
  const divinclude = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );
  divinclude.scroll({
    top: -divinclude.scrollTop,
    left: 0,
    behavior: "smooth",
  });
  const tabActiveCoupon = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-coupons"
  );
  const tabActiveHistory = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-history"
  );
  const tabActivePromotion = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-promotion"
  );

  const contentCoupon = shadow.shadowRoot.getElementById(
    "hrv-loyalty-coupons-wrapper"
  );
  const tabPromotion = shadow.shadowRoot.getElementById(
    "hrv-loyalty-promotion"
  );
  const tabHistory = shadow.shadowRoot.getElementById("hrv-loyalty-history");

  tabPromotion.classList = "active";
  tabActivePromotion.classList = "hrv-myTab hrv-myTab-promotion-active";
  tabActiveCoupon.classList = "hrv-myTab";
  tabActiveHistory.classList = "hrv-myTab";

  tabHistory.classList.contains("active") &&
    tabHistory.classList.remove("active");
  contentCoupon.classList.contains("active") &&
    contentCoupon.classList.remove("active");

  const loadmore = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-coupons"
  );
  const loadmoreReward = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-reward"
  );

  loadmore.classList = "hrv-loyalty-loadmore-coupons unshowloadmore";
  loadmoreReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
}

function changeTabHistory() {
  const shadow = document.getElementById("hrv-loyalty");
  const divinclude = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );
  divinclude.scroll({
    top: -divinclude.scrollTop,
    left: 0,
    behavior: "smooth",
  });
  const tabActiveCoupon = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-coupons"
  );
  const tabActiveHistory = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-history"
  );
  const tabActivePromotion = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-promotion"
  );

  const contentCoupon = shadow.shadowRoot.getElementById(
    "hrv-loyalty-coupons-wrapper"
  );
  const tabPromotion = shadow.shadowRoot.getElementById(
    "hrv-loyalty-promotion"
  );
  const tabHistory = shadow.shadowRoot.getElementById("hrv-loyalty-history");

  tabHistory.classList = "active";
  tabActivePromotion.classList = "hrv-myTab";
  tabActiveCoupon.classList = "hrv-myTab";
  tabActiveHistory.classList = "hrv-myTab hrv-myTab-history-active";

  contentCoupon.classList.contains("active") &&
    contentCoupon.classList.remove("active");
  tabPromotion.classList.contains("active") &&
    tabPromotion.classList.remove("active");
  const loadmore = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-coupons"
  );
  const loadmoreReward = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-reward"
  );

  loadmore.classList = "hrv-loyalty-loadmore-coupons unshowloadmore";
  loadmoreReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
}

function changeTabCoupons() {
  const shadow = document.getElementById("hrv-loyalty");
  const divinclude = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );
  divinclude.scroll({
    top: -divinclude.scrollTop,
    left: 0,
    behavior: "smooth",
  });
  const tabActiveCoupon = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-coupons"
  );
  const tabActiveHistory = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-history"
  );
  const tabActivePromotion = shadow.shadowRoot.getElementById(
    "hrv-myTab-active-promotion"
  );

  const contentCoupon = shadow.shadowRoot.getElementById(
    "hrv-loyalty-coupons-wrapper"
  );
  const tabPromotion = shadow.shadowRoot.getElementById(
    "hrv-loyalty-promotion"
  );
  const tabHistory = shadow.shadowRoot.getElementById("hrv-loyalty-history");

  contentCoupon.classList = "active";
  tabActivePromotion.classList = "hrv-myTab";
  tabActiveCoupon.classList = "hrv-myTab hrv-myTab-coupons-active";
  tabActiveHistory.classList = "hrv-myTab";

  tabHistory.classList.contains("active") &&
    tabHistory.classList.remove("active");
  tabPromotion.classList.contains("active") &&
    tabPromotion.classList.remove("active");
  const loadmore = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-coupons"
  );
  const loadmoreReward = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-reward"
  );

  loadmore.classList = "hrv-loyalty-loadmore-coupons unshowloadmore";
  loadmoreReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";

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

    divReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
    divHistory.classList = "hrv-loyalty-loadmore-history unshowloadmore";

    divinclude.classList = "hrv-loyalty-loadmore-coupons";
  }

  if (contentCoupon.classList.contains("active")) {
    // renderButtonScroll();
  }
}

function onClickpopup() {
  const shadow = document.getElementById("hrv-loyalty");
  const divOpen = shadow.shadowRoot.getElementById("hrv-loyalty-open");
  divOpen.classList.contains("hrv-loyalty-close-popup")
    ? (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-open-popup")
    : (divOpen.classList = "hrv-loyalty-modal hrv-loyalty-close-popup");
}

function closeSendCoupon() {
  const shadow = document.getElementById("hrv-loyalty");
  const getSend = shadow.shadowRoot.getElementById("hrv-loyalty-send-coupon");
  const getBackGround = shadow.shadowRoot.getElementById(
    "hrv-loyalty-background-black-send-coupon"
  );
  getSend.classList = "hrv-loyalty-send-coupon hrv-loyalty-send-coupon-close";
  getBackGround.classList = "hrv-loyalty-send-coupon-close";
  getSend.parentNode.removeChild(getSend);
}

function renderRefferals() {
  const shadow = document.getElementById("hrv-loyalty");
  const getIdRefferals = shadow.shadowRoot.getElementById(
    "hrv-loyalty-send-coupon"
  );
  const getElementBG = shadow.shadowRoot.getElementById(
    "hrv-loyalty-background-black-send-coupon"
  );
  getIdRefferals.classList = "hrv-loyalty-send-coupon";
  getElementBG.classList = "hrv-loyalty-background-black-send-coupon";
  const html = `
  <div id="hrv-loyalty-close-refferrals" style="position: absolute;right: 5px;top: 5px;cursor: pointer;">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.66659 1.2735L8.72659 0.333496L4.99992 4.06016L1.27325 0.333496L0.333252 1.2735L4.05992 5.00016L0.333252 8.72683L1.27325 9.66683L4.99992 5.94016L8.72659 9.66683L9.66659 8.72683L5.93992 5.00016L9.66659 1.2735Z" fill="#424242"/>
      </svg>
    </div>
    <p style="text-align: left;padding-left: 2.2em">${
      referrals.name_coupons
    }</p>
    <div style="display: flex;width: 85%;margin: 0 auto;">
      <form style="width: 80%">
          <input
              type="number"
              min="0"
              step="1"
              onfocus="this.previousValue = this.value"
              onkeydown="this.previousValue = this.value"
              oninput="validity.valid || (value = this.previousValue)"
              class="hrv-loyalty-input" 
              placeholder="Nhập số điện thoại bạn bè..." 
              id="hrv-loyalty-user-friend"
          />
      </form>
      <div id="hrv-loyalty-send-coupon-left" class="hrv-loyalty-send-coupon-left" style="position:relative">
          <p>${Trans("send")}</p>
      </div>
    </div>
    <div id="hrv-loyalty-errorInput"></div>
    </div>
  </div>`;
  getIdRefferals.innerHTML = html;
  const getcloseX = shadow.shadowRoot.getElementById(
    "hrv-loyalty-close-refferrals"
  );
  const getSend = shadow.shadowRoot.getElementById(
    "hrv-loyalty-send-coupon-left"
  );
  getSend.onclick = function () {
    confirmReferrals();
  };
  getcloseX.onclick = function () {
    closeSendCoupon();
  };
}

function checkCampainsRewardActive(org) {
  const orgId = org;
  const shadow = document.getElementById("hrv-loyalty");
  const location = window.location.origin;
  const ApiRewardActive = location + `/apps/loyalty/referrals/status.json`;
  fetch(ApiRewardActive)
    .then((res) => res.json())
    .then((res) => {
      referrals.status = res.data.status;
      const ApiGetCoupons = location + `/apps/loyalty/referrals/promotion.json`;
      fetch(ApiGetCoupons)
        .then((res) => res.json())
        .then((res) => {
          // console.log(res,'___Gửi mã ưu đãi cho bạn bè!')
          if (res.status == 1 && res.data) {
            if (res.data.settings.promotion == 1) {
              referrals.name_coupons = `Gửi mã ưu đãi giảm ${formatNumber(
                res.data.settings.promotion_value
              )}đ cho bạn bè!`;
            } else if (res.data.settings.promotion == 2) {
              referrals.name_coupons = `Gửi mã ưu đãi giảm ${formatNumber(
                res.data.settings.promotion_value
              )}% cho bạn bè!`;
            } else {
              referrals.name_coupons = `Gửi mã ưu đãi cho bạn bè!`;
            }
            onClickpopup();
            renderRefferals();
          }
        })
        .catch((error) => {
          console.error("Error Api get coupons:", error);
          referrals.name_coupons = `Gửi mã ưu đãi cho bạn bè!`;
        });
    })
    .catch((error) => {
      console.log("Lỗi", error);
    });
}

function confirmReferrals() {
  const imageee = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="url(#paint0_linear_success)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1692 40.4761C33.8104 40.4761 40.8155 33.471 40.8155 24.8299C40.8155 16.1887 33.8104 9.18359 25.1692 9.18359C16.528 9.18359 9.52295 16.1887 9.52295 24.8299C9.52295 33.471 16.528 40.4761 25.1692 40.4761Z" fill="url(#paint1_linear_success)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.7372 20.325C33.3504 20.9312 33.353 21.9166 32.743 22.526L24.9111 30.3491C24.6172 30.6427 24.2175 30.8078 23.8007 30.8078C23.3839 30.8078 22.9842 30.6427 22.6903 30.3491L17.597 25.2614C16.9869 24.6521 16.9895 23.6667 17.6028 23.0605C18.2161 22.4543 19.2078 22.4569 19.8178 23.0663L23.8007 27.0447L30.5221 20.3308C31.1322 19.7214 32.1239 19.7188 32.7372 20.325Z" fill="white"/>
  <defs>
  <linearGradient id="paint0_linear_success" x1="-11.2398" y1="-20.9018" x2="76.308" y2="25.8783" gradientUnits="userSpaceOnUse">
  <stop stop-color="#85F2CC"/>
  <stop offset="1" stop-color="#159468"/>
  </linearGradient>
  <linearGradient id="paint1_linear_success" x1="2.48851" y1="-3.89778" x2="57.2803" y2="25.3795" gradientUnits="userSpaceOnUse">
  <stop stop-color="#85F2CC"/>
  <stop offset="1" stop-color="#159468"/>
  </linearGradient>
  </defs>
  </svg>
  `;
  const shadow = document.getElementById("hrv-loyalty");
  const idSendCoupon = shadow.shadowRoot.getElementById(
    "hrv-loyalty-send-coupon"
  );
  const getBackGround = shadow.shadowRoot.getElementById(
    "hrv-loyalty-user-friend"
  );
  const getErroInput = shadow.shadowRoot.getElementById(
    "hrv-loyalty-errorInput"
  );
  const divInput = shadow.shadowRoot.getElementById(
    "hrv-loyalty-send-coupon-left"
  );
  const info = referrals.meJson;
  const i = window.location.origin;
  const ApiRewardSend = i + `/apps/loyalty/referrals/send.json`;

  if (getBackGround.value.length < 8 || getBackGround.value.length > 12) {
    getErroInput.innerHTML = `<span style="color: red">*Vui lòng nhập đúng số điện thoại</span>`;
  } else {
    divInput.innerHTML = `<div class="hrv-loyalty-loading-input"></div>`;
    divInput.setAttribute(
      "style",
      "opacity: 0.5;cursor: not-allowed;position: relative "
    );
    fetch(ApiRewardSend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_profile_id: info.data.customer_profile_id,
        phone: getBackGround.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        if (data.status) {
          idSendCoupon.innerHTML = `
                      <div style="padding-top:0.5em">
                          ${imageee}
                          <p>${Trans("referral_successfully")}</p>
                      </div>`;
          setTimeout(() => {
            closeSendCoupon();
          }, 3000);
        } else {
          divInput.innerHTML = `<p>${Trans("send")}</p>`;
          divInput.setAttribute("style", "");
          getErroInput.innerHTML = `<span style="color: red">*${data.message_text}</span>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        divInput.innerHTML = `<p>${Trans("send")}</p>`;
        divInput.setAttribute("style", "");
        getErroInput.innerHTML = `<span style="color: red">*${Trans(
          "an_error_has_occurred"
        )}!</span>`;
      });
  }
}

function onClicklogOut() {
  const t = window.location.origin;
  window.location = t + "/account/logout";
}

class ProfileInformation {
  container = null;
  containerProfile = null;
  button = null;
  response = "";
  org = "";
  constructor(options) {
    this.container = options.divPopup;
    this.response = options.response;
    this.org = options.org;
    this.profile = this.response.data;
    this.package_type = this.profile.package_type;
  }

  minusAvailablePoint(point) {
    this.profile.available_points -= point;
  }

  buildPointHtml() {
    const level = this.profile.current_membership_level;
    const point = this.profile.available_points;

    return `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3.94868 6.31623C3.5578 6.18594 3.18593 6.5578 3.31623 6.94868L4.88604 11.6581C4.95409 11.8623 5.14516 12 5.36038 12H10.6396C10.8548 12 11.0459 11.8623 11.114 11.6581L12.6838 6.94868C12.8141 6.5578 12.4422 6.18594 12.0513 6.31623L10.3623 6.87923C10.1484 6.95053 9.91323 6.86985 9.78816 6.68224L8.41603 4.62404C8.21811 4.32717 7.78189 4.32717 7.58397 4.62404L6.21184 6.68224C6.08677 6.86985 5.8516 6.95053 5.6377 6.87923L3.94868 6.31623Z" fill="#212121"/></svg>&nbsp;
        <p id="hrv-loyalty-child">${level} • ${formatNumber(point)} ${Trans(
      "points"
    )}</p>
      `;
  }

  renderMembership() {
    this.containerProfile.innerHTML = this.buildPointHtml();
  }

  render() {
    const shadow = document.getElementById("hrv-loyalty");
    const loadding = shadow.shadowRoot.getElementById(
      "hrv-loyalty-firstinit-loaddingoff"
    );
    const level = this.profile.current_membership_level;
    const next_level = this.profile.next_membership_level;
    referrals.meJson = this.response;
    // Haraloyalty.levelCurrent = level;
    const point = this.profile.available_points;
    const STATUS_DISABLE = 3; //Đã khoá
    // Haraloyalty.pointCurrent = point;
    const percentage = Math.ceil(
      (this.profile.current_membership_level_point /
        this.profile.next_membership_level_point) *
        100
    );
    const svg = `<svg style="margin-top:2px" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.66675 8.6665L8.00008 11.9998L11.3334 8.6665" stroke="#2979FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.66675 4L8.00008 7.33333L11.3334 4" stroke="#2979FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    const formatMoney = Math.ceil(this.profile.remaining_money_to_level_up);
    const renderPercentage =
      level == next_level
        ? ""
        : `   <hr style="border-top: 1px solid #eee;margin-top:0.75em;margin-bottom:1em;"/>
                <p class="hrv-loyalty-next-level">${Trans(
                  "spend_an_extra"
                )} <span style="font-weight:600">${formatNumber(
            formatMoney
          )} VNĐ</span> ${Trans("to_level_up")} <span style="font-weight:600">${
            this.response.data.next_membership_level
          }</span></p>
                <div class="hrv-loyalty-progress">
                    <div class="hrv-loyalty-progress-bar" style="width:${percentage}%" >
                </div>`;

    const renderProcessingPoint = `${
      this.profile.processing_points !== 0
        ? `<div class="hara-loyalty-alert-log-aware">
          <div>${svgWarning}</div>

          <p>
            ${Trans("the_system_is_processing")} <strong>${formatNumber(
            this.profile.processing_points
          )}</strong> ${Trans("bonus_points_will_be_updated_again")}
          </p>
        </div>`
        : ""
    }`;

    const pointHtml = this.buildPointHtml();
    const renderProfile = `
        <div class="hrv-loyalty-header" id="scrollTop">
            <svg id="hrv-loyalty-logOut" style="cursor:pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V15H5V19H19V5H5V9H3V5C3 3.9 3.89 3 5 3ZM11.5 17L10.09 15.59L12.67 13H3V11H12.67L10.09 8.41L11.5 7L16.5 12L11.5 17Z" fill="#9E9E9E"/></svg><svg style="cursor:pointer" id="hrv-loyalty-click-close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9E9E9E"/></svg></div>
            <div class="hrv-loyalty-content">
              <div class="hrv-loyalty-avatar">
            <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#EEEEEE"/><circle cx="100" cy="75" r="35" fill="white"/><path d="M100 120C55.8172 120 20 155.817 20 200H180C180 155.817 144.183 120 100 120Z" fill="white"/></svg></div>
            <div class="hrv-loyalty-info">
                <h3>${this.profile.customer_fullname}</h3>
                <div id="hrv-loyalty-Member" class="hrv-loyalty-info-member">
                  ${pointHtml}
                </div>
            ${
              this.profile.status == STATUS_DISABLE
                ? `<div class="hrv-loyalty-blockMember hrv-loyalty-tooltip">${Trans(
                    "locked_membersip"
                  )}</div>`
                : [PACKAGE_SCALE, PACKAGE_LITE_PLUS, PACKAGE_PLUS].includes(
                    this.package_type
                  )
                ? renderPercentage
                : ""
            }   
            </div></div></div>

            <div class="hrv-loyalty-footer">
                <div class="hrv-myTab hrv-myTab-coupons-active" id="hrv-myTab-active-coupons">
                    <div class="hrv-myTab-copouns">
                        <p>${Trans("coupon")}</p>
                    </div>
                </div>

                ${
                  [PACKAGE_SCALE, PACKAGE_LITE_PLUS, PACKAGE_PLUS].includes(
                    this.package_type
                  )
                    ? `<div class="hrv-myTab" id="hrv-myTab-active-promotion">
                        <div class="hrv-myTab-promotion">
                            <p>${Trans("redeem_reward")}</p>
                        </div>
                    </div>
                <div class="hrv-myTab" id="hrv-myTab-active-history">
                    <div class="hrv-myTab-history">
                        <p>${Trans("your_history")}</p>
                    </div>
                </div>`
                    : ``
                }
            </div>
            <div class="hrv-loyalty-tab-content" id="hrv-loyalty-tab-content-id">
            <div class="active" id="hrv-loyalty-coupons-wrapper">
             
              <div id="hrv-loyalty-coupons-buyer" style="position: relative; min-height: 200px; display:none">
              <p style="
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              color: #212121;margin-top: 10px">${Trans("your_coupon")}</p>
              <div class="hrv-loyalty-loading" id="hrv-loyalty-coupons-buyer-loaddingoff">
              </div>
              <div id="hrv-loyalty-reward-coupon-push-in-wrapper"></div>
              </div>
              <div id="hrv-loyalty-coupons-shop" style="position: relative; min-height: 200px; display:none">
              <p style="
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              padding-top: 15px;
              color: #212121;">${Trans("coupon_shop")}</p>
              <div id="hrv-loyalty-coupons-wrapper-shop" style=" display: flex!important;
              flex-wrap: wrap!important; justify-content: space-between;
              "></div>
              <div class="hrv-loyalty-loading" id="hrv-loyalty-coupons-shop-loaddingoff">
              </div>
              </div>
            </div>


            <div class="" id="hrv-loyalty-history">
              ${renderProcessingPoint}
              <ul class="hara-loyalty-history-timeline" id="hrv-loyalty-timeline">
                  <div class="hrv-loyalty-loading" id="hrv-loyalty-history-loaddingoff">
                  </div>
              </ul>
            </div>


            <div class="" id="hrv-loyalty-promotion">
              <div class="hrv-loyalty-loading" id="hrv-loyalty-promotion-loaddingoff">
              </div>
            </div>
            </div>

            <div class="hrv-loyalty-loadmore-history unshowloadmore" id="hrv-loyalty-loadmore-history" style="position: absolute;bottom: 0.625em;z-index: 123123;margin-right: -50%;transform: translate(-50%, -50%);left: 50%;cursor: pointer">
                <div style="display: flex;margin: 0 auto;padding: 0.625em;background: #FFFFFF;box-shadow: 0px 4px 8px rgba(33, 33, 33, 0.1);border-radius: 1.25em;text-align: center;">
                  ${svg}
                  <p style="margin:0px">&nbsp;&nbsp;${Trans("load_more")}</p>
                </div>
            </div>

          <div class="hrv-loyalty-loadmore-reward unshowloadmore" id="hrv-loyalty-loadmore-reward" style="position: absolute;bottom: 0.625em;z-index: 123123;margin-right: -50%;transform: translate(-50%, -50%);left: 50%;cursor: pointer">
            <div style="display: flex;margin: 0 auto;padding: 0.625em;background: #FFFFFF;box-shadow: 0px 4px 8px rgba(33, 33, 33, 0.1);border-radius: 1.25em;text-align: center;">
                ${svg}
                <p style="margin:0px">&nbsp;&nbsp;${Trans("load_more")}</p>
            </div>
          </div>

          <div class="hrv-loyalty-loadmore-coupons unshowloadmore" id="hrv-loyalty-loadmore-coupons" style="position: absolute;bottom: 0.625em;z-index: 123123;margin-right: -50%;transform: translate(-50%, -50%);left: 50%;cursor: pointer;">
            <div style="display: flex;margin: 0 auto;padding: 0.625em;background: #FFFFFF;box-shadow: 0px 4px 8px rgba(33, 33, 33, 0.1);border-radius: 1.25em;text-align: center;">
                ${svgArrowDown}
                <p style="margin:0px; color: #2962FF">&nbsp;&nbsp;${Trans(
                  "coupon_shop"
                )}</p>
            </div>
          </div>


            <div class="hrv-loyalty-logo">
                 <div style="text-align: center;padding-top: 5px;background-color: #fff;border-radius:1.875em">
                     <span>powered by Haravan</span>
                 </div>   
            </div>

            <div id="hrv-loyalty-send-coupon">
            </div>

            <div id="hrv-loyalty-background-black-send-coupon">
        `;
    this.container.innerHTML = renderProfile;

    if (loadding !== null) {
      loadding.classList = "";
    }

    const getButtonHistory = shadow.shadowRoot.getElementById(
      "hrv-myTab-active-history"
    );
    const getButtonReward = shadow.shadowRoot.getElementById(
      "hrv-myTab-active-promotion"
    );
    const getButtonCoupon = shadow.shadowRoot.getElementById(
      "hrv-myTab-active-coupons"
    );
    const getButtonLogOut =
      shadow.shadowRoot.getElementById("hrv-loyalty-logOut");
    const getButtonClose = shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-close"
    );
    this.containerProfile =
      shadow.shadowRoot.getElementById("hrv-loyalty-Member");
    getButtonCoupon.onclick = function () {
      changeTabCoupons();
    };
    if (getButtonReward !== null) {
      getButtonReward.onclick = function () {
        changeTabReward();
      };
    }
    if (getButtonHistory !== null) {
      getButtonHistory.onclick = function () {
        changeTabHistory();
      };
    }
    getButtonLogOut.onclick = function () {
      onClicklogOut();
    };
    getButtonClose.onclick = function () {
      onClickpopup();
    };
    if (window.location.href.includes("thank_you")) {
      checkCampainsRewardActive();
    }
  }
}

const svgArrowDown = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<g id="icon_arrow-down">
<path id="icon/navigation/arrow_downward_24px" d="M13.3327 8.0013L12.3927 7.0613L8.66602 10.7813V2.66797H7.33268V10.7813L3.61268 7.05464L2.66602 8.0013L7.99935 13.3346L13.3327 8.0013Z" fill="#2979FF"/>
</g>
</svg>`;

const svgWarning = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.1668 17.0833L10.0002 1.25L0.833496 17.0833H19.1668ZM9.16683 14.5833V12.9167H10.8335V14.5833H9.16683ZM9.16683 11.25H10.8335V7.91667H9.16683V11.25Z" fill="#DB7706"/>
</svg>`;

export default ProfileInformation;
