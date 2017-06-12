console.log('require config file loaded');
//https://stackoverflow.com/questions/3549508/prevent-caching-of-css-files-in-uiwebview-loaded-from-disk
requirejs.config({
	baseUrl: 'js',
	paths: {
		ko: 'lib/knockout',
		jquery: 'lib/jquery',
		ckeditor: 'lib/ckeditor5/ckeditor',
		//ckeditor: 'lib/ckeditor3/ckeditor',
		//ckeditor: 'lib/ckeditor2/ckeditor',
		//ckeditor: 'lib/ckeditor/ckeditor',
	}
});

requirejs(['app'], function(){
	console.log('app loaded');
})