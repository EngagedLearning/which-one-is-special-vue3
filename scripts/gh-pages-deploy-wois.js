//const execa = require("execa");
const fs = require("fs");

(async () => {
  try {
    const execa = (await import('execa')).execaCommand;
    await execa('git checkout --orphan gh-pages')
   // await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa('vite build')
   // await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    // make sure 'global':{} is commented out in vite.config.js
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    
    /* ==========================================================================
    // NOTE: user.name and password are left blank for use by the current user. 
    // The user needs an account and password on Github to use this build script. 
    ==============================================================================*/
    await execa("git --work-tree dist add --all");
    await execa("git --work-tree dist commit -m gh-pages")//, ["--work-tree=", folderName, "commit", "-m", "gh-pages"]);
    await execa("git remote set-url origin ssh://git@github.com/EngagedLearning/which-one-is-special-vue3.git")
    await execa("git config user.name 'bladekaj'");
    await execa("git config user.email 'bladekaj@comcast.net'");
    await execa("git push origin HEAD:gh-pages --force")//, ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm -r dist")//, ["-r", folderName]);
    await execa("git checkout -f main")//, ["checkout", "-f", "main"]);
    await execa("git branch -D gh-pages")//, ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {-
    console.log(e.message);
    process.exit(1);
  }
})();
