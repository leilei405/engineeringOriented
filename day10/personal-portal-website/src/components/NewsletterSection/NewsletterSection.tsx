"use client";

import type React from "react";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { SendOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";
import styles from "./NewsletterSection.module.scss";

const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    console.log(values);
    setLoading(true);
    try {
      // 模拟API请求
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      message.success("订阅成功！");
      form.resetFields();
    } catch (error) {
      message.error("订阅失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className="container">
        <div className={styles.newsletterCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>{t("newsletter.title")}</div>
            <h2 className={styles.sectionTitle}>获取最新动态</h2>
            <p className={styles.sectionDescription}>
              订阅我们的通讯，获取最新的产品更新、技术文章和行业动态
            </p>
          </div>

          {submitted ? (
            <div className={styles.successMessage}>
              <CheckCircleOutlined className={styles.successIcon} />
              <h3 className={styles.successTitle}>感谢订阅！</h3>
              <p className={styles.successDescription}>
                我们会将最新动态发送到您的邮箱
              </p>
            </div>
          ) : (
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className={styles.newsletterForm}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "请输入您的邮箱地址" },
                  { type: "email", message: "请输入有效的邮箱地址" },
                ]}
              >
                <Input
                  placeholder="输入您的邮箱地址"
                  size="large"
                  prefix={<SendOutlined className={styles.inputIcon} />}
                  className={styles.emailInput}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className={styles.submitButton}
              >
                订阅
              </Button>
            </Form>
          )}

          <p className={styles.privacyNote}>
            我们尊重您的隐私，不会向第三方分享您的信息。
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
