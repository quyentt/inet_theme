import {
    filledCodeToInputOmni,
    getDate,
    getSession,
    setSession,
    Trans,
} from "../helper";
import TabCouponDetail from "./tab_coupon_detail";
import NoCouponRender from "./noCoupon";

export let currentpageCoupons = {
    total: 0,
    current: 0,
    maxPage: 1,
    page: 1,
};

function onClickDetail(id, id_org) {
    const shadow = document.getElementById("hrv-loyalty");
    const hrvLoyaltyTab = shadow.shadowRoot.getElementById(
        "hrv-loyalty-tab-content-id"
    );
    hrvLoyaltyTab.setAttribute("style", "display:none");
    const divInlucde = shadow.shadowRoot.getElementById(
        "hrv-loyalty-include-popup"
    );
    const divDetail = document.createElement("div");
    divInlucde.append(divDetail);
    divDetail.setAttribute("id", "hrv-loyalty-coupons-click-include");
    const divLoading = document.createElement("div");
    divLoading.classList = "hrv-loyalty-loading";
    divLoading.setAttribute("id", "hrv-loyalty-click-coupons-loaddingoff");
    divLoading.setAttribute("style", "top:50%");
    divDetail.append(divLoading);
    const url = window.location.origin;
    const ApiIdCoupons =
        url + `/apps/loyalty/coupons/${id}.json?org_id=${id_org}`;
    const backScreenElm = shadow.shadowRoot.getElementById(
        "hrv-loyalty-tab-content-id"
    );
    fetch(ApiIdCoupons)
        .then((response) => response.json())
        .then((response) => {
            if (response.data.is_used == 0) {
                const data = response.data;
                const tabCouponDetail = new TabCouponDetail({
                    divDetail,
                    data,
                    backScreenElm,
                });
                tabCouponDetail.render();
            } else {
                ("");
            }
        })
        .catch((error) => console.error("error coupons", error));
}

class TabCouponBuyer {
    container = null;
    tabCoupon = null;
    data = null;
    id_org = null;
    current = null;
    total = null;
    coupon_key = "hrl_anonymous_coupons";
    coupon_selected = "hrl_anonymous_discount_selected";

    constructor(options) {
        this.container = options.divPopup;
        this.data = options.dataItem;
        this.id_org = options.org;
        this.tabCoupon = document.createElement("div");
        if (!options.append) {
            this.container.prepend(this.tabCoupon);
        } else {
            this.container.append(this.tabCoupon);
        }
        this.total = options.total;
        this.current = options.current;

        currentpageCoupons.total = options.total;
        currentpageCoupons.current = options.current;
    }

    renderNoCoupon() {
        const noCoupon = new NoCouponRender({
            divPopup: this.tabCoupon,
        });

        noCoupon.render();
    }

