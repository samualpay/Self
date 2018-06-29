# SVN
edit by Samual
## 簡介

    Subversion(SVN)是一個開放原始碼的版本控制系統，使用SVN能提供多人共有資料的一致性，以及版本控管，適用於文件檔案或是程式碼檔案。

## 常用指令
  1. Checkout: (checkout 可簡寫成 co), 將資料 checkout 回來
    - svn co http://SVN_PATH/svn_project
  2. Update: (update 可簡寫成 up), 將目前資訊更新成 SVN 線上最新版本.
    - svn up
  3. Commit: (commit 可簡寫成 ci), 將目前所做的修改 commit 回 svn
    - svn ci
  4. Status: (status 可簡寫成 st), 看目前檔案/結構 跟 SVN 線上的版本有哪些不同
    - svn st
  5. Add: 將此 檔案/目錄 新增進 svn
    - svn add [filename | directory]
  6. MV: 改檔名, 並且此檔案之前紀錄還要繼續留下
    - svn mv filename new_filename
  7. Revert: 還原這次的修改, 回到前一版的檔案狀態(未 commit 前可用)
    - svn revert [filename | directory]
  8. List: (list 可簡寫成 ls), 看上面有哪些檔案/資料
    - svn ls http://SVN_PATH/svn_project
  9. Import: 將整個 project_directory 的資料 import 進 svn 裡面
    - svn import project_directory http://DOMAIN/svn_project

## 工具介紹
    
  1. TortoiseSVN：在windows非常受到歡迎的一套Client軟體，與檔案總管整合得很好，可透過檔案 總管在檔案或目錄上用滑鼠右鍵的選單完成SVN的操作。
  2. Ankhsvn：將subversion的操作整合到Visual Studio的SVN Client軟體。
  3. Subclipse：將Subversion的操作整合到Eclipse的SVN Client軟體。
  4. Subversive：和Subclipse相同。
  5. SCPlugin：在Mac OS下使用，類似Tortoise SVN的軟體。
  6. SVNx：在Mac OS X下的一款Client軟體。
  7. eSVN：Unix下類似Tortoise SVN的軟體。
  8. kdesvn：在Linux下使用KDE桌面管理下類似TortoiseSVN的軟體。
  9. RabbitVCS：在Linux下使用Gnome桌面管理下類似TortoiseSVN的軟體。 

## 目錄結構
- 一般使用SVN做版本控制會有以下幾個目錄
  1. trunk:是用來做主方向開發的，一個新模塊的開發，這個時候就放在trunk，當模塊開發完成後，需要修改，就用branch。
  2. tags:是用來做一個milestone的，不管是不是發布版本，但都是一個可用的版本。
  3. branches :是用來做並行開發的，這裡的並行是指和trunk進行比較。

## 版本控制方法
```
第一種方法，使用trunk作為主要的開發目錄。 (目前系統採已這種模式)

一般的，我們的所有的開發都是基於trunk進行開發，當一個版本/release開發告一段落（開發、測試、文檔、製作安裝程序、打包等）結束後，代碼處於凍結狀態（人為規定，可以通過hook來進行管理）。此時應該基於當前凍結的代碼庫，打tag。當下一個版本/階段的開發任務開始，繼續在trunk進行開發。

此時，如果發現了上一個已發行版本（Released Version）有一些bug，或者一些很急迫的功能要求，而正在開發的版本（Developing Version）無法滿足時間要求，這時候就需要在上一個版本上進行修改了。應該基於發行版對應的tag，做相應的分支（branch）進行開發。

```

```
第二種方法，在每一個release的branch中進行各自的開發，trunk只做發布使用。

這種開發模式當中，trunk是不承擔具體開發任務的，一個版本/階段的開發任務在開始的時候，根據已經release的版本做新的開發分支，並且基於這個分支進行開發。

```

## 其他說明

```
在實現上，branch和tag，對於svn都是使用copy實現的

```

參考資料
[SVN trunk、branch、tag的用法](https://read01.com/zh-tw/O3mnLQ.html#.WzWmF6czaUk)
