import options from "./options";
import Heart from "./components/heart";
import NoMember from "./components/no_member";
import CantFetch404 from "./components/cantFetch404";
import CantFetch503 from "./components/cantFetch503";
import NoLogin from "./components/noLogin";
import ProfileInformation from "./components/profile_information";

import {
  filledCodeToInputOmni,
  getLocale,
  getSession,
  getVersion,
  logLoyalty,
  removeSession,
  setSession,
  waitFor,
} from "./helper";

let position = {
  currentX: 0,
  currentY: 0,
  initialX: 0,
  initialY: 0,
  xOffset: 0,
  yOffset: 0,
  pos1: 0,
  pos2: 0,
  pos3: 0,
  pos4: 0,
};

let org = "";

class Haraloyalty {
  wrapper = null;
  styleFirst = null;
  id_org = null;
  org_name = null;
  locationOrigin = window.location.origin;
  res_me_json = "";
  retry_get_profile = 0;
  shadow = null;
  divPopup = null;
  STATUS_ACTIVE = 1; //Đang kích hoạt
  STATUS_DISABLE = 3; //Đã khoá
  language = getLocale();
  heart = null;
  isExistance = false;

  async initialize() {
    await this.createStyleFirst();
    await this.createWrapper();
    const shadowRoot = document.getElementById("hrv-loyalty");
    const root = shadowRoot.attachShadow({ mode: "open" });
    const createDiv = document.createElement("div");
    root.appendChild(createDiv);
    createDiv.setAttribute("id", "hrv-loyalty-webfloating");
    const container = root.getElementById("hrv-loyalty-webfloating"),
      o = document.createElement("style"),
      newStyle = document.createElement("style"),
      e = document.createElement("div"),
      i = document.createElement("div");
    newStyle.innerHTML = options.newCss;
    newStyle.setAttribute("type", "text/css");
    container.append(newStyle);
    i.setAttribute("style", "display:none");
    container.append(e);
    (o.innerHTML = options.styleCssDivPopup),
      o.setAttribute("type", "text/css"),
      container.append(o),
      (e.classList = "hrv-loyalty-modal hrv-loyalty-close-popup"),
      e.setAttribute("id", "hrv-loyalty-open"),
      (i.classList = "hrv-loyalty-include"),
      i.setAttribute("id", "hrv-loyalty-include-popup"),
      e.append(i),
      (i.innerHTML =
        '\n\t\t\t\t\t\t\t\t\t<div  style="top:50%" class="hrv-loyalty-loading" id="hrv-loyalty-firstinit-loaddingoff">\n\t\t\t\t\t\t\t\t\t</div>');
    setTimeout(() => {
      i.setAttribute("style", "");
    }, 1000);
    this.shadow = document.getElementById("hrv-loyalty");
    this.divPopup = this.shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    this.createRender(container);
  }

  createRender(container) {
    const divPopup = this.divPopup;
    this.heart = new Heart({
      container: container,
      language: this.language,
    });

    const globalMeta = meta;

    fetch(this.locationOrigin + "/meta.json")
      .then((response) => response.json())
      .then((response) => {
        this.id_org = response ? response.id : "";
        this.org_name = response ? response.name : "";
        org = response ? response.id : "";
        this.heart.setOrgId(this.id_org);
        this.heart.setOrgName(this.org_name);

        // Check user logined => fetch Profile
        if (globalMeta) {
          if (globalMeta?.page && globalMeta?.page?.customerId > 0) {
            this.fetchProfileByOrgId();
          } else {
            this.heart.render();
          }
        }
      })
      .catch((error) => {
        const cantFetch404 = new CantFetch404({ divPopup });
        cantFetch404.render();
      });

    logLoyalty("createRender", "success");
  }

