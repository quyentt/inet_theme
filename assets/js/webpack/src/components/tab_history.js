import {
  formatNumber,
  formatAMPM,
  convertEOLToBr,
  formatNumberFromString,
  Trans,
} from "../helper";

class TabHistory {
  container = null;
  tabHistory = null;
  item = null;
  id_org = null;

  constructor(options) {
    this.container = options.divPopup;
    this.data = options.item;
    this.tabHistory = document.createElement("div");
    this.container.append(this.tabHistory);
  }

  render(latest = false) {
    const { data } = this;
    const shadow = document.getElementById("hrv-loyalty");
    const dataSplit = data.created_at.split(" ");
    let title = convertEOLToBr(formatNumberFromString(data.title));
    const LOG_TYPE_PAYMENT = 3; // diem thuong
    const checkType = data.type && data.type > 100; // New version && t.payload.point_type !== 0
    const checkTypeError =
      data.payload !== null
        ? data.payload.point_type == 0 && data.type > 100
        : ""; // && t.payload.point_type == 0  // Error
    const payLoadvalue =
      data.payload !== null
        ? data.payload.value == null
          ? null
          : data.payload.value >= 0
        : "";
    const payLoadType =
      data.payload !== null
        ? data.payload.point_type && data.payload.point_type == LOG_TYPE_PAYMENT
        : "";
    const splitTime = dataSplit[0].split("-");
    const formatTime = formatAMPM(dataSplit[1]);
    const time = splitTime[2] + "/" + splitTime[1] + "/" + splitTime[0];
    const getId = shadow.shadowRoot.getElementById("hrv-loyalty-timeline");
    const li = document.createElement("li");
    const render = `<div>
                <span class='hara-loyalty-history-timeline-date'> ${
                  time + "<br/>" + formatTime
                }</span>
                <span class='hara-loyalty-history-timeline-circle'></span>
              </div>
            <div class='hara-loyalty-history-timeline-content'>
            ${
              checkTypeError || data.payload == null
                ? `<span style="font-size: 0.85em;">${title}</span>`
                : checkType
                ? `<span>
                    <span style="font-size: 0.85em;">${title}</span><br/>
                    ${
                      payLoadvalue == null
                        ? `<span style="color:#D8D8D8;font-Weight:bold;font-size: 0.85em;>--</span><br/>`
                        : payLoadvalue
                        ? `<span style="color:#2962FF;font-Weight:bold;font-size: 0.85em;">+${formatNumber(
                            data.payload.value
                          )}</span>`
                        : `<span style="color:#FC625D;font-Weight:bold;font-size: 0.85em;">${formatNumber(
                            data.payload.value
                          )}</span>`
                    }
                    ${
                      payLoadvalue == null
                        ? `<span style="color:#D8D8D8;font-Weight:bold;font-size: 0.85em;>--</span><br/>`
                        : payLoadvalue
                        ? `<span style="color:#2962FF;font-Weight:normal;font-size: 0.85em;">${
                            payLoadType
                              ? `${Trans("point_reward")}`
                              : `${Trans("level_points")}`
                          }</span><br/>`
                        : `<span style="color:#FC625D;font-Weight:normal;font-size: 0.85em;">${
                            payLoadType
                              ? `${Trans("point_reward")}`
                              : `${Trans("level_points")}`
                          }</span><br/>`
                    }
                    <span style="font-size: 0.85em;">${Trans(
                      "total"
                    )}: <span style="font-weight:bold;color:#212121;font-size: 0.85em;">${
                    payLoadType
                      ? formatNumber(data.payload.amount_payment)
                      : formatNumber(data.payload.amount_ranking)
                  }</span> ${
                    payLoadType
                      ? `${Trans("point_reward")}`
                      : `${Trans("level_points")}`
                  }</span>
                </span>`
                : `<span style="font-size: 0.85em;">${title}</span>`
            }
        </div>`;
    li.innerHTML = render;
    if (!latest) {
      getId.append(li);
    } else {
      getId.prepend(li);
    }
  }
}

export default TabHistory;
