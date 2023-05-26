initQuickView();
var product = {};
var currentLinkQuickView = '';
var option1 = '';
var option2 = '';

function setButtonNavQuickview() {
    $("#quickview-nav-button a").hide();
    $("#quickview-nav-button a").attr("data-index", "");
    var listProducts = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
    if (listProducts.length > 0) {
        var currentPosition = 0;
        for (var i = 0; i < listProducts.length; i++) {
            if ($(listProducts[i]).data("handle") == $(currentLinkQuickView).data("handle")) {
                currentPosition = i;
                break;
            }
        }
        if (currentPosition < listProducts.length - 1) {
            $("#quickview-nav-button .btn-next-product").show();
            $("#quickview-nav-button .btn-next-product").attr("data-index", currentPosition + 1);
        }
        if (currentPosition > 0) {
            $("#quickview-nav-button .btn-previous-product").show();
            $("#quickview-nav-button .btn-previous-product").attr("data-index", currentPosition - 1);
        }
    }
    $("#quickview-nav-button a").click(function() {
        $("#quickview-nav-button a").hide();
        var indexLink = parseInt($(this).data("index"));
        if (!isNaN(indexLink) && indexLink >= 0) {
            var listProducts = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
            if (listProducts.length > 0 && indexLink < listProducts.length) {
                //$(".quickview-close").trigger("click");
                $(listProducts[indexLink]).trigger("click");
            }
        }
    });
}

