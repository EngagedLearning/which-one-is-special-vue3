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
    
    await execa("git", ["--work-tree=", folderName, "add", "--all"]);
    console.log('git worktree add');
    await execa("git", ["--work-tree=", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "main"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {-
    console.log(e.message);
    process.exit(1);
  }
})();