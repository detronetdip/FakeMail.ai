<p>
  <h1 align="center"><b>FakeMail.ai</b></h1>
</p>

<p>
  <h4 align="center"><b>A dummy clone of <a href="https://warmer.ai/">warmer.ai</a></b></h4>
</p>

<p align="center"> 
    <img alt="All Stars" src="https://visitor-badge.laobi.icu/badge?page_id=detronetdip.FakeMail.ai"/>&nbsp;
    <img src="https://img.shields.io/github/stars/detronetdip/FakeMail.ai" />
    &nbsp;
    <img src="https://img.shields.io/github/forks/detronetdip/FakeMail.ai" />&nbsp;
    <img src="https://img.shields.io/github/repo-size/detronetdip/FakeMail.ai"/>
    &nbsp;
    <img src="https://img.shields.io/github/last-commit/detronetdip/FakeMail.ai"/>
</p>

<p>
  <h4 align="center"><i>Build with ❤️ and</i></h4>
</p>
<p align="center"> 
    <img alt="HTML5" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB"/>&nbsp;
    <img src="https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E" alt="CSS3" />
    &nbsp;
    <img src="https://img.shields.io/badge/ts--node-3178C6?logo=ts-node&logoColor=white" alt="JAVASCRIPT" />&nbsp;
    <img src="https://img.shields.io/badge/Node.js-339933?logoColor=white" alt="PHP"/>
    &nbsp;
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white"/>
    &nbsp;
    <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white"/>
</p>

### How to run

  You can run this project by manually setting up everything or you can simply run it with docker or docker-compose to avoid overhead hustles.

### Run with docker

  To run this with docker please run the following commands.
  ***Please make sure that docker is installed in your system.***
  
  ```
   > git clone https://github.com/detronetdip/E-commerce.git
   > cd {to your cloned path}/E-commerce/
   > docker build -t app -f Dockerfile .
   > cd database
   > docker build -t app_database -f Dockerfile .
   > docker run \
       --name database \
       -e MYSQL_ROOT_PASSWORD='passwd' \
       -p 9306:3306 app_database
   > docker run --name web_app -p 3000:80 app
  ```
  - Go to your browser and type `http://localhost:3000` and the whole project is ready to use.

### Run with docker-compose

  To run this with docker-compose please run the following commands.
  ***Please make sure that docker and docker-compose is installed in your system.***
  
  ```
   > git clone https://github.com/detronetdip/E-commerce.git

   > cd {to your cloned path}/E-commerce/`

   > docker-compose up -d --build
  ```
  - Go to your browser and type `http://localhost:3000` and the whole project is ready to use.
  - ***if you initialy encoutered connection refused error please wait for few seconds and relod the page.**