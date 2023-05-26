import en from "./translations/en";
import vi from "./translations/vi";

export function waitFor(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export function getLocale() {
  let locale = "vi";
  if (Haravan.locale != undefined) {
    locale = Haravan.locale;
  } else {
    const localeFromLocalStorage = window.localStorage.getItem("template");
    if (localeFromLocalStorage != undefined && localeFromLocalStorage != null) {
      locale = localeFromLocalStorage;
    }
  }

  // Ngôn ngữ mặc định sẽ là vi nếu locale là các ngôn ngữ khác không phải là en và vi
  if (locale != "en" && locale != "vi") {
    locale = "vi";
  }

  return locale;
}

export function Trans(text) {
  let locale = getLocale();
  let TextReturn = text;
  if (locale == "en") {
    TextReturn = en[text];
  } else {
    TextReturn = vi[text];
  }
  return TextReturn;
}

export function formatNumber(t, o, n, e) {
  (o = isNaN((o = Math.abs(o))) ? 0 : o),
    (n = null == n ? "." : n),
    (e = null == e ? "," : e);
  var i = t < 0 ? "-" : "",
    l = String(parseInt((t = Math.abs(Number(t) || 0).toFixed(o)))),
    r = (r = l.length) > 3 ? r % 3 : 0;
  return (
    i +
    (r ? l.substr(0, r) + e : "") +
    l.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + e) +
    (o
      ? n +
        Math.abs(t - l)
          .toFixed(o)
          .slice(2)
      : "")
  );
}

export function formatNumberFromString(str, includeDecimal = true) {
  str = str.replace(/^([\d]+)([\s])/g, function (m) {
    return formatNumber(m.trim(), includeDecimal) + " ";
  });
  str = str.replace(/([\s])([\d]+)([\s])/g, function (m) {
    return " " + formatNumber(m.trim(), includeDecimal) + " ";
  });
  str = str.replace(/([\d]+)([\s])$/g, function (m) {
    return formatNumber(m.trim(), includeDecimal) + " ";
  });
  return str;
}

export function convertEOLToBr(str) {
  return str.replace(/\n/g, "<br />");
}

export function getDate(t) {
  let o = `${Trans("indefinite")}`;
  if (t) {
    let n = t.split(" ")[0].split("-"),
      e = n[2] + "-" + n[1] + "-" + n[0];
    o = `${Trans("expiration_date")} ` + e;
    let i = new Date();
    o = new Date(t) > i ? o : "Đã hết hạn vào ngày " + e;
  }
  return o;
}

export function formatAMPM(t) {
  const o = t.split(":");
  var n = o[0],
    e = n >= 12 ? "PM" : "AM";
  return (n = (n %= 12) || 12) + ":" + o[1] + " " + e;
}

