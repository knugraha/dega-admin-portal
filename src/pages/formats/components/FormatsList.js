import React from 'react';
import { Popconfirm, Button, Typography, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFormats, deleteFormat } from '../../../actions/formats';
import { Link } from 'react-router-dom';

function FormatsList() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { formats, total, loading } = useSelector((state) => {
    const node = state.formats.req.find((item) => {
      return item.query.page === page;
    });

    if (node)
      return {
        formats: node.data.map((element) => state.formats.details[element]),
        total: state.formats.total,
        loading: state.formats.loading,
      };
    return { formats: [], total: 0, loading: state.formats.loading };
  });

  React.useEffect(() => {
    fetchFormats();
  }, [page]);

  const fetchFormats = () => {
    dispatch(getFormats({ page: page }));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
      render: (_, record) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2 }}>{record.description}</Typography.Paragraph>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Link
              className="ant-dropdown-link"
              style={{
                marginRight: 8,
              }}
              to={`/formats/${record.id}/edit`}
            >
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => dispatch(deleteFormat(record.id)).then(() => fetchFormats())}
            >
              <Link to="" className="ant-dropdown-link">
                <Button>Delete</Button>
              </Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={formats}
      loading={loading}
      rowKey={'id'}
      pagination={{
        total: total,
        current: page,
        pageSize: 5,
        onChange: (page, pageSize) => setPage(page),
      }}
    />
  );
}

export default FormatsList;
