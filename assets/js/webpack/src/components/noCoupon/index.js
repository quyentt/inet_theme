import { Trans } from "../../helper";

class NoCouponRender {
  tabCoupon = null;

  constructor(options) {
    this.tabCoupon = options.divPopup
  }
  
  render() {
    this.tabCoupon.innerHTML = `<div class="hrv-loyalty-coupon-table-noData" style="margin-top: 26px">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7889 30.4223C19.144 27.712 21.9141 26 24.9443 26H75.0557C78.0859 26 80.856 27.712 82.2111 30.4223L90 46H80L70 56H30L20 46H10L17.7889 30.4223Z" fill="white" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/><path d="M10 46H20L30 56H70L80 46H90V88C90 92.4183 86.4183 96 82 96H18C13.5817 96 10 92.4183 10 88V46Z" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/><path d="M50 4V16" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M72 6L66 16.3923" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 6L34 16.3923" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="27" y="70" width="46" height="10" rx="5" fill="white" stroke="#E0E0E0" stroke-width="4" stroke-linejoin="round"/></svg>
        <br/>
      <p>${Trans("dont_coupon_in_the_present")}</p>
     </div>`;
  }
}
export default NoCouponRender;