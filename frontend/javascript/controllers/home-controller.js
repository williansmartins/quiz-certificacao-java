angular.module('principal')
.controller('HomeController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'QuestoesService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, QuestoesService, $rootScope, $localStorage, $rootScope) {

    $scope.$storage = $localStorage;
    $scope.questaoSelecionada = "";
    $scope.alternativas = Object();
    $scope.contador = 0;

    $scope.next = function(){
    	if($scope.contador<$scope.questoes.length-1){
	    	$scope.contador += 1;
	    	selecionarQuestao()
    	}
    }

    $scope.prev = function(){
    	if($scope.contador>=1){
	    	$scope.contador -= 1;
	    	selecionarQuestao()
	    }
    }

    var selecionarQuestao = function(){
    	$scope.questaoSelecionada = $scope.questoes[$scope.contador].descricao;
        $scope.alternativas[0] = $scope.questoes[$scope.contador].resposta1;
        $scope.alternativas[1] = $scope.questoes[$scope.contador].resposta2;
        $scope.alternativas[2] = $scope.questoes[$scope.contador].resposta3;
        $scope.alternativas[3] = $scope.questoes[$scope.contador].resposta4;
        $scope.alternativas[4] = $scope.questoes[$scope.contador].resposta5;

        $scope.titulo = $scope.questoes[$scope.contador].titulo;

        setTimeout(removerPrettyPrint, 1000);
		setTimeout(aplicarPrettyPrint, 2000);
    }

    $scope.codificar = function(){
    	var questaoCodificada = htmlentities.encode($("textarea").val());
    	$scope.questaoSelecionada = questaoCodificada;

    	setTimeout(removerPrettyPrint, 1000);
    	setTimeout(aplicarPrettyPrint, 1000);
    }

    var removerPrettyPrint = function(){
    	$(".prettyprint").removeClass("prettyprinted");
    }

    var aplicarPrettyPrint = function(){
    	PR.prettyPrint();
    }

    var buscarQuestoes = function(){
        QuestoesService.buscarQuestoes()
        .success(function(response, status){
            console.info(response);
            $scope.questoes = response.questoes;

            selecionarQuestao();
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    init = function() {
        buscarQuestoes();
    };

	init();
}]);


var escape = document.createElement('textarea');

function escapeHTML(html) {
    escape.textContent = html;
    return escape.innerHTML;
}

function unescapeHTML(html) {
    escape.innerHTML = html;
    return escape.textContent;
}

(function(window){
	window.htmlentities = {
		/**
		 * Converts a string to its html characters completely.
		 *
		 * @param {String} str String with unescaped HTML characters
		 **/
		encode : function(str) {
			var buf = [];
			
			for (var i=str.length-1;i>=0;i--) {
				buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
			}
			
			return buf.join('');
		},
		/**
		 * Converts an html characterSet into its original character.
		 *
		 * @param {String} str htmlSet entities
		 **/
		decode : function(str) {
			return str.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
		}
	};
})(window);