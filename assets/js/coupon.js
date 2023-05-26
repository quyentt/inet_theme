$(document).ready(()=>{
		function initCoupons (){
		if(!$('#coupon-modal').length){
		$('body').append($('[data-template="couponPopup"]').html())
		}
		$('.coupon_info_toggle').click(function(e){
				e.preventDefault();
				const code = $(this).data('coupon')
				const info = $(this).next('.coupon_info').html()|| ''
				const title = $(this).parents('.coupon_body').find('.coupon_title').text() || ''
				const couponHtml = `
					<div class="coupon-title">${title}</div>
					<div class="coupon-row">
						<div class="coupon-label">Mã khuyến mãi:</div><span class="code">${code}</span>
	
					</div>
					<div class="coupon-row">
						<div class="coupon-label">Điều kiện:</div><div class="coupon-info">${info}</div>
					</div>
					<div class="coupon-action">
					<button type="button" class="btn btn-main" data-dismiss="modal" data-backdrop="false"
        				aria-label="Close" style="z-index: 9;">Đóng</button>
					<button class="btn btn-main coupon_copy" data-ega-coupon="${code}">
						<span>Sao chép mã</span></button>
					</div>
					`
				$('.coupon-modal .coupon-content').html(couponHtml)
				$("#coupon-modal").modal();
			})
			$(document).on('click','.coupon_copy', function() {
		const copyText = "Sao chép mã";
		const copiedText = "Đã sao chép";
		const coupon = $(this).data().egaCoupon;
		const _this = $(this);
		_this.html(`<span>${copiedText}</span>`);
		_this.addClass('disabled');
		setTimeout(function() {
			_this.html(`<span>${copyText}</span>`);
			_this.removeClass('disabled');
		}, 3000)
		navigator.clipboard.writeText(coupon);
	})
		
		}
			$(window).one(' mousemove touchstart scroll', initCoupons)
			
	})