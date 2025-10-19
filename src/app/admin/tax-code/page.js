"use client";
import { Button, Input } from "antd";
import Table from "../../../components/Table";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import Notification from "../../../components/Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";

const keyTableCol = [
  { label: "Created At", value: "created_at" },
  { label: "Key", value: "key" },
  { label: "Status", value: "status" },
];

const page = () => {
  const getFilterArray = () => {
    let filterArr = [];
    keyTableCol.map((col) => {
      return filterArr.push(col.label);
    });
    return filterArr;
  };

  const [filterCol, setFilterCol] = useState(getFilterArray());
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [data, setData] = useState(null);
  const { userData, createTaxKeys, deleteUserTaxKey, generateTaxKey } =
    useAppContext();

  useEffect(() => {
    setIsLoading(true);
    let revampedData = [];
    userData?.tax_codes?.map((datum) => {
      const set = {
        created_at: new Date(datum?.createdAt?.seconds * 1000).toDateString(),
        key: datum?.key,
        status: datum?.status ? "Used" : "Active",
      };
      revampedData.push(set);
      return {};
    });
    setData(revampedData);
    setIsLoading(false);
  }, [userData]);

  useEffect(() => {
    setGeneratedCode(generateTaxKey);
  }, [generateTaxKey]);

  const deleteKey = async (data) => {
    const res = await deleteUserTaxKey(data.key);
  };

  const items = [
    {
      label: (
        <span className="text-[0.8rem] font-bold text-red">Delete Key</span>
      ),
      key: "0",
    },
  ];
  const actions = [deleteKey];

  return (
    <div className="flex-auto w-full flex flex-col container mx-auto p-4">
      <div className="flex flex-row my-6 gap-6">
        <div className="w-full flex flex-row items-center">
          <Input className="w-full" readOnly value={generatedCode} />
          {generatedCode && (
            <CopyToClipboard
              text={generatedCode}
              onCopy={() => {
                Notification.displayInfo({
                  message: "Success",
                  description: "Code Copied",
                });
              }}
            >
              <p className="text-purple mx-4 cursor-pointer">copy</p>
            </CopyToClipboard>
          )}
        </div>
        <Button
          loading={isBtnLoading}
          onClick={async () => {
            setIsBtnLoading(true);
            const res = await createTaxKeys();
            setIsBtnLoading(false);
          }}
          type="primary"
          htmlType="button"
          className="!w-[200px] bg-black text-white focus:bg-black hover:!bg-black"
        >
          Generate Tax Key
        </Button>
      </div>

      <Table
        filterArray={filterCol}
        columns={keyTableCol}
        data={data}
        items={items}
        actions={actions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
