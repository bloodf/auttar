
# Auttar.JS
Uma forma mais fácil de implementar o websocket da Auttar em seu sistema.

##### Exemplo Online

Acesse [https://auttar-js.netlify.com](https://auttar-js.netlify.com) para acessar o exemplo online da implementação

## Como Usar

Com NPM
```bash
$ npm install auttarjs
```

Como CDN
```html
<script src="https://raw.githubusercontent.com/bloodf/auttar-js/master/dist/index.js"></script>
```

### API
```JS
import AuttarClass from 'auttarjs';

// Inicializando Classe
const  Auttar  =  new  AuttarClass({});

//Realizando pagamento com cartão de crédito.
Auttar.credit();

//Realizando pagamento com cartão de débito.
Auttar.debit();

//Realizando desfazimento total de operação
Auttar.requestCancellation();

//Realizando cancelamento da última compra;
Auttar.cancel();

//Realizando confirmação da operação
Auttar.confirm();
```

### Parâmetros
#### Construtor
|Propiedade|Tipo|Default|
|--|--|--|
| host | string | ws://localhost:2500
| debug | boolean | false
| orderId | string | ''
| amount | float | 0

#### credit
```JS
credit(installments =  1, withInterest = false)
```

#### debit
```JS
debit(isVoucher = false)
```
#### cancel
```JS
cancel(prop = {})
```
|Propiedade|Tipo|Default|
|--|--|--|
| operacao | number | Última operação realizada
| dataTransacao | string | Data da última operação realizada
| amount | float | Valor da última operação realizada
| nsuCTF | string | nsuCTF da última operação realizada

### Exemplos
```JS
import AuttarClass from 'auttarjs';

// Inicializando Classe
const  Auttar  =  new  AuttarClass({
orderId:  '123456ABCDEF',
amount:  100.90
});

//Realizando pagamento com cartão de crédito.
Auttar.credit();

//Realizando pagamento com cartão de crédito parcelado
Auttar.credit(3);

//Realizando pagamento com cartão de crédito parcelado juros pela administradora
Auttar.credit(3,  true);

//Realizando pagamento com cartão de débito.
Auttar.debit();

//Realizando desfazimento total de operação
Auttar.requestCancellation();

//Realizando cancelamento da última compra
Auttar.cancel();

//Realizando confirmação da operação
Auttar.confirm();

```
