import { IItinerary } from "./types";

interface IResponse {
  body?: any;
  success: boolean;
  statusCode: number;
}

async function genericApiFetch(pathWithoutSlashPrefix: string): Promise<IResponse> {
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

export async function fetchItinerary(id: number): Promise<IResponse> {
  console.log(this);
  return await genericApiFetch(`/itinerary/${id}`);
}

export async function fetchPage(id: number): Promise<IResponse> {
  return await genericApiFetch(`/page/${id}`);
}

export async function fetchItem(id: number): Promise<IResponse> {
  return await genericApiFetch(`/item/${id}`);
}
