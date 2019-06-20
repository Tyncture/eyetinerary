import { IItinerary } from "../components/itineraryUtilities/types";

interface IResponse {
  body?: any;
  success: boolean;
  statusCode: number;
}

async function genericApiGet(pathWithoutSlashPrefix: string): Promise<IResponse> {
  try {
    const response = await fetch(
      `${process.env.EYET_API}${pathWithoutSlashPrefix}`
    );
    const status = response.status;
    return {
      body: await response.json(),
      success: status === 200 ? true : false,
      statusCode: status
    };
  } catch (e) {
    console.log(e.message);
    return {
      success: false,
      statusCode: -1
    };
  }
}

export async function getItinerary(id: number): Promise<IResponse> {
  return await genericApiGet(`/itinerary/${id}`);
}

export async function getPage(id: number): Promise<IResponse> {
  return await genericApiGet(`/page/${id}`);
}

export async function getItem(id: number): Promise<IResponse> {
  return await genericApiGet(`/item/${id}`);
}
