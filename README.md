# which-one-is-special-vue3
  Which-One-Is-Special-Vue3 is an experiment run as part of the EF+Math program by Enlearn.  
  The main user interface asks users to first, find and select images or statements which satisfy a property given to them as a question (e.g.  'Select All Images which show a picture of an apple.' or 'Select all statements which contain the letter "e"). Secondly, users are asked to determine if the property is unique to the first image or statement in the upper left hand corner of the interface.(Image/Statement A). 

  The code also contains a 'Thank You' page, a data download (from s3) page, a demographic questionaire page and a survey page.  The demographic and survey pages were used with a Mechanical Turk experiment.  
  The data download page can be found here locally when the local server is running.; http://localhost:5173/which-one-is-special-vue3/#/S3DataDownload 
  It allows for the user to download all files past a certain data into a single file named by the user. 

  The pages are deployed on Github here:
  https://engagedlearning.github.io/which-one-is-special-vue3/#/WhichOneIsSpecialPrep_2 
  https://engagedlearning.github.io/which-one-is-special-vue3/#/ThankYou_2
  https://engagedlearning.github.io/which-one-is-special-vue3/#/S3DataDownload 

  All of the code is written using Vue version 3, javascript, CSS, and HTML and compiled and bundled using Vite Version 4.4.9;

## Installation
  Check out/clone this directory. 

## Project setup

Build local version 
```
npm install
```

### Compiles and hot-reloads for development

Open a version of the program locally at http://localhost:5173/which-one-is-special-vue3/#/WhichOneIsSpecialPrep_2

```
npm run dev
```

### Compiles and minifies for production and allows it the production version to be run locally

```
npm run build
```

### run local server on production build

Opens a version here: http://localhost:4173/which-one-is-special-vue3/#/WhichOneIsSpecialPrep_2
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### Build and deploy to github

Checking in any changes should automatically rebuild the code and deploy it but if can run the script manually
if necessary. 

```
npm run gh-pages-deploy-wois
```
