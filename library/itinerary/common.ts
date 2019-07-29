import React, { SetStateAction, useEffect, useState } from "react";
import { ApiError } from "../../common/errors/apiError";
import { apiGet } from "../../common/utils/requests";
import { IItinerary, IPage } from "./types";
import { debug } from "../../common/utils/debug";

export function useItinerary(
  id: number,
  initialVal?: IItinerary,
  bearerToken?: string,
  setError?: React.Dispatch<SetStateAction<string>>,
) {
  const [itinerary, setItinerary] = useState<IItinerary>(initialVal);

  async function retrieveData() {
    debug(`useItinerary hook retreiving itinerary id ${id}`);
    const response = await await apiGet(`/itinerary/${id}`, bearerToken);
    if (response.success) {
      setItinerary(response.body);
    } else {
      const error = new ApiError(response.statusCode);
      if (setError) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    if (!initialVal || itinerary.id !== id) {
      retrieveData();
    }
  }, [id]);

  return itinerary;
}

export function sortPages(pages: IPage[]) {
  return pages.sort((a, b) => a.rankInItinerary - b.rankInItinerary);
}
