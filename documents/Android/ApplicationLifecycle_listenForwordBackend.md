# Android Application 生命週期與監聽應用程式在前台執行還是後台

## 生命週期
  - onCreate : 程式創建時啟動
  - onTerminate : 程式關閉時
  - onLowMemory : 記憶體容量低時
  - onTrimMemory : 記憶體清理時
  - onConfigurationChanged : 狀態改變時(一些系統設定變更時 如畫面旋轉或鍵盤彈出隱藏等)
## 問題與解決方法
沒有onStart 與 onStop 要如何知道現在程式是在前台執行還是在後台呢?
1. 在onCreate中註冊Activity onResume的event 來判斷應用程式啟動
```java
registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
                   // ...
                   @Override
                   public void onActivityResumed(Activity activity) {
                     if (isBackground) {
                         isBackground = false;
                         notifyForeground();
                     }
                   }
                   // ...
               });

```
2.利用onTrimMemory的TRIM_MEMORY_UI_HIDDEN 等級來判斷應用程式進入後台
```java
@Override 
      public void onTrimMemory(int level) { 
          super.onTrimMemory(level); 
          if (level == TRIM_MEMORY_UI_HIDDEN) { 
              isBackground = true;
              notifyBackground(); 
          } 
       }

```

3.為了防止手機待機螢幕停止時onTrimMemory沒有啟動在onCreate中註冊接收器接收ACTION_SCREEN_OFF事件
```java
IntentFilter screenOffFilter = new IntentFilter(Intent.ACTION_SCREEN_OFF);
            registerReceiver(new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                  if (isBackground) {
                      isBackground = false;
                      notifyForeground();
                  }
                }
            }, screenOffFilter);

```
### 整段程式如下
```java
public class MyApplication extends Application {
    
        // Starts as true in order to be notified on first launch
        private boolean isBackground = true;
    
        @Override
        public void onCreate() {
            super.onCreate();
    
            listenForForeground();
            listenForScreenTurningOff();
        }
    
        private void listenForForeground() {
            registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
                //...
                @Override
                public void onActivityResumed(Activity activity) {
                    if (isBackground) {
                        isBackground = false;
                        notifyForeground();
                    }
                }
                //...
            });
        }
    
        private void listenForScreenTurningOff() {
            IntentFilter screenStateFilter = new IntentFilter(Intent.ACTION_SCREEN_OFF);
            registerReceiver(new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    isBackground = true;
                    notifyBackground();
                }
            }, screenStateFilter);
        }
    
        @Override
        public void onTrimMemory(int level) {
            super.onTrimMemory(level);
            if (level == TRIM_MEMORY_UI_HIDDEN) {
                isBackground = true;
                notifyBackground();
            }
    
        }
    
        private void notifyForeground() {
            // This is where you can notify listeners, handle session tracking, etc
        }
    
        private void notifyBackground() {
            // This is where you can notify listeners, handle session tracking, etc
        }
    
        public boolean isBackground() {
          return isBackground;
        }
    }

```
