# SuperCsv
edit by Samual
## 簡介

    SuperCsv 是一個免費的跨平台CSV格式與Pojo物件進行轉換的工具，他提供了Object、List、Map 的讀寫功能以及自動化型別轉換及校驗之功能

## CSV 簡介
    
    CSV 稱為字元分隔值或逗號分隔值，以純文字的形式儲存表格資料

### CSV 的串接規則
- 相鄰欄位必須被單個逗號分隔開

```
1997,Ford,E350
```

- 任何欄位都可以被包裹（使用雙引號字元）

```
"1997","Ford","E350"
```

- 如果欄位包含被嵌入的逗號，必須被包裹

```
1997,Ford,E350,"Super, luxurious truck"
```

- 每個被嵌入的雙引號字元必須被表示為兩個雙引號字元。

```
1997,Ford,E350,"Super, ""luxurious"" truck"
```

- 如果欄位包含被嵌入的換行，必須被包裹

```
1997,Ford,E350,"Go get one now
they are going fast"
```
- 第一條記錄可以是「表頭」，它在每個欄位中包含列名

```
Year,Make,Model
1997,Ford,E350
2000,Mercury,Cougar
```

## 匯入方法

- Maven dependency

```xml
<dependency>
<groupId>net.sf.supercsv</groupId>
<artifactId>super-csv</artifactId>
<version>2.4.0</version>
</dependency>
```

## 使用範例

- 讀csv(CsvBeanReader/CsvListReader/CsvMapReader)

```java
CsvBeanReader beanReader = new CsvBeanReader(new FileReader("C:\\yourFile.csv"),CsvPreference.STANDARD_PREFERENCE);
String[] header = beanReader.getHeader(true); //取得第一行的title回傳為string[]  並將指針移置下一行
List<MyObject> myObjectList = new ArrayList<MyObject>();
MyObject myObject = null;
while(myObject = beanReader.read(MyObject.class,header,getProcessors())!= null){
    myObjectList.add(myObject);
}
beanReader.close();
```

- 寫csv(CsvBeanWriter,CsvListWriter,CsvMapWriter)

```java
List<MyObject> myObjectList = getMyObjectList();
ICsvBeanWriter beanWriter =new CsvBeanWriter(new FileWriter("C:\\yourFile.csv"),CsvPreference.STANDARD_PREFERENCE));
String[] header = getHeader();
beanWriter.writeHeader(header);
for(MyObject myObject : myObjectList) {
    beanWriter.write(myObject,header,getProcessors());
}
beanWriter.close();
```

## CellProcessor 說明
    是用來限制型別或型別轉換的標示

### 範例
```csv
name,birth,phone,weight
sam,1884-05-26,,86.5
john,1943-06-06,0912345678,56.5
nana,1989-09-23,043589512,
```

```java
public static CellProcessor[] getProcessors(){
    final CellProcessor[] processors = new CellProcessor[] {			
        new NotNull(), //第一欄， NotNull表不允許空白
        new ParseDate("yyyy-MM-dd"), //轉換日期格式 
        new ConvertNullTo("NA"), //可以把Null轉換成其他字串
        new Optional(new ParseDouble()) // 為選填項目 將值轉為double
    };
    return processors;
}
```

## 相關連結
[SuperCsv官方網站](https://super-csv.github.io/super-csv/index.html "link") 
[CSV Wiki](https://zh.wikipedia.org/wiki/%E9%80%97%E5%8F%B7%E5%88%86%E9%9A%94%E5%80%BC "link")
    
