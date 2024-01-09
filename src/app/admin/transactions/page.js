"use client";
import { Button, Input, Modal } from "antd";
import Table from "../../../components/Table";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import Notification from "../../../components/Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { storage } from "../../../config/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const keyTableCol = [
  { label: "Id", value: "id" },
  { label: "User Id", value: "userId" },
  { label: "Email", value: "email" },
  { label: "Coin type", value: "coin_type" },
  { label: "Coin value", value: "coin_value" },
  { label: "Money Value", value: "coin_value_money" },
  { label: "Step", value: "step" },
  { label: "Wallet", value: "wallet" },
  { label: "Fee", value: "fee" },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [feeAmount, setFeeAmount] = useState(0);
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const {
    transactionDatas,
    createTaxKeys,
    deleteTransaction,
    updateATransactionData,
  } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    let revampedData = [];
    transactionDatas?.map((datum) => {
      const set = {
        coin_type: datum?.coin_type,
        coin_value: datum?.coin_value,
        coin_value_money: datum?.coin_value_money,
        email: datum?.email,
        id: datum?.id,
        step: datum?.step,
        userId: datum?.userId,
        wallet: datum?.wallet,
        fee: datum?.fee || 0,
      };
      revampedData.push(set);
      return {};
    });
    setData(revampedData);
    setIsLoading(false);
  }, [transactionDatas]);

  const deleteKey = async (data) => {
    const res = await deleteTransaction(data.id);
  };
  const openEditModal = async (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const openClearanceModal = async (data) => {
    setSelectedData(data);
    setIsCModalOpen(true);
  };
  const handleOk = async () => {
    await updateATransactionData(
      { ...selectedData, fee: feeAmount },
      selectedData.id
    );
  };
  const handleCancel = async () => {
    setIsModalOpen(false);
    setIsCModalOpen(false);
  };
  const handleClearOk = async () => {
    try {
      let fileUrl;
      if (img) {
        const fileRef = ref(storage, `files/${img.name + v4()}`);
        const res = await uploadBytes(fileRef, img);
        fileUrl = await getDownloadURL(res.ref);
      }

      if (fileUrl) {
       await updateATransactionData(
      { ...selectedData, cleardoc: fileUrl, step:6 },
      selectedData.id
    );
    setIsCModalOpen(false);
      }

    } catch (e) {

    }
  };

  console.log(selectedData);

  const items = [
    {
      label: (
        <span className="text-[0.8rem] font-bold text-red">
          Delete Transaction
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className="text-[0.8rem] font-bold text-black">Edit Fee</span>
      ),
      key: "1",
    },
    {
      label: (
        <span className="text-[0.8rem] font-bold text-black">Clearance</span>
      ),
      key: "2",
    },
  ];
  const actions = [deleteKey, openEditModal, openClearanceModal];

  return (
    <div className="flex-auto w-full flex flex-col container mx-auto p-4">
      <Modal
        title="Edit Transaction"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          defaultValue={selectedData?.fee}
          type="number"
          className="w-full p-2 border-2 border-black"
          min={0}
          onChange={(e) => {
            setFeeAmount(e.target.value);
          }}
        />
      </Modal>
      <Modal
        title="Clearance"
        open={isCModalOpen}
        onOk={handleClearOk}
        onCancel={handleCancel}
      >
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      </Modal>
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
