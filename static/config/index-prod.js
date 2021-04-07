/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://demo.open.renren.io/renren-fast-server';
  // window.SITE_CONFIG['baseUrl'] = 'http://localhost:8080/renren-fast';
  //window.SITE_CONFIG['baseUrl'] = 'http://www.number10.cn:9001/renren-fast';

  window.SITE_CONFIG['baseUrl'] = 'http://number10.cn:19001/base';
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
