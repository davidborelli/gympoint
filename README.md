# Configurando o projeto GymPOINT

## Backend

Após download do repositório, acesse a pasta backend, dentro dela existe arquivo oculto com o nome ".env", nele
estão todas as informações necessárias para executar o projeto como esperado, abaixo segue alguns passos para configuração:

Para executar é preciso ter instalado e rodando na máquina o PostgreSQL e Redis.

#### 1 - Passo (SOMENTE SE ESTIVER COM O DOCKER INSTALADO E RODANDO, CASO CONTRÁRIO, pule essa etapa)\*\*\*

> OBS: Todos os comandos aqui passados são esperados que sejam executado em um ambiente de linha de comando, como terminal por exeplo.
> Também não irei detalhar especificamente o que cada comando faz

Com o comando abaixo teremos disponível um container rodando uma imagem do PostgreSQL na porta 5432, com usuário: postgres, e senha: postgres
`docker run --name database -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:11`

Com o comando abaixo teremos disponível um container rodando uma imagem do Redis na porta 6379, não tem usuário e senha.
`docker run --name redis -p 6379:6379 -d -t redis:alpine`

Após isso para ver os containers criados digite o comando:
`docker ps -a`

Os containers serão listados, cada um possui um CONTAINER ID, anote os 3 primeiros digitos de cada um, será necessário para iniciar os mesmos.

Para iniciar as imagens digite:
`docker start 'três_primeiros_digitos'` (execute duas vezes, uma para o container do Postgre, e outra para o Redis).

Para verificar se os containers estão ativos e rodando use o comando:
`docker ps`

#### 2 - Passo

Conecte no PostgreSQL com a ferramenta de sua preferência e crie um banco de dados com o commando:
`create database gympoint`

#### 3 - Passo

Abra o arquivo .env que mencionamos logo acima em um editor de texto de sua preferência, vamos confoguralo...

Em DB_HOST dever ser inserido o endereço do banco de dados, se estiver rodando local, pode ser colocado 'localhost' por exemplo, sem as aspas.
Em DB_USER deve ser inserido o usuário do banco de dados.
Em DB_PASS deve ser inserido a senha do banco de dados.
Em DB_NAME deve ser inserido o nome do banco de dados.

Em REDIS_HOST deve ser inserido o endereço do Redis
REDIS_PORT deve ser inserido a porta do Redis

OBS: O Redis é utilizado apenas para o envio de e-mail, o mesmo é dispensável, já no Postgre é indispensável.

Execute o seguinte comando para que seja criada as tabelas no banco de dados:
`yarn sequelize db:migrate`

Execute o seguinte comando para que seja criado um usuário padrão:
`yarn sequelize db:seed:all`

o usuário criado é:
Nome: Administrador
email: admin@gympoint.com (usado para login)
senha: 123456

Feito todos os passos anteriores considerando que tudo deu certo, acesse a pasta backend por linha de comando e execute o comando para subir o projeto:
`yarn dev`

E o seguinte comando para iniciar o serviço para envio de e-mail. (somente se estiver configurado o Redis):
`yarn queue`

# Frontend

Após download do repositório, acesse a pasta frontend/gympoint, dentro dela no caminho src/services no arquivo api.js
é configurado o endereço para onde serão feitas todas as requisições, caso não tenha mudado nada no backend, deixe como está.

#### 1 - Passo

Acesse a pasta do projeto em questão execute o comando para instalar todas as dependências do projeto:
`yarn`

#### 2 - Passo

Execute o comando para deixar o projeto no ar, rodando:
`yarn start`

Caso tudo der certo, o mesmo ficará disponível no endereço http://localhost:3000/

O usuário para login é o que foi mencionado acima.

<img width="988" alt="Screen Shot 2019-12-28 at 21 38 22" src="https://user-images.githubusercontent.com/21282437/71550981-0d7adb80-29bb-11ea-8bfb-70cdf5a47b41.png">
<img width="1023" alt="Screen Shot 2019-12-28 at 21 39 48" src="https://user-images.githubusercontent.com/21282437/71550982-0d7adb80-29bb-11ea-8789-60bfeee07e56.png">
<img width="976" alt="Screen Shot 2019-12-28 at 21 41 20" src="https://user-images.githubusercontent.com/21282437/71550983-0e137200-29bb-11ea-8aad-f22c4039bc5b.png">
<img width="972" alt="Screen Shot 2019-12-28 at 21 42 03" src="https://user-images.githubusercontent.com/21282437/71550984-0e137200-29bb-11ea-93a3-81699b376be3.png">
<img width="970" alt="Screen Shot 2019-12-28 at 21 48 18" src="https://user-images.githubusercontent.com/21282437/71551056-83337700-29bc-11ea-899d-c5bc244c8224.png">
<img width="987" alt="Screen Shot 2019-12-28 at 21 48 30" src="https://user-images.githubusercontent.com/21282437/71551057-83337700-29bc-11ea-936a-db3b8f41ac28.png">
<img width="957" alt="Screen Shot 2019-12-28 at 21 50 11" src="https://user-images.githubusercontent.com/21282437/71551058-83cc0d80-29bc-11ea-8433-0d1d51b22c4c.png">

# Mobile

> (O projeto mobile foi criado no MacOS então os passos aqui serão passados considerando que está usando MacOS)

Após download do repositório, acesse a pasta mobile/gympointapp, dentro dela no caminho src/services no arquivo api.js
é configurado o endereço para onde serão feitas todas as requisições, caso não tenha mudado nada no backend, deixe como está.

#### 1 - Passo

> OBS: Caso der um problema de style.css, entre na pasta src/components/Checkin, o arquivo Style.css temque estar com o 'S' minúsculo.

Acesse a pasta do projeto em questão execute o comando para instalar todas as dependências do projeto:
`yarn`

depois acesse a pasta gympointapp/ios e execute o seguinte comando:
`pod install`

#### 2 - Passo

Para rodar o projeto execute:
`react-native run-ios`

no meu caso utilizei o emulador do iphone 11, então executei o seguinte:
`react-native run-ios --simulator="iPhone 11"`

<img width="464" alt="Screen Shot 2019-12-28 at 21 52 19" src="https://user-images.githubusercontent.com/21282437/71551062-9c3c2800-29bc-11ea-940a-60c987117ec2.png">
<img width="461" alt="Screen Shot 2019-12-28 at 21 52 30" src="https://user-images.githubusercontent.com/21282437/71551063-9cd4be80-29bc-11ea-8586-0c46260bfcce.png">
<img width="441" alt="Screen Shot 2019-12-28 at 21 52 49" src="https://user-images.githubusercontent.com/21282437/71551064-9cd4be80-29bc-11ea-8f9d-b2f83a04dfcf.png">
<img width="455" alt="Screen Shot 2019-12-28 at 21 52 59" src="https://user-images.githubusercontent.com/21282437/71551065-9d6d5500-29bc-11ea-95a7-fa5d2a884ae7.png">
