/*!
 * auttarjs v0.3.3
 * (c) Heitor Ramon Ribeiro <heitor.ramon@gmail.com>
 * Released under the MIT License.
 */
"use strict";function _classCallCheck(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(a,r.key,r)}}function _createClass(a,e,o){return e&&_defineProperties(a.prototype,e),o&&_defineProperties(a,o),a}var LogLevelName={Info:"info",Warn:"warn",Error:"error",Method:"method",All:"all",None:"none"},LogLevelStyle={Info:"background:#215ace ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;",Warn:"background:#e8c82c ; padding: 2px; border-radius: 2px 0 0 2px;  color: #000;",Error:"background:#c92112 ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;",Method:"background:#6d0cb2 ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;"},NAME="Auttar ",BACKGROUND="background:#bc0909 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff ",log=function(a,e,o,r,n){console.log("%c ".concat(a," %c ").concat(o," %c ").concat(n),e,r,"background: transparent;")},showError=function(a,e,o,r,n){console.error("%c ".concat(a," %c ").concat(o," %c ").concat(n),e,r,"background: transparent;")};function logInfo(a){log(LogLevelName.Info,LogLevelStyle.Info,NAME,BACKGROUND,a)}function logWarn(a){log(LogLevelName.Warn,LogLevelStyle.Warn,NAME,BACKGROUND,a)}function logMethod(a,e,o){log(LogLevelName.Method,LogLevelStyle.Method,NAME,BACKGROUND,"Call Method: ".concat(a,"(").concat(e||"",") ").concat(o?"=> ".concat(JSON.stringify(o)):""))}function logError(a){showError(LogLevelName.Warn,LogLevelStyle.Warn,NAME,BACKGROUND,a)}var privateVariables={transactions:{credit:{base:112,installment:113,installmentWithInterest:114},debit:{base:101,voucher:106},cancel:128,confirm:6,requestCancel:191},return:{success:0,timeOut:1,notAuthorizes:5,internetError:10,intertefError:12,error:20,ecommerceError:30},errorCodes:{5300:"Valor não informado",5301:"Cartão inválido",5302:"Cartão vencido",5303:"Data de vencimento inválido",5304:"Código de segurança inválido",5305:"Taxa de serviço excede limite",5306:"Operação não permitida",5307:"Dados inválidos",5308:"Valor mínimo da parcela inválido",5309:"Número de parcelas inválido",5310:"Número de parcelas excede limite",5311:"Valor da entrada maior ou igual ao valor da transação",5312:"Valor da parcela inválido",5313:"Data inválida",5314:"Prazo excede limite",5316:"NSU inválido",5317:"Operação cancelada pelo usuário",5318:"Documento inválido (CPF ou CNPJ)",5319:"Valor do documento inválido",5328:"Erro na captura de dados do Pin-Pad",5329:"Erro na captura do chip ou cartão removido antes da hora.",5364:"Data de emissão do cartão inválida",5355:"O tipo de financiamento informado não é coerente com o número de parcelas"},ws:null,timeout:null,close:!0,timeoutConn:null,debug:!1};function _disconnect(){privateVariables.debug&&logMethod("_disconnect"),privateVariables.ws.close()}function _clearTimeout(){privateVariables.debug&&(logMethod("_clearTimeout"),logInfo("Clearing WebSocket timeout.")),privateVariables.close=!1,clearTimeout(privateVariables.timeoutConn)}function _timeout(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4;privateVariables.debug&&(logMethod("_timeout","time",a),logInfo("Starting WebSocket timeout.")),privateVariables.close=!0,privateVariables.timeoutConn=setTimeout(function(){privateVariables.close?privateVariables.ws.close():_clearTimeout()},a)}function _connect(a,e){return privateVariables.debug&&logMethod("_connect","host",a),new Promise(function(o,r){try{null===privateVariables.ws?(privateVariables.debug&&logInfo("Starting WebSocket Connection."),privateVariables.ws=new WebSocket(a)):2!==privateVariables.ws.readyState&&3!==privateVariables.ws.readyState||(privateVariables.debug&&logWarn("WebSocket is connected but not available. Closing connection to start a new one."),_disconnect(),privateVariables.ws=new WebSocket(a))}catch(a){r(a)}if(privateVariables.ws){_timeout();var n=function(){privateVariables.debug&&(logInfo("Sending a message to the WebSocket."),logInfo(JSON.stringify(e))),_clearTimeout(),privateVariables.ws.send(JSON.stringify(e)),_timeout(6e4)};1===privateVariables.ws.readyState?n():privateVariables.ws.onopen=function(){privateVariables.debug&&logInfo("WebSocket Connected."),n()},privateVariables.ws.onmessage=function(a){privateVariables.debug&&(logInfo("Received a message from the WebSocket."),logInfo(JSON.stringify(a.data))),_clearTimeout(),o(JSON.parse(a.data))},privateVariables.ws.onerror=function(a){privateVariables.debug&&(logWarn("WebSocket has returned an error."),logError(JSON.stringify(a))),_clearTimeout(),r(a)}}})}var Auttar=function(){function a(e){_classCallCheck(this,a),this.__host=e.host||"ws://localhost:2500",this.debug=e.debug||!1,privateVariables.debug=e.debug||!1,this.orderId=e.orderId||"",this.__amount=0,e.amount&&(this.amount=e.amount),this.__transactionDate=(new Date).toLocaleDateString("pt-BR",{year:"2-digit",month:"2-digit",day:"2-digit",timeZone:"America/Sao_Paulo"}).replace(/\//g,""),this.ctfTransaction={},this.__debugMessage=[]}return _createClass(a,[{key:"debugLog",value:function(a){this.debug&&logInfo(JSON.stringify(a))}},{key:"debugWarning",value:function(a){this.debug&&logWarn(a)}},{key:"debugLogMethod",value:function(a,e){if(this.debug){for(var o=arguments.length,r=new Array(o>2?o-2:0),n=2;n<o;n++)r[n-2]=arguments[n];logMethod(a,e,r)}}},{key:"classError",value:function(a){return this.debugMessage={message:a,logLevel:"error"},this.debug&&logError(a),new Error(a)}},{key:"credit",value:function(){var a=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(r,n){a.debugLogMethod("credi","installments, withInterest",e,o);var t={valorTransacao:a.amount,documento:a.orderId,operacao:privateVariables.transactions.credit.base,dataTransacao:a.__transactionDate};e>1&&(t.operacao=privateVariables.transactions.credit.installment,t.numeroParcelas=e),e>1&&o&&(t.operacao=privateVariables.transactions.credit.installmentWithInterest,t.numeroParcelas=e),a.debugMessage={message:"Pagamento com cartão de crédito. Operação: ".concat(t.operacao,". Valor ").concat(a.amount," centavos")},_connect(a.__host,t).then(function(e){if(e.retorno>0){var o=privateVariables.errorCodes[e.codigoErro]||e.display.length?e.display.map(function(a){return a.mensagem}).join(" "):" ";n(a.classError("Transação não concluída ".concat(e.codigoErro,": ").concat(o)))}a.ctfTransaction=Object.assign({},e,{dataTransacao:a.__transactionDate}),a.debugMessage={message:a.ctfTransaction},r(e)}).catch(function(e){return a.classError(e)})})}},{key:"debit",value:function(){var a=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise(function(o,r){a.debugLogMethod("debit","isVoucher",e);var n=e?privateVariables.transactions.debit.voucher:privateVariables.transactions.debit.base;a.debugMessage={message:"Pagamento com cartão de débito. Operação: ".concat(n,". Valor ").concat(a.amount," centavos")},_connect(a.__host,{valorTransacao:a.amount,documento:a.orderId,dataTransacao:a.__transactionDate,operacao:n}).then(function(e){if(e.retorno>0){var n=privateVariables.errorCodes[e.codigoErro]||e.display.length?e.display.map(function(a){return a.mensagem}).join(" "):" ";r(a.classError("Transação não concluída ".concat(e.codigoErro,": ").concat(n)))}a.ctfTransaction=Object.assign({},e,{dataTransacao:a.__transactionDate}),a.debugMessage={message:a.ctfTransaction},o(e)}).catch(function(e){return a.classError(e)})})}},{key:"confirm",value:function(){var a=this;return new Promise(function(e,o){a.debugLogMethod("confirm");var r=privateVariables.transactions.confirm;_connect(a.__host,{operacao:r}).then(function(r){if(a.debugMessage={message:"Confirmação de pagamento da operação realizada.\n      Operação: ".concat(a.ctfTransaction.operacao,"\n      Data: ").concat(a.ctfTransaction.dataTransacao,"\n      Valor: ").concat(a.amount,"\n      Bandeira: ").concat(a.ctfTransaction.bandeira,"\n      Cartão: ").concat(a.ctfTransaction.cartao)},r.retorno>0){var n=privateVariables.errorCodes[r.codigoErro]||r.display.length?r.display.map(function(a){return a.mensagem}).join(" "):" ";o(a.classError("Transação não concluída ".concat(r.codigoErro,": ").concat(n)))}a.ctfTransaction=Object.assign(a.ctfTransaction,r),a.debugMessage={message:a.ctfTransaction},e(r)}).catch(function(e){return a.classError(e)})})}},{key:"requestCancellation",value:function(){var a=this;return new Promise(function(e,o){a.debugLogMethod("requestCancellation");var r=privateVariables.transactions.requestCancel;_connect(a.__host,{operacao:r}).then(function(r){if(a.debugMessage={message:"Requisição de cancelamento de compra.\n      Operação: ".concat(a.ctfTransaction.operacao,"\n      Data: ").concat(a.ctfTransaction.dataTransacao,"\n      Valor: ").concat(a.amount,"\n      NSU: ").concat(a.ctfTransaction.nsuCTF)},r.retorno>0){var n=privateVariables.errorCodes[r.codigoErro]||r.display.length?r.display.map(function(a){return a.mensagem}).join(" "):" ";o(a.classError("Transação não concluída ".concat(r.codigoErro,": ").concat(n)))}a.debugMessage={message:r},e(r)}).catch(function(e){return a.classError(e)})})}},{key:"cancel",value:function(){var a=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(o,r){a.debugLogMethod("cancel","prop",e);var n=privateVariables.transactions.cancel,t=e.operacao||a.ctfTransaction.operacao,i=e.dataTransacao||a.ctfTransaction.dataTransacao,c=e.amount?100*parseFloat(e.amount):a.ctfTransaction.valorTransacao,s=e.nsuCTF||a.ctfTransaction.nsuCTF;_connect(a.__host,{operacao:n,valorTransacao:c,dataTransacao:i,nsuCTF:s}).then(function(e){if(a.debugMessage={message:"Cancelamento de compra.\n        Operação: ".concat(t,"\n        Data: ").concat(i,"\n        Valor: ").concat(c,"\n        NSU: ").concat(s)},e.retorno>0){var n=privateVariables.errorCodes[e.codigoErro]||e.display[0].mensagem;r(a.classError("Transação não concluída ".concat(e.codigoErro,": ").concat(n)))}a.debugMessage={message:e},o(e)}).catch(function(e){return a.classError(e)})})}},{key:"debugMessage",get:function(){return this.__debugMessage},set:function(a){if(this.debug){var e=Object.assign({logLevel:"info",message:""},a);return"log"===e.logLevel&&e.message?this.debugLog(e.message):(this.__debugMessage.push(Object.assign({},e,{date:(new Date).toISOString()})),this.debugLog(e.message))}}},{key:"amount",get:function(){return this.__amount},set:function(a){if("number"==typeof a&&a<=0)throw new Error("Não é possível definir um valor menor ou igual a zero.");this.__amount=100*parseFloat(a)}}]),a}();module.exports=Auttar;
//# sourceMappingURL=index.js.map
