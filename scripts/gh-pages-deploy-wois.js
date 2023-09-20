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
    console.log('folderName ' + folderName);
    
    //  await execa("git", ["--work-tree=", folderName, "add", "--all"]);
    await execa("git --work-tree dist add --all");
    console.log('git worktree add');
    await execa("git --work-tree dist commit -m gh-pages")//, ["--work-tree=", folderName, "commit", "-m", "gh-pages"]);
    console.log('switching to ssh for push')
    await execa("git remote set-url origin ssh://git@github.com/EngagedLearning/which-one-is-special-vue3.git")
    console.log("Pushing to gh-pages...");
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
