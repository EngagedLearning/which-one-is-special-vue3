# which-one-is-special-vue3
  Which-One-Is-Special-Vue3 is an experiment run as part of the EF+Math program by Enlearn funded by AERDF.  
  The main user interface asks users to first, find and select images or statements which satisfy a property given to them as a question (e.g.  'Select All Images which show a picture of an apple.' or 'Select all statements which contain the letter "e"). Secondly, users are asked to determine if the property is unique to the first image or statement in the upper left hand corner of the interface.(Image/Statement A).  To be unique, it needed to be true and only true for the upper left hand image.  If it was part of any other image, the answer was false. The experiment proved to be very difficult for most users. For a summary of results, please see the text files in the ./src/assets/data directory.  Files include Spot_It Notes, Notes_from_EF+Math_Constultancies, General_conclusions_fractions and General_Results_fractions. 

  The program was developed using Vue3 and Vite.  It is the only experiment developed using Vue3.  All others were developed using Vue2 and webpack. 

  The code also contains a 'Thank You' page, a data download (from s3) page, a demographic questionaire page and a survey page.  The demographic and survey pages were used with a Mechanical Turk experiment.  
  The data download page can be found locally under /S3DataDownload 

  It allows for the user to download all files past a certain date into a single file named by the user. 

  The pages are deployed on Github here:
  * https://engagedlearning.github.io/which-one-is-special-vue3/#/WhichOneIsSpecialPrep_2 
  * https://engagedlearning.github.io/which-one-is-special-vue3/#/ThankYou_2
  * https://engagedlearning.github.io/which-one-is-special-vue3/#/S3DataDownload 

  All of the code is written using Vue version 3, javascript, CSS, and HTML and compiled and bundled using Vite Version 4.4.9;

## Installation
  Check out/clone this directory. 

## Project setup

Build local version 
```
npm install
```

### Compiles and hot-reloads for development

Open a version of the program locally;  Address is shown after compile. 

```
npm run dev
```

### Compiles and minifies for production and allows the production version to be run locally

```
npm run build
```

### run local server on production build

Opens a production version on the local computer. Address is provided after start-up. Can occasionally run in dev mode and NOT in production mode because they are compiled differently by vite. 

```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### Build and deploy to github

Checking in any changes should automatically rebuild the code and deploy it but you can run the script manually
if necessary to solve issues or experiment.  

```
npm run gh-pages-deploy-wois
```
