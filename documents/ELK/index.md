# 在ubuntu16.04快速架設ELK+filebeat(6.x)

## 線上工具
  - [Regular Expressions 檢驗網站](https://regex101.com/)
  - [Grok 檢驗網站](http://grokdebug.herokuapp.com/)
  - [Grok patterns](https://github.com/logstash-plugins/logstash-patterns-core/blob/master/patterns/grok-patterns)
  - [ELK 官方文件](https://www.elastic.co/guide/index.html)

## 安裝
  1. 安裝java8
  
      ```
      $ sudo add-apt-repository ppa:webupd8team/java
      $ sudo apt-get update
      $ sudo apt-get install oracle-java8-installer
      ```
      
  2. 下載並安裝Public Signing key
      
      ```
      $ wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
      ```
      
  3. 安裝apt-transport-https
      
      ```
      $ sudo apt-get install apt-transport-https
      ```
      
  4. 保存respository到/etc/apt/sources.list.d/elastic-6.x.list
      
      ```
      $ echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
      ```
      
  5. 更新apt
      
      ```
      $ apt-get update
      ```
      
  6. 安裝Elasticsearch
      
      ```
      $ apt-get install elasticsearch
      ```
      
  7. 安裝kibana
      
      ```
      $ apt-get install kibana
      ```
      
  8. 安裝logstash
      
      ```
      $ apt-get install logstash
      ```
      
  9. 安裝filebeat
      
      ```
      $ apt-get install filebeat
      ```
      
## filebeat 設定
  
  1. 修改/etc/filebeat/filebean.yml

```
filebeat.inputs:

- type: log

  enabled: true

  #檔案目錄可以使用*.log
  paths:
    - /home/samual/log/taisys-ssd-server-web.log
    
  #增加欄位
  fields: 
    env: dev
    module: server
  #欄位上一至Root層
  fields_under_root: true 
  #多行開頭規則
  multiline.pattern: ^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3} 
  
  multiline.negate: true
  multiline.match: after
#output.elasticsearch:
  #hosts: ["localhost:9200"]
output.logstash:
  hosts: ["localhost:5044"]
      
```
  
- 設定參考 [log input設定](https://www.elastic.co/guide/en/beats/filebeat/6.x/filebeat-input-log.html) [多行設定](https://www.elastic.co/guide/en/beats/filebeat/6.x/multiline-examples.html) [輸出至logstash](https://www.elastic.co/guide/en/beats/filebeat/6.x/config-filebeat-logstash.html)
    

## logstash 設定
  1.修改/etc/logstash/logstash.yml
```
#設定conf目錄
path.config: /etc/logstash/conf.d
#開啟debug模式
config.debug: true
log.level: debug
#允許所有host來源
http.host: "0.0.0.0"
```

  2.加入first-pipeline.conf至/etc/logstash/conf.d

```
input {
    beats {
        port => "5044"
    }
}
filter {
    grok {
      match => [
        "message",
        "%{TIMESTAMP_ISO8601:logTimestamp} %{LOGLEVEL:logLevel}  \[%{DATA:class}\](?<detail>(.|\n)*)"
      ]
    }
    mutate {
      remove_field => ["host","beat","prospector","input","offset"]
    }
}
output {
    stdout { codec => rubydebug }
    file {
        path => "/home/samual/log/logstash_out.log"
    }
}
```

- input 設定由beat 輸入
- grok 解析message欄位資訊並分派至其他欄位
- mutate remove_field 移除多餘欄位
- output 目前設定console 輸出 以及 輸出至file 方便測試

## 測試filebeat與logstash 
1.啟動filebeat測試 
```
$ /usr/bin/filebeat -e -c /etc/filebeat/filebeat.yml -d "publish"
```
2.啟動logstash測試

```
$     /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/first-pipeline.conf  --path.settings=/etc/logstash  
```
      