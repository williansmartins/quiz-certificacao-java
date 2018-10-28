angular.module('controlei')
.controller('HomeController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'HomeService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, HomeService, $rootScope, $localStorage, $rootScope) {

    $scope.$storage = $localStorage;
    $scope.questaoSelecionada = "";
    $scope.alternativas = Object();

    $scope.metodo = function(){
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
        HomeService.buscarQuestoes()
        .success(function(response, status){
            console.info(response);
            var questoes = response.questoes;

            $scope.questaoSelecionada = questoes[0].descricao;
            $scope.alternativas[0] = questoes[0].resposta1;
            $scope.alternativas[1] = questoes[0].resposta2;
            $scope.alternativas[2] = questoes[0].resposta3;
            $scope.alternativas[3] = questoes[0].resposta4;
            $scope.alternativas[4] = questoes[0].resposta5;

            $scope.titulo = questoes[0].titulo;

            setTimeout(removerPrettyPrint, 1000);
    		setTimeout(aplicarPrettyPrint, 2000);
        })
        .error(function(response){
            alert("Erro!");
        });
    }

    init = function() {
    	//buscarApontamentosDoDia();
    	//buscarTodosApontamentos();
        //alert(new Date("2018-08-27 14:32:31".replace(' ', 'T')));
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