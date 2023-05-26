import { formatNumber, Trans } from "../helper";
import TabRewardDetail from "./tab_rewards_detail";
// import CantFetch503 from '../cantFetch503';

let currentpagePromotion = {
  maxPage: 1,
  page: 1,
};

function onClickDetail(id, id_org, containerMembership) {
  const shadow = document.getElementById("hrv-loyalty");
  const contentId = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );
  contentId.setAttribute("style", "display:none");
  const inCludePopup = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    ),
    divRender = document.createElement("div");
  inCludePopup.append(divRender);
  divRender.setAttribute("id", "hrv-loyalty-coupons-click-include");
  const divLoading = document.createElement("div");
  divLoading.classList = "hrv-loyalty-loading";
  divLoading.setAttribute("id", "hrv-loyalty-click-coupons-loaddingoff");
  divLoading.setAttribute("style", "top:50%");
  divRender.append(divLoading);
  const web = window.location.origin;
  const ApiIdCoupons =
    web + `/apps/loyalty/rewards/${id}.json?org_id=${id_org}`;
  fetch(ApiIdCoupons)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;
      if (response.status == 1) {
        const tabRewardDetail = new TabRewardDetail({
          data,
          id_org,
          containerMembership,
        });
        tabRewardDetail.render();
      } else {
        const tabRewardDetail = new TabRewardDetail({
          data,
          id_org,
          containerMembership,
        });
        tabRewardDetail.isUsedCoupons();
      }
    })
    .catch((error) => console.error("error reward", error));
}

function clickLoadMore(org) {
  const location = window.location.origin;
  const shadow = document.getElementById("hrv-loyalty");
  const divinclude = shadow.shadowRoot.getElementById("hrv-loyalty-reward");
  const divLoad = shadow.shadowRoot.getElementById(
    "hrv-loyalty-loadmore-reward"
  );
  const nextPagePromotion = currentpagePromotion.page + 1;
  currentpagePromotion.page = nextPagePromotion;
  const apiPromotion = `${location}/apps/loyalty/rewards.json?org_id=${org}&limit=4&page=${nextPagePromotion}`;
  fetch(apiPromotion)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data.data;
      const limit = 4;
      const maxPage = Math.ceil(response.data.total / limit);
      currentpagePromotion.maxPage = maxPage;
      data.length > 0
        ? data.map((item, key) => {
            divLoad.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
            const divInclude = shadow.shadowRoot.getElementById(
                "hrv-loyalty-promotion"
              ),
              divRender =
                (document.getElementsByClassName("hrv-loyalty-image-copouns"),
                document.createElement("div")),
              image = `<img src="${item.discount.image_url}" />`;
            const html = `<div class="hrv-loyalty-image-copouns">
          ${
            item.discount.image_url == null || item.discount.image_url == ""
              ? `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" rx="8" fill="white"/><path d="M44 13C39.667 13 37.211 16.595 36 19.18C34.789 16.595 32.333 13 28 13C25.243 13 23 15.243 23 18C23 20.757 25.243 23 28 23H36H44C46.757 23 49 20.757 49 18C49 15.243 46.757 13 44 13ZM28 21C26.346 21 25 19.654 25 18C25 16.346 26.346 15 28 15C31.745 15 33.786 18.924 34.603 21H28ZM44 21H37.394C38.206 18.925 40.24 15 44 15C45.654 15 47 16.346 47 18C47 19.654 45.654 21 44 21Z" fill="#D1B43D"/><path d="M55 27H17V57C17 58.105 17.895 59 19 59H53C54.105 59 55 58.105 55 57V27Z" fill="#C94F49"/><path d="M57 21H15C13.895 21 13 21.895 13 23V29C13 30.105 13.895 31 15 31H57C58.105 31 59 30.105 59 29V23C59 21.895 58.105 21 57 21Z" fill="#E86C60"/><path d="M41 21H31V31H41V21Z" fill="#EFD358"/><path d="M41 31H31V59H41V31Z" fill="#D1B43D">
          </svg>`
              : image
          }
          </div>
          <div class="hrv-loyalty-content-coupons">
            <div class="hrv-text-coupons">
              <h3>${item.title}</h3>
              <p style="font-size:0.875em;font-weight:bold;color:#FC625D">${formatNumber(
                item.condition_value
              )} <span style="color:#000;font-weight:400">${Trans(
              "point"
            )}</span></p>
            </div>
          </div>`;
            divRender.setAttribute(
              "style",
              "animation: opacityfadein 2s;-moz-animation: opacityfadein 2s;-webkit-animation: opacityfadein 2s;-o-animation: opacityfadein 2s;background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg width='23.25em' height='6em'  fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58171 96 7.99999 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H364C368.418 96 372 92.4183 372 88V8C372 3.58172 368.418 0 364 0H102Z' fill='%23F5F5F5'/%3e%3c/svg%3e \");border-radius:8px;background-repeat: no-repeat;"
            );
            divInclude.append(divRender);
            divRender.classList = "hrv-loyalty-coupon-table";
            divRender.setAttribute("id", item.id);
            // divRender.setAttribute("onClick", "Haraloyalty.clickReward(this)");
            divRender.innerHTML = html;
            divRender.onclick = function () {
              onClickDetail(item.id, org);
            };
          })
        : "";
    })
    .catch((error) => {
      console.log(error, "Lỗi reward");
      // const divInclude = shadow.shadowRoot.getElementById('hrv-loyalty-include-popup');
      // const cantFetch503 = new CantFetch503({divInclude});
      // cantFetch503.render();
      // Haraloyalty.cantFetch(), console.error("error coupons"), Haraloyalty.loaddingOff()
    });
}
function renderButtonLoadmore() {
  const shadow = document.getElementById("hrv-loyalty");
  if (
    shadow.shadowRoot.contains(
      shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-reward")
    )
  ) {
    const divinclude = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-coupons"
    );
    const divHistory = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-history"
    );
    const divReward = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-reward"
    );

    divinclude.classList = "hrv-loyalty-loadmore-coupons unshowloadmore";
    divHistory.classList = "hrv-loyalty-loadmore-history unshowloadmore";
    divReward.classList = "hrv-loyalty-loadmore-reward showloadmore";
  }
}

