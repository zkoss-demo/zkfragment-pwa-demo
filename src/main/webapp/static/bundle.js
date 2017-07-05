/**
 * Created by rudyhuang on 2017/06/29.
 */

// init service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('sw.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

// Offline.js checking
Offline.options = {checkOnLoad: true, checks: {xhr: {url: 'https://cors-test.appspot.com/test'}}};

// Reload when online
window.addEventListener('online', function () {
	jq.get('', function (result) {
		var holder = jq('<div></div>').hide();
		holder.append(jq(result).filter('div.z-temp, script.z-runonce:eq(0)'))
			.appendTo('body');
		zk.afterMount(function () {
			// Change properties before replacing page. Would reduce page flicker when updating.
			// var fgs = zk.Widget.getElementsById('fg'),
			// 	fgl = fgs.length,
			// 	fgNew = zk.$(fgs[fgl - 1]),
			// 	fgOld = zk.$(fgs[fgl - 2]);
			// fgNew.save('exps', fgOld.load('exps'));
			// fgNew.save('newExp', fgOld.load('newExp'));
			// fgNew.save('editExp', fgOld.load('editExp'));
			// fgNew.save('toggleEdit', fgOld.load('toggleEdit'));
			jq('body > div.z-page').replaceWith(holder.find('div.z-page'));
			holder.remove();
		});
	});
});

// @jsvalidator
function isInt(value) {
	return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

function validateNumber(val, vmsgs) {
	return _validateNumber(val, vmsgs, 'number_required');
}

function validateNumber2(val, vmsgs) {
	return _validateNumber(val, vmsgs, 'number_required2');
}

function _validateNumber(val, vmsgs, key) {
	if (isInt(val)) {
		vmsgs[key] = '';
		return true;
	} else {
		vmsgs[key] = 'Number required.';
		return false;
	}
}
