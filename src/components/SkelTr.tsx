const SkelTr = ({
  headers
}) => {
  return (
    <tr className='mt-[1px]'>
      <td>
            <p className="sk_bg min-h-[1.75rem] 2xl:min-h-[2.2rem] text-[12px] 2xl:text-[16px] bg-white">
              {""}
            </p>
          </td>
      {headers.map((_, i) => {
        return (
          <td key={i}>
            <p className="sk_bg min-h-[1.75rem] 2xl:min-h-[2.2rem] text-[12px] 2xl:text-[16px] bg-white">
              {""}
            </p>
          </td>
        );
      })}
       <td>
            <p className="sk_bg min-h-[1.75rem] 2xl:min-h-[2.2rem] text-[12px] 2xl:text-[16px] bg-white">
              {""}
            </p>
          </td>
    </tr>
  );
};

export default SkelTr;