function noRenderButtonLoadmore() {
  const shadow = document.getElementById("hrv-loyalty");
  if (
    shadow.shadowRoot.contains(
      shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-reward")
    )
  ) {
    const divinclude = shadow.shadowRoot.getElementById(
      "hrv-loyalty-loadmore-reward"
    );
    divinclude.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
  }
}

class TabRewards {
  containerMembership = null;
  container = null;
  tabReward = null;
  data = null;
  id_org = null;
  current = null;
  total = null;

  constructor(options) {
    this.container = options.divPopup;
    this.data = options.item;
    this.id_org = options.org;
    this.total = options.total;
    this.tabReward = document.createElement("div");
    this.container.append(this.tabReward);
    this.meJson = options.meJson;
    this.current = options.current;
    this.setContainerMembership(options.containerProfile);
  }

  setContainerMembership(container) {
    this.containerMembership = container;
  }

  renderNoReward() {
    const shadow = document.getElementById("hrv-loyalty");
    const STATUS_DISABLE = 3; //Đã khoá
    const getIdPromotion = shadow.shadowRoot.getElementById(
      "hrv-loyalty-promotion"
    );
    const image =
      (document.getElementsByClassName("hrv-loyalty-image-copouns"),
      document.createElement("div"));
    getIdPromotion.append(image),
      (image.classList = "hrv-loyalty-coupon-table-noData");
    image.innerHTML = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7889 30.4223C19.144 27.712 21.9141 26 24.9443 26H75.0557C78.0859 26 80.856 27.712 82.2111 30.4223L90 46H80L70 56H30L20 46H10L17.7889 30.4223Z" fill="white" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/><path d="M10 46H20L30 56H70L80 46H90V88C90 92.4183 86.4183 96 82 96H18C13.5817 96 10 92.4183 10 88V46Z" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/><path d="M50 4V16" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M72 6L66 16.3923" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 6L34 16.3923" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="27" y="70" width="46" height="10" rx="5" fill="white" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/></svg>
    <br/>
    ${
      this.meJson.data.status == STATUS_DISABLE
        ? `<p>${Trans("account_cant_redeemed")}.</p>`
        : `<p>${Trans("more_chances_rewards")}!</p>`
    }`;
    getIdPromotion.append(image);
  }

  render() {
    const { data, tabReward, id_org, current, total, containerMembership } =
      this;
    currentpagePromotion.maxPage = Math.ceil(total / current);
    const shadow = document.getElementById("hrv-loyalty");
    const getPromotion = shadow.shadowRoot.getElementById(
      "hrv-loyalty-promotion"
    );
    const renderItem =
      (document.getElementsByClassName("hrv-loyalty-image-copouns"),
      document.createElement("div"));
    // e = getDate(t.ended_at),
    const image = `<img src="${data.discount.image_url}" />`;
    const render = `<div class="hrv-loyalty-image-copouns">
                ${
                  data.discount.image_url == null ||
                  data.discount.image_url == ""
                    ? `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" rx="8" fill="white"/><path d="M44 13C39.667 13 37.211 16.595 36 19.18C34.789 16.595 32.333 13 28 13C25.243 13 23 15.243 23 18C23 20.757 25.243 23 28 23H36H44C46.757 23 49 20.757 49 18C49 15.243 46.757 13 44 13ZM28 21C26.346 21 25 19.654 25 18C25 16.346 26.346 15 28 15C31.745 15 33.786 18.924 34.603 21H28ZM44 21H37.394C38.206 18.925 40.24 15 44 15C45.654 15 47 16.346 47 18C47 19.654 45.654 21 44 21Z" fill="#D1B43D"/><path d="M55 27H17V57C17 58.105 17.895 59 19 59H53C54.105 59 55 58.105 55 57V27Z" fill="#C94F49"/><path d="M57 21H15C13.895 21 13 21.895 13 23V29C13 30.105 13.895 31 15 31H57C58.105 31 59 30.105 59 29V23C59 21.895 58.105 21 57 21Z" fill="#E86C60"/><path d="M41 21H31V31H41V21Z" fill="#EFD358"/><path d="M41 31H31V59H41V31Z" fill="#D1B43D">
                    </svg>`
                    : image
                }
              </div>
              <div class="hrv-loyalty-content-coupons">
                <div class="hrv-text-coupons">
                  <h3>${data.title}</h3>
                  <p style="font-size:0.875em;font-weight:bold;color:#FC625D">${formatNumber(
                    data.condition_value
                  )} <span style="color:#000;font-weight:400">${Trans(
      "point"
    )}</span></p>
                </div>
              </div>`;
    renderItem.setAttribute(
      "style",
      "background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg width='23.25em' height='6em'  fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58171 96 7.99999 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H364C368.418 96 372 92.4183 372 88V8C372 3.58172 368.418 0 364 0H102Z' fill='%23F5F5F5'/%3e%3c/svg%3e \");border-radius:8px;background-repeat: no-repeat;"
    );
    getPromotion.append(renderItem);
    renderItem.classList = "hrv-loyalty-coupon-table";
    renderItem.setAttribute("id", data.id);
    renderItem.innerHTML = render;
    renderItem.onclick = function (e) {
      onClickDetail(data.id, id_org, containerMembership);
    };
    const includediv = shadow.shadowRoot.getElementById(
      "hrv-loyalty-include-popup"
    );
    const checkIdActive = shadow.shadowRoot.getElementById(
      "hrv-loyalty-promotion"
    );
    const scrollAction = () => {
      const scrollId = shadow.shadowRoot.getElementById(
        "hrv-loyalty-tab-content-id"
      );
      scrollId.addEventListener("scroll", function () {
        // console.log(checkIdActive.classList.contains("active"),checkIdActive);
        if (
          checkIdActive.classList.contains("active") &&
          scrollId !== null &&
          scrollId.scrollTop + scrollId.clientHeight + 60 >=
            scrollId.scrollHeight &&
          shadow.shadowRoot.getElementById(
            "hrv-loyalty-coupons-click-include"
          ) === null &&
          currentpagePromotion.page < currentpagePromotion.maxPage
        ) {
          const checkIdLoadMore = shadow.shadowRoot.getElementById(
            "hrv-loyalty-loadmore-reward"
          );
          checkIdLoadMore.onclick = function () {
            clickLoadMore(id_org);
          };
          renderButtonLoadmore();
        } else {
          noRenderButtonLoadmore();
        }
      });
    };
    includediv.addEventListener("mouseover", scrollAction());
    includediv.addEventListener("touchstart", scrollAction());
  }
}

export default TabRewards;
