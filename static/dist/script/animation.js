var appAnimations=angular.module("appAnimations",["ngAnimate-animate.css"]);
appAnimations.directive('turnPage',['$animate',function($animate){
	return {
		restrict:'A',
		link:function(scope,ele,attrs){
			ele.on('click',function(){
				/*	if(ele.hasClass('animated')){
				 scope.$apply(function() {
				 $animate.removeClass(ele, 'animated  tada').then(function() {
				 console.log('Animation finished111!');
				 });
				 });
				 }else{*/
				scope.$apply(function() {
					$animate.addClass(ele, 'animated  slideInRight').then(function() {
						console.log(ele.parent('.filter-mask'));
						//ele.parent('.filter-mask').css('background-color','rgba(0,0,0,.2)');
					});
				});
				/*}*/
			});
		}
	}
}]);