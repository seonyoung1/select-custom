function SelectCustom(selector){
	this.selector = $(selector);
	this.init();
	this.initEvent();
}
SelectCustom.prototype = {
	init: function(){
		var _this = this;
		_this.create();
	},
	initEvent: function(){
		var _this = this;
		// option item click
		$(document).on('click', '.select-box .option-dropdown .item', function(){
			_this.listSelected($(this));
		});
		// select-box button click
		$(document).on('click', '.select-box .current', function(){
			_this.listShown($(this));
		});
	},
	create: function(target){
		if( target !== undefined ) this.selector = $(target);
		// select option 값 가져오기, value 가 none 인건 사용하지 않는값
		var options = this.selector.find('option').map(function() {
			if( $(this).val() !== 'none') return { value: $(this).val(), text: $(this).text() }
		}).get();
		var selected = this.selector.find('option:selected');
		this.selector.hide();
		var value = selected.val();
		var current = selected.text();
		var str = '<div class="select-box">';
		str += '<button type="button" class="current">'+ current +'</button>';
		str += '<div class="option-dropdown">';
		options.map(function(v){
			var active = v.value === value ? ' selected' : '';
			str += '<button type="button" class="item'+ active +'" value="'+ v.value +'">'+ v.text +'</button>';
		});
		str += '</div>';
		str += '</div>';
		this.selector.after(str);
	},
	change: function(target, value){
		this.selector = $(target);
		this.selector.val(value);
		this.selector.next().remove();
		var _this = this;
		_this.create();
	},
	listSelected: function(target){
		var button = $(target);
		button.addClass('selected').siblings().removeClass('selected');
		button.parent().prev('.current').text(button.text());
		button.closest('.select-box').removeClass('is-active').prev().val(button.val());
	},
	listShown: function(target){
		var selectBox = $(target).closest('.select-box');
		if( selectBox.hasClass('is-active')){
			selectBox.removeClass('is-active');
		}else{
			selectBox.addClass('is-active');
		}
	}
}