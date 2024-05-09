# CloudMusic
> [!NOTE]
> B/S架构的、在PC端浏览器模拟网易云音乐移动端的简易实现
## 1、准备工作
### 1.1、项目克隆到本地
在你想要**安装本项目**的位置打开终端，执行以下命令：
```sh
git clone git@github.com:get1024/CloudMusic.git
```
### 1.2、项目环境下载
进入`CloudMusic`根文件夹（即能看到`MusicApi`文件夹），运行以下命令：
```sh
npm install
```
会发现文件夹下多出文件夹`node_modules`和文件`package-lock.json`。

进入`MusicApi`文件夹，运行以下命令：
```sh
npm install
```
会发现文件夹下多出文件夹`node_modules`和文件`package-lock.json`。
## 2、项目启动
### 2.1、启动前端
进入`CloudMusic`根文件夹（即能看到`MusicApi`文件夹），运行以下命令：
```sh
npm run serve
```
出现下图所示即为成功：
![](https://github.com/get1024/CloudMusic/blob/main/readme_assets/front_end_start.png)
### 2.2、启动Api
进入`MusicApi`文件夹，运行以下命令：
```sh
npm start
```
出现下图所示即为成功：
![](https://github.com/get1024/CloudMusic/blob/main/readme_assets/api_start.png)
## 3、项目使用
打开浏览器，进入`http://localhost:8080`，即进入了本项目。

项目成功实现了：热搜、歌单推荐、歌曲播放等功能，更多功能欢迎你去探索！
界面样式与[网易云官网](https://y.music.163.com/m/)一致。
> [!TIP] 
> 发现启动后的界面与官网并不一样？
> 
> - 在网易云官网，单击鼠标右键-->检查-->`ctrl+shift+m`-->“尺寸”选择任意一款**手机**；
> - 点击刷新按钮；
> 
> 经过上述步骤之后，你应该可以看到与本项目效果一致的官网界面了。