function initQuickView() {
    $(document).on("click", "#thumblist_quickview li", function() {
        changeImageQuickView($(this).find("img:first-child"), ".product-featured-image-quickview");
        $('#thumblist_quickview li').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click', '.quick-view', function(e) {
        // my edit
        $('.quickview-product').css("display", "block");
        $("body").append("<div class='modal-backdrop show'></div>");

        // end edit
        if ($(window).width() > 1025) {
            e.preventDefault();
            var fundiinHtml = fundiinPay(this);

            const proImage = $(this).parents('.product-thumbnail').find('img:not(.product-frame)')
            const frame = $(this).parents('.product-thumbnail').find('.product-frame').clone()
            const badges = $(this).parents('.item_product_main').find('.product-badge').clone()
            const promoTag = $(this).parents('.item_product_main').find('.product-promo-tag').clone()
            var producthandle = $(this).data("handle");
            currentLinkQuickView = $(this);
            Haravan.getProduct(producthandle, function(product) {
                var qvhtml = $("#quickview-modal").html();
                $(".quick-view-product").html(qvhtml);
                var quickview = $(".quick-view-product");

                if (fundiinHtml != "") {
                    quickview.find(".quickview-info").after(fundiinHtml);
                }

                buyXgetY.ele = '.buyxgety-box.quickview';
                $(buyXgetY.ele).find(".buyxgety-product-list .buyxgety_lists").empty();
                $(buyXgetY.ele).find(".buyxgety-product-list").data().id = product.id;
                $(buyXgetY.ele).find(".buyxgety-product-list").data().title = product.title;
                buyXgetY.init();
                if (Object.prototype.toString.call(window.HaravanPromotionAsyncInit) === '[object Function]') {
                    window.HaravanPromotionAsyncInit();
                }



                if (product.summary != null && product.summary != "") {
                    var productdes = product.summary;
                } else {
                    quickview.find(".rte").html('Thông tin sản phẩm đang cập nhật');
                }
                var featured_image = product.featured_image && Haravan.resizeImage(product.featured_image, "large");
                if (!featured_image) {
                    featured_image = no_image_placeholder;
                }
                // Reset current link quickview and button navigate in Quickview
                setButtonNavQuickview();
                if (featured_image != null) {
                    quickview.find(".view_full_size img").attr("src", featured_image);
                }


                if (product.price < 1 && product.variants.length < 2) {
                    quickview.find(".price").html('Liên hệ');
                    quickview.find("del").html('');
                    quickview.find("#quick-view-product form").hide();

                    quickview.find(".prices").html('<span class="price h2">Liên hệ</span>');

                    quickview.find(".add_to_cart_detail span").html('Liên hệ');
                } else {
                    quickview.find("#quick-view-product form").show();

                    quickview.find(".price").html(Haravan.formatMoney(product.variants[0].price, window.money_format));

                }
                quickview.find(".product-item").attr("id", "product-" + product.id);
                quickview.find(".qv-link").attr("href", product.url);
                quickview.find(".variants").attr("id", "product-actions-" + product.id);
                quickview.find(".variants select").attr("id", "product-select-" + product.id);
                quickview.find(".qwp-name").html('<a class="text2line" href="' + product.url + '" title="' + product.title + '">' + product.title + '</a>');
                quickview.find(".reviews_qv .text_revi").html('<a href="' + product.url + '" title="Đánh giá ' + product.title + '"><i class="fa fa-edit"></i>&nbsp;Đánh giá</a>');
                if (product.vendor) {
                    quickview.find(".vend-qv .vendor_").append(product.vendor);
                } else {
                    quickview.find(".vend-qv .vendor_").append("Đang cập nhật");
                }
                if (product.variants[0].sku) {
                    quickview.find(".sku_").append(product.variants[0].sku);
                } else {
                    quickview.find(".sku_").append("Đang cập nhật");
                }
                if (product.available) {
                    if (product.variants[0].available) {
                        quickview.find(".vend-qv .soluong").html('Còn hàng');

                    } else {
                        quickview.find(".vend-qv .soluong").html('Còn hàng');
                    }
                } else {
                    quickview.find(".vend-qv .soluong").html('Hết hàng');
                    $('.soluong1').hide();
                }



                quickview.find(".product-description .rte").html(productdes);
                quickview.find(".view-more").attr('href', product.url);

                if (product.compare_at_price_max > product.price) {

                    quickview.find(".old-price").html(Haravan.formatMoney(product.variants[0].compare_at_price, window.money_format)).show();
                    let save = product.variants[0].compare_at_price - product.variants[0].price;
                    let savePerCent = Math.ceil(save / product.variants[0].compare_at_price * 100);
                    if (savePerCent > 99) {
                        savePerCent = 99;
                    }
                    if (savePerCent < 1) {
                        savePerCent = 1
                    }
                    quickview.find('.label_product').html('-' + savePerCent + "%").show()

                    quickview.find(".price").addClass("sale-price")
                } else {
                    quickview.find(".old-price").html("");
                    quickview.find('.label_product').hide()
                    quickview.find(".price").removeClass("sale-price")
                }
                if (!product.available) {

                    $(".quick-view-product form").show();
                    $(".quick-view-product .quantity_wanted_p").show();
                    quickViewVariantsSwatch(product, quickview);

                    if (product.price < 1) {
                        $('#quick-view-product form').hide();
                    } else {
                        $('#quick-view-product form').show();
                    }
                    $(".soluong_qv").hide();
                    $('.soluong1').hide();
                    quickview.find(".add_to_cart_detail").text("Hết hàng").addClass("disabled").attr("disabled", "disabled");
                    if (product.variants.length > 1) {

                        quickview.find(" .dec, .inc, .variants label").show();
                        quickview.find("select").hide();


                    } else {
                        quickview.find("select,.dec, .inc, .variants label").hide();
                    }

                } else {
                    quickViewVariantsSwatch(product, quickview);
                    $(".quick-view-product .quantity_wanted_p").show();
                    if (product.variants.length > 1) {
                        $('#quick-view-product form').show();
                    } else {
                        if (product.variants[0].price < 1) {
                            $('#quick-view-product form').hide();
                        } else {
                            $('#quick-view-product form').show();
                        }
                    }
                }

                quickview.find('.more_info_block .page-product-heading li:first, .more_info_block .tab-content section:first').addClass('active');

                $("#quick-view-product").modal();

                $(".view_scroll_spacer").removeClass("hidden");


                loadQuickViewSlider(product, quickview);
                $('.quick-view-product .product-frame').remove()
                if (frame && frame.length) {
                    $('.quick-view-product .img-product').append(frame)
                }
                let imageScale = proImage.attr('style')
                $('img#product-featured-image-quickview').attr('style', imageScale)
                $('.quickview-info  .product-badge').remove()
                if (badges && badges.length) {
                    $('.quickview-info ').append(badges)
                }
                $('.quickview-info .product-promo-tag').remove()

                if (promoTag && promoTag.length) {
                    $('.quickview-info').append(promoTag)

                }

                $('#thumblist_quickview li.slick-active').eq(0).trigger("click")
                    // Action
                setTimeout(function() {
                    var thumbLargeimg = $('.view_full_size .img-product #product-featured-image-quickview').attr('src');
                    var thumMedium = $('#thumbs_list_quickview .owl-item li').find('img:not(.product-frame)').attr('src');
                    if (thumbLargeimg == thumMedium) {
                        $("#thumbs_list_quickview .owl-item li").first().addClass("active");
                    }
                }, 2000);

                //initQuickviewAddToCart();

                $(".quick-view").fadeIn(500);
                if ($(".quick-view .total-price").length > 0) {
                    $(".quick-view input[name=quantity]").on("change", updatePricingQuickView)
                }
                updatePricingQuickView();
                // Setup listeners to add/subtract from the input
                $(".js-qty__adjust").on("click", function() {
                    var el = $(this),
                        id = el.data("id"),
                        qtySelector = el.siblings(".js-qty__num"),
                        qty = parseInt(qtySelector.val().replace(/\D/g, ''));

                    var qty = validateQty(qty);

                    // Add or subtract from the current quantity
                    if (el.hasClass("js-qty__adjust--plus")) {
                        qty = qty + 1;
                    } else {
                        qty = qty - 1;
                        if (qty <= 1) qty = 1;
                    }

                    // Update the input's number
                    let variantId = $(`#product-select-${product.id} `).val()
                    let validQty = validateQty(product, variantId, qty)
                    validQty ? $('#qtym').val(validQty) : qtySelector.val(qty);
                    updatePricingQuickView();
                });
                $(".js-qty__num").on("change", function() {
                    updatePricingQuickView();
                });

                function onQtyChange() {
                    let qty = parseInt($('#quantity-detail').val())
                    let variantId = parseInt(quickview.find('[name="variantId"]').val())
                    let validQty = validateQty(product, variantId, qty)
                    validQty ? $('#quantity-detail').val(validQty) : qty
                }

                quickview.find('.btn_num').click(onQtyChange)
                $('#quantity-detail').change(onQtyChange)
            });



            var numInput = document.querySelector('.quantity_wanted_p input');
            numInput.addEventListener('input', function() {
                // Let's match only digits.
                var num = this.value.match(/^\d+$/);
                if (num === null) {
                    // If we have no match, value will be empty.
                    this.value = "";
                }
                if (num == 0) {
                    // If we have no match, value will be empty.
                    this.value = 1;
                }
            }, false)

            return false;
        } else {
            window.location.href = $(e.currentTarget).data('href')
        }
    });


}

