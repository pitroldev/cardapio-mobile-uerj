<div align="center">
<img src="./resources/web_hi_res_512.png" width="150" alt="Logo do Cardápio Mobile UERJ" />
<h1>Cardápio Mobile UERJ</h1>    
<a href="https://github.com/pitroldev/cardapio-mobile-uerj/releases">
<img src="https://img.shields.io/badge/version-1.02-green.svg" alt="Atual versão do Cardápio Mobile UERJ." />
</a>
<a href="https://github.com/pitroldev/cardapio-mobile-uerj/blob/master/LICENSE.txt">
<img src="https://img.shields.io/badge/license-Apache-blue.svg" alt="Cardápio Mobile UERJ está sob a licença APACHE." />    
</a>
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="Pull Requests são bem vindos!" />
<br/>
<br/> 
<a href="https://play.google.com/store/apps/details?id=com.cardapiomobileuerj">
<img src="./resources/google-play-badge.png" width=180 alt="Link para o Google Play"/>
</a>
</div>

## 📃 Descrição

Cardápio Mobile UERJ é um aplicativo de código aberto feito para promover facilidade e maior acessibilidade ao cardápio do restaurante universitário da UERJ.

Dentro do aplicativo também contém links de acesso para o site oficial da [UERJ](https://www.uerj.br/) e para o site oficial do [Restaurante Universitário](http://www.restauranteuniversitario.uerj.br/index.html).

## 🚀 Motivação

- Buscar uma forma mais eficiente de visualizar o cardápio do restaurante universitário durante o dia a dia na UERJ.

- Construir um meio acessível para deficientes visuais também conseguirem acessar o cardápio.

- Oferecer uma melhor experiência virtual para toda a comunidade Uerjiana.

- Consolidar meus conhecimentos em programação durante o período de quarentena.

## ⚙ Como funciona?

O Cardápio Mobile UERJ se baseia completamente na forma e estruturação do site do [Restaurante Universitário da UERJ](http://www.restauranteuniversitario.uerj.br/cardapio.html), que mantêm uma estrutura e padrão de formatação fixos desde a sua data de lançamento. O Aplicativo acessa o cardápio e salva a resposta do site na memória do celular, após isso ele processa e organiza essas informações utilizando [JQuery](https://jquery.com/) e programação orientada a objetos. Após organizado, o aplicativo renderiza em tela as informações, formatando o texto, corrigindo acentuação, pontuação e removendo a abreviação das palavras, tudo para a melhor experiência de deficintes visuais que utilizam o Talkback no celular.

## 🛠 O que foi utilizado?

Foi utilizado Javascript como linguagem de programação, [React-Native](https://github.com/facebook/react-native) como principal framework, JQuery ([react-native-cheerio](https://github.com/leon3110l/react-native-cheerio)) para a busca das informações e outras diversas libs para fins de abstração.

## 🎨 Demonstração

<div>
<img src="https://media.giphy.com/media/W4hm77SQW0wuSwsNRb/giphy.gif" alt="Demonstração do aplicativo." width=250 />
<img src="https://media.giphy.com/media/H62AdhEPExzwjsyaVx/giphy.gif" alt="Utilização do talkback."width=250 />
</div>
