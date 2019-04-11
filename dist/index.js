/*!
 * auttarjs v0.3.7
 * (c) Heitor Ramon Ribeiro <heitor.ramon@gmail.com>
 * Released under the MIT License.
 */
"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,a){for(var o=0;o<a.length;o++){var t=a[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,a,o){return a&&_defineProperties(e.prototype,a),o&&_defineProperties(e,o),e}var LogLevelName={Info:"info",Warn:"warn",Error:"error",Method:"method",All:"all",None:"none"},LogLevelStyle={Info:"background:#215ace ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;",Warn:"background:#e8c82c ; padding: 2px; border-radius: 2px 0 0 2px;  color: #000;",Error:"background:#c92112 ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;",Method:"background:#6d0cb2 ; padding: 2px; border-radius: 2px 0 0 2px;  color: #fff;"},NAME="Auttar ",BACKGROUND="background:#bc0909 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff ",log=function(e,a,o,t,n){console.log("%c ".concat(e," %c ").concat(o," %c ").concat(n),a,t,"background: transparent;")},showError=function(e,a,o,t,n){console.error("%c ".concat(e," %c ").concat(o," %c ").concat(n),a,t,"background: transparent;")};function logInfo(e){log(LogLevelName.Info,LogLevelStyle.Info,NAME,BACKGROUND,e)}function logWarn(e){log(LogLevelName.Warn,LogLevelStyle.Warn,NAME,BACKGROUND,e)}function logMethod(e,a,o){log(LogLevelName.Method,LogLevelStyle.Method,NAME,BACKGROUND,"Call Method: ".concat(e,"(").concat(a||"",") ").concat(o?"=> ".concat(JSON.stringify(o)):""))}function logError(e){showError(LogLevelName.Warn,LogLevelStyle.Warn,NAME,BACKGROUND,e)}function sleep(e){return new Promise(function(a){return setTimeout(a,e)})}var privateVariables={transactions:{credit:{base:112,installment:113,installmentWithInterest:114},debit:{base:101,voucher:106},cancel:128,confirm:6,requestCancel:191},return:{success:0,timeOut:1,notAuthorizes:5,internetError:10,intertefError:12,error:20,ecommerceError:30},errorCodes:{5300:"Valor não informado",5301:"Cartão inválido",5302:"Cartão vencido",5303:"Data de vencimento inválido",5304:"Código de segurança inválido",5305:"Taxa de serviço excede limite",5306:"Operação não permitida",5307:"Dados inválidos",5308:"Valor mínimo da parcela inválido",5309:"Número de parcelas inválido",5310:"Número de parcelas excede limite",5311:"Valor da entrada maior ou igual ao valor da transação",5312:"Valor da parcela inválido",5313:"Data inválida",5314:"Prazo excede limite",5316:"NSU inválido",5317:"Operação cancelada pelo usuário",5318:"Documento inválido (CPF ou CNPJ)",5319:"Valor do documento inválido",5328:"Erro na captura de dados do Pin-Pad",5329:"Erro na captura do chip ou cartão removido antes da hora.",5364:"Data de emissão do cartão inválida",5355:"O tipo de financiamento informado não é coerente com o número de parcelas"},ws:null,timeout:null,close:!0,timeoutConn:null,timeoutMs:6e4,debug:!1};function _disconnect(){privateVariables.debug&&logMethod("_disconnect"),privateVariables.ws.close()}function _clearTimeout(){privateVariables.debug&&(logMethod("_clearTimeout"),logInfo("Clearing WebSocket timeout.")),privateVariables.close=!1,clearTimeout(privateVariables.timeoutConn),privateVariables.close=!0}function _timeout(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4;return new Promise(function(a,o){privateVariables.debug&&(logMethod("_timeout","time",e),logInfo("Starting WebSocket timeout.")),privateVariables.timeoutConn=setTimeout(function(){privateVariables.close?(privateVariables.ws.close(),o(new Error("Connection Timeout."))):(_clearTimeout(),a(!0))},e)})}function _connect(e,a){return privateVariables.debug&&logMethod("_connect","host",e),new Promise(function(o,t){try{null===privateVariables.ws?(privateVariables.debug&&logInfo("Starting WebSocket Connection."),privateVariables.ws=new WebSocket(e)):2!==privateVariables.ws.readyState&&3!==privateVariables.ws.readyState||(privateVariables.debug&&logWarn("WebSocket is connected but not available. Closing connection to start a new one."),_disconnect(),privateVariables.ws=new WebSocket(e))}catch(e){t(e)}if(privateVariables.ws){_timeout();var n=function(){privateVariables.debug&&(logInfo("Sending a message to the WebSocket."),logInfo(JSON.stringify(a))),_clearTimeout(),privateVariables.ws.send(JSON.stringify(a)),_timeout(privateVariables.timeoutMs).catch(function(e){return t(e)})};1===privateVariables.ws.readyState?n():privateVariables.ws.onopen=function(){privateVariables.debug&&logInfo("WebSocket Connected."),n()},privateVariables.ws.onmessage=function(e){privateVariables.debug&&(logInfo("Received a message from the WebSocket."),logInfo(JSON.stringify(e.data))),_clearTimeout(),o(JSON.parse(e.data))},privateVariables.ws.onerror=function(e){privateVariables.debug&&(logWarn("WebSocket has returned an error."),logError(JSON.stringify(e))),_clearTimeout(),t(e)}}})}var Auttar=function(){function e(a){_classCallCheck(this,e),this.__host=a.host||"ws://localhost:2500",this.debug=a.debug||!1,privateVariables.debug=a.debug||!1,privateVariables.timeoutMs=a.webSocketTimeout||6e4,this.orderId=a.orderId||"",this.__amount=0,this.__sleepTimeout=a.sleepTimeout||1e3,a.amount&&(this.amount=a.amount),this.__transactionDate=(new Date).toLocaleDateString("pt-BR",{year:"2-digit",month:"2-digit",day:"2-digit",timeZone:"America/Sao_Paulo"}).replace(/\//g,""),this.ctfTransaction={},this.__debugMessage=[]}return _createClass(e,[{key:"debugLog",value:function(e){this.debug&&logInfo(JSON.stringify(e))}},{key:"debugWarning",value:function(e){this.debug&&logWarn(e)}},{key:"debugLogMethod",value:function(e,a){if(this.debug){for(var o=arguments.length,t=new Array(o>2?o-2:0),n=2;n<o;n++)t[n-2]=arguments[n];logMethod(e,a,t)}}},{key:"classError",value:function(e){return this.debugMessage={message:e,logLevel:"error"},this.debug&&logError(e),new Error(e)}},{key:"credit",value:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(t,n){e.debugLogMethod("credi","installments, withInterest",a,o);var r={valorTransacao:e.amount,documento:e.orderId,operacao:privateVariables.transactions.credit.base,dataTransacao:e.__transactionDate};a>1&&(r.operacao=privateVariables.transactions.credit.installment,r.numeroParcelas=a),a>1&&o&&(r.operacao=privateVariables.transactions.credit.installmentWithInterest,r.numeroParcelas=a),e.debugMessage={message:"Pagamento com cartão de crédito. Operação: ".concat(r.operacao,". Valor ").concat(e.amount," centavos")},sleep(e.__sleepTimeout).then(function(){_connect(e.__host,r).then(function(a){if(a.retorno>0){var o=privateVariables.errorCodes[a.codigoErro]||a.display.length?a.display.map(function(e){return e.mensagem}).join(" "):" ";n(e.classError("Transação não concluída ".concat(a.codigoErro,": ").concat(o)))}e.ctfTransaction=Object.assign({},a,{dataTransacao:e.__transactionDate}),e.debugMessage={message:e.ctfTransaction},t(Object.assign({documento:e.orderId,dataTransacao:e.__transactionDate},a))}).catch(function(a){return e.classError(a)})})})}},{key:"debit",value:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise(function(o,t){e.debugLogMethod("debit","isVoucher",a);var n=a?privateVariables.transactions.debit.voucher:privateVariables.transactions.debit.base;e.debugMessage={message:"Pagamento com cartão de débito. Operação: ".concat(n,". Valor ").concat(e.amount," centavos")},sleep(e.__sleepTimeout).then(function(){_connect(e.__host,{valorTransacao:e.amount,documento:e.orderId,dataTransacao:e.__transactionDate,operacao:n}).then(function(a){if(a.retorno>0){var n=privateVariables.errorCodes[a.codigoErro]||a.display.length?a.display.map(function(e){return e.mensagem}).join(" "):" ";t(e.classError("Transação não concluída ".concat(a.codigoErro,": ").concat(n)))}e.ctfTransaction=Object.assign({},a,{dataTransacao:e.__transactionDate}),e.debugMessage={message:e.ctfTransaction},o(Object.assign({documento:e.orderId,dataTransacao:e.__transactionDate},a))}).catch(function(a){return e.classError(a)})})})}},{key:"confirm",value:function(){var e=this;return new Promise(function(a,o){e.debugLogMethod("confirm");var t=privateVariables.transactions.confirm;sleep(e.__sleepTimeout).then(function(){_connect(e.__host,{operacao:t}).then(function(t){if(e.debugMessage={message:"Confirmação de pagamento da operação realizada.\n      Operação: ".concat(e.ctfTransaction.operacao,"\n      Data: ").concat(e.ctfTransaction.dataTransacao,"\n      Valor: ").concat(e.amount,"\n      Bandeira: ").concat(e.ctfTransaction.bandeira,"\n      Cartão: ").concat(e.ctfTransaction.cartao)},t.retorno>0){var n=privateVariables.errorCodes[t.codigoErro]||t.display.length?t.display.map(function(e){return e.mensagem}).join(" "):" ";o(e.classError("Transação não concluída ".concat(t.codigoErro,": ").concat(n)))}e.ctfTransaction=Object.assign(e.ctfTransaction,t),e.debugMessage={message:e.ctfTransaction},a(Object.assign({},e.ctfTransaction,t))}).catch(function(a){return e.classError(a)})})})}},{key:"requestCancellation",value:function(){var e=this;return new Promise(function(a,o){e.debugLogMethod("requestCancellation");var t=privateVariables.transactions.requestCancel;sleep(e.__sleepTimeout).then(function(){_connect(e.__host,{operacao:t}).then(function(t){if(e.debugMessage={message:"Requisição de cancelamento de compra.\n      Operação: ".concat(e.ctfTransaction.operacao,"\n      Data: ").concat(e.ctfTransaction.dataTransacao,"\n      Valor: ").concat(e.amount,"\n      NSU: ").concat(e.ctfTransaction.nsuCTF)},t.retorno>0){var n=privateVariables.errorCodes[t.codigoErro]||t.display.length?t.display.map(function(e){return e.mensagem}).join(" "):" ";o(e.classError("Transação não concluída ".concat(t.codigoErro,": ").concat(n)))}e.debugMessage={message:t},a(Object.assign({},e.ctfTransaction,t))}).catch(function(a){return e.classError(a)})})})}},{key:"cancel",value:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(o,t){e.debugLogMethod("cancel","prop",a);var n=privateVariables.transactions.cancel,r=a.operacao||e.ctfTransaction.operacao,i=a.dataTransacao||e.ctfTransaction.dataTransacao,c=a.amount?100*parseFloat(a.amount):e.ctfTransaction.valorTransacao,s=a.nsuCTF||e.ctfTransaction.nsuCTF;sleep(e.__sleepTimeout).then(function(){_connect(e.__host,{operacao:n,valorTransacao:c,dataTransacao:i,nsuCTF:s}).then(function(a){if(e.debugMessage={message:"Cancelamento de compra.\n        Operação: ".concat(r,"\n        Data: ").concat(i,"\n        Valor: ").concat(c,"\n        NSU: ").concat(s)},a.retorno>0){var n=privateVariables.errorCodes[a.codigoErro]||a.display[0].mensagem;t(e.classError("Transação não concluída ".concat(a.codigoErro,": ").concat(n)))}e.debugMessage={message:a},o(Object.assign({},e.ctfTransaction,a))}).catch(function(a){return e.classError(a)})})})}},{key:"debugMessage",get:function(){return this.__debugMessage},set:function(e){if(this.debug){var a=Object.assign({logLevel:"info",message:""},e);return"log"===a.logLevel&&a.message?this.debugLog(a.message):(this.__debugMessage.push(Object.assign({},a,{date:(new Date).toISOString()})),this.debugLog(a.message))}}},{key:"amount",get:function(){return this.__amount},set:function(e){if("number"==typeof e&&e<=0)throw new Error("Não é possível definir um valor menor ou igual a zero.");this.__amount=100*parseFloat(e)}}]),e}();module.exports=Auttar;
//# sourceMappingURL=index.js.map
