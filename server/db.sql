DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uuid` varchar(64) NOT NULL COMMENT '用户全局uuid',
  `mobile` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT '0' COMMENT '1男 2女 0未知',
  `province` varchar(64) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `country` varchar(64) DEFAULT NULL,
  `headimgurl` text,
  `state` int(11) DEFAULT '0',
  `createtime` datetime DEFAULT NULL,
  `lastmodify` datetime DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `NewIndex1` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';