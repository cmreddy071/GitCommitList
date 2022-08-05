import { Octokit } from "@octokit/core";
import React, { useEffect, useRef, useState } from "react";
import { List, Avatar, Button, Space } from "antd";
import Refresh from "./assets/RefreshIcon";
import Timer from "./Timer";
import moment from "moment";

const FORMAT = "MMMM Do HH:mm";
const Commits = ({ patData }) => {
  const [commits, setCommits] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const timerRef = useRef(null);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setLoading(true);
    const { PAToken, owner, project } = patData;
    const octokit = new Octokit({
      auth: PAToken,
    });

    const list = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: project,
    });
    setCommits(list.data);
    setLoading(false);
  };
  const onRefresh = () => {
    getList();
    timerRef.current?.resetTimer();
  };
  console.log("commits", commits);
  return (
    <div className="commits-container">
      <div className="commits-header">
        <h3>List of Commits</h3>
        <Space>
          <Button type="primary" ghost onClick={onRefresh}>
            Refresh
          </Button>
          <Timer successCallback={getList} ref={timerRef} />
        </Space>
      </div>
      <div
        className="commits-list"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={commits}
          loading={isLoading}
          renderItem={(item) => (
            <List.Item key={item.sha}>
              <List.Item.Meta
                avatar={<Avatar src={item?.author?.avatar_url} />}
                title={
                  <a href={item?.commit?.url} style={{ textAlign: "left" }}>
                    {item?.commit?.message}
                  </a>
                }
                description={`${moment(item?.commit?.author?.date).format(
                  FORMAT
                )} by ${item?.commit?.author?.name}`}
              />
              <div>{moment(item?.commit?.author?.date).fromNow()}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default Commits;
