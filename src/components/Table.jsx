"use client";

import ActionsBtn from './ActionsBtn'
import './components.css'
import Notification from './Notification';
import SkelTr from "./SkelTr";
import { NoDataSvg } from "./svg";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const skel = [1, 2, 3, 4, 5, 6,7,8,9,10];
const Table = ({ columns, data, items, actions, filterArray,isLoading }) => {

  const getColor = (value, colValue) => {
    let final = ''
    if (colValue === 'Status'){
      if(value === 'Active'){
        final = 'green'
      }else{
        final = 'red'
      }
    }
    return final
  }
  return (
    <div className="overflow-auto">
      <table className="w-full overflow-auto overflow-x-scroll">
        <thead className="bg-tablegrey">
          <tr>
            <th className="py-[6px] px-2 text-[0.8rem] font-[500] text-start whitespace-nowrap">
              S/N
            </th>
            {columns.map((col, index) => {
              return (
                filterArray.includes(col.label) && (
                  <th className="py-[6px] px-2 text-[0.8rem] font-[500] text-start whitespace-nowrap ">
                    {col.label}
                  </th>
                )
              );
            })}
            <th className="py-[6px] px-2 text-[0.8rem] font-[500] text-start whitespace-nowrap max-w-[100px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody> 
        {(data === null || isLoading)  &&
              skel.map((_, i) => {
                return <SkelTr key={i} headers={columns} />;
              })}
            
          {data && data?.map((datum, index) => {
            return (
              <tr className="bg-white border-b-[1px] border-[#f2eded] hover:bg-lightgrey">
                <td className="py-[10px] px-[0.5rem] text-[0.8rem] whitespace-nowrap">
                  {index + 1}
                </td>
                {columns.map((col, index) => {
                  return (
                    filterArray.includes(col.label) && (
                      col.label === 'Key' ?
                        <CopyToClipboard text={datum[col.value] ?? "-"} onCopy={() => {
                            Notification.displayInfo({
                            message: "Success",
                            description: 'Code Copied',
                          })
                        }}>
                          <td style={{ color: getColor(datum[col.value], col.label), fontWeight: getColor(datum[col.value], col.label) ? '600' : '' }} className={`py-[10px] px-[0.5rem] text-[0.8rem] whitespace-nowrap cursor-pointer`}>
                            {datum[col.value] ?? "-"}
                          </td>
                        </CopyToClipboard>
                          :
                      <td style={{ color: getColor(datum[col.value], col.label), fontWeight: getColor(datum[col.value], col.label) ? '600' : '' }} className={`py-[10px] px-[0.5rem] text-[0.8rem] whitespace-nowrap`}>
                        {datum[col.value] ?? "-"}
                      </td>
                    )
                  );
                })}
                <td className="py-[10px] px-[0.5rem] text-[0.8rem] whitespace-nowrap max-w-[100px]">
                  <ActionsBtn items={items} actions={actions} data={datum} />
                </td>
              </tr>
            );
          })}

{data?.length === 0 && (
              <tr className='bg-white w-full'>
                <td className='w-full text-center ' colSpan={columns.length + 2}>
                  <div className='flex justify-center pt-4 border flex-col items-center'>
                    <NoDataSvg />
                    <p className='text-[0.8rem] '>no data</p>
                  </div>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
