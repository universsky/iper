/*
Navicat MySQL Data Transfer

Source Server         : mybeacon
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : beacon

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2014-07-04 15:44:04
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_name` varchar(50) DEFAULT NULL COMMENT '商品名',
  `seller_name` varchar(20) DEFAULT NULL COMMENT '商家',
  `id` varchar(16) NOT NULL COMMENT '主键',
  `seller_id` varchar(10) DEFAULT NULL COMMENT '商家id',
  `product_id` varchar(20) DEFAULT NULL COMMENT '商品id',
  `url` varchar(200) DEFAULT NULL COMMENT '商品url',
  `img_src` varchar(100) DEFAULT NULL COMMENT '商品图片url',
  `price` varchar(10) DEFAULT NULL COMMENT '商品价格',
  `origin_price` varchar(10) DEFAULT NULL COMMENT '商品原价',
  `freight` varchar(10) DEFAULT NULL COMMENT '运费',
  `payment` varchar(10) DEFAULT NULL COMMENT '付款人数',
  `area` varchar(20) DEFAULT NULL COMMENT '地区',
  `discount` varchar(10) DEFAULT NULL COMMENT '节省多少钱',
  `ticket` varchar(10) DEFAULT NULL COMMENT '代金券',
  `category` varchar(20) DEFAULT NULL COMMENT '商品类别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO product VALUES ('支持3G正品官方认证 土豪金iPhone 5S 港版', '光剑小铺', '9000000000001', '1000001', '80000000001', 'http://h5.m.taobao.com/awp/core/detail.htm?id=38541915144&ali_refid=a3_430125_1006:1109237763:6:iphone5s:2d33715b9e916f8585b19d808390dd1f&ali_trackid=1_2d33715b9e916f8585b19d808390dd1f', 'http://g.search1.alicdn.com/img/i1/TB1ia8aFVXXXXbRXFXXXXXXXXXX_!!0-item_pic.jpg', '3299.00', '3899.00', '15.00', '256', '杭州', '600', '200', 'digital');
INSERT INTO product VALUES ('Apple/苹果 iPhone 5S 港版 苹果原封 未激活', '家云小店', '9000000000002', '1000002', '80000000002', 'http://a.m.taobao.com/i20286957530.htm?sid=16a13e3b047e5d9f&abtest=2&rn=b66fbe995ffbedfa1f1095765e4abac5', 'http://gw1.alicdn.com/bao/uploaded/i2/18989029958751962/T1wyGZFcJgXXXXXXXX_!!0-item_pic.jpg', '3388.00', '4388.00', '0.00', '624', '上海', '800', '150', 'digital');
