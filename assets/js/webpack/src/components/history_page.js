import TabHistory from "./tab_history";

let location = null,
    shadow = null,
    ids = [];
export const HistoryPageState = {
    total: 0,
    current: 0,
    maxPage: 1,
    page: 1,
    limit: 50,
    language: "vi",
    hasLoading: true,
};

function renderButtonLoadmore() {
    const shadow = document.getElementById("hrv-loyalty");
    if (
        shadow.shadowRoot.contains(
            shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-coupons")
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
        divHistory.classList = "hrv-loyalty-loadmore-history showloadmore";
        divReward.classList = "hrv-loyalty-loadmore-reward unshowloadmore";
    }
}

function noRenderButtonLoadmore() {
    if (
        shadow.shadowRoot.contains(
            shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-history")
        )
    ) {
        const divinclude = shadow.shadowRoot.getElementById(
            "hrv-loyalty-loadmore-history"
        );
        divinclude.classList = "hrv-loyalty-loadmore-history unshowloadmore";
    }
}

class HistoryPage {
    container = null;

    constructor(options) {
        this.container = options.container;

        if (location === null) {
            location = window.location.origin;
        }
        if (shadow === null) {
            shadow = document.getElementById("hrv-loyalty");
        }
    }

    fetchData(latest = false) {
        const self = this;
        const divLoad = shadow.shadowRoot.getElementById(
            "hrv-loyalty-loadmore-history"
        );
        const divPopup = shadow.shadowRoot.getElementById(
            "hrv-loyalty-coupons-wrapper"
        );
        const language = HistoryPageState.language;
        const api = `${location}/apps/loyalty/activities.json?sort_by=created_at&sort_type=desc&limit=${HistoryPageState.limit}&page=${HistoryPageState.page}&language=${language}`;
        fetch(api)
            .then((response) => response.json())
            .then((response) => {
                const data = response.data.data;
                const limit = HistoryPageState.limit;
                const maxPage = Math.ceil(response.data.total / limit);
                HistoryPageState.current = response.data.current_page;
                HistoryPageState.total = response.data.total;
                HistoryPageState.maxPage = maxPage;
                divLoad.classList =
                    "hrv-loyalty-loadmore-history unshowloadmore";
                data.length > 0
                    ? data.map((item, key) => {
                          if (!ids.includes(item.id)) {
                              ids.push(item.id);
                              const tabHistory = new TabHistory({
                                  ...HistoryPageState,
                                  item,
                                  divPopup,
                                  language,
                              });
                              tabHistory.render(latest);
                          }
                      })
                    : "";
                self.offLoading();
                self.registerScrollEvent();
            })
            .catch((error) => {
                console.log("Lỗi load more", error);
                self.offLoading();
            });
    }

    fetchMore() {
        ++HistoryPageState.page;
        this.fetchData();
    }

    fetchLatest() {
        const currentState = HistoryPageState;
        HistoryPageState.page = 1; // reset page to get latest records
        this.fetchData(true);

        HistoryPageState.page = currentState.page;
        HistoryPageState.current = currentState.current;
    }

    registerScrollEvent() {
        const self = this;
        const shadow = document.getElementById("hrv-loyalty");
        const includediv = shadow.shadowRoot.getElementById(
            "hrv-loyalty-include-popup"
        );
        const checkIdActive = shadow.shadowRoot.getElementById(
            "hrv-loyalty-history"
        );
        const scrollAction = () => {
            const scrollId = shadow.shadowRoot.getElementById(
                "hrv-loyalty-tab-content-id"
            );
            scrollId.addEventListener("scroll", function () {
                if (
                    checkIdActive.classList.contains("active") &&
                    scrollId !== null &&
                    scrollId.scrollTop + scrollId.clientHeight + 60 >=
                        scrollId.scrollHeight &&
                    shadow.shadowRoot.getElementById(
                        "hrv-loyalty-coupons-click-include"
                    ) === null &&
                    HistoryPageState.page < HistoryPageState.maxPage
                ) {
                    const checkIdLoadMore = shadow.shadowRoot.getElementById(
                        "hrv-loyalty-loadmore-history"
                    );
                    checkIdLoadMore.onclick = function () {
                        self.fetchMore();
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

    offLoading() {
        if (HistoryPageState.hasLoading) {
            HistoryPageState.hasLoading = false;
            shadow.shadowRoot.getElementById(
                "hrv-loyalty-history-loaddingoff"
            ).classList = "";
        }
    }
}

export default HistoryPage;
