import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 初始化EmailJS
    emailjs.init('HLbs9qc6BCnaZVw8u');
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('开始发送邮件，表单数据:', JSON.stringify(values, null, 2));
      console.log('EmailJS配置信息 - Service ID:', 'service_ygcz5ga', ', Template ID:', 'template_smvljf6');
      
      const templateParams = {
        to_email: 'sales@hanleidehome.com',
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
      };
      
      console.log('准备发送的邮件参数:', JSON.stringify(templateParams, null, 2));
      
      const result = await emailjs.send(
        'service_ygcz5ga',
        'template_smvljf6',
        templateParams
      );
      
      console.log('邮件发送成功，服务器响应:', JSON.stringify(result, null, 2));
      message.success('消息已成功发送！我们会尽快回复您。');
      form.resetFields();
    } catch (error) {
      console.error('邮件发送失败 - 详细错误信息:', error);
      console.error('错误堆栈:', error.stack);
      message.error(`发送失败: ${error.message || '发送过程中出现错误，请稍后重试'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <Card className="info-card">
          <h2><EnvironmentOutlined /> Fabric Factory</h2>
          <p>No. 10 Yuebao Road, Dingqiao Town,<br />Haining City, Zhejiang Province,<br />CN</p>
        </Card>
        <Card className="info-card">
          <h2><EnvironmentOutlined /> Showroom</h2>
          <p>No.2 Fenghuang Road, Dingqiao Town,<br />Haining City, Zhejiang Province,<br />CN</p>
        </Card>
        <Card className="info-card">
          <h2><MailOutlined /> Email</h2>
          <p><a href="mailto:sales@hanleidehome.com">sales@hanleidehome.com</a></p>
        </Card>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>
        <Form
          form={form}
          name="contact"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please input the subject!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;