    render() {
        const { data, tabCoupon, id_org, total, current } = this;
        const shadow = document.getElementById("hrv-loyalty");
        const coupon_key = "hrl_anonymous_coupons";
        const coupon_selected = "hrl_anonymous_discount_selected";
        currentpageCoupons.maxPage = Math.ceil(total / current);

        tabCoupon.classList = "hrv-loyalty-coupon-table";
        tabCoupon.setAttribute("id", `hrv-loyalty-copouns-${data.id}`);

        function applyCoupon(code) {
            filledCodeToInputOmni(code);
        }

        function firstLoadUpdateCouponClassUI() {
            const codeApplied = getSession(coupon_selected);

            if (
                codeApplied != null &&
                codeApplied != undefined &&
                codeApplied != ""
            ) {
                if (data.id == codeApplied) {
                    const idItem = `hrv-loyalty-copouns-${data.id}`;
                    const shadow = document.getElementById("hrv-loyalty");
                    const item = shadow.shadowRoot.getElementById(idItem);

                    if (item != null) {
                        item.classList.add("active-coupon");

                        item.querySelector(
                            "#hrv-loyalty-checkbox-icon"
                        ).setAttribute("fill", "#2962FF");

                        item.querySelector(
                            "#hrv-loyalty-checkbox-icon"
                        ).setAttribute(
                            "d",
                            "M7.00065 0.332031C3.32065 0.332031 0.333984 3.3187 0.333984 6.9987C0.333984 10.6787 3.32065 13.6654 7.00065 13.6654C10.6807 13.6654 13.6673 10.6787 13.6673 6.9987C13.6673 3.3187 10.6807 0.332031 7.00065 0.332031ZM5.66732 10.332L2.33398 6.9987L3.27398 6.0587L5.66732 8.44536L10.7273 3.38536L11.6673 4.33203L5.66732 10.332Z"
                        );

                        item.setAttribute(
                            "style",
                            `background-image: url(\"${svgCouponActive}\");border-radius:8px;background-repeat: no-repeat;`
                        );
                    }
                }
            }
        }

        tabCoupon.onclick = () => {
            let couponSaved = getSession(coupon_key);
            setSession(coupon_selected, data.id);

            // Remove status của coupon shop
            const shadow = document.getElementById("hrv-loyalty");
            const idCouponShop = "hrv-loyalty-coupons-wrapper-shop";
            const listCouponShop =
                shadow.shadowRoot.getElementById(idCouponShop);

            if (listCouponShop !== null) {
                const activeItem = listCouponShop.querySelector(".active-copy");

                if (activeItem !== null) {
                    activeItem.classList.remove("active-copy");

                    activeItem
                        .querySelector("#hrv-loyalty-copy-icon")
                        .setAttribute("fill", "#2962FF");

                    const textInnerCouponShop =
                        activeItem.getElementsByClassName(
                            "hrv-loyalty-action-copy-coupon"
                        )[0];

                    textInnerCouponShop.innerHTML = Trans("copy_code");
                }
            }

            if (couponSaved && Object.keys(couponSaved).length === 0) {
                couponSaved[data.id] = data.code;
                setSession(coupon_key, JSON.stringify(couponSaved));
                applyCoupon(couponSaved[data.id]);

                navigator.clipboard.writeText(couponSaved[data.id]).then(() => {
                    toggleCopyClass();
                });
            } else {
                // Kiểm tra xem coupon đó được lưu trong list chưa ?
                if (
                    couponSaved[data.id] !== null ||
                    couponSaved[data.id] !== undefined ||
                    couponSaved[data.id] !== ""
                ) {
                    couponSaved[data.id] = data.code;
                    setSession(coupon_key, JSON.stringify(couponSaved));
                    applyCoupon(couponSaved[data.id]);
                    navigator.clipboard
                        .writeText(couponSaved[data.id])
                        .then(() => {
                            toggleCopyClass();
                        });
                }
            }
        };

        const time = getDate(data.ended_at);
        const image = `<img src="${data.image_url}" />`;
        const TYPE_POOL = 3; //Ưu đãi dạng Pool

        // Hàm chạy khi ấn vào mã ưu đãi
        function toggleCopyClass() {
            const idItem = `hrv-loyalty-copouns-${data.id}`;
            const shadow = document.getElementById("hrv-loyalty");
            const item = shadow.shadowRoot.getElementById(idItem);

            const itemsRemove =
                shadow.shadowRoot.querySelectorAll(".active-coupon");

            if (itemsRemove != null && itemsRemove.length) {
                const itemRemove = itemsRemove[0];

                if (itemRemove != null) {
                    // Remove item đang active hiện tại deactive nó
                    itemRemove.classList.remove("active-coupon");
                    itemRemove
                        .querySelector("#hrv-loyalty-checkbox-icon")
                        .setAttribute("fill", "#DADADA");

                    itemRemove
                        .querySelector("#hrv-loyalty-checkbox-icon")
                        .setAttribute(
                            "d",
                            "M7.00065 0.332031C3.32065 0.332031 0.333984 3.3187 0.333984 6.9987C0.333984 10.6787 3.32065 13.6654 7.00065 13.6654C10.6807 13.6654 13.6673 10.6787 13.6673 6.9987C13.6673 3.3187 10.6807 0.332031 7.00065 0.332031ZM7.00065 12.332C4.06065 12.332 1.66732 9.9387 1.66732 6.9987C1.66732 4.0587 4.06065 1.66536 7.00065 1.66536C9.94065 1.66536 12.334 4.0587 12.334 6.9987C12.334 9.9387 9.94065 12.332 7.00065 12.332ZM5.66732 8.44536L10.0607 4.05203L11.0007 4.9987L5.66732 10.332L3.00065 7.66536L3.94065 6.72536L5.66732 8.44536Z"
                        );

                    itemRemove.setAttribute(
                        "style",
                        `background-image: url(\"${svgCouponDefault}\");border-radius:8px;background-repeat: no-repeat;`
                    );
                }
            }

            if (item != null) {
                // Active item đang đc click hiện tại active nó lên
                item.classList.add("active-coupon");
                item.querySelector("#hrv-loyalty-checkbox-icon").setAttribute(
                    "fill",
                    "#2962FF"
                );
                item.querySelector("#hrv-loyalty-checkbox-icon").setAttribute(
                    "d",
                    "M7.00065 0.332031C3.32065 0.332031 0.333984 3.3187 0.333984 6.9987C0.333984 10.6787 3.32065 13.6654 7.00065 13.6654C10.6807 13.6654 13.6673 10.6787 13.6673 6.9987C13.6673 3.3187 10.6807 0.332031 7.00065 0.332031ZM5.66732 10.332L2.33398 6.9987L3.27398 6.0587L5.66732 8.44536L10.7273 3.38536L11.6673 4.33203L5.66732 10.332Z"
                );

                item.setAttribute(
                    "style",
                    `background-image: url(\"${svgCouponActive}\");border-radius:8px;background-repeat: no-repeat;`
                );
            }
        }

        // Render UI của coupon
        const render = `
    <div class="hrv-loyalty-image-copouns">
      ${
          null != data.image_url || "" == data.image_url
              ? image
              : svgDefaultImage
      }
        </div>
            <div class="hrv-loyalty-content-coupons">
                <div class="hrv-text-coupons">
                    <h3>${data.title}</h3>
                    <p>${data.discount.type == TYPE_POOL ? null : time}</p>
                    <p class="hrv-loyalty-condition" id="hrv-loyalty-condition-${
                        data.id
                    }">${Trans("condition")}</p>
                </div>

            <div class="hrv-loyalty-checkbox-apply">
              ${svgCheck}
            </div>
        </div>`;

        tabCoupon.setAttribute(
            "style",
            `background-image: url(\"${svgCouponDefault}\");border-radius:8px;background-repeat: no-repeat;`
        );

        //
        tabCoupon.innerHTML = render;
        firstLoadUpdateCouponClassUI();
        // Xử lý khi người dùng onClick vào nút điều kiện
        const btnOnclickDetail = shadow.shadowRoot.getElementById(
            `hrv-loyalty-condition-${data.id}`
        );

        btnOnclickDetail.onclick = function (e) {
            e.stopPropagation();
            onClickDetail(data.id, id_org);
        };
    }
}

