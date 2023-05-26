import { Trans } from "../helper";

class NoMember {
  container = null;
  noMemberContainer = null;
  button = null;

  constructor(options) {
    this.container = options.divPopup;
    this.noMemberContainer = document.createElement("div");
    this.noMemberContainer.classList = "hrv-loyalty-noMember";
    this.container.append(this.noMemberContainer);
    this.container.classList = "hrv-loyalty-include hrv-height-420";
  }

  render() {
    const shadow = document.getElementById("hrv-loyalty");
    // const include = shadow.shadowRoot.getElementById('hrv-loyalty-include-popup');
    const loadding = shadow.shadowRoot.getElementById(
      "hrv-loyalty-firstinit-loaddingoff"
    );
    const href = window.location.origin;
    const html = `
            <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.12" x="1" y="1" width="76" height="76" rx="38" fill="#EC5569"/>
            <path opacity="0.12" fill-rule="evenodd" clip-rule="evenodd" d="M20.4167 5.84619C13.3717 12.7441 9 22.3615 9 33C9 53.9869 26.0132 71 47 71C53.7501 71 60.0891 69.24 65.5833 66.1539C58.7305 72.8636 49.3483 77 39 77C18.0132 77 1 59.9869 1 39C1 24.7633 8.82909 12.3552 20.4167 5.84619Z" fill="#E63950"/>
            <path d="M57.812 24.2914C53.5613 19.9029 46.6695 19.9029 42.4186 24.2914L40.0175 26.7704C39.445 27.3614 38.5166 27.3614 37.9441 26.7704L35.5814 24.331C31.3307 19.9425 24.4389 19.9425 20.188 24.331C15.9373 28.7195 15.9373 35.8347 20.188 40.2235L37.9455 58.5567C38.518 59.1478 39.4465 59.1478 40.0189 58.5567L57.8118 40.1838C62.0627 35.7951 62.0627 28.6801 57.812 24.2914Z" fill="#FFF5F5"/>
            <path d="M25.882 40.2234C21.6313 35.8349 21.6313 28.7196 25.882 24.3309C27.2763 22.8914 28.9556 21.9272 30.7316 21.4322C27.0928 20.4178 23.0445 21.382 20.1883 24.3309C15.9376 28.7195 15.9376 35.8347 20.1883 40.2234L37.9458 58.5566C38.5183 59.1477 39.4467 59.1477 40.0192 58.5566L41.8292 56.6876L25.882 40.2234Z" fill="#DCE6EB"/>
            <circle opacity="0.5" cx="39" cy="39" r="38" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
            <path opacity="0.5" d="M57.812 23.2914C53.5613 18.9029 46.6695 18.9029 42.4186 23.2914L40.0175 25.7704C39.445 26.3614 38.5166 26.3614 37.9441 25.7704L35.5814 23.331C31.3307 18.9425 24.4389 18.9425 20.188 23.331C15.9373 27.7195 15.9373 34.8347 20.188 39.2235L37.9455 57.5567C38.518 58.1478 39.4465 58.1478 40.0189 57.5567L57.8118 39.1838C62.0627 34.7951 62.0627 27.6801 57.812 23.2914Z" stroke="#E63950" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
            </svg>
            <div class="hrv-loyalty-title-noMember">
                <h2>${Trans("account_not_activate")}</h2>
                <p>${Trans("please_feel_more_details")}.</p>
            </div>
            <div class="hrv-loyalty-logout-noMember">

                <a href="${href}/account/logout">${Trans("logout")}</a>

            </div>
    `;
    this.noMemberContainer.innerHTML = html;
    loadding.classList = "";
  }
}

export default NoMember;
