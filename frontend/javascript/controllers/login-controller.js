angular.module('principal')
.controller('LoginController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'LoginService', '$rootScope', '$localStorage','$rootScope', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, LoginService, $rootScope, $localStorage, $rootScope) {

    $scope.temErro = false;
    $scope.mensagem = "";
    $scope.form = {
    	"name": "",
    	"email": "",
    	"password": ""
    };
    $scope.$storage = $localStorage;
    $scope.flagMostrarLogin = true;
    $scope.popularEmail = function(){
    	$scope.form.email = "contato@williansmartins.com";
    }

    $scope.solicitar = function(){
    	console.info("solicitando para:");
    	console.info($scope.form);

    	LoginService.validarDisponibilidade($scope.form)
        .success(function(response, status){
            if(status == 406){
        		apresentarMensagem("Usuário não disponível");
        	}else{
        		cadastrar();
        	}
        })
        .error(function(response){
        	
        	console.info(response);
            apresentarMensagem("Usuário indisponível:");
        });
    }

    var cadastrar = function(){

    	//validar email

    	//validar usuario
    	LoginService.signup($scope.form)
        .success(function(response, status){
    		apresentarMensagem("Cadastro efetuado com sucesso, a partir de agora você pode entrar com seu usuário e senha.");
    		$scope.flagMostrarLogin = true;
        })
        .error(function(response){
            apresentarMensagem("Erro ao solicitar cadastro");
        });
    }

    $scope.login = function(){
        LoginService.login($scope.form)
        .success(function(response){

            //TODO: nao era pra ser assim, erro de login tinha que cair em error...
            if(response.status=="error"){
               alert("Houve um problema ao tentar fazer o login");
            }else{
                $scope.nome = response.user.name;
                $scope.tipo = response.user.tipo;
                $localStorage.nome = response.user.name;
                $localStorage.token = response.token;
                $localStorage.tipo = response.user.tipo;
                $scope.temErro = false;
                $scope.$storage.usuarioLogado = true;
                
                var objetoGlogal = {
                	"localstorage" : $localStorage,
                	"flagMostrarMenu" : true
                }

                $rootScope.$broadcast('topic', objetoGlogal);

                $location.path("/home");
            }

        })
        .error(function(response){
            $scope.$storage.usuarioLogado = false;
            $scope.temErro = true;
            alert("Houve um problema ao tentar fazer o login");
        });
    }

    var limparDadosDeLogin = function(){

     	var objetoGlogal = {
        	"localstorage" : null,
        	"flagMostrarMenu" : null
        }

        $rootScope.$broadcast('topic', objetoGlogal);
    }

    init = function() {
        limparDadosDeLogin();
    };

	init();
}]);

// $(document).ready(function () {
//      $(window)    
//           .bind('orientationchange', function(){
//             console.info("aaaa");
            
//                if (window.orientation % 180 == 0){
//                    $(document.body).css("-webkit-transform-origin", "")
//                        .css("-webkit-transform", "");               
//                } 
//                else {                   
//                    if ( window.orientation > 0) { //clockwise
//                      $(document.body).css("-webkit-transform-origin", "200px 190px")
//                        .css("-webkit-transform",  "rotate(-90deg)");  
//                    }
//                    else {
//                      $(document.body).css("-webkit-transform-origin", "280px 190px")
//                        .css("-webkit-transform",  "rotate(90deg)"); 
//                    }
//                }
//            })
//           .trigger('orientationchange'); 
// });