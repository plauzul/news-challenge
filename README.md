# News Challenge

Versões necessárias para executar o projeto:

  - Node >= `8.x.x`
  - Ionic >= `3.x.x`
  - Npm >= `6.x.x`
  - Cordova >= `7.x.x`

# Iniciando

  - Primeiro clone este projeto e instale suas dependências `npm install`
  - Depois sua plataforma `ionic cordova add platform android`
  - Por fim execute no seu dispositivo `ionic cordova run android`

# Configurações
  - APP acessando a atual API `https://api-news-challenge.herokuapp.com/api/v1/`
  - Para poder acessar sua API local altere o valor de `URL_API` em `src/environments/config.ts`

### Erros

  - Caso durante a execução você esperimentar este erro:
    ![N|Solid](https://i.imgur.com/6ew0v9k.png)
  - Acesse `platforms/android/build.gradle`
  - E altere as seguintes linhas:
  ```sh
    buildscript {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com"
        }
    }
    ...
  ```
  - Para:
  ```sh
    buildscript {
    repositories {
        maven {
            url "https://maven.google.com"
        }
        jcenter()
    }
    ...
  ```
  - E essas:
  ```sh
    allprojects {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com"
        }
    }
    ...
  ```
  - Para essas:
  ```sh
    allprojects {
    repositories {
        maven {
            url "https://maven.google.com"
        }
        jcenter()
    }
    ...
  ```

License
----

MIT
