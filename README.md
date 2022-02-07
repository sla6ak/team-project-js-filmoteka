## Filmoteka

Данное приложение базируется на логике прототипного
наследования между классами. Благодаря этому оно очень простое в поддержке и доработке. За объект класса была взята "мнимая" сущность фильма, которая имеет
различных оформительных и ключевых потомков: например, английских или украинских. Работа над
ветвлениями этих вариаций разбита на отдельные классы для прототипирования. Благодаря такому подходу
вы точно знаете, как быстро доработать ваше приложение, анализируя отзывы и предпочтения  пользователей. Будет довольно
просто изменить части рендера или добавить поддержку новых тем. Помните,что простота приложения не
зависит от его размера, это - заслуга инженерного подхода в разработке и хорошей документации!

(Filmoteka-documents.png) - схема прилагается.

В самом коде содержатся исчерпывающие комментарии о работе различных методов. Это было одно из
основных требований в разработке.

## Перед началом работы

npm ci

### Разработка

npm run dev

### Деплой

Сборка будет автоматически собирать и деплоить продакшен версию проекта на GitHub Pages, в ветку
`gh-pages`, каждый раз когда обновляется ветка `main`. Например, после прямого пуша или принятого
пул-реквеста. Для этого необходимо в файле `package.json` отредактировать поле `homepage` и скрипт
`build`, заменив `имя_пользователя` и `имя_репозитория` на свои.

```json
"homepage": "https://имя_пользователя.github.io/имя_репозитория",
"scripts": {
  "build": "parcel build src/*.html --public-url /имя_репозитория/"
},
```

На всякий случай стоит зайти в настройки репозитория `Settings` > `Pages` и убедиться что продакшен
версии файлов раздаются из папки `/root` ветки `gh-pages`. Через какое-то время живую страницу можно
будет посмотреть по адресу указанному в отредактированном свойстве `homepage`, например
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Файлы и папки

- Все паршалы файлов стилей должны лежать в папке `src/sass` и импортироваться в
  `src/sass/main.scss`
- Изображения добавляйте в папку `src/images`, заранее оптимизировав их. Сборщик просто копирует
  используемые изображения чтобы не нагружать систему оптимизацией картинок, так как на слабых
  компьютерах это может занять много времени.
