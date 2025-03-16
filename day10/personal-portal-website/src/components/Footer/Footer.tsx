import type React from "react";
import { Link } from "react-router-dom";
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerTitle}>Lucky-DevPortal</h3>
            <p className={styles.footerDescription}>
              专业的前端开发平台，提供组件库、低代码工具和可视化编排解决方案。
            </p>
            <div className={styles.socialLinks}>
              <Link
                to="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <GithubOutlined />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <TwitterOutlined />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <LinkedinOutlined />
              </Link>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.footerTitle}>产品</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/components" className={styles.footerLink}>
                  组件库
                </Link>
              </li>
              <li>
                <Link to="/lowcode" className={styles.footerLink}>
                  低代码平台
                </Link>
              </li>
              <li>
                <Link to="/api" className={styles.footerLink}>
                  在线接口
                </Link>
              </li>
              <li>
                <Link to="/visual" className={styles.footerLink}>
                  可视化逻辑编排
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.footerTitle}>资源</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/docs" className={styles.footerLink}>
                  文档
                </Link>
              </li>
              <li>
                <Link to="/blog" className={styles.footerLink}>
                  博客
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className={styles.footerLink}>
                  教程
                </Link>
              </li>
              <li>
                <Link to="/showcase" className={styles.footerLink}>
                  案例展示
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h3 className={styles.footerTitle}>联系</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/about" className={styles.footerLink}>
                  关于我
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footerLink}>
                  联系方式
                </Link>
              </li>
              <li>
                <Link to="/hire" className={styles.footerLink}>
                  招聘我
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Lucky-DevPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