  async fetchProfileByOrgId() {
    const shadow = document.getElementById("hrv-loyalty");
    const divInclude = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    const meJson = `${this.locationOrigin}/apps/loyalty/me.json`;
    let response = null;
    let logined = true;
    let needToBreak = false;
    let json = null;
    do {
      response = await fetch(meJson, { credentials: "same-origin" });
      if (response.status == 401) {
        const errorJson = await response.json();
        if (!errorJson.errors.includes("error_signature_invalid")) {
          await waitFor(1);
        } else {
          logined = false;
        }
      } else if (response.status == 200) {
        json = await response.json();
        if (json.message !== null && json.message !== undefined) {
          if (json.message === "error_not_found") {
            await waitFor(1);
          } else if (json.message === "success" && json.data.is_member === 0) {
            await waitFor(1);
          } else {
            needToBreak = true;
          }
        } else {
          needToBreak = true;
        }
      }
      ++this.retry_get_profile;
    } while (!needToBreak && this.retry_get_profile < 10 && logined);

    if (response.status === 200) {
      logLoyalty("login", { status: "success", data: json });

      if (json === null) {
        json = await response.json();
      }
      this.heart.render();
      this.renderLoginedCustomer(json);
    } else {
      logLoyalty("login", { status: "failed" });

      if (response.status >= 500) {
        const cantFetch503 = new CantFetch503({ divInclude });
        cantFetch503.render();
      } else if (response.status == 401) {
        this.heart.render();
      }
    }
  }

  renderLoginedCustomer(response) {
    const shadow = document.getElementById("hrv-loyalty");
    const divPopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    if (response.data.is_member === 0) {
      const noMember = new NoMember({ divPopup });
      noMember.render();
      logLoyalty("profile", {
        status: "no member [no login | is member | no member]",
      });
    } else {
      this.res_me_json = response;
      this.heart.setProfile(response);
      const profileInformation = new ProfileInformation({
        divPopup,
        response,
        org,
      });
      profileInformation.render();

      this.heart.setContainerProfile(profileInformation);

      logLoyalty("profile", {
        status: "is member [no login | is member | no member]",
      });
    }
  }

