class cantFetch503 {
  container = null;
  cantFetch503 = null;
  button = null;

  constructor(options) { 
      this.container = options.divInclude;
      this.cantFetch503 = document.createElement("div");
      this.cantFetch503.classList = "hrv-cant-fetch";
      this.container.append(this.cantFetch503); 
      this.container.classList = "hrv-loyalty-include hrv-height-420";
  }
  render() {
    const shadow = document.getElementById("hrv-loyalty");
    const btnScrollCoupon = shadow.shadowRoot.getElementById("hrv-loyalty-loadmore-coupons");
    // Tắt display nút scroll đi khi trang đang ở trạng thái Error
    if (btnScrollCoupon != null) {
      btnScrollCoupon.style.display = "none"
    }

    this.cantFetch503.innerHTML = '<div class="hrv-cant-fetch-content"><svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<circle cx="50" cy="30" r="20" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>\n\t\t\t\t\t\t\t\t\t<path d="M50 50C27.9086 50 10 67.9086 10 90H90C90 67.9086 72.0914 50 50 50Z" fill="#FAFAFA" stroke="#E0E0E0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t<p>Không lấy được thông tin thành viên </p>\n\t\t\t\t\t\t\t<div class="hrv-refresh" onClick="window.location.reload()">\n\t\t\t\t\t\t\t\t<a>\n\t\t\t\t\t\t\t\t\tTải lại\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t'
  }
}

export default cantFetch503;