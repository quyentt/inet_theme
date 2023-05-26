const options = {
  styleCssDivPopup: `
          .unshowloadmore{
              opacity:0;
              height:0 !important;
              width:0;
              transition: all 0.3s;
              display: none
          }
          .showloadmore{
              display:flex;
              animation: opacityfadein 2s;
              -moz-animation: opacityfadein 2s;
              -webkit-animation: opacityfadein 2s;
              -o-animation: opacityfadein 2s;
          }
          .unshowloadmore-nologin{
              opacity:0;height:0 !important ; width:0
          }
          .showloadmore-nologin{
              display:flex;
              animation: opacityfadein;
              -moz-animation: opacityfadein;
              -webkit-animation: opacityfadein;
              -o-animation: opacityfadein;
          }
          @keyframes opacityfadein{
              from{opacity:0}to{opacity:1}
          }
          @-moz-keyframes opacityfadein{
              from{opacity:0}to{opacity:1}
          }
          @-webkit-keyframes opacityfadein{
              from{opacity:0}to{opacity:1}
          }
          @-ms-keyframes opacityfadein{
              from{opacity:0}to{opacity:1}
          }
          @-o-keyframes opacityfadein{
              from{opacity:0}to{opacity:1}
          }
          #hrv-loyalty-promotion{position: relative;}
          .hrv-loyalty-Reward-fail{
              text-align:center;
              margin: 0;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-right: -50%;
              transform: translate(-50%, -50%);
          }
          .hrv-loyalty-footer-noData{margin-top: 0.625em;text-align: center;}
          .hrv-loyalty-reward-divall .hrv-loyalty-click-reward-check-error{display:none}
          .hrv-loyalty-reward-divall .hrv-loyalty-click-reward-check-success{display:none}
          .hrv-loyalty-reward-divall .hrv-loyalty-click-reward-check{display:none}
          .hrv-loyalty-reward-divall .hrv-loyalty-click-reward{display:none}
          .hrv-loyalty-reward-divall {
              z-index:9999;
              padding-top: 1.25em;
              padding-left: 10%;
              padding-bottom:5%;
              padding-right: 10%;
              width: 100%;
              background-color: #fff;
              text-align: center;
          }
  
  
          
          .hrv-loyalty-checkbox-apply {
              position: absolute;
              right: 3%;
              top: 10%;
          }
  
          .hrv-loyalty-reward-divall {
              width: 100%;
              position: fixed!important;
              bottom: 0px;
              left: 0px;
              transform: translate3d(0,0,0);
              overflow:hidden;
              -webkit-overflow-scrolling:touch;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
          }
  
  
          @media screen and (min-width: 550px) {
              .hrv-loyalty-reward-divall {
                  position: sticky!important;
                  bottom: 0;
                  left: 0px;
              }
          } 
          @media screen and (max-width: 550px) {
              .hrv-loyalty-reward-content {
                  padding-bottom: 100px;
              }    
          } 
  
          .show-reward { display:block !important }
  
          .backgroundBlack {
              top:0; 
              left:0;
              width: 100%;
              position: absolute;
              height: calc(100% + 120px)!important;
              background-color: #212121;
              opacity: 0.4;
          }
  
          .hrv-loyalty-coupon-table:hover  {
              background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='380' height='96' viewBox='0 0 380 96' fill='none'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M102 0C102 3.31371 99.3137 6 96 6C92.6863 6 90 3.31371 90 0H8C3.58172 0 0 3.58172 0 8V88C0 92.4183 3.58173 96 8.00001 96H90C90 92.6863 92.6863 90 96 90C99.3137 90 102 92.6863 102 96H372C376.418 96 380 92.4183 380 88V8C380 3.58172 376.418 0 372 0H102Z' fill='%23F0F6FF'/%3e%3c/svg%3e")!important;
              transition: all 0.3s;
          }
  
          .hrv-loyalty-coupon-table:hover #hrv-loyalty-checkbox-icon {
              fill: #2962FF!important;
              transition: all 0.3s;
          }
  
          .hrv-loyalty-click-reward-check-confirm2{width: 50%;margin-left: 0.625em;background-color: #2979FF;padding: 8px 0px;border-radius: 4px;color: #fff;cursor: pointer;font-weight:500;}.hrv-loyalty-click-reward-check-cancel{width: 50%;background-color: #EEEEEE;padding: 8px 0px;border-radius: 4px;font-weight: 500;cursor: pointer;}.hrv-loyalty-click-reward-check p{text-align: left;}.hrv-loyalty-reward-content{padding-left:10%;padding-right:10%}.hrv-loyalty-click-reward p{margin:0}.hrv-loyalty-click-reward{cursor:pointer;background-color: #2979FF;padding: 8px;border-radius: 4px;color: #fff;font-weight: 500;}.hrv-loyalty-tab-content #hrv-loyalty-promotion {display: none;}@media only screen and (min-device-width:320px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:2){.hrv-loyalty-avatar svg{ width: 100%}.button-popup-loyalty svg{width:80% }.button-popup-loyalty{left:0!important;bottom: 0px !important}}hrv-loyalty-title-noData{margin-top:0.9375em;text-align:center}}.hrv-loyalty-info{width:70%}.hrv-loyalty-coupons-click-item{animation: opacityfadein 1s;-moz-animation: opacityfadein 1s;-webkit-animation: opacityfadein 1s;-o-animation: opacityfadein 1s}.hrv-loyalty-coupons-isUsedCoupons a{cursor:pointer;background:#2979ff;border-radius:4px;padding:0.75em 1.375em;margin-top:1.25em;font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:0.8125em;line-height:1em;color:#fff}.hrv-loyalty-coupons-isUsedCoupons h3{margin-bottom:2.5em;font-family:"Roboto", sans-serif;margin-top:1.25em;font-style:normal;font-weight:700;font-size:1.0625em;line-height:1.3125em;text-align:center;color:#000}.hrv-loyalty-coupons-isUsedCoupons{text-align:center;transform:translate(-50%,-50%);position:absolute;top:50%;left:50%;margin-right:-50%}.hrv-loyalty-image-copouns svg{width:100%;height:100%}.hrv-loyalty-image-click-coupons svg{width:100%;height:100%}.hrv-loyalty-logout-noMember a{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.6875em;line-height:0.875em;text-align:center;color:#2979ff}.hrv-loyalty-noMember{margin-top:100px}.hrv-loyalty-logout-noMember{text-align:center;margin-top:100px;margin-bottom:3.125em}.hrv-loyalty-noMember svg{display:flex;margin:auto}.hrv-loyalty-title-noMember{margin-top:1.25em}.hrv-loyalty-title-noMember h2{font-family:"Roboto", sans-serif;font-style:normal;font-weight:700;font-size:1.0625em;line-height:1.3125em;text-align:center;margin-bottom:1em;color:#000}.hrv-loyalty-title-noMember p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;margin-bottom:1em;font-size:0.8125em;line-height:1em;text-align:center;color:#757575}#hrv-loyalty-open *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@media only screen and (max-width:768px){.hrv-loyalty-modal{bottom:0;width:100%}.button-popup-loyalty{width:80px;left:0.625em!important}}.hrv-loyalty-coupon-table-noData{text-align:center}.hrv-loyalty-coupon-table-noData svg{margin-bottom:0.625em}.hrv-loyalty-coupon-table-noData p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:0.9375em;line-height:1.1875em;text-align:center;color:#bdbdbd}hrv-loyalty-title-noData p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.6875em;margin-bottom:0.625em;line-height:0.875em;text-align:center;color:#212121}hrv-loyalty-title-noData a{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.6875em;line-height:0.875em;text-align:center}.hrv-loyalty-button-noData{border-radius:8px;padding:15px 0;text-align:center;margin-top:0.75em}.hrv-loyalty-button-noData a{font-weight: bold;font-family:"Roboto", sans-serif;font-style:normal;font-size:1em;line-height:1em;border-radius:8px;text-align:center;color:#fff}.hrv-loyalty-header-noData{display:flex}.hrv-loyalty-header-noData svg{margin:auto}.hrv-loyalty-title-noData h2{margin-bottom: 1.0625em;font-family:"Roboto", sans-serif;font-style:normal;font-weight:700;font-size:1.0625em;line-height:1.3125em;text-align:center;color:#000}.hrv-loyalty-title-noData p{line-height: 1.225em;font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.8125em;line-height:1em;text-align:center;color:#757575}.hrv-loyalty-title-noData{margin-top:1.25em}.hrv-loyalty-srcoll-click-coupons{width:100%}.hrv-loyalty-info-click-coupons{margin:2.625em 2.5em}.hrv-loyalty-info-click-coupons h2{font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:0.9375em;line-height:1.1875em;color:#212121}.hrv-loyalty-coppy-click-coupons p{cursor:pointer;font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.8125em;margin:0;padding:0 6px 0 7px;line-height:1.125em;color:#2979ff}.hrv-loyalty-coppy-click-coupons svg{cursor:pointer;margin-left:6px;margin-top:2px}.hrv-loyalty-coppy-click-coupons{display:flex;border:1px solid #2979ff;box-sizing:border-box;border-radius:4px;width:130px;margin:auto;margin-top:0.9375em;margin-bottom:0.9375em}#hrv-loyalty-value-code-coppy{opacity:0;width:0;height:0;position:absolute}.hrv-loyalty-code-click-coupons p{margin:0;font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:1.0625em;line-height:1.3125em;text-align:center;color:#212121;padding:1.375em 0}.hrv-loyalty-code-click-coupons{z-index:1000;position:relative;text-align:center;width:80%;border:1px solid #2979ff;box-sizing:border-box;border-radius:8px;margin-top:2.5em;margin:auto}.hrv-loyalty-title-click-copouns p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.8125em;line-height:1.125em;text-align:center;color:#757575}.hrv-loyalty-title-click-coupons{margin-bottom:2.5em}.hrv-loyalty-title-click-coupons p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.8125em;line-height:1.125em;text-align:center;color:#757575}.hrv-loyalty-title-click-coupons h2{font-family:"Roboto", sans-serif;font-style:normal;padding:0.625em 2.5em 0 2.5em;font-weight:500;font-size:1.0625em;line-height:1.3125em;text-align:center;color:#212121}.hrv-loyalty-image-click-coupons{margin:auto;max-width:100px;max-height:100px;overflow:hidden;border-radius:1em}.hrv-loyalty-coupons-click-header{cursor:pointer;display:inline-flex;padding-left:1em;padding-top:1em}.hrv-loyalty-coupons-click-header p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:0.8125em;padding-left:8px;line-height:1.625em;color:#2979ff}#hrv-loyalty-coupons-click-include{min-height:100%;position:absolute;width:100%;background-color:#fff;top:0;}.hrv-myTab-history-active svg{display:none}.hrv-myTab-history-active .active{display:block!important}.hrv-myTab-coupons-active svg{display:none}.hrv-myTab-coupons-active .active{display:block!important}.hrv-myTab .active{display:none}.hrv-refresh a{background:#2979ff;border-radius:4px;padding:0.75em 1.875em;font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;font-size:0.8125em;line-height:1em;text-align:center;color:#fff}.hrv-refresh{margin-top:3em;cursor:pointer}.hrv-cant-fetch-content{position:absolute;top:50%;left:50%;margin-right:-50%;transform:translate(-50%,-50%)}.hrv-cant-fetch-content p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:500;margin-top:2.125em;font-size:0.9375em;line-height:1.1875em;text-align:center;color:#bdbdbd}.hrv-cant-fetch{width:100%;height:100%;right:0;position:absolute;background-color:#fff;left:0;top:0;text-align:center}.hara-loyalty-history-timeline-box-loading{width:550px;margin-top:60px}.hara-loyalty-history-timeline{margin-bottom:0;list-style:none;margin-left:110px;border-left:2px solid #e8e8e8;padding:0 0 0 2.5em}.hara-loyalty-history-timeline li{margin:0.625em 0 1.875em 0;position:relative}.hara-loyalty-history-timeline li:last-child{min-height:90px;margin-bottom:0}.hara-loyalty-history-timeline p{margin:0 0 0.9375em}.hara-loyalty-history-timeline-date{margin-top:-0.625em;top:14%;left:-130px;font-size:0.75em;line-height:1.25em;color:rgba(33,33,33,.5);position:absolute;max-width:80px;text-align:right}.hara-loyalty-history-timeline li:last-child .hara-loyalty-history-timeline-date{top:2%}.hara-loyalty-history-timeline-circle{margin-top:5px;left:-2.9em;width:0.625em;height:0.625em;border:5px solid #fc625d;border-radius:50%;display:block;position:absolute}@-moz-keyframes spin{100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
          .hrv-loyalty-loading{position: absolute;top: 50%;left: 50%;margin-right: -50%;width:2.25em;height:2.25em;margin-top:-1.125em;margin-left:-1.125em;animation:spin .7s linear infinite;border-style:solid;border-width:3px;border-color:#2979ff;border-right-color:transparent;border-radius:100%;z-index:1}
          .hrv-text-coupons{position:relative;top:50%;transform:translateY(-50%)}
          .hrv-loyalty-content-coupons p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:12px;line-height:1.125em;color:#757575; margin-bottom:4px}.hrv-loyalty-content-coupons h3{margin-bottom: 4px;font-family: "Roboto", sans-serif;font-weight: 500;
              font-size: 14px!important;
              color: #212121;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;}.hrv-loyalty-content-coupons .hrv-loyalty-condition {color: #2962FF;font-weight: 400;font-size: 12px;line-height: 20px; margin-bottom: 0; display: inline-block;} .hrv-loyalty-content-coupons{width:73%;border-left:1px dashed #e0e0e0;padding-left:1.5em}.hrv-loyalty-image-copouns img{width:100%;height:100%}.hrv-loyalty-image-copouns{margin-right:8px;height:5.5em;overflow:hidden;border-radius:8px;width:5.5em; position: relative;}.hrv-loyalty-coupon-table{cursor:pointer;display:flex!important;margin-bottom:0.75em;padding:0.6em;padding-right: 0.75em}.hrv-loyalty-tab-content .hrv-loyalty-loading{display:block!important}.hrv-loyalty-tab-content::-webkit-scrollbar{width:8px;max-height:100px}.hrv-loyalty-tab-content::-webkit-scrollbar-thumb{border-radius:0.625em;background:#bdbdbd;opacity:.2;border-radius:4px}.hrv-loyalty-tab-content{padding:1.5em}.hrv-myTab-history-active{ padding-bottom: 0.8125em !important;}.hrv-myTab-promotion-active{ padding-bottom: 0.8125em !important;}.hrv-myTab-coupons-active{ padding-bottom: 0.8125em !important;}.hrv-myTab-history p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:600;margin:0 6px 0 6px;font-size:12px;line-height:1.5625em;color:#757575}.hrv-myTab-history{cursor:pointer;display:inline-flex;text-align:center}.hrv-myTab-promotion p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:600;margin:0 6px 0 6px;font-size:12px;line-height:1.5625em;color:#757575}.hrv-myTab-promotion{cursor:pointer;display:inline-flex;text-align:center}.hrv-myTab-copouns p{font-family:"Roboto", sans-serif;font-style:normal;font-weight:600;margin:0 6px 0 6px;font-size:12px;line-height:1.5625em;color:#757575}.hrv-myTab-copouns{cursor:pointer;display:inline-flex;text-align:center}.hrv-myTab{border-bottom:1px solid #bdbdbd;text-align:center;width:33.3%;padding:0.75em 0 0.8125em 0;float:left}.hrv-loyalty-header{padding:0.9375em 0.9375em 5px 0.9375em}.hrv-loyalty-tab-content .active{display:block!important}.hrv-loyalty-tab-content #hrv-loyalty-history{display:none}.hrv-loyalty-tab-content #hrv-loyalty-coupons-wrapper{display:none}.button-popup-loyalty{padding: inherit !important;border:none;background:0 0;z-index:999999}.hrv-loyalty-include{box-shadow:0 3px 0.625em rgba(0,0,0,.4);width:420px;z-index:9999;background:#fff;border-radius:1em}.hrv-loyalty-include::-webkit-scrollbar{width:1em}.hrv-loyalty-include::-webkit-scrollbar-thumb{background:#dadce0;background-clip:padding-box;border:4px solid transparent;-webkit-border-radius:8px;border-radius:8px;-webkit-box-shadow:none;box-shadow:none}.hrv-loyalty-include::-webkit-scrollbar-track{background:0 0;border:none}.hrv-loyalty-modal{z-index:9999;position:fixed;bottom:120px;left:3.125em}.hrv-loyalty-header{text-align:right}.hrv-loyalty-avatar{max-width:80px;max-height:80px;border-radius:50%;margin-right:0.9375em;overflow:hidden}.hrv-loyalty-content{padding:0 1.5625em}.hrv-loyalty-info h3{font-family:"Roboto", sans-serif;font-style:normal;font-weight:700;font-size:1.4em;line-height:1.75em;color:#000}.hrv-loyalty-info-member p{font-weight:500;font-size:0.8125em;color:#212121}.hrv-loyalty-info-member{display:inline-flex}. svg{margin-right:8px}. hr{background:#f5f5f5;height:1px;width:100%;margin-top:0.75em}.hrv-loyalty-next-level{margin-bottom:1em;font-family:"Roboto", sans-serif;font-style:normal;font-weight:400;font-size:0.6875em;line-height:0.875em;color:#212121}.hrv-loyalty-progress{background:#eee;border-radius:4px;height:8px;width:100%}.hrv-loyalty-progress-bar{background:#2979ff;border-radius:4px;height:100%}.hrv-loyalty-footer{padding:1.5625em 0 0 0}@media (min-height:736px)'
      `,
  styleCSSPopup: "",
  id_org: "",
  newCss: `
          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed,
          figure, figcaption, footer, header, hgroup,
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
              margin: 0;
              padding: 0;
              border: 0;
              font-size: 14px;
              line-height:1.4;
          }
          p {
              font-size: 1em;
              margin-bottom: 1em;
          }
          h3{
              font-size: 1.5em;
          }
          img {
              max-width: 100%;
              height: auto;
          }
          .button-popup-loyalty{
              cursor: pointer;
          }
          .hrv-myTab-copouns p{
              letter-spacing: 0.012345em;
          }
          button:focus {
              outline: -webkit-focus-ring-color auto 0px;
          }
          .hrv-loyalty-coupons-click-header{
              line-height: 1.5em;
              justify-content: center;
              align-items: center;
              align-content: center;
          }
          .hrv-loyalty-coupons-click-header p{
              margin-bottom: 0rem;
              justify-content: center;
          }
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
          }
          /* Firefox */
          input[type=number] {
          -moz-appearance: textfield;
          }
        /* greek-ext */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        .hrv-loyalty-info-member{
          line-height: 1.1875em;
        }
      #hrv-loyalty-webfloating{
          font-family: 'Roboto', sans-serif;
      }
      a {
          text-decoration: inherit;
      }
      #hrv-loyalty-open {
          font-size:1em !important;
          z-index: 99999;
      }
  
      .hrv-myTab-coupons-active .hrv-myTab-copouns p{
          color:#000
      }
      .hrv-loyalty-noLogin-include{
          max-height: calc(100% - 80px);
          overflow: auto;
      }
      #hrv-loyalty-promotion{
          height: 100%;
      }
      #hrv-loyalty-coupons-wrapper{
          height: 100%;
      }
      #hrv-loyalty-history{
          height: 100%;
      }
      .hrv-cant-fetch {
          z-index: 120300;
      }
      .hrv-myTab-promotion-active .hrv-myTab-promotion p{
          color:#000;
      }
      .hrv-myTab-history-active .hrv-myTab-history p{
          color:#000
      }
      .hrv-loyalty-reward-divall{
          position: absolute;
          bottom: 0;
      }
      .hrv-loyalty-coupons-click-item{
          height: 100%;
          position: relative;
      }
      #hrv-loyalty-couponsReward{
          height: 100%;
          position: relative;
      }
      .hrv-loyalty-srcoll-click-coupons {
          width: 100%;
          overflow: auto;
      }
      #hrv-loyalty-couponsReward .hrv-loyalty-srcoll-click-coupons {
          width: 100%;
          height: 100%!important;
          overflow: auto;
          position: relative!important;
      }
  
      #hrv-loyalty-coupons-click-include{
          z-index:1111231;
          min-height: 100%;
          position: absolute;
          width: 100%;
          background-color: #fff;
          top: 0;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          overflow-x: hidden;
          overflow-y: auto;
          height: 100%;
          -ms-flex-item-align: stretch;
          -ms-grid-row-align: stretch;
          align-self: stretch;
      }
      .hrv-loyalty-tab-content{
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          overflow-x: hidden;
          overflow-y: auto;
          height: 100%;
          position: relative;
          -ms-flex-item-align: stretch;
          -ms-grid-row-align: stretch;
          align-self: stretch;
      }
      .hrv-loyalty-noLogin-coupon-shop{
          padding: 0 21px 40px 21px;
          border-top: 1px solid #eeeeee;
      }
      .hrv-loyalty-footer-noData{
          padding-bottom:0.5em
      }
      @media only screen and (min-width: 768px){
          .hrv-loyalty-noLogin{
              height : 100% !important
          }
          .hrv-loyalty-close-popup{
              display:none !important;
          }
      }
      @media only screen and (max-width: 767px){
          .hrv-loyalty-close-popup{
              display: block !important;
              transform: translate(0, 100vh) !important;
              height: 0%!important;
              transition: all 0.5s;
          }
          .hrv-loyalty-close-popup .hrv-loyalty-include{
              height: 0% !important;
              z-index: 10000 !important;
              transform: translate(0, 100vh);
              transition: all 0.5s;
          }
          .hrv-loyalty-include{
              z-index: 100000001 !important;
              max-height: calc(100vh) !important;
              height: 80%!important;
              position: absolute!important;
              width: 100% !important;
              bottom: 0px!important;
              border-radius: inherit !important;
              border-top-right-radius: 1em!important;
              border-top-left-radius: 1em!important;
              transition: all 0.5s;
          }
          #hrv-loyalty-open {
              font-size:0.8125em !important
          }
          .hrv-loyalty-modal {
              max-width: 100%;
              transition: all 0.5s;
              z-index: 100000001 !important;
              height: 80%!important;
              bottom: 0px !important;
              transform: translate(0, 0);
              left: 0 !important;
          }
          .hrv-loyalty-include{
              max-height: calc(75vh - 100px);
              max-width: 100%;
          }
          .hrv-loyalty-info h3{
              font-size: 1.3125em !important;
          }
          .hrv-myTab p{
              font-size: 0.6875em !important;
          }
      }
      @media only screen and (max-width: 400px){
          .hrv-loyalty-value-code-copy {
              font-size: 10px!important;
          }
  
          .hrv-text-coupons-name {
              font-size: 12px!important;
          }
  
          .hrv-text-coupons-date {
              font-size: 10px!important;
          }
      }
      .hrv-loyalty-title-click-coupons h2{
          margin-bottom: 0.75em;
      }
      .hrv-loyalty-coppy-click-coupons {
          display: flex;
          border: 1px solid #2979ff;
          justify-content: center;
          box-sizing: border-box;
          border-radius: 4px;
          width: 50% !important;
          padding: 3px;
          margin: auto;
          margin-top: 0.9375em;
          margin-bottom: 0.9375em;
      }
      .hrv-loyalty-coppy-click-coupons.hrv-loyalty-hidden-checkout-success{
          border: 1px solid #51ce82;
          transition: all 0.3s;
      }
      .hrv-loyalty-coppy-click-coupons.hrv-loyalty-hidden-checkout-success p{
          color: #51ce82;
          transition: all 0.3s;
      }
      @media only screen and (max-width: 768px){
          .hrv-loyalty-modal {
              bottom: 0;
              width: 420px !important;
              width: 100%;
          }
      }
      .hrv-loyalty-include{
          height: 40.5em;
          max-height: calc(90vh - 100px); !important;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-direction: column;
          flex-direction: column;
          position: relative;
          overflow: hidden;
      }
      #hrv-loyalty-coupons-click-include {
          position: absolute;
          margin-left:100%;
          -webkit-animation: haraLoyaltyToRight .3s ease-in-out;
          animation: haraLoyaltyToRight .3s ease-in-out;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards
      }
      @-webkit-keyframes haraLoyaltyToRight{
          0% {
              margin-Left: 100%;
          }
          to {
              margin-left:0%
          }
      }
  
      @keyframes haraLoyaltyToRight {
          0% {
              margin-Left: 100%;
          }
          to {
              margin-left:0%
          }
          }
          @-webkit-keyframes haraLoyaltyToRightBack {
          0% {
              margin-Left: 0%;
          }
          to {
              margin-left:100%
          }
      }
  
      @keyframes haraLoyaltyToRightBack {
          0% {
              margin-Left: 0%;
          }
          to {
              margin-left:100%
          }
          }
      @-webkit-keyframes haraLoyaltyTableBorder {
          0% {
              width: 0;
          }
          to {
              width:100%
          }
      }
  
      @keyframes haraLoyaltyTableBorder {
          0% {
              width: 0;
          }
          to {
              width:100%
          }
          }
          .hrv-myTab-history-active{
              position:relative;
          }
          .hrv-myTab-promotion-active{
              position:relative;
          }
      .hrv-cant-fetch{
          overflow: auto;
      }
      .hrv-loyalty-avatar{
          float: left;
      }
      .hrv-loyalty-info{
          width: 100%;
          padding-left: 25%;
          position: relative;
      }
      .hrv-myTab-history-active::after{
          content: '';
          display: block;
          border-bottom: 3px solid #2979ff;
          width: 0;
          bottom:0;
          position: absolute;
          left: 0;
          -webkit-animation: haraLoyaltyTableBorder .3s ease-in-out;
          animation: haraLoyaltyTableBorder .3s ease-in-out;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards
      }
      .hrv-myTab-promotion-active::after{
          content: '';
          display: block;
          border-bottom: 3px solid #2979ff;
          width: 0;
          bottom:0;
          position: absolute;
          left: 0;
          -webkit-animation: haraLoyaltyTableBorder .3s ease-in-out;
          animation: haraLoyaltyTableBorder .3s ease-in-out;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards
      }
      .hrv-myTab-coupons-active::after{
          content: '';
          display: block;
          border-bottom: 3px solid #2979ff;
          width: 0;
          bottom:0;
          position: absolute;
          left: 0;
          -webkit-animation: haraLoyaltyTableBorder .3s ease-in-out;
          animation: haraLoyaltyTableBorder .3s ease-in-out;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards
      }
  
      .hrv-myTab-coupons-active{
          position:relative;
      }
      @-webkit-keyframes haraLoyaltyTable {
          0% {
              opacity: 0;
              transform: translate3d(0, 0.625em, 0)
          }
          to {
              opacity: 1;
              transform: translate(0)
          }
      }
  
      @keyframes haraLoyaltyTable {
          0% {
              opacity: 0;
              transform:  translate3d(0, 0.625em, 0)
          }
          to {
              opacity: 1;
              transform: translate(0)
          }
          }
      .hrv-loyalty-coupon-table{
          transform: translate(0);
          -webkit-animation: haraLoyaltyTable .38s ease-in-out;
          animation: haraLoyaltyTable .38s ease-in-out;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards
      }
      @media only screen and (min-width: 768px){
          .hrv-loyalty-open-popup .hrv-loyalty-include{
              -webkit-animation: haraLoyaltyFadeSlideUp .2s ease-in!important;
              animation: haraLoyaltyFadeSlideUp .2s ease-in!important;
          }
          .hrv-loyalty-close-popup .hrv-loyalty-include{
              opacity:0;
              transform: translate3d(0, 0.625em, 0);
              -webkit-animation: haraLoyaltyFadeSlideDown .2s ease-in!important;
              animation: haraLoyaltyFadeSlideDown .2s ease-in!important;
          }
      }
      @media only screen and (min-width: 768px){
          .hrv-loyalty-send-coupon-close{
              opacity:0 !important;
              transform: translate3d(0, 0.625em, 0);
              -webkit-animation: haraLoyaltyFadeSlideDown .2s ease-in!important;
              animation: haraLoyaltyFadeSlideDown .2s ease-in!important;
          }
      }
      @-webkit-keyframes haraLoyaltyFadeScaleIn {
          0% {
              opacity: 0;
              transform: scale(.8);
              visibility: hidden
          }
          to {
              opacity: 1;
              transform: scale(1);
              visibility: visible
          }
      }
  
      @keyframes haraLoaltyFadeScaleIn {
          0% {
              opacity: 0;
              transform: scale(.8);
              visibility: hidden
          }
          to {
              opacity: 1;
              transform: scale(1);
              visibility: visible
          }
      }
  
      @-webkit-keyframes haraLoyaltyFadeSlideUp {
          0% {
              opacity: 0;
              transform: translate3d(0, 0.625em, 0)
          }
          to {
              opacity: 1;
              transform: translateZ(0)
          }
      }
  
      @keyframes haraLoyaltyFadeSlideUp {
          0% {
              opacity: 0;
              transform: translate3d(0, 0.625em, 0)
          }
          to {
              opacity: 1;
              transform: translateZ(0)
          }
      }
  
      @-webkit-keyframes haraLoyaltyFadeSlideDown {
          0% {
              opacity: 1;
              transform: translateZ(0) !important;
          }
          to {
              opacity: 0;
              transform: translate3d(0, 0.625em, 0) !important;
          }
      }
  
      @keyframes haraLoyaltyFadeSlideDown {
          0% {
              opacity: 1;
              transform: translateZ(0);
          }
          to {
              opacity: 0;
              transform: translate3d(0, 0.625em, 0)!important;
              visibility: hidden !important;
          }
      }
      .hrv-loyalty-wrapper {
          position: relative;
          max-width: 100%;
          max-height: 100%;
      }
      .hrv-loyalty-body-scoller {
          max-width: 100%;
          max-height: 100%;
      }
      .hrv-loyalty-blockMember {
          color: #fff;
          background: #757575;
          font-weight: bold;
          text-align: center;
          font-size: 0.8125em;
          border-radius: 4px;
          padding-top: 3px;
          padding-bottom: 3px;
      }
      .hrv-loyalty-footer-noData{
          display: flex;
          text-align: center;
          justify-content: center;
      }
      .hrv-loyalty-tooltip {
          position: relative;
          }
          .hrv-loyalty-tooltip:hover:after{
          display: -webkit-flex;
          display: flex;
          -webkit-justify-content: center;
          justify-content: center;
          background: #212121;
          border-radius: 4px;
          position: absolute;
          color: #fff;
          width: 90%;
          left: 3%;
          z-index: 1000;
          bottom: -6.3em;
          content: "Bạn đã vi phạm chính sách khách hàng thân thiết của shop.";
          font-size: 0.8125em;
          padding: 1.3em;
          }
          .hrv-loyalty-info h3{
          margin-bottom: 0.5em;
          }
          .hrv-loyalty-tooltip:hover:before{
          border: solid;
          border-color: #212121 transparent;
          border-width: 0px 6px 9px;
          opacity: 0.8;
          content: "";
          left: 45%;
          bottom: -0.9em;
          position: absolute;
          }
          .hrv-loyalty-coupon-table-noData{
          position: absolute;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          }
          .hrv-loyalty-coupon-table-noData.shop{
              position: unset!important;
          }
          .hrv-loyalty-logo{
              z-index: 100;
          }
          .hrv-loyalty-logo span{
              color: #757575;
              font-size: 11px;
          }
          .hrv-loyalty-send-coupon{
              bottom: 0;
              background-color: #fff;
              text-align: center;
              position: absolute;
              z-index: 100;
              right: 0;
              left: 0;
              min-height: 7em;
          }
          .hrv-loyalty-send-coupon p {
              margin-top: 1em;
          }
          .hrv-loyalty-input{
              background: #FFFFFF;
              border: 1px solid #E0E0E0;
              border-bottom-left-radius: 8px;
              border-top-left-radius: 8px;
              width: 100%;
              padding-left: 1em;
              padding-right: 1em;
              height: 2.4em;
          }
          .hrv-loyalty-background-black-send-coupon{
              position: absolute;
              width: 100%;
              height: 100%;
              background: #212121;
              opacity: 0.4;
          }
          .hrv-loyalty-send-coupon-left{
              height: 2.3em;
              justify-content: center;
              align-items: center;
              background: #2979FF;
              color: #fff;
              border-top-right-radius: 8px;
              border-bottom-right-radius: 8px;
              display: flex;
              width: 20%;
              cursor: pointer;
          }
          #hrv-loyalty-errorInput{
              float: left;
              margin-left: 2.3em;
              padding-top: 0.2em;
          }
          #hrv-loyalty-errorInput span{
              font-size: 0.7rem;
              float: left;
          }
          .hrv-loyalty-loading-input{
              position: absolute;
              top: 70%;
              left: 60%;
              margin-right: -50%;
              width: 1.25em;
              height: 1.25em;
              margin-top: -1.125em;
              margin-left: -1.125em;
              animation: spin .7s linear infinite;
              border-style: solid;
              border-width: 3px;
              border-color: #fff;
              border-right-color: transparent;
              border-radius: 100%;
              z-index: 1;
          }
          #button-popup-loyalty-1{
              position: absolute;
              z-index: 100000000;
              cursor: move;
              bottom: 10px;
              height: 80px !important;
              left: 10px;
          }
          .hrv-height-420{
              height: 480px
          }
          .hrv-loyalty-title-noData{
              width: 80%;
              margin: 25px auto;
          }
          .hrv-loyalty-text-center {
              text-align: center;
          }
          .hrv-noauthenticate-section .hrv-noauthenticate-section-title h3 {
              font-size: 16px;
              line-height: 18.75px;
              margin-bottom: 11px;
          }
          .hrv-noauthenticate-section .hrv-noauthenticate-section-title p {
              font-size: 14px;
              color: #757575;
              margin-bottom: 16px;
          }
          .hrv-noauthenticate-section .hrv-noauthenticate-section-content {
              padding: 0 22px;
          }
  
          .hrv-noauthenticate-membership {
              padding: 32px 0;
              border-top: 1px solid #EFEFEF;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item {
              width: 100%;
              height: 102px;
              background: #F5F5F5;
              border-radius: 8px;
              margin-bottom: 14px;
              padding: 31px 26px;
              display: flex;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item .hrv-nli-logo {
              width: 40px;
              height: 40px;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item .hrv-nli-logo img {
              max-width: 100%;
              max-height: 100%;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item .hrv-nli-info {
              text-align: left;
              padding-left: 44px;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item .hrv-nli-info h3 {
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
          }
          .hrv-noauthenticate-levels .hrv-noauthenticate-level-item .hrv-nli-info p {
              font-size: 12px;
              line-height: 20px;
              color: #757575;
          }
  
          .hrv-noauthenticate-promotion-section {
              padding: 32px 0;
              border-top: 1px solid #EFEFEF;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item {
              width: 100%;
              height: 102px;
              background-image: url("data:image/svg+xml,%3Csvg%20width%3D%22372%22%20height%3D%2296%22%20viewBox%3D%220%200%20372%2096%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M96%206C99.3137%206%20102%203.31371%20102%200H364C368.418%200%20372%203.58172%20372%208V88C372%2092.4183%20368.418%2096%20364%2096H102C102%2092.6863%2099.3137%2090%2096%2090C92.6863%2090%2090%2092.6863%2090%2096H7.99999C3.58171%2096%200%2092.4183%200%2088V8C0%203.58172%203.58172%200%208%200H90C90%203.31371%2092.6863%206%2096%206ZM96.5%2010C96.5%209.72386%2096.2761%209.5%2096%209.5C95.7239%209.5%2095.5%209.72386%2095.5%2010V10.5067C95.5%2010.7828%2095.7239%2011.0067%2096%2011.0067C96.2761%2011.0067%2096.5%2010.7828%2096.5%2010.5067V10ZM96.5%2014.56C96.5%2014.2839%2096.2761%2014.06%2096%2014.06C95.7239%2014.06%2095.5%2014.2839%2095.5%2014.56V15.5733C95.5%2015.8495%2095.7239%2016.0733%2096%2016.0733C96.2761%2016.0733%2096.5%2015.8495%2096.5%2015.5733V14.56ZM96.5%2019.6267C96.5%2019.3505%2096.2761%2019.1267%2096%2019.1267C95.7239%2019.1267%2095.5%2019.3505%2095.5%2019.6267V20.64C95.5%2020.9161%2095.7239%2021.14%2096%2021.14C96.2761%2021.14%2096.5%2020.9161%2096.5%2020.64V19.6267ZM96.5%2024.6933C96.5%2024.4172%2096.2761%2024.1933%2096%2024.1933C95.7239%2024.1933%2095.5%2024.4172%2095.5%2024.6933V25.7067C95.5%2025.9828%2095.7239%2026.2067%2096%2026.2067C96.2761%2026.2067%2096.5%2025.9828%2096.5%2025.7067V24.6933ZM96.5%2029.76C96.5%2029.4839%2096.2761%2029.26%2096%2029.26C95.7239%2029.26%2095.5%2029.4839%2095.5%2029.76V30.7733C95.5%2031.0495%2095.7239%2031.2733%2096%2031.2733C96.2761%2031.2733%2096.5%2031.0495%2096.5%2030.7733V29.76ZM96.5%2034.8267C96.5%2034.5505%2096.2761%2034.3267%2096%2034.3267C95.7239%2034.3267%2095.5%2034.5505%2095.5%2034.8267V35.84C95.5%2036.1161%2095.7239%2036.34%2096%2036.34C96.2761%2036.34%2096.5%2036.1161%2096.5%2035.84V34.8267ZM96.5%2039.8933C96.5%2039.6172%2096.2761%2039.3933%2096%2039.3933C95.7239%2039.3933%2095.5%2039.6172%2095.5%2039.8933V40.9067C95.5%2041.1828%2095.7239%2041.4067%2096%2041.4067C96.2761%2041.4067%2096.5%2041.1828%2096.5%2040.9067V39.8933ZM96.5%2044.96C96.5%2044.6839%2096.2761%2044.46%2096%2044.46C95.7239%2044.46%2095.5%2044.6839%2095.5%2044.96V45.9733C95.5%2046.2495%2095.7239%2046.4733%2096%2046.4733C96.2761%2046.4733%2096.5%2046.2495%2096.5%2045.9733V44.96ZM96.5%2050.0267C96.5%2049.7505%2096.2761%2049.5267%2096%2049.5267C95.7239%2049.5267%2095.5%2049.7505%2095.5%2050.0267V51.04C95.5%2051.3161%2095.7239%2051.54%2096%2051.54C96.2761%2051.54%2096.5%2051.3161%2096.5%2051.04V50.0267ZM96.5%2055.0933C96.5%2054.8172%2096.2761%2054.5933%2096%2054.5933C95.7239%2054.5933%2095.5%2054.8172%2095.5%2055.0933V56.1067C95.5%2056.3828%2095.7239%2056.6067%2096%2056.6067C96.2761%2056.6067%2096.5%2056.3828%2096.5%2056.1067V55.0933ZM96.5%2060.16C96.5%2059.8839%2096.2761%2059.66%2096%2059.66C95.7239%2059.66%2095.5%2059.8839%2095.5%2060.16V61.1733C95.5%2061.4495%2095.7239%2061.6733%2096%2061.6733C96.2761%2061.6733%2096.5%2061.4495%2096.5%2061.1733V60.16ZM96.5%2065.2267C96.5%2064.9505%2096.2761%2064.7267%2096%2064.7267C95.7239%2064.7267%2095.5%2064.9505%2095.5%2065.2267V66.24C95.5%2066.5161%2095.7239%2066.74%2096%2066.74C96.2761%2066.74%2096.5%2066.5161%2096.5%2066.24V65.2267ZM96.5%2070.2933C96.5%2070.0172%2096.2761%2069.7933%2096%2069.7933C95.7239%2069.7933%2095.5%2070.0172%2095.5%2070.2933V71.3067C95.5%2071.5828%2095.7239%2071.8067%2096%2071.8067C96.2761%2071.8067%2096.5%2071.5828%2096.5%2071.3067V70.2933ZM96.5%2075.36C96.5%2075.0838%2096.2761%2074.86%2096%2074.86C95.7239%2074.86%2095.5%2075.0838%2095.5%2075.36V76.3733C95.5%2076.6495%2095.7239%2076.8733%2096%2076.8733C96.2761%2076.8733%2096.5%2076.6495%2096.5%2076.3733V75.36ZM96.5%2080.4267C96.5%2080.1505%2096.2761%2079.9267%2096%2079.9267C95.7239%2079.9267%2095.5%2080.1505%2095.5%2080.4267V81.44C95.5%2081.7161%2095.7239%2081.94%2096%2081.94C96.2761%2081.94%2096.5%2081.7161%2096.5%2081.44V80.4267ZM96.5%2085.4933C96.5%2085.2172%2096.2761%2084.9933%2096%2084.9933C95.7239%2084.9933%2095.5%2085.2172%2095.5%2085.4933V86C95.5%2086.2761%2095.7239%2086.5%2096%2086.5C96.2761%2086.5%2096.5%2086.2761%2096.5%2086V85.4933Z%22%20fill%3D%22%23F5F5F5%22%2F%3E%0A%3C%2Fsvg%3E");
              background-repeat: no-repeat;
              border-radius: 8px;
              margin-bottom: 14px;
              padding: 12px;
              display: flex;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item:last-child {
              margin-bottom: 0;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-logo {
              width: 72px;
              height: 72px;
              position: relative;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-logo img {
              max-width: 100%;
              max-height: 100%;
              vertical-align: middle;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-info {
              text-align: left;
              padding-left: 29px;
              display: flex;
              flex-direction: column;
              justify-content: center;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-info h3 {
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-info p {
              font-size: 12px;
              line-height: 20px;
              color: #757575;
              margin-bottom: 0;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-cta {
              width: 70px;
              height: 100%;
              margin-left: auto;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-cta .hrv-npi-cta-inner {
              width: 70px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: end;
              position: relative;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-cta a {
              font-size: 14px;
              color: #3E86FF;
              font-weight: 400;
          }
          .hrv-noauthenticate-promotions .hrv-noauthenticate-promotion-item .hrv-npi-cta a.hrv-npi-cta-apply-selected {
              color: #9E9E9E
          }
          .hrv-npi-logo img{
              width: 100%;
              height: 100%;
          }
          .hrv-loyalty-noMember-new{
              position: relative;
              height: 100%;
          }
          .hrv-loyalty-wrapper-new{
              overflow: scroll;
              height: 95%;
              overflow-x: hidden;
          }
          .hrv-loyalty-wrapper-new::-webkit-scrollbar{width:8px;max-height:100px}
          .hrv-loyalty-wrapper-new::-webkit-scrollbar-thumb{border-radius:0.625em;background:#bdbdbd;opacity:.2;border-radius:4px}
  
          .hrv-loyalty-without-membership .hrv-loyalty-footer .hrv-myTab {width: 100%;padding: 0!important;}
          .hrv-loyalty-without-membership .hrv-loyalty-footer .hrv-myTab-copouns {display: none}
          .hrv-loyalty-without-membership .hrv-loyalty-footer .hrv-myTab-coupons-active::after {border-bottom: 1px solid #bdbdbd;}
          .hrv-loyalty-value-code-copy {
              color: #2962FF;
          }
  
          .hrv-loyalty-value-code-copy.active-copy {
              color: #51ce82!important
          }
  
          .hrv-text-coupons-name {
              font-size: 14px;
          }
  
          .hrv-text-coupons-date {
              font-size: 12px;
          }
  
          .hara-loyalty-alert-log-aware {
              padding: 12px;
              background: #FFFBEB;
              border: 1px solid #FCD44F;
              border-radius: 4px;
              display: flex;
              margin-bottom: 30px;
          }
  
          .hara-loyalty-alert-log-aware p {
              font-size: 14px;
              color: #111827;
              margin-bottom: 0;
              margin-left: 8px;
          }
  
          @media screen and (max-width: 430px) {
              .hrv-loyalty-value-code-copy span {
                  font-size: 11px!important;
                  margin-bottom: 4px!important;
              }
  
              .hrv-text-coupons-name {
                  font-size: 12px!important;
              }
  
              .hrv-text-coupons-date {
                  font-size: 10px!important;
              }
          }
  
          .hrv-loyalty-desktop-reward-detail {
              position: relative;
          }
      `,
};
export default options;
