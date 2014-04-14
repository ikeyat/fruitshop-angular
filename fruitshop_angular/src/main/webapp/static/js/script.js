$(function() {
    $("#tabs").tabs();
    $("#dialog-supportCustomerCode").dialog({
	modal : true,
	autoOpen : false
    });
    $("#dialog-supportProductCode").dialog({
	modal : true,
	autoOpen : false
    });
    $("#dialog-error").dialog({
	modal : true,
	autoOpen : false
    });
});

var app = angular.module('myApp', [ 'ngGrid' ]);
app
	.controller(
		'MyCtrl',
		function($scope, $filter) {
		    $scope.selectedSupportingCustomers = [];

		    $scope.supportCustomerCode = function() {
			$("#dialog-supportCustomerCode").dialog("open");
		    };
		    $scope.supportProductCode = function() {
			$("#dialog-supportProductCode").dialog("open");
		    };

		    $scope.selectSupportingCustomerCode = function() {
			if (0 < $scope.selectedSupportingCustomers.length) {
			    $scope.customer.customerCode = $scope.selectedSupportingCustomers[0].customerCode;
			    $("#dialog-supportCustomerCode").dialog("close");
			}
		    };
		    $scope.selectedSupportingProducts = [];
		    $scope.selectSupportingProductCode = function() {
			if (0 < $scope.selectedSupportingProducts.length) {
			    $scope.product.productCode = $scope.selectedSupportingProducts[0].productCode;
			    $("#dialog-supportProductCode").dialog("close");
			}
		    };
		    $scope.searchCustomer = function() {
			var found = $filter('filter')($scope.customers, {
			    customerCode : $scope.customer.customerCode
			}, true);
			if (found.length) {
			    angular.copy(found[0], $scope.customer);
			    return found[0];
			} else {
			    $scope.errorMessage = "invalid code. "
				    + $scope.customer.customerCode;
			    $("#dialog-error").dialog("open");
			}
		    };
		    $scope.searchProduct = function() {
			var found = $filter('filter')($scope.products, {
			    productCode : $scope.product.productCode
			}, true);
			if (found.length) {
			    angular.copy(found[0], $scope.product);
			    return found[0];
			} else {
			    $scope.errorMessage = "invalid code. "
				    + $scope.product.productCode;
			    $("#dialog-error").dialog("open");
			}
		    };
		    $scope.addProduct = function() {
			var found = $scope.searchProduct();
			if (found) {
			    if (0 < $scope.productQuantity) {
				var addedProduct = {};
				angular.copy(found, addedProduct);
				addedProduct.quantity = $scope.productQuantity;
				addedProduct.orderedPrice = addedProduct.productUnitPrice
					* addedProduct.quantity;
				$scope.orderedProducts.push(addedProduct);
			    } else {
				$scope.errorMessage = "Quantity must be greater than 0.";
				$("#dialog-error").dialog("open");
			    }
			}
		    };
		    $scope.removeProducts = function() {
			$scope.selectedOrderedProducts.forEach(function(value) {
			    var index = $scope.orderedProducts.indexOf(value);
			    $scope.orderList.selectItem(index, false);
			    $scope.orderedProducts.splice(index, 1);
			});
		    };

		    $scope.products = [ {
			productCode : "S01",
			productName : "Apple",
			productUnitPrice : 100
		    }, {
			productCode : "S02",
			productName : "Orange",
			productUnitPrice : 50
		    } ];
		    $scope.customers = [ {
			customerCode : "0001",
			customerName : "hoge",
			customerTel : "050-5555-5555",
			customerFax : "03-5555-5555",
			customerPostalCode : "111-2222",
			customerAddress : "Toyosu, Koto-Ku, Tokyo",
			customerStaff : "aaa"
		    }, {
			customerCode : "0002",
			customerName : "fuga",
			customerTel : "050-4444-4444",
			customerFax : "03-4444-4444",
			customerPostalCode : "111-3333",
			customerAddress : "Kiba, Koto-Ku, Tokyo",
			customerStaff : "bbb"
		    } ];
		    $scope.orderedProducts = [];
		    $scope.selectedOrderedProducts = [];
		    $scope.orderList = {
			data : 'orderedProducts',
			selectedItems : $scope.selectedOrderedProducts,
			columnDefs : [ {
			    field : 'productCode',
			    displayName : '商品コード'
			}, {
			    field : 'productName',
			    displayName : '商品名'
			}, {
			    field : "productUnitPrice",
			    displayName : "単価"
			}, {
			    field : "quantity",
			    displayName : "数量"
			}, {
			    field : "orderedPrice",
			    displayName : "受注金額"
			} ]
		    };
		    $scope.customerFilterOptions = {
			filterText : ''
		    };

		    $scope.productFilterOptions = {
			filterText : ''
		    };
		    var supportingCustomerColumnDefs = [ {
			field : 'customerCode',
			displayName : 'code'
		    }, {
			field : 'customerName',
			displayName : 'label'
		    } ];
		    $scope.supportingCustomerList = {
			data : 'customers',
			multiSelect : false,
			selectedItems : $scope.selectedSupportingCustomers,
			filterOptions : $scope.customerFilterOptions,
			columnDefs : supportingCustomerColumnDefs
		    };
		    var supportingProductColumnDefs = [ {
			field : 'productCode',
			displayName : 'code'
		    }, {
			field : 'productName',
			displayName : 'label'
		    } ];
		    $scope.supportingProductList = {
			data : 'products',
			multiSelect : false,
			selectedItems : $scope.selectedSupportingProducts,
			filterOptions : $scope.productFilterOptions,
			columnDefs : supportingProductColumnDefs
		    };
		});