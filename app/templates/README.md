# <%= moduleName %> Module Development Guide

## Get Started

- Setup omnisocials project, reference [here](http://git.augmentum.com.cn/scrm/aug-marketing/wikis/setup-environment)
- Setup <%= moduleName %> module

    ```shell
    cd src/
    rm modules/<%= moduleName %>/ -rf
    git clone git@git.augmentum.com.cn:scrm/omnisocials-module-<%= moduleName %>.git modules/<%= moduleName %>
    grunt linkmodule:<%= moduleName %>
    echo FLUSHALL | redis-cli
    grunt build
    ```

- Make <%= moduleName %> module available for test account

    ```js
    // Get your test account
    a = db.account.findOne()
    a.availableExtMods.push('<%= moduleName %>');
    db.account.save(a);
    ```

- Enable <%= moduleName %> module at http://wm.com/management/extension
- Follow this guide to develop features http://git.augmentum.com.cn/scrm/aug-marketing/wikis/how-to-develop-plugin
