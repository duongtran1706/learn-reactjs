import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Input, Button, message, Drawer } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';

import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { UserListItem, FormValueType } from '@/pages/Admin/typing';
import { STATUS_TYPE_ENUM } from '@/utils/utils.enums';
import { queryRule, updateRule, addRule, removeRule } from '@/services/user';
import UpdateForm from '@/pages/Admin/component/UpdateForm';

const handleAdd = async (fields: UserListItem) => {
  const hide = message.loading('đang xử lý');
  try {
    await addRule({ ...fields });
    hide();
    message.success('thành công');
    return true;
  } catch (error) {
    hide();
    message.error('có lỗi');
    return false;
  }
};

/**
 *
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('đang cập nhật');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('cập nhật thành công');
    return true;
  } catch (error) {
    hide();
    message.error('cập nhật thất bại');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('đang xóa');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('xóa thành công');
    return true;
  } catch (error) {
    hide();
    message.error('xóa thất bại');
    return false;
  }
};

const TableUser: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<UserListItem>();
  const [showDetail, setShowDetail] = useState<boolean>();
  const [selectedRowsState, setSelectedRows] = useState<UserListItem[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: ProColumns<UserListItem>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      tip: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Miêu tả',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'số điện thoại',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'status',
      dataIndex: 'status',
      valueEnum: STATUS_TYPE_ENUM,
    },
    {
      title: 'updatedAt',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          sữa
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          delete
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as UserListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="规则名称为必填项"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<UserListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableUser;
