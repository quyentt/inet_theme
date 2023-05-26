import {
    getTime,
    Trans,
    getSession,
    setSession,
    filledCodeToInputOmni,
} from "../helper";
import NoCouponRender from "./noCoupon";
import TabCouponDetailShop from "./tab_coupon_detail_shop.js";

function onClickDetail({ data, type, divWrapper }) {
    const LOYALTY_COUPON = 0;
    const OMNI_COUPON = 1;
    const url = window.location.origin;
    const coupon_key = "hrl_anonymous_coupons";
    const couponSaved = getSession(coupon_key);
    const shadow = document.getElementById("hrv-loyalty");
    const divInlucde = shadow.shadowRoot.getElementById(
        "hrv-loyalty-include-popup"
    );
    const backScreenElm = divWrapper;
    divWrapper.setAttribute("style", "visibility: hidden");
    const divDetail = document.createElement("div");
    divInlucde.append(divDetail);
    divDetail.setAttribute("id", "hrv-loyalty-coupons-click-include");
    const divLoading = document.createElement("div");
    divLoading.classList = "hrv-loyalty-loading";
    divLoading.setAttribute("id", "hrv-loyalty-click-coupons-loaddingoff");
    divLoading.setAttribute("style", "top:50%");
    divDetail.append(divLoading);

    const fetchDetailCoupon = () => {
        fetch(`${url}/apps/loyalty/webfloating/redeem.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                discount_id: data.id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                couponSaved[data.id] = response.data.coupon_code;
                setSession(coupon_key, JSON.stringify(couponSaved));
                const tabCouponDetail = new TabCouponDetailShop({
                    divDetail,
                    data: {
                        ...data,
                        code: response.data.coupon_code,
                    },
                    backScreenElm,
                    callbackfn: function () {
                        handleClickBackToggleClass(data);
                    },
                });

                tabCouponDetail.render();
            })
            .catch((error) => {
                console.log("error", error);
                const tabCouponDetail = new TabCouponDetailShop({
                    divDetail,
                });

                tabCouponDetail.renderError();
            });
    };

    switch (type) {
        case LOYALTY_COUPON:
            if (
                couponSaved &&
                couponSaved &&
                Object.keys(couponSaved).length === 0
            ) {
                fetchDetailCoupon();
            } else {
                if (
                    couponSaved[data.id] === null ||
                    couponSaved[data.id] === undefined ||
                    couponSaved[data.id] === ""
                ) {
                    fetchDetailCoupon();
                } else {
                    const tabCouponDetail = new TabCouponDetailShop({
                        divDetail,
                        data: {
                            ...data,
                            code: couponSaved[data.id],
                        },
                        backScreenElm,
                        callbackfn: function () {
                            handleClickBackToggleClass(data);
                        },
                    });

                    tabCouponDetail.render();
                }
            }
            break;

        case OMNI_COUPON:
            if (
                couponSaved[data.id] === null ||
                couponSaved[data.id] === undefined ||
                couponSaved[data.id] === ""
            ) {
                couponSaved[data.id] = data.code;
                setSession(coupon_key, JSON.stringify(couponSaved));
            }

            const tabCouponDetail = new TabCouponDetailShop({
                divDetail,
                data,
                backScreenElm,
                callbackfn: function () {
                    handleClickBackToggleClass(data);
                },
            });

            tabCouponDetail.render();
            break;
        default:
            throw new Error("Please enter right type of coupon");
    }
}

function handleClickBackToggleClass() {
    const coupon_selected = "hrl_anonymous_discount_selected";
    const coupon_key = "hrl_anonymous_coupons";
    const codeApplied = getSession(coupon_selected);
    const codeList = getSession(coupon_key);

    const idItem = `hrv-loyalty-hidden-checkout-${codeApplied}`;
    const shadow = document.getElementById("hrv-loyalty");
    const item = shadow.shadowRoot.getElementById(idItem);

    const itemsRemove = shadow.shadowRoot.querySelectorAll(".active-copy");

    if (itemsRemove != null && itemsRemove.length) {
        const itemRemove = itemsRemove[0];
        if (itemRemove != null) {
            const classRemoveItem = itemRemove.getElementsByClassName(
                "hrv-loyalty-action-copy-coupon"
            )[0];
            itemRemove.classList.remove("active-copy");

            if (classRemoveItem != null) {
                classRemoveItem.innerHTML = Trans("copy_code");
            }

            itemRemove
                .querySelector("#hrv-loyalty-copy-icon")
                .setAttribute("fill", "#2962FF");
        }
    }

    if (codeApplied != null && codeApplied != undefined && codeApplied != "") {
        if (
            codeList[codeApplied] != null &&
            codeList[codeApplied] != "" &&
            codeList[codeApplied] != undefined
        ) {
            if (item != null) {
                item.classList.add("active-copy");
                item.querySelector(
                    `#hrv-loyalty-action-copy-coupon-${codeApplied}`
                ).innerHTML = Trans("copied");
                // hrv-loyalty-copy-icon
                item.querySelector("#hrv-loyalty-copy-icon").setAttribute(
                    "fill",
                    "#51ce82"
                );
            }
        }
    }
}