function loadQuickViewSlider(n, r) {
    productImage();

    var loadingImgQuickView = $('.loading-imgquickview');
    var s = Haravan.resizeImage(n.featured_image, "large");
    var video_tags = n.tags.filter(function(v, i) { return v.indexOf("video_") > -1 });
    var video_code = video_tags[0];
    r.find(".quickview-featured-image").append('<a href="' + n.url + '"><img src="' + s + '" title="' + n.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>');
    if (n.images.length > 1 || video_code) {
        $('.thumbs_quickview').addClass('thumbs_list_quickview');
        var o = r.find(".more-view-wrapper ul");

        var videoThumb = false
        for (i in n.images) {
            var u = Haravan.resizeImage(n.images[i], "large");
            var a = Haravan.resizeImage(n.images[i], "large");
            var f = '<li><a href="javascript:void(0)" data-imageid="' + n.id + '"" data-zoom-image="' + u + '" title="title"><img src="' + u + '" alt="Office World" /></a></li>';
            if (u.indexOf("video") > -1) {
                videoThumb = true

                var icon_play = "//theme.hstatic.net/1000330808/1000886852/14/icon-button-play.png?v=1176";
                var f = '<li><a href="javascript:void(0)"' + 'data-videocode="' + video_code + '" data-imageid="' + n.id + '"" data-zoom-image="' + u + '" title="title"><img class="video" src="' + u + '" alt="Office World" /><img class="icon-button-play" src="' + icon_play + '" alt="video-play-button" /></a></li>';
            } else {
                var f = '<li><a href="javascript:void(0)" data-imageid="' + n.id + '"" data-zoom-image="' + u + '" title="title"><img src="' + u + '" alt="Office World" /></a></li>';
            }
            if (u.indexOf("color-") == -1) {
                o.append(f)
            }
        }

        if (!videoThumb && video_code) {
            let code = video_code.split('_')[1]
            var u = `https://img.youtube.com/vi/${code}/mqdefault.jpg`

            var icon_play = "//theme.hstatic.net/1000330808/1000886852/14/icon-button-play.png?v=1176";
            var f = '<li><a href="javascript:void(0)"' + 'data-videocode="' + video_code + '" data-imageid="' + n.id + '"" data-zoom-image="' + u + '" title="title"><img class="video" src="' + u + '" alt="Office World" /><img class="icon-button-play" src="' + icon_play + '" alt="video-play-button" /></a></li>';
            o.prepend(f)
        }

        o.find("a").click(function() {
            var t = r.find("#product-featured-image-quickview");
            if (t.attr("src") != $(this).attr("data-image")) {
                t.attr("src", $(this).attr("data-image"));
                loadingImgQuickView.show();
                t.load(function(t) {
                    loadingImgQuickView.hide();
                    $(this).unbind("load");
                    loadingImgQuickView.hide()
                })
            }
        });
        o.slick({
            autoplay: true,
            autoplaySpeed: 6000,
            dots: false,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4
        }).css("visibility", "visible")
    } else {
        $('.thumbs_quickview').removeClass('thumbs_list_quickview');
        r.find(".quickview-more-views").remove();
        r.find(".quickview-more-view-wrapper-jcarousel").remove()
    }
}

function quickViewVariantsSwatch(t, quickview) {
    var v = '<input type="hidden" name="id" value="' + t.variants[0].id + '">';
    quickview.find("form.variants").append(v);
    if (t.variants.length > 1) {
        for (var r = 0; r < t.variants.length; r++) {
            var i = t.variants[r];
            var s = '<option value="' + i.id + '">' + i.title + "</option>";
            quickview.find("form.variants > select").append(s)
        }


        var ps = "product-select-" + t.id;
        new Haravan.OptionSelectors(ps, {
            product: t,
            onVariantSelected: selectCallbackQuickView
        });

        if (t.options.length == 1) {

            quickview.find(".selector-wrapper:eq(0)").hide().prepend("<label>" + t.options[0].name + "</label>")
        }

        var options = "";
        for (var i = 0; i < t.options.length; i++) {
            options += '<div class="swatch clearfix" data-option-index="' + i + '">';
            options += '<div class="header">' + t.options[i].name + ': </div>';
            var is_color = false;
            if (/Color|Colour|Màu/i.test(t.options[i].name)) {
                is_color = true;
            }
            var optionValues = new Array();
            for (var j = 0; j < t.variants.length; j++) {
                var variant = t.variants[j];
                var value = variant.options[i];
                var valueHandle = awe_convertVietnamese(value);

                var forText = 'swatch-' + i + '-' + valueHandle;
                if (optionValues.indexOf(value) < 0) {
                    //not yet inserted
                    options += '<div class="position-relative">'
                    if (variant.featured_image != null) {
                        options += '<div data-image="' + variant.featured_image.src + '" data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
                    } else {
                        options += '<div  data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
                    }



                    options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : '') + ' />';

                    if (is_color) {
                        let useVImg = true;
                        let vImgPrefix = `color-${valueHandle}`;
                        let vImgSrc = t.images.find(el => el.indexOf(vImgPrefix) > -1);

                        if (variant.featured_image != null) {
                            vImgSrc = variant.featured_image.src;
                            options += '<label for="${forText}" class="${valueHandle}" style="background-image: url(' + vImgSrc + ');background-size: cover;"></label><span></span>'
                        } else {
                            options += `<label for="${forText}" class="${valueHandle} image-type"></label><span></span>`
                        }

                    } else {
                        options += '<label for="' + forText + '">' + value + '</label>';
                    }
                    options += '</div>';
                    if (is_color) {
                        options += '<div class="tooltip">' + value + '</div>';
                    }
                    options += '</div>';
                    if (variant.available) {
                        //$('#quick-view-product .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
                    }
                    optionValues.push(value);
                }
            }
            options += '</div>';
        }

        quickview.find('form.variants > select').after(options);
        var chon = [];
        var qmoney = [];
        var qimage = [];
        var qid = [];
        quickview.find('.swatch :radio').change(function() {
            var optionIndex = $(this).closest('.swatch').attr('data-option-index');
            var optionValue = $(this).val();
            $(this)
                .closest('form')
                .find('.single-option-selector')
                .eq(optionIndex)
                .val(optionValue)
                .trigger('change');

            var variant_id = $('.quickview-product select[name=id]').val();

            var check = false;
            for (var i = 0; i < qid.length; i++) {
                if (qid[i] == variant_id) {
                    var quantity = parseInt($('.quickview-product input[name=quantity]').val());
                    var totalPrice = qmoney[i] * quantity;
                    var gia = Haravan.formatMoney(qmoney[i], window.money_format);
                    var totalPriceText = Haravan.formatMoney(totalPrice, window.money_format);

                    var totalPriceHtml = $('.quickview-product .price').html();


                    $('.quickview-product .total-price span').html(totalPriceText);
                    $('.quickview-product .price').html(gia);
                    currency();

                    if (qimage[i]) {
                        $('.quickview-product .featured-image img').attr('src', qimage[i]);
                    }


                }
            }
            for (var i = 0; i < chon.length; i++) {


                if (chon[i] == variant_id) {
                    var check = true;
                } else {}
            }

            if (check == true) {
                $('.quickview-product .btn-addToCart').attr('disabled', 'disabled');

                $(".quickview-product .btn-addToCart").removeAttr("disabled");
            }

        });

        quickview.find("form.variants .selector-wrapper label").each(function(n, r) {
            $(this).html(t.options[n].name)
        })
    } else {
        quickview.find("form.variants > select").remove();
        var q = '<input type="hidden" name="variantId" value="' + t.variants[0].id + '">';
        quickview.find("form.variants").append(q);
    }
}

