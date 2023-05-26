import { getDate, formatNumber, clickBack, Trans } from "../helper";
import TabCoupon from "./tab_coupon";
import { currentpageCoupons } from "./tab_coupon";
import HistoryPage from "./history_page";
import TabCouponBuyer from "./tab_coupons_buyer";

function failReward() {
  const shadow = document.getElementById("hrv-loyalty");

  const image = `<svg width="290" height="201" viewBox="0 0 290 201" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#haraloyalty_2)">
    <path d="M207.349 137.44C207.349 155.63 196.544 161.981 183.215 161.981C169.886 161.981 159.08 155.63 159.08 137.44C159.08 119.25 183.215 96.1089 183.215 96.1089C183.215 96.1089 207.349 119.25 207.349 137.44Z" fill="#FC625D"/>
    <path d="M182.583 143.975L192.869 125.141L182.621 141.587L182.733 134.742L189.822 121.116L182.762 132.93L182.962 120.619L190.554 109.771L182.993 118.683L183.118 96.1089L182.367 124.713L174.68 112.937L182.274 127.127L181.555 140.877L181.534 140.512L172.636 128.069L181.507 141.801L181.417 143.521L181.401 143.547L181.408 143.688L179.583 162.036H182.021L182.314 160.553L191.163 146.855L182.336 159.199L182.583 143.975Z" fill="#3F3D56"/>
    <path d="M290 78.9524C290 113.7 269.359 125.833 243.897 125.833C218.435 125.833 197.795 113.7 197.795 78.9524C197.795 44.2046 243.897 0 243.897 0C243.897 0 290 44.2046 290 78.9524Z" fill="#F2F2F2"/>
    <path d="M242.218 120.517L242.69 91.4367L262.34 55.4597L242.764 86.8747L242.976 73.7988L256.519 47.7699L243.032 70.3385V70.3388L243.414 46.821L257.916 26.0988L243.474 43.123L243.713 0L242.214 57.0871L242.337 54.732L227.593 32.1459L242.1 59.2526L240.727 85.5177L240.686 84.8207L223.688 61.0522L240.634 87.2835L240.463 90.5682L240.432 90.6177L240.446 90.8872L236.96 157.524H241.617L242.176 123.105L259.08 96.9379L242.218 120.517Z" fill="#3F3D56"/>
    <path d="M288.107 151.706C288.107 162.077 220.882 201 142.295 201C63.7074 201 0 180.856 0 170.485C0 160.113 62.1438 172.441 140.731 172.441C219.318 172.441 288.107 141.335 288.107 151.706Z" fill="#3F3D56"/>
    <path opacity="0.1" d="M288.107 151.706C288.107 162.077 220.882 201 142.295 201C63.7074 201 0 180.856 0 170.485C0 160.113 62.1438 172.441 140.731 172.441C219.318 172.441 288.107 141.335 288.107 151.706Z" fill="black"/>
    <path d="M288.107 151.706C288.107 162.077 220.882 189.263 142.295 189.263C63.7074 189.263 0 180.856 0 170.485C0 160.113 62.1437 160.704 140.731 160.704C219.318 160.704 288.107 141.335 288.107 151.706Z" fill="#3F3D56"/>
    <path opacity="0.1" d="M143.887 177.132C177.259 177.132 204.313 175.038 204.313 172.455C204.313 169.872 177.259 167.777 143.887 167.777C110.515 167.777 83.461 169.872 83.461 172.455C83.461 175.038 110.515 177.132 143.887 177.132Z" fill="black"/>
    <path d="M96.0174 78.7246C96.0174 78.7246 113.707 79.0525 110.432 82.167C107.156 85.2816 94.8708 82.167 94.8708 82.167L96.0174 78.7246Z" fill="#A0616A"/>
    <path d="M59.1596 40.894C59.1596 40.894 66.3019 39.6175 68.7854 45.3879C71.2688 51.1583 76.3691 67.615 76.3691 67.615C76.3691 67.615 90.0181 76.6567 92.5007 76.3596C94.9832 76.0625 99.2272 76.6687 98.4487 79.3792C97.6703 82.0898 98.0159 85.1633 96.2236 85.54C94.4314 85.9167 91.581 82.3209 89.3996 84.0529C87.2181 85.7848 67.7767 79.4588 66.5286 78.148C65.2804 76.8373 54.9079 48.4546 54.9079 48.4546C54.9079 48.4546 55.3228 40.8015 59.1596 40.894Z" fill="#FC625D"/>
    <path d="M74.478 162.736L75.297 169.621L68.4176 171.424L64.4864 169.621V163.556L74.478 162.736Z" fill="#A0616A"/>
    <path d="M55.9688 167.162L56.7878 174.047L49.9083 175.85L45.9771 174.047V167.982L55.9688 167.162Z" fill="#A0616A"/>
    <path d="M75.1332 87.4946L78.2454 98.8054L82.8317 121.755C82.8317 121.755 84.1421 127.328 81.5213 134.049C78.9005 140.77 74.1504 162.736 75.1332 164.048C76.116 165.359 63.995 166.343 64.1588 165.031C64.3226 163.72 65.9605 145.688 65.9605 145.688C65.9605 145.688 68.2537 129.787 69.4003 127.82C70.5469 125.853 64.1588 120.935 64.1588 120.935C64.1588 120.935 62.5208 139.787 60.0638 141.426C57.6069 143.065 57.9345 168.474 56.7879 168.801C55.6413 169.129 47.2876 170.441 46.3048 168.801C45.3221 167.162 46.3048 139.787 46.3048 139.787C46.3048 139.787 51.874 118.968 50.7274 116.018C49.5808 113.067 50.236 100.445 50.236 100.445C50.236 100.445 45.9772 90.7731 48.2704 85.6914L75.1332 87.4946Z" fill="#2F2E41"/>
    <path d="M74.6418 24.5472C74.6418 24.5472 67.7623 33.0713 68.0899 36.8416C68.4175 40.6118 57.2792 29.9567 57.2792 29.9567C57.2792 29.9567 65.3053 19.1376 65.3053 16.8427C65.3053 14.5477 74.6418 24.5472 74.6418 24.5472Z" fill="#A0616A"/>
    <path d="M74.5599 27.7436C80.5304 27.7436 85.3705 22.8997 85.3705 16.9245C85.3705 10.9493 80.5304 6.10547 74.5599 6.10547C68.5893 6.10547 63.7493 10.9493 63.7493 16.9245C63.7493 22.8997 68.5893 27.7436 74.5599 27.7436Z" fill="#A0616A"/>
    <path d="M47.3155 81.3619C46.8257 83.188 46.218 85.2584 46.3048 87.0025C46.3605 88.132 49.3564 88.8729 53.4988 89.3582C57.3399 89.8089 62.167 90.0384 66.5551 90.1565C71.1627 90.2811 75.2822 90.2811 77.2626 90.2811C83.1593 90.2811 78.4091 86.5108 76.116 84.7076C73.8228 82.9044 74.3142 57.3321 74.478 54.0536C74.6418 50.7751 73.0038 41.2674 73.0038 39.4642C73.0038 37.661 69.1497 32.9547 69.1497 32.9547C69.1497 32.9547 68.2537 35.53 64.6502 32.0876C61.0466 28.6452 56.2965 27.6616 56.2965 27.6616C52.6929 28.973 46.6324 43.3984 46.3048 45.8573C46.1721 46.8556 46.2819 51.9685 46.5047 57.8058C46.8273 66.3381 47.3908 76.4244 47.779 77.4949C48.0853 78.3391 47.7463 79.7554 47.3155 81.3619Z" fill="#FC625D"/>
    <path d="M64.814 90.937L65.9605 95.0352L61.5379 99.6251L60.0638 93.2318L64.814 90.937Z" fill="#A0616A"/>
    <path d="M66.2881 167.818C66.2881 167.818 69.7279 171.752 72.3486 169.129C74.9694 166.506 74.8056 164.867 75.297 164.867C75.7884 164.867 83.1593 171.424 83.1593 171.424C83.1593 171.424 95.7717 174.375 88.8922 176.506C82.0127 178.637 62.5208 177.162 62.5208 176.506C62.5208 175.85 62.0294 167.162 63.8312 167.162L66.2881 167.818Z" fill="#2F2E41"/>
    <path d="M47.779 172.244C47.779 172.244 51.2187 176.178 53.8395 173.555C56.4603 170.932 56.2965 169.293 56.7879 169.293C57.2792 169.293 64.6501 175.85 64.6501 175.85C64.6501 175.85 77.2625 178.801 70.383 180.932C63.5035 183.063 44.0117 181.587 44.0117 180.932C44.0117 180.276 43.5203 171.588 45.322 171.588L47.779 172.244Z" fill="#2F2E41"/>
    <path d="M62.4225 25.5611C62.0733 25.7869 61.6187 26.0157 61.269 25.7906C59.9689 22.5458 58.9972 19.1786 58.3683 15.7398C58.1475 14.5318 57.9943 13.189 58.6648 12.1606C58.9293 11.755 59.31 11.4234 59.5037 10.9795C59.797 10.3074 59.6039 9.52943 59.7014 8.8025C59.9056 7.27959 61.3441 6.2174 62.7906 5.70225C64.2371 5.1871 65.8081 5.0273 67.1869 4.35132C68.4962 3.70947 69.5447 2.64498 70.7588 1.83719C71.9728 1.0294 73.5278 0.477083 74.8798 1.02293C76.0758 1.50581 76.8209 2.72587 77.9513 3.34709C78.7185 3.76865 79.6087 3.88596 80.465 4.06691C82.8451 4.57226 85.0796 5.61121 87.0004 7.10558C87.4678 7.43923 87.8708 7.85499 88.1898 8.33264C89.6405 10.723 87.0431 13.9727 88.189 16.5234L85.7116 14.567C85.05 13.9879 84.3039 13.5133 83.4991 13.1598C82.6784 12.8487 81.7066 12.8111 80.9612 13.2745C79.9151 13.9248 79.6314 15.2833 79.2659 16.4603C78.9005 17.6372 78.0924 18.9423 76.8613 18.9122C75.187 18.8712 74.6015 16.5328 73.099 15.7925C72.1195 15.3098 70.8866 15.6277 70.0515 16.3316C69.2166 17.0354 68.7155 18.0566 68.3481 19.0854C68.1184 19.7283 67.903 20.4531 67.4951 21.0104C67.0452 21.625 66.4698 21.6745 65.9894 22.1334C64.7387 23.3282 63.9697 24.5608 62.4225 25.5611Z" fill="#2F2E41"/>
    <path opacity="0.1" d="M47.3154 81.3619C49.3514 84.3175 51.6462 87.3665 53.4988 89.3582C57.3398 89.8089 62.167 90.0384 66.5551 90.1565C65.7712 89.0927 64.7909 88.1891 63.6674 87.4943C61.538 86.1829 56.4603 70.61 56.4603 70.61C56.4603 70.61 62.6846 54.5454 64.3225 48.4801C65.9605 42.4149 59.5724 38.9725 59.5724 38.9725C56.6241 36.5136 51.5463 42.251 51.5463 42.251C51.5463 42.251 48.955 50.0735 46.5046 57.8058C46.8273 66.3381 47.3908 76.4244 47.779 77.4949C48.0853 78.3391 47.7462 79.7554 47.3154 81.3619Z" fill="black"/>
    <path d="M59.081 37.6614C59.081 37.6614 65.4691 41.1039 63.8312 47.1691C62.1932 53.2343 55.9689 69.299 55.9689 69.299C55.9689 69.299 61.0466 84.8719 63.176 86.1833C65.3053 87.4947 68.2537 90.6093 65.9605 92.2485C63.6674 93.8878 62.0294 96.5106 60.3914 95.691C58.7534 94.8713 58.7534 90.2814 55.9689 90.2814C53.1843 90.2814 41.8823 73.2332 41.7185 71.43C41.5547 69.6268 51.055 40.9399 51.055 40.9399C51.055 40.9399 56.1327 35.2025 59.081 37.6614Z" fill="#FC625D"/>
    <path d="M191.914 82.467L190.071 80.6228C188.996 79.5472 187.539 78.9429 186.019 78.9429C184.499 78.9429 183.041 79.5472 181.966 80.6228L146.224 116.393L110.481 80.6228C109.407 79.5472 107.949 78.9429 106.429 78.9429C104.909 78.9429 103.451 79.5472 102.376 80.6228L100.533 82.467C100.001 82.9996 99.5791 83.6319 99.2911 84.3278C99.0031 85.0236 98.8549 85.7695 98.8549 86.5227C98.8549 87.2759 99.0031 88.0218 99.2911 88.7177C99.5791 89.4136 100.001 90.0459 100.533 90.5785L136.276 126.349L100.533 162.119C100.001 162.651 99.5791 163.284 99.2911 163.98C99.0031 164.675 98.8549 165.421 98.8549 166.175C98.8549 166.928 99.0031 167.674 99.2911 168.369C99.5791 169.065 100.001 169.698 100.533 170.23L102.376 172.074C103.451 173.15 104.909 173.754 106.429 173.754C107.949 173.754 109.407 173.15 110.481 172.074L146.224 136.304L181.966 172.074C183.041 173.15 184.499 173.754 186.019 173.754C187.539 173.754 188.996 173.15 190.071 172.074L191.914 170.23C192.989 169.155 193.592 167.696 193.592 166.175C193.592 164.653 192.989 163.194 191.914 162.119L156.172 126.349L191.914 90.5785C192.989 89.5028 193.592 88.0439 193.592 86.5227C193.592 85.0015 192.989 83.5426 191.914 82.467Z" fill="#FF6584"/>
    <path opacity="0.1" d="M99.258 164.064L133.939 129.356L133.605 129.021L100.534 162.119C99.9795 162.673 99.5454 163.335 99.258 164.064Z" fill="black"/>
    <path opacity="0.1" d="M100.039 83.6298C101.114 82.5541 102.572 81.9498 104.092 81.9498C105.612 81.9498 107.07 82.5541 108.144 83.6298L143.887 119.4L179.629 83.6298C180.704 82.5541 182.162 81.9498 183.682 81.9498C185.202 81.9498 186.659 82.5541 187.734 83.6298L189.577 85.4739C190.367 86.2652 190.909 87.2707 191.136 88.3664C191.363 89.4621 191.264 90.6003 190.852 91.6407L191.914 90.5785C192.446 90.0458 192.868 89.4135 193.156 88.7177C193.444 88.0218 193.592 87.2759 193.592 86.5227C193.592 85.7695 193.444 85.0236 193.156 84.3278C192.868 83.6319 192.446 82.9996 191.914 82.467L190.071 80.6228C188.996 79.5472 187.539 78.9429 186.019 78.9429C184.499 78.9429 183.041 79.5472 181.966 80.6228L146.224 116.393L110.481 80.6228C109.407 79.5472 107.949 78.9429 106.429 78.9429C104.909 78.9429 103.451 79.5472 102.376 80.6228L100.534 82.467C99.9795 83.0208 99.5454 83.6828 99.258 84.4117L100.039 83.6298Z" fill="black"/>
    <path opacity="0.1" d="M156.505 126.683L153.835 129.355L189.577 165.126C190.367 165.917 190.909 166.922 191.136 168.018C191.363 169.114 191.264 170.252 190.852 171.292L191.914 170.23C192.446 169.698 192.868 169.065 193.156 168.369C193.444 167.673 193.592 166.928 193.592 166.174C193.592 165.421 193.444 164.675 193.156 163.979C192.868 163.284 192.446 162.651 191.914 162.119L156.505 126.683Z" fill="black"/>
    <path d="M41.6185 150.532C41.6185 165.64 32.6442 170.915 21.574 170.915C10.5037 170.915 1.52942 165.64 1.52942 150.532C1.52942 135.425 21.574 116.206 21.574 116.206C21.574 116.206 41.6185 135.425 41.6185 150.532Z" fill="#FC625D"/>
    <path d="M21.049 155.96L29.5926 140.318L21.0812 153.977L21.1736 148.292L27.0617 136.975L21.198 146.787L21.364 136.562L27.669 127.553L21.39 134.955L21.4937 116.206L20.8699 139.963L14.4851 130.182L20.7926 141.967L20.1954 153.387L20.1777 153.084L12.7876 142.75L20.1552 154.155L20.0805 155.583L20.0671 155.604L20.0733 155.722L18.5578 170.96H20.5826L20.8256 169.729L28.1752 158.352L20.8439 168.604L21.049 155.96Z" fill="#3F3D56"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="290" height="201" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;
  const div = shadow.shadowRoot.getElementById("hrv-loyalty-couponsReward");
  div.parentNode.removeChild(div);
  const id = shadow.shadowRoot.getElementById(
    "hrv-loyalty-coupons-click-include"
  );
  const divadd = document.createElement("div");
  const html = `<div class="hrv-loyalty-Reward-fail">
      ${image}
      <p style="padding-top: 3.125em;font-weight: bold;font-size: 0.9375em;">Có lỗi xảy ra trong quá trình đổi thưởng</p>
      <p style="color: #757575">Xin vui lòng quay lại sau ít phút nữa.</p>
    </div>`;
  divadd.innerHTML = html;
  id.append(divadd);
  setTimeout(function () {
    clickBack(divWrapper);
  }, 2000);
}

function loaddingClickReward() {
  const shadow = document.getElementById("hrv-loyalty");
  const loadding = shadow.shadowRoot.getElementById("hrv-Reward-loading");
  const reward = shadow.shadowRoot.getElementById("hrv-loyaltyRewardCheck");
  const div = document.createElement("div");
  div.classList = "hrv-loyalty-loading";
  div.setAttribute("style", "top:50%");
  loadding.setAttribute("style", "margin: 60px;");
  reward.classList = "hrv-loyalty-click-reward-check";
  loadding.append(div);
}

function offloadingClickReward() {
  const shadow = document.getElementById("hrv-loyalty");
  const loadding = shadow.shadowRoot.getElementById("hrv-Reward-loading");
  if (loadding !== null) {
    loadding.parentNode.removeChild(loadding);
  }
}

function clickRewardCheck() {
  const shadow = document.getElementById("hrv-loyalty");
  const div = shadow.shadowRoot.getElementById("hrv-loyaltyReward");
  const divCheck = shadow.shadowRoot.getElementById("hrv-loyaltyRewardCheck");
  const black = shadow.shadowRoot.getElementById("backgroundBlackId");
  black.classList = "backgroundBlack";
  div.classList = "hrv-loyalty-click-reward";
  divCheck.classList = "hrv-loyalty-click-reward-check show-reward";
  const last = shadow.shadowRoot.getElementById("hrv-loyaltyRewardDivall");
  last.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
}

function clickRewardCheckCancel() {
  const shadow = document.getElementById("hrv-loyalty");
  const last = shadow.shadowRoot.getElementById("hrv-loyaltyRewardDivall");
  const div = shadow.shadowRoot.getElementById("hrv-loyaltyReward");
  const divCheck = shadow.shadowRoot.getElementById("hrv-loyaltyRewardCheck");
  const black = shadow.shadowRoot.getElementById("backgroundBlackId");
  black.classList = "";
  div.classList = "hrv-loyalty-click-reward show-reward";
  divCheck.classList = "hrv-loyalty-click-reward-check";
  last.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
}

function successReward() {
  const shadow = document.getElementById("hrv-loyalty");
  const reward = shadow.shadowRoot.getElementById(
    "hrv-loyaltyRewardCheckSuccess"
  );
  const divWrapper = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );

  reward.classList = "hrv-loyalty-click-reward-check-success show-reward";
  const last = shadow.shadowRoot.getElementById("hrv-loyaltyRewardDivall");
  last.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
  setTimeout(function () {
    clickBack(divWrapper);
    const buttonTabCoupon = shadow.shadowRoot.getElementById(
      "hrv-myTab-active-coupons"
    );
    buttonTabCoupon.click();
  }, 2000);
}

function errorReward(textError) {
  const shadow = document.getElementById("hrv-loyalty");
  const divWrapper = shadow.shadowRoot.getElementById(
    "hrv-loyalty-tab-content-id"
  );
  const reward = shadow.shadowRoot.getElementById(
    "hrv-loyaltyRewardCheckError"
  );
  const text = shadow.shadowRoot.getElementById("hrv-loyalty-text-error");
  reward.classList = "hrv-loyalty-click-reward-check-error show-reward";
  const last = shadow.shadowRoot.getElementById("hrv-loyaltyRewardDivall");
  text.innerHTML = `<p>${textError}</p>`;
  last.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
  setTimeout(function () {
    clickBack(divWrapper);
  }, 2000);
}

function clickRewardCheckConfirm(id, point, org, containerMembership) {
  const orgId = org;
  const location = window.location.origin;
  const ApiReward = location + `/apps/loyalty/redeem.json`;
  const shadow = document.getElementById("hrv-loyalty");
  const divPopup = shadow.shadowRoot.getElementById(
    "hrv-loyalty-reward-coupon-push-in-wrapper"
  );
  const data = {
    org_id: orgId,
    reward_id: id,
  };
  // const math = Haraloyalty.pointCurrent - x;
  loaddingClickReward();
  fetch(ApiReward, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.status == 1) {
        successReward();
        offloadingClickReward();
        const total = currentpageCoupons.total + 1;
        const dataItem = response.data;
        const tabCoupon = new TabCouponBuyer({
          divPopup,
          dataItem,
          org,
          total,
          current: currentpageCoupons.current,
          append: false,
        });
        tabCoupon.render();
        const historyPage = new HistoryPage({
          container: divPopup,
        });

        historyPage.fetchLatest();

        if (typeof containerMembership !== "undefined") {
          containerMembership.minusAvailablePoint(point);
          containerMembership.renderMembership();
        }
      } else {
        errorReward(response.message_text);
        offloadingClickReward();
      }
    })
    .catch((t) => {
      console.log(t);
      failReward();
      offloadingClickReward();
    });
}

class TabRewardDetail {
  container = null;
  data = null;
  org = null;
  containerMembership = null;

  constructor(options) {
    this.containerMembership = options.containerMembership;
    this.container = options.divDetail;
    this.data = options.data;
    this.org = options.id_org;
  }

  isUsedCoupons() {
    const shadow = document.getElementById("hrv-loyalty");
    const divWrapper = shadow.shadowRoot.getElementById(
      "hrv-loyalty-tab-content-id"
    );
    const includediv = shadow.shadowRoot.getElementById(
        "hrv-loyalty-coupons-click-include"
      ),
      divRender = document.createElement("div"),
      html = `<div class="hrv-loyalty-coupons-isUsedCoupons">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 13H48.889C49.8851 12.0288 50.5689 10.7825 50.8529 9.42057C51.1369 8.05863 51.0083 6.64292 50.4833 5.35451C49.9584 4.0661 49.0611 2.96354 47.9062 2.18785C46.7513 1.41215 45.3912 0.998571 44 1C37.193 1 33.568 7.225 32 10.981C30.432 7.225 26.807 1 20 1C18.6088 0.998571 17.2487 1.41215 16.0938 2.18785C14.9389 2.96354 14.0416 4.0661 13.5167 5.35451C12.9917 6.64292 12.8631 8.05863 13.1471 9.42057C13.4311 10.7825 14.1149 12.0288 15.111 13H2C1.73478 13 1.48043 13.1054 1.29289 13.2929C1.10536 13.4804 1 13.7348 1 14V22C1 22.2652 1.10536 22.5196 1.29289 22.7071C1.48043 22.8946 1.73478 23 2 23H62C62.2652 23 62.5196 22.8946 62.7071 22.7071C62.8946 22.5196 63 22.2652 63 22V14C63 13.7348 62.8946 13.4804 62.7071 13.2929C62.5196 13.1054 62.2652 13 62 13ZM44 3C45.3261 3 46.5979 3.52679 47.5355 4.46447C48.4732 5.40215 49 6.67392 49 8C49 9.32609 48.4732 10.5979 47.5355 11.5355C46.5979 12.4732 45.3261 13 44 13H33.371C34.423 10.067 37.621 3 44 3ZM15 8C15.0016 6.67441 15.5289 5.40356 16.4662 4.46622C17.4036 3.52889 18.6744 3.00159 20 3C26.364 3 29.57 10.066 30.626 13H20C18.6744 12.9984 17.4036 12.4711 16.4662 11.5338C15.5289 10.5964 15.0016 9.3256 15 8Z" fill="#FDEBED"/>
                    <path d="M57 25H36V60H51C52.5913 60 54.1174 59.3679 55.2426 58.2426C56.3679 57.1174 57 55.5913 57 54V25Z" fill="#FDEBED"/>
                    <path d="M28 25H7V54C7 55.5913 7.63214 57.1174 8.75736 58.2426C9.88258 59.3679 11.4087 60 13 60H28V25Z" fill="#FDEBED"/>
                    <g opacity="0.5">
                    <path d="M56 30V54C56 55.3261 55.4732 56.5979 54.5355 57.5355C53.5979 58.4732 52.3261 59 51 59H13C11.6739 59 10.4021 58.4732 9.46447 57.5355C8.52678 56.5979 8 55.3261 8 54V30" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
                    <path d="M62 14H2V24H62V14Z" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
                    <path d="M14 8C14 6.4087 14.6321 4.88258 15.7574 3.75736C16.8826 2.63214 18.4087 2 20 2C28.875 2 32 14 32 14H20C18.4087 14 16.8826 13.3679 15.7574 12.2426C14.6321 11.1174 14 9.5913 14 8Z" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
                    <path d="M50 8C50 6.4087 49.3679 4.88258 48.2426 3.75736C47.1174 2.63214 45.5913 2 44 2C35.125 2 32 14 32 14H44C45.5913 14 47.1174 13.3679 48.2426 12.2426C49.3679 11.1174 50 9.5913 50 8V8Z" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
                    <path d="M38 14V59H26V14" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
                    </g>
                </svg>
                <h3>${Trans("invalid_coupon")}</h3>
                <a id="hrv-loyalty-back">${Trans("back")}</a>
             </div>
                 `;
    divRender.innerHTML = html;
    includediv.append(divRender);
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-coupons-loaddingoff"
    ).classList = "";
    const isBack = shadow.shadowRoot.getElementById("hrv-loyalty-back");
    isBack.onclick = function () {
      clickBack(divWrapper);
    };
  }

  render() {
    const { data, org, containerMembership } = this;
    const shadow = document.getElementById("hrv-loyalty");
    const divWrapper = shadow.shadowRoot.getElementById(
      "hrv-loyalty-tab-content-id"
    );
    const divInclude = shadow.shadowRoot.getElementById(
        "hrv-loyalty-coupons-click-include"
      ),
      divRender = document.createElement("div"),
      type = data.discount.type;
    const TYPE_POOL = 3; //Ưu đãi dạng Pool
    const i = `<img src="${data.discount.image_url}" />`;
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
    const imageError = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="url(#paint0_linear_error)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1692 40.4761C33.8104 40.4761 40.8155 33.471 40.8155 24.8299C40.8155 16.1887 33.8104 9.18359 25.1692 9.18359C16.528 9.18359 9.52295 16.1887 9.52295 24.8299C9.52295 33.471 16.528 40.4761 25.1692 40.4761Z" fill="url(#paint1_linear_error)"/>
  <path d="M31 19L20 30" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 19L31 30" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
  <linearGradient id="paint0_linear_error" x1="-11.2398" y1="-20.9018" x2="76.308" y2="25.8783" gradientUnits="userSpaceOnUse">
  <stop stop-color="#FC625D"/>
  <stop offset="1" stop-color="#EF5350"/>
  </linearGradient>
  <linearGradient id="paint1_linear_error" x1="2.48851" y1="-3.89778" x2="57.2803" y2="25.3795" gradientUnits="userSpaceOnUse">
  <stop stop-color="#FC625D" stop-opacity="0.34"/>
  <stop offset="1" stop-color="#EF5350"/>
  </linearGradient>
  </defs>
  </svg>
  `;
    divRender.classList = "hrv-loyalty-coupons-click-item";
    divRender.setAttribute("id", "hrv-loyalty-couponsReward");
    //console.log(f== null);
    const noContent = `<div class="" id="backgroundBlackId"></div>
  <div id="hrv-loyalty-coupons-click-header" class="hrv-loyalty-coupons-click-header">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2979FF"/></svg>
      <p>${Trans("back")}</p>
  </div>
  <div class="hrv-loyalty-desktop-reward-detail" >
  <div class="hrv-loyalty-srcoll-click-coupons">
  <div class="hrv-loyalty-image-click-coupons">
  ${
    data.discount.image_url == null || data.discount.image_url == ""
      ? '<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="72" height="72" rx="8" fill="white"/><path d="M44 13C39.667 13 37.211 16.595 36 19.18C34.789 16.595 32.333 13 28 13C25.243 13 23 15.243 23 18C23 20.757 25.243 23 28 23H36H44C46.757 23 49 20.757 49 18C49 15.243 46.757 13 44 13ZM28 21C26.346 21 25 19.654 25 18C25 16.346 26.346 15 28 15C31.745 15 33.786 18.924 34.603 21H28ZM44 21H37.394C38.206 18.925 40.24 15 44 15C45.654 15 47 16.346 47 18C47 19.654 45.654 21 44 21Z" fill="#D1B43D"/><path d="M55 27H17V57C17 58.105 17.895 59 19 59H53C54.105 59 55 58.105 55 57V27Z" fill="#C94F49"/><path d="M57 21H15C13.895 21 13 21.895 13 23V29C13 30.105 13.895 31 15 31H57C58.105 31 59 30.105 59 29V23C59 21.895 58.105 21 57 21Z" fill="#E86C60"/><path d="M41 21H31V31H41V21Z" fill="#EFD358"/><path d="M41 31H31V59H41V31Z" fill="#D1B43D"/></svg>'
      : i
  }
  </div>
  <div class="hrv-loyalty-title-click-coupons">
      <h2>${data.title}</h2>
      ${
        type == 3
          ? `<div></div>`
          : `<div style="display:flex;margin-left: 10%;margin-right: 10%;">
            <div style="width:50%;border-right: 1px solid #757575;">
                <p>${Trans("required_points")} : </p>
                <p style="color:#FC625D;font-weight:500">${formatNumber(
                  data.condition_value
                )} <span style="color:#000;font-weight:400">${Trans(
              "point"
            )}</span></p>
            </div>
            <div style="width:50%;">
                <p>${Trans("expiry")} : </p>
                <p>${
                  data.discount.settings.is_expired == 0
                    ? `${Trans("indefinite")}`
                    : data.discount.settings.number_date_coupon_expired +
                      ` ${Trans("day")}`
                }</p>
            </div>
        </div>`
      }
  </div>
  <div class="hrv-loyalty-reward-content">
      ${data.discount.content == null ? "" : data.discount.content}
  </div>

  </div>
     
      <div class="hrv-loyalty-reward-divall" id="hrv-loyaltyRewardDivall">
          <div class="hrv-loyalty-click-reward show-reward" id="hrv-loyaltyReward">
              <p>${Trans("redeem_reward")}</p>
          </div>
          <div class="hrv-loyalty-click-reward-check" id="hrv-loyaltyRewardCheck">
              <p>${Trans("redeem_this_reward")} ${formatNumber(
      data.condition_value
    )} ${Trans("point")}? </p>
              <div style="display:flex">
                  <div id="hrv-loyalty-click-reward-check-cancel" class="hrv-loyalty-click-reward-check-cancel">${Trans(
                    "cancel"
                  )}</div>
                  <div id="hrv-loyalty-click-reward-check-confirm" class="hrv-loyalty-click-reward-check-confirm2">${Trans(
                    "redeem_reward"
                  )}</div>
              </div>
          </div>
          <div class="hrv-loyalty-click-reward-check-success" id="hrv-loyaltyRewardCheckSuccess">
              ${imageee}
              <p>${Trans(
                "the_reward_add"
              )}<br/> <span style="font-weight:bold;font-size:0.875em">${Trans(
      "your_coupon"
    )}.</span>  </p>
          </div>
          <div class="hrv-loyalty-click-reward-check-error" id="hrv-loyaltyRewardCheckError">
              ${imageError}
              <div id="hrv-loyalty-text-error"></div>
          </div>
          <div id="hrv-Reward-loading"></div>
      </div>

  </div>`;

    divRender.innerHTML = noContent;
    divInclude.append(divRender);
    shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-coupons-loaddingoff"
    ).classList = "";
    const buttonClickBack = shadow.shadowRoot.getElementById(
      "hrv-loyalty-coupons-click-header"
    );
    const buttonClickReward =
      shadow.shadowRoot.getElementById("hrv-loyaltyReward");
    const buttonClickRewardCancel = shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-reward-check-cancel"
    );
    const buttonClickRewardConfirm = shadow.shadowRoot.getElementById(
      "hrv-loyalty-click-reward-check-confirm"
    );

    buttonClickBack.onclick = function () {
      clickBack(divWrapper);
    };
    buttonClickReward.onclick = function () {
      clickRewardCheck();
    };
    buttonClickRewardCancel.onclick = function () {
      clickRewardCheckCancel();
    };
    buttonClickRewardConfirm.onclick = function () {
      clickRewardCheckConfirm(
        data.id,
        data.condition_value,
        org,
        containerMembership
      );
    };
  }
}

export default TabRewardDetail;
