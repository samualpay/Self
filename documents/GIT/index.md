# GIT 與 GIT FLOW
edit by Samual
## 簡介

    Git 是一個分散式版本控制系統，適合在多人開發模式下的版本控管。
	
## 安裝
  - Windows
    - 至[git官網](https://git-scm.com/downloads)下載windows安裝版並使用默認安裝即可，安裝完後可以在開始功能表找到GIT，並選取Git Bash 如果有跳出commain line便表示安裝成功
	  或者輸入git version指令看看是否有版本資訊
  - Linux Ubuntu
    - 首先可以下git指令看看系統是否有安裝git
	  ```
	  $ git
	  ```
	- 如果沒有可以透過 apt-get install git 指令安裝
	  ```
	  $ apt-get install git
	  ```
## 常用指令
  1. Init:在當前目錄建立倉庫(Git repository)
    ```
	$ git init
	```
  2. Status:檢視所有檔案的狀態
    ```
	$ git status
	```
	加上 -s 參數，僅會顯示已修改的檔案名稱。
    如果在 -s 後再加上 -b 參數，則會顯示分支的名稱。
  
  3. Add: 告知git那些檔案要commit
    ```
	$ git add yourFile
	$ git add [-A | --all] #一次add 所有的檔案
	```
	在 filepattern 可以直接指定檔案名稱，也可以給予指令例如 "*.txt"的通用字元。如果給予指令 "."的話，可以將子目錄裡的所有檔案註冊到索引裡。
    加上 -p 參數，可以選擇只註冊檔案中修改的其中一部分。 加上 -i 參數的話，會以互動方式詢問要註冊在索引裡的檔案。
  3. Commit: 提交一個patch
    ```
	$ git commit
	$ git commit -a
	$ git commit -m "commit message"
	```
	添加-a參數，就可以檢測出有修改的檔案(不包括新增的檔案)，將其加入索引並提交。這些操作只要一個指令就可以完成了。
    加上-m參數，就可以指令提交“提交訊息”。如果不添加-m參數，就會啟動修改提交訊息的編輯器。
  4. Diff:比較差異
    ```
	$ git diff
	```
	僅使用 "diff" 命令時，會顯示工作目錄和索引的差異。
	加上 --cached 參數，會顯示索引與 HEAD 的差異。
	如果指定特定的HEAD 或提交，則可以顯示工作目錄和指定HEAD/提交之間的差異。
  6. MV: 修改/移動一個檔案/目錄的名稱
    ```
	$ git mv <oldfilename> <newfilename>
	```
  7. RM: 刪除檔案
    ```
	$ git rm <file>
	```
  8. Clean: 從工作目錄刪除非管理對象的檔案
    ```
	$ git clean
	```
	加上 -n 參數，可以查看將被刪除的檔案。
	若添加 -f 參數則會立即刪除檔案。
	在預設情況下 .gitignore 檔案中所列之檔案/目錄並不在刪除範圍內。不過如果加上-x 參數， .gitignore 檔案中的檔案/目錄也會從工作目錄中刪除。
  9. Show: 查看提交的詳細記錄
    ```
	$ git show <commit>
	```
	請使用show命令，show命令的參數可以指定log命令參閱的提交與HEAD。
  10. Log: 顯示提交記錄
    ```
	$ git log
	```
	僅使用“log" 將顯示分支的提交列表。
    如果要查看特定檔案的提交記錄，請指定檔案名稱。
  11. Pull
  12. Fetch
  13. Merge
  14. branch
  15. checkout
  16. revert
  17. reset
  18. rebase
  

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
