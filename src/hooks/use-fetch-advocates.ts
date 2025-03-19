import { IAdvocate } from "@/types/advocates";
import Logger from "@/utils/logger";
import { notification } from "antd";
import { useEffect, useMemo, useState } from "react";

interface UseFetchAdvocatesParams {
  page: number;
  pageSize: number;
  search: string;
}

export const useFetchAdvocates = ({
  page,
  pageSize,
  search,
}: UseFetchAdvocatesParams) => {
  const [isFetching, setIsFetching] = useState(true);
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);
  const [total, setTotal] = useState(0);
  // const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    const sanitizedSearch = encodeURIComponent(search.trim().toLowerCase());

    const fetchAdvocates = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(
          `/api/advocates?page=${page}&pageSize=${pageSize}&search=${sanitizedSearch}`,
        );

        if (!response.ok) {
          notification.error({
            message: "System Error",
            description: "Something went wrong, try again later.",
          });
        }

        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setTotal(jsonResponse.total);
      } catch (error) {
        Logger.error(`Failed to fetch advocates:${error}`);
        notification.error({
          message: "System Error",
          description: "Something went wrong, try again later.",
        });
      }
      setIsFetching(false);
    };

    fetchAdvocates();
  }, [page, pageSize, search]);

  return useMemo(
    () => ({
      advocates,
      isFetching,
      total,
    }),
    [advocates, isFetching, total],
  );
};