class TabCouponShop {
    container = null;
    tabCoupon = null;
    data = null;
    LOYALTY_COUPON = 0; // Tham số mặc định
    OMNI_COUPON = 1; // Tham số mặc định
    divWrapper = null;
    coupon_key = "hrl_anonymous_coupons";
    coupon_selected = "hrl_anonymous_discount_selected";

    constructor(options) {
        this.container = options.divPopup;
        this.data = options.dataItem;
        this.tabCoupon = document.createElement("div");
        this.divWrapper = options.divWrapper;
        if (!options.append) {
            this.container.prepend(this.tabCoupon);
        } else {
            this.container.append(this.tabCoupon);
        }
    }

    renderNoCoupon() {
        const noCoupon = new NoCouponRender({
            divPopup: this.tabCoupon,
        });

        noCoupon.render();
    }

    render() {
        const {
            data,
            tabCoupon,
            LOYALTY_COUPON,
            OMNI_COUPON,
            divWrapper,
            coupon_key,
            coupon_selected,
        } = this;
        const shadow = document.getElementById("hrv-loyalty");

        const locationOrigin = window.location.origin;

        function firstLoadUpdateCouponClassUI() {
            const codeApplied = getSession(coupon_selected);

            if (
                codeApplied != null &&
                codeApplied != undefined &&
                codeApplied != ""
            ) {
                if (data.id == codeApplied) {
                    const idItem = `hrv-loyalty-hidden-checkout-${data.id}`;
                    const shadow = document.getElementById("hrv-loyalty");
                    const item = shadow.shadowRoot.getElementById(idItem);

                    if (item != null) {
                        item.classList.add("active-copy");
                        item.querySelector(
                            `#hrv-loyalty-action-copy-coupon-${data.id}`
                        ).innerHTML = Trans("copied");
                        // hrv-loyalty-copy-icon
                        item.querySelector(
                            "#hrv-loyalty-copy-icon"
                        ).setAttribute("fill", "#51ce82");
                    }
                }
            }
        }

        function toggleCopyClass() {
            const idItem = `hrv-loyalty-hidden-checkout-${data.id}`;
            const shadow = document.getElementById("hrv-loyalty");
            const item = shadow.shadowRoot.getElementById(idItem);

            // Remove status của coupon buyer
            const idCouponBuyer = "hrv-loyalty-coupons-buyer";
            const listCouponBuyer =
                shadow.shadowRoot.getElementById(idCouponBuyer);

            if (listCouponBuyer !== null) {
                const activeItem =
                    listCouponBuyer.querySelector(".active-coupon");
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

            const itemsRemove =
                shadow.shadowRoot.querySelectorAll(".active-copy");

            if (itemsRemove != null && itemsRemove.length) {
                const itemRemove = itemsRemove[0];
                if (itemRemove != null) {
                    const classRemoveItem = itemRemove.getElementsByClassName(
                        "hrv-loyalty-action-copy-coupon"
                    )[0];
                    itemRemove.classList.remove("active-copy");

                    if (classRemoveItem != null) {
                        classRemoveItem.innerHTML = Trans("copy_code");
                    }

                    itemRemove
                        .querySelector("#hrv-loyalty-copy-icon")
                        .setAttribute("fill", "#2962FF");
                }
            }

            if (item != null) {
                item.classList.add("active-copy");
                item.querySelector(
                    `#hrv-loyalty-action-copy-coupon-${data.id}`
                ).innerHTML = Trans("copied");
                // hrv-loyalty-copy-icon
                item.querySelector("#hrv-loyalty-copy-icon").setAttribute(
                    "fill",
                    "#51ce82"
                );
            }
        }

        function applyCoupon(code) {
            filledCodeToInputOmni(code);
        }

        function handleCopyCodeLoyalty(data) {
            // Get All Coupon in Session Local
            const couponSaved = getSession(coupon_key);

            if (couponSaved && Object.keys(couponSaved).length === 0) {
                fetch(
                    `${locationOrigin}/apps/loyalty/webfloating/redeem.json`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            discount_id: data.id,
                        }),
                    }
                )
                    .then((response) => response.json())
                    .then((response) => {
                        couponSaved[data.id] = response.data.coupon_code;
                        setSession(coupon_key, JSON.stringify(couponSaved));
                        setSession(coupon_selected, data.id);
                        applyCoupon(couponSaved[data.id]);

                        navigator.clipboard
                            .writeText(response.data.coupon_code)
                            .then(() => {
                                toggleCopyClass();
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                if (
                    couponSaved[data.id] === null ||
                    couponSaved[data.id] === undefined ||
                    couponSaved[data.id] === ""
                ) {
                    // TH: coupon code chưa được sinh ra
                    fetch(
                        `${locationOrigin}/apps/loyalty/webfloating/redeem.json`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                discount_id: data.id,
                            }),
                        }
                    )
                        .then((response) => response.json())
                        .then((response) => {
                            couponSaved[data.id] = response.data.coupon_code;
                            setSession(coupon_key, JSON.stringify(couponSaved));
                            setSession(coupon_selected, data.id);
                            applyCoupon(couponSaved[data.id]);

                            navigator.clipboard
                                .writeText(response.data.coupon_code)
                                .then(() => {
                                    toggleCopyClass();
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    // TH: coupon code đã được sinh ra
                    navigator.clipboard
                        .writeText(couponSaved[data.id])
                        .then(() => {
                            toggleCopyClass();
                        });

                    setSession(coupon_selected, data.id);
                    applyCoupon(couponSaved[data.id]);
                }
            }
        }

        function handleCopyCodeOmni(data) {
            const couponSaved = getSession(coupon_key);

            if (couponSaved && Object.keys(couponSaved).length == 0) {
                navigator.clipboard.writeText(data.code).then(() => {
                    toggleCopyClass();
                });
            } else {
                navigator.clipboard.writeText(data.code).then(() => {
                    toggleCopyClass();
                });

                if (
                    couponSaved[data.id] === null ||
                    couponSaved[data.id] === undefined ||
                    couponSaved[data.id] === ""
                ) {
                    couponSaved[data.id] = data.code;
                    setSession(coupon_key, JSON.stringify(couponSaved));
                }
            }
            couponSaved[data.id] = data.code;
            setSession(coupon_key, JSON.stringify(couponSaved));
            setSession(coupon_selected, data.id);
            applyCoupon(data.code);
        }

        function handleCopyCode(data) {
            switch (data.type) {
                case LOYALTY_COUPON:
                    handleCopyCodeLoyalty(data);
                    break;

                case OMNI_COUPON:
                    handleCopyCodeOmni(data);
                    break;
                default:
                    throw new Error("Please insert right type");
            }
        }

        const render = `
        <div class="hrv-text-coupons-shop" style=" position:relative">
        ${svgVoucher}

        <div style="width: 100%;height:100%; position:absolute; z-index: 123; padding: 17px 18px; top: 0; left: 0" class="hrv-coupon-item-contain">
            <p style="
            font-weight: 500;
            line-height: 20px;
            color: #212121; margin-bottom: 2px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis; min-height: 40px;
            cursor: pointer
            "
            class="hrv-text-coupons-name"

            id="hrv-text-coupons-name-onclick-${data.id}"
            >${data.title}</p>
            <p style="font-weight: 500;
            line-height: 20px;
            color: #757575;margin-bottom: 0"
            class="hrv-text-coupons-date"
            >${getTime(data)}</p>
        </div>

        <div class="hrv-loyalty-value-code-copy" id="hrv-loyalty-hidden-checkout-${
            data.id
        }"
         style="width: 90%; position:absolute; z-index: 123; bottom: 11px; left: 50%; transform: translateX(-50%);text-align: center;margin-bottom: 3px; display: flex; justify-content: center; align-items: center; cursor: pointer"><span style="margin-right:5px; display: flex; justify-content: center; align-items: center">${svgIconCopy}</span> <span style="font-weight: 500;
        font-size: 12px;
        line-height: 20px;" id="hrv-loyalty-action-copy-coupon-${
            data.id
        }" class="hrv-loyalty-action-copy-coupon">${Trans("copy_code")}
        </span>
        <textarea id="hrv-loyalty-hidden-code-${data.id}></textarea>
        </div>
        </div>`;

        tabCoupon.setAttribute("style", "width: 50%");
        tabCoupon.innerHTML = render;
        firstLoadUpdateCouponClassUI();
        const getAreaOnclickDetail = shadow.shadowRoot.getElementById(
            `hrv-text-coupons-name-onclick-${data.id}`
        );

        // ACTION - ONCLICK DETAIL
        getAreaOnclickDetail.onclick = function (e) {
            onClickDetail({
                data,
                type: data.type,
                divWrapper,
            });
        };

        const btnSaveCode = shadow.shadowRoot.getElementById(
            `hrv-loyalty-hidden-checkout-${data.id}`
        );

        // ACTION - ONCLICK COPY
        btnSaveCode.onclick = function () {
            handleCopyCode(data);
        };
    }
}

const svgVoucher = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="128" viewBox="0 0 190 128" fill="none">
<g filter="url(#filter0_d_714_61272)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12V84C6.20914 84 8 85.7909 8 88C8 90.2091 6.20914 92 4 92V116C4 120.418 7.58172 124 12 124H178C182.418 124 186 120.418 186 116V92C183.791 92 182 90.2091 182 88C182 85.7909 183.791 84 186 84V12C186 7.58172 182.418 4 178 4H12ZM13.1 87.5C12.8239 87.5 12.6 87.7239 12.6 88C12.6 88.2761 12.8239 88.5 13.1 88.5H19.1667C19.4429 88.5 19.6667 88.2761 19.6667 88C19.6667 87.7239 19.4429 87.5 19.1667 87.5H13.1ZM25.2334 87.5C24.9573 87.5 24.7334 87.7239 24.7334 88C24.7334 88.2761 24.9573 88.5 25.2334 88.5H31.3001C31.5762 88.5 31.8001 88.2761 31.8001 88C31.8001 87.7239 31.5762 87.5 31.3001 87.5H25.2334ZM37.3668 87.5C37.0906 87.5 36.8668 87.7239 36.8668 88C36.8668 88.2761 37.0906 88.5 37.3668 88.5H43.4335C43.7096 88.5 43.9335 88.2761 43.9335 88C43.9335 87.7239 43.7096 87.5 43.4335 87.5H37.3668ZM49.5002 87.5C49.224 87.5 49.0002 87.7239 49.0002 88C49.0002 88.2761 49.224 88.5 49.5002 88.5H55.5669C55.843 88.5 56.0669 88.2761 56.0669 88C56.0669 87.7239 55.843 87.5 55.5669 87.5H49.5002ZM61.6335 87.5C61.3574 87.5 61.1335 87.7239 61.1335 88C61.1335 88.2761 61.3574 88.5 61.6335 88.5H67.7002C67.9764 88.5 68.2002 88.2761 68.2002 88C68.2002 87.7239 67.9764 87.5 67.7002 87.5H61.6335ZM73.7669 87.5C73.4908 87.5 73.2669 87.7239 73.2669 88C73.2669 88.2761 73.4908 88.5 73.7669 88.5H79.8336C80.1098 88.5 80.3336 88.2761 80.3336 88C80.3336 87.7239 80.1098 87.5 79.8336 87.5H73.7669ZM85.9003 87.5C85.6242 87.5 85.4003 87.7239 85.4003 88C85.4003 88.2761 85.6242 88.5 85.9003 88.5H91.967C92.2431 88.5 92.467 88.2761 92.467 88C92.467 87.7239 92.2431 87.5 91.967 87.5H85.9003ZM98.0337 87.5C97.7575 87.5 97.5337 87.7239 97.5337 88C97.5337 88.2761 97.7575 88.5 98.0337 88.5H104.1C104.377 88.5 104.6 88.2761 104.6 88C104.6 87.7239 104.377 87.5 104.1 87.5H98.0337ZM110.167 87.5C109.891 87.5 109.667 87.7239 109.667 88C109.667 88.2761 109.891 88.5 110.167 88.5H116.234C116.51 88.5 116.734 88.2761 116.734 88C116.734 87.7239 116.51 87.5 116.234 87.5H110.167ZM122.3 87.5C122.024 87.5 121.8 87.7239 121.8 88C121.8 88.2761 122.024 88.5 122.3 88.5H128.367C128.643 88.5 128.867 88.2761 128.867 88C128.867 87.7239 128.643 87.5 128.367 87.5H122.3ZM134.434 87.5C134.158 87.5 133.934 87.7239 133.934 88C133.934 88.2761 134.158 88.5 134.434 88.5H140.501C140.777 88.5 141.001 88.2761 141.001 88C141.001 87.7239 140.777 87.5 140.501 87.5H134.434ZM146.567 87.5C146.291 87.5 146.067 87.7239 146.067 88C146.067 88.2761 146.291 88.5 146.567 88.5H152.634C152.91 88.5 153.134 88.2761 153.134 88C153.134 87.7239 152.91 87.5 152.634 87.5H146.567ZM158.701 87.5C158.424 87.5 158.201 87.7239 158.201 88C158.201 88.2761 158.424 88.5 158.701 88.5H164.767C165.043 88.5 165.267 88.2761 165.267 88C165.267 87.7239 165.043 87.5 164.767 87.5H158.701ZM170.834 87.5C170.558 87.5 170.334 87.7239 170.334 88C170.334 88.2761 170.558 88.5 170.834 88.5H176.901C177.177 88.5 177.401 88.2761 177.401 88C177.401 87.7239 177.177 87.5 176.901 87.5H170.834Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_714_61272" x="0" y="0" width="190" height="128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0 0.129412 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_714_61272"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_714_61272" result="shape"/>
</filter>
</defs>
</svg>`;

const svgIconCopy = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M5.86339 10.5846L3.08339 7.80458L2.13672 8.74458L5.86339 12.4713L13.8634 4.47125L12.9234 3.53125L5.86339 10.5846Z" fill="#2962FF"  id="hrv-loyalty-copy-icon"/>
</svg>`;

const svgCouponDefault =
    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='380' height='96' viewBox='0 0 380 96' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58173 96 8.00001 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H372C376.418 96 380 92.4183 380 88V8C380 3.58172 376.418 0 372 0H102Z' fill='%23F5F5F5'/%3e%3c/svg%3e";

export default TabCouponShop;