const svgCheck = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <path
            id="hrv-loyalty-checkbox-icon"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.00065 0.332031C3.32065 0.332031 0.333984 3.3187 0.333984 6.9987C0.333984 10.6787 3.32065 13.6654 7.00065 13.6654C10.6807 13.6654 13.6673 10.6787 13.6673 6.9987C13.6673 3.3187 10.6807 0.332031 7.00065 0.332031ZM7.00065 12.332C4.06065 12.332 1.66732 9.9387 1.66732 6.9987C1.66732 4.0587 4.06065 1.66536 7.00065 1.66536C9.94065 1.66536 12.334 4.0587 12.334 6.9987C12.334 9.9387 9.94065 12.332 7.00065 12.332ZM5.66732 8.44536L10.0607 4.05203L11.0007 4.9987L5.66732 10.332L3.00065 7.66536L3.94065 6.72536L5.66732 8.44536Z"
            fill="#DADADA"
        />
    </svg>`;

const svgDefaultImage = `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" rx="8" fill="white"/><path d="M44 13C39.667 13 37.211 16.595 36 19.18C34.789 16.595 32.333 13 28 13C25.243 13 23 15.243 23 18C23 20.757 25.243 23 28 23H36H44C46.757 23 49 20.757 49 18C49 15.243 46.757 13 44 13ZM28 21C26.346 21 25 19.654 25 18C25 16.346 26.346 15 28 15C31.745 15 33.786 18.924 34.603 21H28ZM44 21H37.394C38.206 18.925 40.24 15 44 15C45.654 15 47 16.346 47 18C47 19.654 45.654 21 44 21Z" fill="#D1B43D"/><path d="M55 27H17V57C17 58.105 17.895 59 19 59H53C54.105 59 55 58.105 55 57V27Z" fill="#C94F49"/><path d="M57 21H15C13.895 21 13 21.895 13 23V29C13 30.105 13.895 31 15 31H57C58.105 31 59 30.105 59 29V23C59 21.895 58.105 21 57 21Z" fill="#E86C60"/><path d="M41 21H31V31H41V21Z" fill="#EFD358"/><path d="M41 31H31V59H41V31Z" fill="#D1B43D"/></svg>`;

const svgCouponDefault =
    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='380' height='96' viewBox='0 0 380 96' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58173 96 8.00001 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H372C376.418 96 380 92.4183 380 88V8C380 3.58172 376.418 0 372 0H102Z' fill='%23F5F5F5'/%3e%3c/svg%3e";

const svgCouponActive =
    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='380' height='96' viewBox='0 0 380 96' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58173 96 8.00001 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H372C376.418 96 380 92.4183 380 88V8C380 3.58172 376.418 0 372 0H102Z' fill='%23F0F6FF'/%3e%3c/svg%3e";

export default TabCouponBuyer;