function productImage() {
    $('#thumblist').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    if (!!$.prototype.fancybox) {
        $('li:visible .fancybox, .fancybox.shown').fancybox({
            'hideOnContentClick': true,
            'openEffect': 'elastic',
            'closeEffect': 'elastic'
        });
    }
}
/* Quick View ADD TO CART */

function updatePricingQuickView() {

    //Currency.convertAll(window.shop_currency, $("#currencies a.selected").data("currency"), "span.money", "money_format")
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

$(document).on('click', '.quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay', function(e) {
    // my edit

    $(".modal-backdrop.show").remove();

    // end edit
    $("#quick-view-product").fadeOut(0);
    $("#quick-view-product iframe").each(function() {
        let currSrc = $(this).attr('src')
        $(this).attr('src', currSrc)
    })
    awe_hidePopup();
    $('#quick-view-product').modal('hide');
});
$(document).on('click', '.fix_add_to_cart', function(e) {
    e.preventDefault();
    $('#quick-view-product').modal('hide');

    var $this = $(this);
    var form = $this.parents('form');

    var variantId = form.find("[name=id]").val();
    var qtt = form.find("[name=quantity]").val();

    buyXgetY.addCartBuyXGetY_detail(true, variantId, qtt, (jqXHR, textStatus, errorThrown) => {
        addToCartSuccess(jqXHR, textStatus, errorThrown)
    })


    /*$.ajax({
	type: 'POST',
	url: '/cart/add.js',
	async: false,
	data: form.serialize(),
	dataType: 'json',
	error: addToCartFail,
	beforeSend: function() {  
	},
	success: addToCartSuccess,
	cache: false
});*/
});

function fundiinPay(el) {
    let $fundiin = $(el).parents(".item_product_main").find(".product-info .fundiin");
    let fundiinHtml = "";
    if ($fundiin.length > 0) {
        fundiinHtml = $fundiin.clone().wrap("<div/>").parent().html();
    }
    return fundiinHtml;
}