  fetchConfigNoLogin() {
    const shadow = document.getElementById("hrv-loyalty");
    const divPopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    const org = {
      id: this.id_org,
      name: this.org_name,
    };
    const localStorage = window.localStorage;
    const cacheKey = "loy_floating";
    let floatingSetting = localStorage.getItem(cacheKey);
    let loadFromServer = true;
    if (floatingSetting != undefined && floatingSetting != null) {
      floatingSetting = JSON.parse(floatingSetting);
      const now = new Date();
      const thresholdTimeInSeconds = 180000; // 3 minutes
      const currentVersion = getVersion();

      if (
        floatingSetting.id > 0 &&
        now.getTime() - floatingSetting.time < thresholdTimeInSeconds &&
        currentVersion === floatingSetting.version
      ) {
        loadFromServer = false;
        const noLogin = new NoLogin({
          divPopup,
          data: floatingSetting,
          org,
        });

        noLogin.render();

        logLoyalty("cache", {
          status: "Webfloating Cache",
          data: floatingSetting,
        });
      }
    }

    if (loadFromServer) {
      fetch(`${window.location.origin}/apps/loyalty/webfloating.json`)
        .then((response) => response.json())
        .then((response) => {
          const data = {
            ...response.data,
            time: new Date().getTime(),
            version: getVersion(),
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

  createStyleFirst() {
    this.styleFirst = document.createElement("style");
    document.documentElement.appendChild(this.styleFirst);
    this.styleFirst.setAttribute("type", "text/css");
    this.styleFirst.innerHTML = `#hrv-loyalty{
            position: fixed;
            bottom: 1.5em;
            left: 2.5em;
            z-index: 999999123;
        }
        @media only screen and (max-width: 767px){
            #hrv-loyalty{
                bottom: 1.5em;
                left: 0.5em;
            }
        }
        `;
  }

  createWrapper() {
    this.wrapper = document.createElement("hrv-loyalty");
    this.wrapper.setAttribute("id", "hrv-loyalty");
    document.documentElement.appendChild(this.wrapper);
  }

  dragStart(e) {
    if (e.type === "touchstart") {
      position.initialX = e.touches[0].clientX - position.xOffset;
      position.initialY = e.touches[0].clientY - position.yOffset;
    }
  }

  dragEnd(e) {
    Haraloyalty.position.initialX = Haraloyalty.position.currentX;
    Haraloyalty.position.initialY = Haraloyalty.position.currentY;
  }

  drag(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const shadow = document.getElementById("hrv-loyalty");
    const buttonPopup = shadow.shadowRoot.getElementById(
      "button-popup-loyalty-1"
    );
    e.preventDefault();
    if (e.type === "touchmove") {
      position.currentX = e.touches[0].clientX - position.initialX;
      position.currentY = e.touches[0].clientY - position.initialY;
    }
    if (position.currentX > width - 100) {
      position.xOffset = width - 100;
    } else if (position.currentX < 0) {
      position.xOffset = 0;
    } else {
      position.xOffset = position.currentX;
    }

    position.yOffset = position.currentY;
    buttonPopup.style.transform =
      "translate3d(" + position.xOffset + "px, " + position.yOffset + "px, 0)";
  }

  dragElement() {
    const width = window.innerWidth / 2;
    const shadow = document.getElementById("hrv-loyalty");
    const buttonPopup = shadow.shadowRoot.getElementById(
      "button-popup-loyalty-1"
    );
    const divPopup = shadow.shadowRoot.getElementById("hrv-loyalty-open");
    if (document.getElementById(buttonPopup.id + "header")) {
      document.getElementById(buttonPopup.id + "header").onmousedown =
        dragMouseDown;
    } else {
      buttonPopup.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      position.pos3 = e.clientX;
      position.pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      position.pos1 = position.pos3 - e.clientX;
      position.pos2 = position.pos4 - e.clientY;
      position.pos3 = e.clientX;
      position.pos4 = e.clientY;
      buttonPopup.style.top = buttonPopup.offsetTop - position.pos2 + "px";
      buttonPopup.style.left = buttonPopup.offsetLeft - position.pos1 + "px";
      if (buttonPopup.offsetLeft - position.pos1 + 30 > width) {
        divPopup.style.transform = "translate(-100%,0%)";
        divPopup.style.bottom =
          (buttonPopup.offsetTop - position.pos2) * -1 + 20 + "px";
        divPopup.style.left =
          buttonPopup.offsetLeft - position.pos1 + 100 + "px";
      } else {
        divPopup.style.transform = "translate(0%,0%)";
        divPopup.style.bottom =
          (buttonPopup.offsetTop - position.pos2) * -1 + 20 + "px";
        divPopup.style.left =
          buttonPopup.offsetLeft - position.pos1 + 30 + "px";
      }
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

const HaraloyaltyInit = async function () {
  const haraLoyalty = new Haraloyalty();

  if (!getVersion()) {
    await haraLoyalty.initialize();
  } else {
    console.log("Notice: Loop Floating Detected");
  }

  const shadow = await document.getElementById("hrv-loyalty");

  setTimeout(function () {
    const buttonPopup = shadow.shadowRoot.getElementById(
      "button-popup-loyalty-1"
    );

    if (buttonPopup !== null) {
      buttonPopup.addEventListener("touchstart", haraLoyalty.dragStart, false);
      buttonPopup.addEventListener("touchend", haraLoyalty.dragEnd, false);
      buttonPopup.addEventListener("touchmove", haraLoyalty.drag, false);
      buttonPopup.addEventListener("mouseover", function () {
        haraLoyalty.dragElement();
      });
    }
  }, 1000);

  if (window.location.href.includes("checkouts")) {
    setTimeout(() => {
      if (getLocale() == "en") {
        // Chương trình chiết khấu theo hạng thàng viên
        if (
          document.getElementsByClassName("total-line total-line-redeem")[0]
        ) {
          const text = document.getElementsByClassName(
            "total-line total-line-redeem"
          )[0].firstElementChild;
          text.innerHTML = text.innerHTML.replace(
            "Chương trình khách hàng thân thiết",
            "Loyalty program"
          );
          text.innerHTML = text.innerHTML.replace("Giảm", "Discount");
          text.innerHTML = text.innerHTML.replace("tối đa", "maximum");

          console.log(result, "_result");
        }

        if (document.getElementsByClassName("redeem-login-title")[0]) {
          const text =
            document.getElementsByClassName("redeem-login-title")[0]
              .childNodes[3];
          text.innerHTML = text.innerHTML.replace(
            "Số tiền còn lại",
            "Amount left"
          );
          const text2 = document
            .getElementById("form_redeem_add")
            .getElementsByClassName("field-label")[0];
          const text3 = document
            .getElementById("form_redeem_add")
            .getElementsByClassName("field-input")[0];
          const text4 = document
            .getElementById("form_redeem_add")
            .getElementsByClassName("btn-content")[0];
          text2.innerHTML = text2.innerHTML.replace(
            "Áp dụng tối đa",
            "Apply maximum"
          );
          text3.setAttribute("placeholder", `${text2.innerHTML}`);
          text4.innerHTML = `Apply`;
        }
      }
    }, 300);
  }

  // Auto apply coupon khi Webfloating được khởi tạo
  // #1: Checkout URL xem coi có mã Coupon được sinh ra hay không ?
  const coupon_key = "hrl_anonymous_coupons"; // Lưu list coupon
  const coupon_selected = "hrl_anonymous_discount_selected"; // Lưu coupon từ floating
  const coupon_selected_params = "hrl_anonymous_params_selected"; // Lưu coupon từ params link

  const couponSaved = getSession(coupon_key);
  const couponIdSaved = getSession(coupon_selected);
  const couponIdParamsSaved = getSession(coupon_selected_params);

  const queryString = window.location.search; // lấy params từ URL
  const urlParams = new URLSearchParams(queryString); // parse URL

  const coupon_id = urlParams.get("coupon_id");
  const coupon_code = urlParams.get("coupon_code");

  // #2: Lưu Coupon dưới SessionStorage ?
  if (coupon_id?.length && coupon_code?.length) {
    if (
      couponSaved[coupon_id] === null ||
      couponSaved[coupon_id] === undefined ||
      couponSaved[coupon_id] === ""
    ) {
      couponSaved[coupon_id] = coupon_code;
      setSession(coupon_key, JSON.stringify(couponSaved));
      setSession(coupon_selected_params, coupon_id);
    }
  }

  // #3: Mã auto aplly khi floating được khởi tạo. Apply theo mã Coupon hiện tại chứa trong Sessionstorage.
  function getCouponToApplied() {
    if (
      typeof couponSaved[couponIdParamsSaved] !== "undefined" &&
      couponSaved[couponIdParamsSaved]
    ) {
      // ? TH có coupon từ params
      return couponIdParamsSaved;
    }

    if (
      typeof couponSaved[couponIdSaved] !== "undefined" &&
      couponSaved[couponIdSaved]
    ) {
      // ? TH có coupon từ floating
      return couponIdSaved;
    }

    return "";
  }

  const couponUsed = getCouponToApplied();

  if (couponUsed !== "") {
    filledCodeToInputOmni(couponSaved[couponUsed]);

    if (window.location.href.includes("checkouts")) {
      // * Loop trong checkouts screen kích hoạt nút submit mã coupon
      const btnlist = document.getElementsByClassName(
        "field-input-btn btn btn-default"
      );

      for (let i = 0; i <= btnlist.length; i++) {
        if (btnlist[i] != undefined) {
          btnlist[i].click();

          couponUsed == couponIdParamsSaved &&
            removeSession(coupon_selected_params);

          couponUsed == couponIdSaved && removeSession(coupon_selected);
        }
      }
    }
  }
};

window.attachEvent
  ? window.attachEvent("onload", HaraloyaltyInit)
  : window.addEventListener
  ? window.addEventListener("load", HaraloyaltyInit, !1)
  : document.addEventListener("load", HaraloyaltyInit, !1);

HaraloyaltyInit();