export function clickBack(tabBack) {
  const shadow = document.getElementById("hrv-loyalty");
  tabBack.setAttribute("style", "visibility: visible");
  const divInclude = shadow.shadowRoot.getElementById(
    "hrv-loyalty-coupons-click-include"
  );
  divInclude.classList = "hrv-loyalty-coupons-click-include-back";
  divInclude.setAttribute(
    "style",
    "position: absolute;-webkit-animation: haraLoyaltyToRightBack .3s ease-in-out !important;animation: haraLoyaltyToRightBack .3s ease-in-out !important;-webkit-animation-fill-mode: forwards !important;animation-fill-mode: forwards !important;"
  );
  setTimeout(() => {
    if (divInclude !== null && divInclude.parentNode !== null) {
      divInclude.parentNode.removeChild(divInclude);
    }
  }, 330);
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * @pamams
 * @fromString String đầu vào với tham số dưới dạng ${tham số}
 * @params Object với key tương ứng với tham số
 * function sẽ convert từ 1 string có tham số thành 1 string hoàn chỉnh
 */
function formatMessage(fromString, params) {
  let keys = Object.keys(params);
  let func = Function(...keys, "return `" + fromString + "`;");

  return func(...keys.map((input) => params[input]));
}

/**
 * @params
 * @currency number (giá tiền)
 * convert từ 1000 => 1.000
 */
function ToFormattedCurrency(currency) {
  return new Intl.NumberFormat("it-IT").format(currency);
}

/**
 * Hàm lấy tên của coupons bên OMNI
 */
export function getDescription(item) {
  const TYPE_SHIPPING = 3; //   3: theo vận chuyển
  const TYPE_SAME_PRICE = 4; //   4: theo đồng giá
  const TYPE_ORDER = 5; //   5: theo đơn
  const TYPE_PRODUCT = 6; //   6: theo SP

  const TAKE_TYPE_CURRENCY = 1; // giảm theo mệnh giá
  const TAKE_TYPE_PERCENTAGE = 2; // giảm theo phần trăm

  // Giảm bao nhiêu?
  let discountTake = "";

  const { takeType } = item;

  const getPrefixText = (item) => {
    const {
      quantity,
      orderOver,
      maxAmountApply,
      entitled_Products,
      entitled_Collections,
      entitled_Variants,
    } = item;

    let prefixText = "";

    // Số lượng SP
    if (quantity !== null && quantity !== 0) {
      prefixText +=
        " khi mua tối thiếu " + formatNumber(quantity) + " sản phẩm";
    }

    // Tối thiểu
    if (orderOver !== null && orderOver !== 0) {
      prefixText += " khi mua tối thiếu " + formatNumber(orderOver) + "đ";
    }

    // Tối đa
    if (maxAmountApply !== null && maxAmountApply !== 0) {
      prefixText += " tối đa " + formatNumber(maxAmountApply) + "đ";
    }

    // SP
    if (entitled_Products !== null && entitled_Products?.length > 0) {
      prefixText +=
        " cho sản phẩm " +
        entitled_Products.map((item) => item.name).join(", ");
    }

    // Nhóm SP
    if (entitled_Collections !== null && entitled_Collections?.length > 0) {
      prefixText +=
        " cho nhóm sản phẩm " +
        entitled_Collections.map((item) => item.name).join(", ");
    }

    // Biến thể
    if (entitled_Variants !== null && entitled_Variants?.length > 0) {
      prefixText +=
        " cho biến thể của sản phẩm " +
        entitled_Variants
          .map((item) => item.productName + " " + `(${item.name})`)
          .join(", ");
    }

    return prefixText || "";
  };

  const getValue = () => {
    if (takeType === TAKE_TYPE_PERCENTAGE) {
      return (discountTake = item.discountTake + "%");
    }

    if (takeType === TAKE_TYPE_CURRENCY) {
      return (discountTake = ToFormattedCurrency(item.discountTake) + "đ");
    }
  };

  let description = "";

  switch (item.discountTypeId) {
    // Miễn phí vận chuyển
    case TYPE_SHIPPING:
      description = formatMessage("Giảm ${up_to} phí vận chuyển", {
        up_to: getValue(),
      });

      description += getPrefixText(item);
      break;

    // ĐỒNG GIÁ
    case TYPE_SAME_PRICE:
      description = formatMessage("Đồng giá ${amount}", {
        amount: getValue(),
      });

      description += getPrefixText(item);
      break;

    // Giảm giá đơn hàng
    case TYPE_ORDER:
      description = formatMessage("Giảm ${amount} giá trị đơn hàng", {
        amount: getValue(),
      });

      description += getPrefixText(item);
      break;

    // Giảm giá sản phẩm
    case TYPE_PRODUCT:
      description = formatMessage("Giảm ${amount} sản phẩm", {
        amount: getValue(),
      });

      description += getPrefixText(item);
      break;

    default:
      if (item.discountOfferId.toString() == "allOrders") {
        description = formatMessage("Giảm ${amount} cho tất cả đơn hàng", {
          amount: discountTake,
        });
      }

      if (item.discountOfferId.toString() == "customer") {
        description = formatMessage(
          "Giảm ${amount} cho khách hàng ${customer}",
          {
            amount: discountTake,
            customer: item.discountDesc,
          }
        );
      }

      if (item.orderOver > 0 && item.isNewCoupon == false) {
        description = formatMessage(
          "Giảm ${amount} cho đơn hàng có giá trị từ ${min_amount}",
          {
            amount: discountTake,
            min_amount: ToFormattedCurrency(item.orderOver),
          }
        );
      } else if (item.orderOver == 0 && item.isNewCoupon == false) {
        description = formatMessage("Giảm ${amount} cho tất cả đơn hàng", {
          amount: discountTake,
        });
      }

      if (item.customerInGroup) {
        description = formatMessage(
          "Giảm ${amount} cho khách hàng trong nhóm ${customer_group}",
          {
            amount: discountTake,
            customer_group: item.discountDesc,
          }
        );
      }

      let st_default = "";

      if (item.discountPerOrder) st_default = " " + "trên cả đơn hàng";

      if (item.discountPerEveryItem)
        st_default = " " + "từng sản phẩm trong đơn hàng";

      if (item.isNewCoupon) {
        switch (item.promotionApplyType) {
          case 1:
            st_default +=
              " (" +
              formatMessage("khi mua ${count} sản phẩm trở lên", {
                count: item.quantity,
              }) +
              ")";
            break;
          case 2:
            st_default +=
              " (" +
              formatMessage("khi tổng giá trị sản phẩm từ ${amount} trở lên", {
                amount: ToFormattedCurrency(item.orderOver),
              }) +
              ")";
            break;
          default:
            break;
        }
      }

      if (item.specificProduct) {
        if (item.discountDesc == "đã xóa")
          description =
            formatMessage("Giảm ${amount} cho sản phẩm đã xóa", {
              amount: discountTake,
            }) + st_default;
        else
          description =
            formatMessage("Giảm ${amount} cho sản phẩm ${product}", {
              amount: discountTake,
              product: item.discountDesc,
            }) + st_default;
      }

      if (item.collection) {
        if (item.discountDesc == "đã xóa")
          description =
            formatMessage("Giảm ${amount} cho nhóm sản phẩm đã xóa", {
              amount: discountTake,
            }) + st_default;
        else
          description =
            formatMessage("Giảm ${amount} cho nhóm sản phẩm ${product_group}", {
              amount: discountTake,
              product_group: item.discountDesc,
            }) + st_default;
      }

      if (item.discountOfferId.toString() == "productVariant")
        description =
          formatMessage("Giảm ${amount} cho danh sách biến thể", {
            amount: discountTake,
          }) +
          "" +
          st_default;
      break;
  }

  return description || "- -";
}

/**
 * Hàm lấy time cho coupon shop gồm (omni và loyalty)
 * @params data: dữ liệu của Coupon
 * @return string
 */
export function getTime(data) {
  let dateFormat = { day: "numeric", month: "numeric", year: "numeric" };
  const LOYALTY_COUPON = 0;
  const OMNI_COUPON = 1;

  switch (data.type) {
    case LOYALTY_COUPON: {
      let des;

      if (data.settings.is_expired == 0) {
        des = `${Trans("no_expiry_date")}`;
        return des;
      }

      if (data.settings.is_expired == 1) {
        let current = new Date();
        current.setDate(
          current.getDate() + Number(data.settings.number_date_coupon_expired)
        );

        des = `${Trans("expiry_at")} ${current
          .toLocaleDateString("vi-VN", dateFormat)
          .split("/")
          .join("-")}`;
        return des;
      }
    }

    case OMNI_COUPON: {
      let des;

      if (data.settings.is_expired == 0) {
        des = `${Trans("no_expiry_date")}`;

        return des;
      }

      if (data.settings.is_expired == 1) {
        let datetime = new Date(data.settings.ended_date);

        des = `${Trans("expiry_at")} ${datetime
          .toLocaleDateString("vi-VN", dateFormat)
          .split("/")
          .join("-")}`;

        return des;
      }
    }
  }
}

/**
 * Hàm áp dụng coupon cho shop khi ở trang checkout
 * @params code_id: id của coupon
 */
export function appliedCoupon() {
  const HRV_KEY_LIST = "hrl_anonymous_coupons";
  const HRV_KEY_SELECTED = "hrl_anonymous_discount_selected";

  const listSession = getSession(HRV_KEY_LIST);
  const keySelected = getSession(HRV_KEY_SELECTED);

  // Kiểm tra list session
  if (listSession && Object.keys(listSession).length == 0) {
    return;
  } else {
    const code_id = listSession[keySelected];
    filledCodeToInputOmni(code_id);
  }
}

export function getSession(key) {
  let result = {};

  if (window.sessionStorage.getItem(key) != null) {
    return JSON.parse(window.sessionStorage.getItem(key));
  } else {
    return result;
  }
}

export function setSession(key, value) {
  window.sessionStorage.setItem(key, value);
}

export function removeSession(key) {
  window.sessionStorage.removeItem(key);
}

export function filledCodeToInputOmni(code_id) {
  const input_collapsed = document.querySelector(
    '.order-summary.order-summary-is-collapsed input[name="discount.code"]'
  );
  const input_expanded = document.querySelector(
    '.order-summary.order-summary-is-expanded input[name="discount.code"]'
  );
  const input_small = document.querySelector(
    '.field-input-wrapper input[name="discount.code"]'
  );

  if (code_id != null && code_id != undefined && code_id != "") {
    if (input_collapsed != null) {
      input_collapsed.value = code_id;
      input_collapsed.focus();
      input_collapsed.blur();
    }

    if (input_expanded != null) {
      input_expanded.value = code_id;
      input_expanded.focus();
      input_expanded.blur();
    }

    if (input_small != null) {
      input_small.value = code_id;
      input_small.focus();
      input_small.blur();
    }
  }
}

export function logLoyalty(key, value) {
  const VERSION = "v1.61.3c";
  const currentLog = document._haraloyalty_webfloating;

  document._haraloyalty_webfloating = {
    ...currentLog,
    version: VERSION,
    [`${key}`]: value,
  };
}

export function getVersion() {
  return document?._haraloyalty_webfloating?.version;
}
