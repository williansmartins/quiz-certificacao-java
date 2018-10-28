angular.module('principal')
.controller('AdminController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'QuestoesService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, QuestoesService, $rootScope, $localStorage, $rootScope) {

    $scope.$storage = $localStorage;
    $scope.alternativas = Object();
    $scope.questoes = Object();
    $scope.questaoSelecionada = {
    	"descricao":""
    };

    $scope.codificar = function(){
    	var valor = htmlentities.encode($("textarea").val());
    	$scope.questaoSelecionada.descricao = valor;

    	// setTimeout(removerPrettyPrint, 1000);
    	// setTimeout(aplicarPrettyPrint, 1000);
    }

    var removerPrettyPrint = function(){
    	$(".prettyprint").removeClass("prettyprinted");
    }

    var aplicarPrettyPrint = function(){
    	PR.prettyPrint();
    }

    $scope.salvar = function(){
    	QuestoesService.salvar($scope.questaoSelecionada)
        .success(function(response, status){
            console.info(response);
            buscarQuestoes();
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    $scope.remover = function(id){
    	QuestoesService.remover(id)
        .success(function(response, status){
            console.info(response);
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    var buscarQuestoes = function(){
        QuestoesService.buscarQuestoes()
        .success(function(response, status){
            console.info(response);
            $scope.questoes = response.questoes;

      //       $scope.questaoSelecionada = questoes[0];
      //       $scope.alternativas[0] = $scope.questaoSelecionada.resposta1;
      //       $scope.alternativas[1] = $scope.questaoSelecionada.resposta2;
      //       $scope.alternativas[2] = $scope.questaoSelecionada.resposta3;
      //       $scope.alternativas[3] = $scope.questaoSelecionada.resposta4;
      //       $scope.alternativas[4] = $scope.questaoSelecionada.resposta5;

      //       setTimeout(removerPrettyPrint, 1000);
    		// setTimeout(aplicarPrettyPrint, 2000);
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