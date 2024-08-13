import IcPerson from "@/assets/ic-person";
import { TInboxData } from "@/lib/types";
import { FC } from "react";

type Props = {
  data: TInboxData;
};

const InboxCard: FC<Props> = ({ data }) => {
  return (
    <div className="flex w-full gap-8 py-[22px]">
      <div className="flex items-start gap-5">
        <div className="relative">
          <div className="rounded-full bg-primary-300 p-2">
            <IcPerson color="#4F4F4F" />
          </div>
          <div className="rounded-full bg-primary-100 p-2 absolute w-full h-full top-0 bottom-0 left-3">
            <IcPerson color="#FFFFFF" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-primary-100 line-clamp-2">
            Jeannette Moraima Guaman Chamba (Hutto l-589) [Hutto Follow Up -
            Brief Service]
          </span>
          <span className="font-bold text-sm line-clamp-2">Ellen :</span>
          <span className="text-sm line-clamp-2">
            Hey, please let me know if you have any questions or need further.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-between items-end">
        <span className="text-sm whitespace-nowrap">02/06/2021 10:45</span>
        {data.id % 2 === 0 && (
          <span className="rounded-full bg-indicator-300 w-2 h-2"></span>
        )}
      </div>
    </div>
  );
};

export default InboxCard;
