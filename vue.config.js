const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // npm run build 타겟 디렉토리 -> 해당 경로에 vue 빌드 출력물 생성됨
  outputDir: '../src/main/resources/static',

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
/*  devServer: {
    proxy: 'http://localhost:8080' //서버 프로젝트 포트번호와 동일할 것
  },*/

  proxy: {
    '/api': {
      // '/api' 로 들어오면 포트 8080(스프링 서버)로 proxy 처리
      target: 'http://localhost:8080',
      changeOrigin: true // cross origin 허용 (서로 다른 포트 리소스 공유)
    }
  }

})
