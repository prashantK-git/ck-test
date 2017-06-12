define(['jquery','ko', 'ckeditor'], function($,ko){
	console.log('start your project');

	// to log the ckeditor state
	var  log = {
		logger: function(options){
			
				options.ele.val('*1*' + options.ele.val() + options.log);
			}
	};
	

	//ck-editor tool bar configurations
	var TOOLBAR_CONFIG = [
		{ name: 'document', items: [ 'Print'] },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'Fontsize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'tools', items: [ 'Maximize' ] }
	];
	// knockout custom binding
	ko.bindingHandlers.ckeditor = {
    	init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
		        var options = ko.utils.extend({
		            toolbar: TOOLBAR_CONFIG,
		            removePlugins: 'elementspath',
		            //extraPlugins: 'divarea',
		        }, allBindings.get('ckeditorOptions') || {
	        });
	        var modelValue = valueAccessor();

	        var editor = CKEDITOR.replace(element, options);
	   
	        CKEDITOR.config.height = 400;
	        // change the text area to div from iframe
	        //CKEDITOR.config.extraPlugins = 'divarea';

	        editor.on('change', function () {
	        	log.logger({ele: $('#log-view'), log:editor.getData()});
	            modelValue(editor.getData());
	        });
	        
	        //handle disposal (if KO removes by the template binding)
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	            if (editor) {
	                CKEDITOR.remove(editor);
	            };
	        });
    	},
	    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        var editor = new CKEDITOR.dom.element(element).getEditor();
	        editor.setData(ko.unwrap(valueAccessor()), null, true);
	    }
	};

	var viewModel = function () {
	    var self = {};
	    self.content = ko.observable();
	    return self;
	}();

	ko.applyBindings(viewModel);
});