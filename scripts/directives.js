
reportsTool.directive('tableToggler', ['$injector',function($injector){
	return {
		restrict: 'C',
		
		link: function(scope, element, attrs){
			var fileService;
			if(attrs.fileService){
				 fileService  = $injector.get([attrs.fileService]);
			}
			scope.sortFunction = function(key){
		        scope.orderByField = key;
		        scope.reverseSort = !scope.reverseSort;
		    };
		    scope.floatTheadOptions = {
		        scrollContainer: function($table){
		            return $table.closest('.center-section');
		        }
		    };
		     scope.filterFunction = function(item) {

		        var val = item[scope.searchCategory].toLowerCase();
		        return (val.indexOf(scope.searchText.toLowerCase()) > -1);
		    };

			element.on('click', function(e){
				if(!scope.tabularData && fileService != undefined){
					 fileService.getData(getFileName(attrs.fileName)).then(function(response){
					 	scope.tableHeader = response[0];
					 	response.splice(0,1);
						scope.tabularData = response;
					});
				}
				scope.$apply(function () {
					scope.showTable  = !scope.showTable ;
					scope.scrollDown = !scope.scrollDown;
				
					
				})
				var scrollValue = scope.scrollDown? document.body.scrollHeight:0;
				$('html, body').animate({ scrollTop:scrollValue }, 800);
			});
		}
	}	
}]);
