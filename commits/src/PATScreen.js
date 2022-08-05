import { Button, Form, Input, Select } from "antd";
import React from "react";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 10,
  },
};

class PATScreen extends React.Component {
  formRef = React.createRef();

  onFinish = (values) => {
    console.log(values);
    this.props.onConfirm(values);
    localStorage.setItem("PATDetails", JSON.stringify(values));
  };

  render() {
    return (
      <div className="patContainer">
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="PAToken"
            label="Personal Access Token"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="owner"
            label="Repo Owner"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="project"
            label="Project Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PATScreen;
