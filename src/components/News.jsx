import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://i.ibb.co/Z11pcGG/cryptocurrency.png"

const News = ({ simplified }) => {

  const [title, setNewsCategory] = useState('Cryptocurrency');

  const count = simplified ? 6: 50;
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery(title, count);
  console.log(cryptoNews);

  if(!cryptoNews?.data) return <Loader />;

  // if (!cryptoNews || !cryptoNews.data || !cryptoNews.data.keyword_related || cryptoNews.data.keyword_related.length === 0) {
  //   return <div>No news available.</div>;
  // }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(data) => setNewsCategory(data)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins.map((news) => <Option value={news.name}>{news.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4} style={{ textAlign: 'justify', width: '100%', display: 'flex', justifyContent: 'space-between'  }} >
                  {news.title}</Title>
                
              </div>
              <img src={news.thumbnail|| demoImage} alt="" style={{ width: '100%', height: '200px' }} />
              <p style={{ textAlign: 'justify', textJustify: 'inter-word', margin: '0', lineHeight: '1.5' }}>
              {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
              </p>
              <div className="provider-container">
                <div>
                <Avatar src={news.thumbnail || demoImage} alt="" /> 
                   <Text className="provider-name">{news.name}</Text>
                </div>
                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      )).slice(0, simplified ? 6 : undefined)}
    </Row>
  );
};

export default News
